import {
  DeeplinkData,
  ValidationResponse,
  JourneyLeg,
  DeeplinkOptions,
  ResolveResponse,
  ResolvePlaceResult,
  ResolveAvailabilityResult,
} from './types'
import { QuotesAvailabilityParams } from './api/types'
import { HttpService, LocationService, PoiService, QuotesService } from './api'
import { parse } from './parse'
import { validate } from './validate'
import { codes, errorMessageByCode } from './errors'

const pickupPlaceFields = ['pickup' as const, 'pickupKpoi' as const, 'pickupPlaceId' as const]
const dropoffPlaceFields = ['dropoff' as const, 'dropoffKpoi' as const, 'dropoffPlaceId' as const]

type PlaceField = typeof pickupPlaceFields[0] | typeof dropoffPlaceFields[0]
type SearchPlaceData = { key: PlaceField; value: string }

type PlacePromisesList = {
  key: string
  value: string
  promise: Promise<ResolvePlaceResult>
}[]

type AvailabilityPromisesList = {
  originPlaceId: string
  destinationPlaceId?: string
  dateRequired?: string
  promise: Promise<ResolveAvailabilityResult>
}[]

const configurePlaceId = (id: string) => {
  const placeIdPrefix = 'k_'

  return id.indexOf(placeIdPrefix) === 0 ? id : `${placeIdPrefix}${id}`
}

function getActivePlace(leg: JourneyLeg, keys: PlaceField[]) {
  const key = keys.filter(k => leg[k])[0]

  return key ? { key, value: leg[key] as string } : undefined
}

function getPlaceCacheKey(key: PlaceField) {
  return key.replace(/^pickup|dropoff/, '') || 'default'
}

function isPickupPlace(key: PlaceField) {
  return key.indexOf('pickup') !== -1
}

function resolvePromise<T extends object, Y, K extends Array<T & { promise: Promise<Y> }>>(
  cacheParams: T,
  promises: K,
  getNewPromise: () => Promise<Y>
) {
  for (const item of promises) {
    if (
      (Object.getOwnPropertyNames(cacheParams) as Array<keyof T>).every(key => cacheParams[key] === item[key])
    ) {
      return item.promise
    }
  }

  const promise = getNewPromise()

  promises.push({ ...cacheParams, promise })

  return promise
}

export class Deeplink {
  private deeplinkInfo: DeeplinkData

  private validation: ValidationResponse

  private locationService: LocationService

  private poiService: PoiService

  private quotesService: QuotesService

  constructor(query: string, options: DeeplinkOptions) {
    this.deeplinkInfo = parse(query)
    this.validation = validate(this.deeplinkInfo)

    //TODO: Refactor this after api logic will be extracted from this package
    //all services should be passed from outside
    const httpService = new HttpService(options.url, options.getDefaultRequestOptions)
    this.locationService = new LocationService(httpService)
    this.poiService = new PoiService(httpService)
    this.quotesService = new QuotesService(httpService)
  }

  public get deeplinkData() {
    return this.deeplinkInfo
  }

  public isValid() {
    return this.validation
  }

  public resolve(subscriber: (data: ResolveResponse) => void) {
    if (!this.isValid().ok) {
      throw new Error('Deeplink data is not valid')
    }

    const placePromises: PlacePromisesList = []
    const availabilityPromises: AvailabilityPromisesList = []
    let activeSubscriber: typeof subscriber | null = subscriber

    const handle = (info: ResolveResponse) => activeSubscriber && activeSubscriber(info)
    const unsubscribe = () => {
      activeSubscriber = null
    }

    Promise.all(
      this.deeplinkData.legs.map(async (leg, index) => {
        const activePickup = getActivePlace(leg, pickupPlaceFields)
        const activeDropoff = getActivePlace(leg, dropoffPlaceFields)

        const getPromise = async (searchData?: SearchPlaceData) => {
          if (!searchData) {
            return Promise.resolve(undefined)
          }

          const { key, value } = searchData
          const result = await resolvePromise({ key: getPlaceCacheKey(key), value }, placePromises, () =>
            this.resolvePlace(searchData)
          )

          handle({
            done: false,
            leg: index,
            place: { ...result, isPickup: isPickupPlace(key), searchValue: value },
          })

          return result
        }

        const [pickupData, dropoffData] = await Promise.all([
          getPromise(activePickup),
          getPromise(activeDropoff),
        ])

        if (!(pickupData || dropoffData) || pickupData?.ok === false || dropoffData?.ok === false) {
          handle({
            done: false,
            leg: index,
            availability: { ok: false, error: { message: errorMessageByCode[codes.DP008] } },
          })

          return
        }

        const availabilityParams: QuotesAvailabilityParams = {
          originPlaceId: pickupData?.ok
            ? pickupData.data.placeId
            : dropoffData?.ok
            ? dropoffData.data.placeId
            : '',
          destinationPlaceId: pickupData?.ok && dropoffData?.ok ? dropoffData.data.placeId : undefined,
          dateRequired: leg.pickupTime,
        }

        const availability = await resolvePromise(availabilityParams, availabilityPromises, () =>
          this.checkAvailability(availabilityParams)
        )

        handle({ done: false, leg: index, availability })
      })
    )
      .then(() => {
        handle({ done: true })
        unsubscribe()
      })
      .catch(error => {
        handle({ done: true, error })
        unsubscribe()
      })

    return { unsubscribe }
  }

  private resolvePlace(data: SearchPlaceData) {
    return data.key.indexOf('PlaceId') !== -1 ? this.resolveByPlaceId(data) : this.resolveByPoi(data)
  }

  private async resolveByPlaceId(item: SearchPlaceData): Promise<ResolvePlaceResult> {
    const response = await this.locationService.getAddressDetails({ placeId: item.value })

    if (!response.ok) {
      return { ok: false, error: response.error }
    }

    const { body } = response

    return {
      ok: true,
      data: {
        placeId: body.place_id,
        displayAddress: body.address?.display_address ?? '',
        placeInfo: body,
      },
    }
  }

  private async resolveByPoi(item: SearchPlaceData): Promise<ResolvePlaceResult> {
    const response = await this.poiService.search({
      paginationRowCount: 1,
      paginationOffset: 0,
      searchKey: item.value,
    })

    if (!response.ok) {
      return { ok: false, error: response.error }
    }

    const poi = response.body?.pois?.[0]

    return !poi?.id
      ? { ok: false, error: { message: errorMessageByCode[codes.DP007] } }
      : {
          ok: true,
          data: {
            placeId: item.key.indexOf('Kpoi') === -1 ? poi.id : configurePlaceId(poi.id),
            displayAddress: poi.address.display_address,
            poiInfo: poi,
          },
        }
  }

  private async checkAvailability(data: QuotesAvailabilityParams): Promise<ResolveAvailabilityResult> {
    const response = await this.quotesService.checkAvailability(data)

    if (!response.ok) return { ok: false, error: response.error }

    const { originPlaceId, destinationPlaceId, dateRequired } = data

    return { ok: true, data: { placeId: originPlaceId, destinationPlaceId, date: dateRequired } }
  }
}
