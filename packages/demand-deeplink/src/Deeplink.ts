import { LatLng } from '@karhoo/demand-api'
import {
  DeeplinkData,
  ValidationResponse,
  JourneyLeg,
  ResolveResponse,
  ResolvePlaceResult,
  ResolveAvailabilityParams,
  ResolveAvailabilityResult,
  ResolveAvailabilityParam,
  Api,
  ResolvePlace,
} from './types'
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
  origin: {
    latitude: number
    longitude: number
    displayAddress: string
  }
  destination: {
    latitude: number
    longitude: number
    displayAddress: string
  }
  dateRequired?: string
  promise: Promise<ResolveAvailabilityResult>
}[]

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

  private api: Api

  constructor(query: string, api: Api) {
    this.deeplinkInfo = parse(query)
    this.validation = validate(this.deeplinkInfo)
    this.api = api
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

        if (
          !(pickupData || dropoffData)
          || pickupData?.ok === false
          || dropoffData?.ok === false
        ) {
          handle({
            done: false,
            leg: index,
            availability: { ok: false, error: { message: errorMessageByCode[codes.DP008] } },
          })

          return
        }

        const mapAvailabilityParams = (details: ResolvePlace) => ({
          ...details.data.placePosition,
          displayAddress: details.data.displayAddress,
        })

        const getAvailabilityParams = (details1?: ResolvePlaceResult, details2?: ResolvePlaceResult): ResolveAvailabilityParam => {
          if (details1 && details1?.ok) {
            return mapAvailabilityParams(details1)
          }

          if (details2 && details2?.ok) {
            return mapAvailabilityParams(details2)
          }

          return {
            latitude: 0,
            longitude: 0,
            displayAddress: ''
          }
        }

        console.log(getAvailabilityParams(pickupData, dropoffData))
        console.log(getAvailabilityParams(dropoffData))

        const availabilityParams: ResolveAvailabilityParams = {
          origin: getAvailabilityParams(pickupData, dropoffData),
          destination: getAvailabilityParams(dropoffData),
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
    if (data.key.indexOf('PlaceId') !== -1) {
      return this.resolveByPlaceId(data)
    }

    return data.key.indexOf('Kpoi') !== -1 ? this.resolveByPoi(data) : this.resolveByAddressAutocoplete(data)
  }

  private async resolveByPlaceId(item: SearchPlaceData): Promise<ResolvePlaceResult> {
    const response = await this.api.locationService.getAddressDetails({ placeId: item.value })

    if (!response.ok) {
      return { ok: false, error: response.error }
    }

    const { body } = response

    return {
      ok: true,
      data: {
        placePosition: {
          latitude: body.position?.latitude ?? 0,
          longitude: body.position?.longitude ?? 0,
        },
        displayAddress: body.address?.display_address ?? '',
        placeInfo: body,
      },
    }
  }

  private async resolveByPoi(item: SearchPlaceData): Promise<ResolvePlaceResult> {
    const response = await this.api.poiService.search({
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
            placePosition: {
              latitude: poi.position.latitude,
              longitude: poi.position.longitude,
            },
            displayAddress: poi.address.display_address,
            poiInfo: poi,
          },
        }
  }

  private async resolveByAddressAutocoplete(item: SearchPlaceData): Promise<ResolvePlaceResult> {
    const response = await this.api.locationService.getAddressAutocompleteData({
      query: item.value,
    })

    if (!response.ok) {
      return { ok: false, error: response.error }
    }

    const { place_id } = response.body.locations?.[0]

    if (place_id) {
      return await this.resolveByPlaceId({ key: item.key, value: place_id })
    }

    return { ok: false, error: { message: errorMessageByCode[codes.DP007] } }
  }

  private async checkAvailability(data: ResolveAvailabilityParams): Promise<ResolveAvailabilityResult> {
    console.log("Test", data)

    const response = await this.api.quotesV2Service.quotesSearch({
      ...data,
      origin: {
        ...data.origin,
        latitude: data.origin.latitude.toString(),
        longitude: data.origin.longitude.toString(),
      },
      destination: {
        ...data.destination,
        latitude: data.destination.latitude.toString(),
        longitude: data.destination.longitude.toString(),
      }
    })

    if (!response.ok) return { ok: false, error: response.error, searchedParams: data }

    return { ok: true, searchedParams: data }
  }
}
