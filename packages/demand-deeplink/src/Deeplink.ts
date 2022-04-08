import {
  DeeplinkData,
  ValidationResponse,
  JourneyLeg,
  ResolveResponse,
  ResolvePlaceResult,
  ResolveAvailabilityParams,
  ResolveAvailabilityResult,
  Api,
  Position,
  ResolvePlace,
  ValidationOptions
} from './types'
import { parse } from './parse'
import { validate } from './validate'
import { codes, errorMessageByCode } from './errors'

const pickupPlaceFields = [
  'pickup' as const,
  'pickupKpoi' as const,
  'pickupPlaceId' as const,
  'pickupPosition' as const,
]
const dropoffPlaceFields = [
  'dropoff' as const,
  'dropoffKpoi' as const,
  'dropoffPlaceId' as const,
  'dropoffPosition' as const,
]

type PlaceField = typeof pickupPlaceFields[0] | typeof dropoffPlaceFields[0]
type SearchPlaceData = { key: PlaceField; value: string | Position }

type PlacePromisesList = {
  key: string
  value: string
  promise: Promise<ResolvePlaceResult>
}[]

type AvailabilityPromisesList = {
  latitude: string
  longitude: string
  localTimeOfPickup?: string
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

  private api: Api

  constructor(query: string, api: Api, validationOptions?: ValidationOptions) {
    this.deeplinkInfo = parse(query)
    this.validation = validate(this.deeplinkInfo, validationOptions)
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

    const handle = (info: ResolveResponse) => {
      return activeSubscriber && activeSubscriber(info)
    }
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
            place: { ...result, isPickup: isPickupPlace(key), searchValue: value as string },
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

        const mapDirectionParams = (placeDetails?: ResolvePlace) => ({
          latitude: placeDetails ? placeDetails.data.placePosition.latitude.toString() : '0',
          longitude: placeDetails ? placeDetails.data.placePosition.longitude.toString() : '0',
          ...(leg.pickupTime && { localTimeOfPickup: leg.pickupTime }),
        })

        const getAvailabilityParams = (
          firstPlace?: ResolvePlace,
          secondPlace?: ResolvePlace
        ): ResolveAvailabilityParams => {
          if (firstPlace && secondPlace) {
            return mapDirectionParams(firstPlace)
          }

          return firstPlace ? mapDirectionParams(firstPlace) : mapDirectionParams(secondPlace)
        }

        const availabilityParams = getAvailabilityParams(
          pickupData as ResolvePlace,
          dropoffData as ResolvePlace
        )

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

    if (data.key.indexOf('Kpoi') !== -1) {
      return this.resolveByPoi(data)
    }

    if (data.key.indexOf('Position') !== -1) {
      return this.resolveByGeocode(data)
    }

    return this.resolveByAddressAutocoplete(data)
  }

  private async resolveByPlaceId(item: SearchPlaceData): Promise<ResolvePlaceResult> {
    const response = await this.api.locationService.getAddressDetails({ placeId: item.value as string })

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
        placeId: body.place_id,
        placeInfo: body,
      },
    }
  }

  private async resolveByPoi(item: SearchPlaceData): Promise<ResolvePlaceResult> {
    const response = await this.api.poiService.search({
      paginationRowCount: 1,
      paginationOffset: 0,
      searchKey: item.value as string,
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
            placeId: configurePlaceId(poi.id),
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
      query: item.value as string,
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

  private async resolveByGeocode(item: SearchPlaceData): Promise<ResolvePlaceResult> {
    const params = item.value as Position
    const payload = {
      latitude: params.lat as number,
      longitude: params.lng as number,
    }
    const response = await this.api.locationService.getReverseGeocode(payload)
    if (!response.ok) {
      return { ok: false, error: response.error }
    }

    const { body } = response

    return {
      ok: true,
      data: {
        placeId: body.place_id,
        placePosition: {
          latitude: body.position?.latitude ?? 0,
          longitude: body.position?.longitude ?? 0,
        },
        displayAddress: body.address?.display_address ?? '',
        placeInfo: body,
      },
    }
  }

  private async checkAvailability(data: ResolveAvailabilityParams): Promise<ResolveAvailabilityResult> {
    const response = await this.api.quotesV2Service.checkCoverage(data)

    if (!response.ok) return { ok: false, error: response.error, searchedParams: data }

    const isCoverageAvailable = response.body.coverage

    return isCoverageAvailable
      ? { ok: true, searchedParams: data }
      : { ok: false, error: { message: errorMessageByCode[codes.DP015] }, searchedParams: data }
  }
}
