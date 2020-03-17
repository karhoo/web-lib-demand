import { DeeplinkData, ValidationResponse } from './types'
import { HttpService, ApiError } from './Http'
import { LocationService, LocationAddressDetailsResponse } from './LocationService'
import { PoiService, PoiResponse } from './PoiService'
import { QuotesService } from './QuotesService'
import { parse } from './parse'
import { validate } from './validate'

type PickupField = 'pickup' | 'pickupKpoi' | 'pickupPlaceId'
type DropoffField = 'dropoff' | 'dropoffKpoi' | 'dropoffPlaceId'
type PlaceField = PickupField | DropoffField

type ResolveError = {
  ok: false
  error: ApiError
}

type ResolvePlace = {
  ok: true
  data: {
    placeId: string
    displayAddress: string
    placeInfo?: LocationAddressDetailsResponse
    poiInfo?: PoiResponse
  }
}

type ResolvePlaceResult = ResolvePlace | ResolveError

type ResolvePlaceValue = {
  type: PlaceField
  baseValue: string
  result: ResolvePlaceResult
}

type ResolveAvailability = {
  ok: true
  data: {
    placeId: string
    destinationPlaceId?: string
    date?: string
  }
}

type ResolveAvailabilityResult = ResolveAvailability | ResolveError

type ResolveResponse = {
  done: boolean
  leg: number
  place?: ResolvePlaceValue
  availability?: ResolveAvailabilityResult
  error?: any // eslint-disable-line
}

function getActivePlace(fields: { key: PlaceField; value?: string }[]) {
  const active = fields.filter(({ value }) => value)[0]

  return active
}

export class Deeplink {
  private deeplinkData: DeeplinkData

  private validation: ValidationResponse

  private locationService: LocationService

  private poiService: PoiService

  private quotesService: QuotesService

  constructor(query: string) {
    this.deeplinkData = parse(query)
    this.validation = validate(this.deeplinkData)

    const httpService = new HttpService('http')

    this.locationService = new LocationService(httpService)
    this.poiService = new PoiService(httpService)
    this.quotesService = new QuotesService(httpService)
  }

  public isValid() {
    return this.validation
  }

  public resolve(subscribe: (data: ResolveResponse) => void) {
    //TODO: track similar requests (with the same request data, add k_ prefix when KPOI)
    Promise.all(
      this.deeplinkData.legs.map(async (leg, index) => {
        const activePickup = getActivePlace([
          { key: 'pickup', value: leg.pickup },
          { key: 'pickupKpoi', value: leg.pickupKpoi },
          { key: 'pickupPlaceId', value: leg.pickupPlaceId },
        ])

        const activeDropoff = getActivePlace([
          { key: 'dropoff', value: leg.dropoff },
          { key: 'dropoffKpoi', value: leg.dropoffKpoi },
          { key: 'dropoffPlaceId', value: leg.dropoffPlaceId },
        ])

        const getPromise = (data?: { key: PlaceField; value: string }) => {
          return !data
            ? Promise.resolve(undefined)
            : this.resolvePlace(data).then(result => {
                subscribe({
                  done: false,
                  leg: index,
                  place: { result, type: data.key, baseValue: data.value },
                })

                return result
              })
        }

        const [pickupData, dropoffData] = await Promise.all([
          getPromise(activePickup),
          getPromise(activeDropoff),
        ])

        if (!(pickupData && dropoffData) || pickupData?.ok === false || dropoffData?.ok === false) {
          subscribe({
            done: false,
            leg: index,
            availability: { ok: false, error: { message: 'Can not check availability' } },
          })
        } else {
          const originPlaceId = pickupData.ok ? pickupData.data.placeId : dropoffData.data.placeId
          const destinationPlaceId = pickupData.ok && dropoffData.ok ? dropoffData.data.placeId : undefined
          const dateRequired = leg.pickupTime

          const data = await this.checkAvailability(originPlaceId, destinationPlaceId, dateRequired)

          subscribe({ done: false, leg: index, availability: data })
        }
      })
    )
      .then(() => {
        subscribe({ done: true, leg: -1 })
      })
      .catch(error => {
        subscribe({ done: true, leg: -1, error })
      })
  }

  private resolvePlace(data: { key: PlaceField; value: string }) {
    return data.key.indexOf('PlaceId') !== -1 ? this.resolveByPlaceId(data) : this.resolveByPoi(data)
  }

  private async resolveByPlaceId(item: { key: PlaceField; value?: string }): Promise<ResolvePlaceResult> {
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

  private async resolveByPoi(item: { key: PlaceField; value?: string }): Promise<ResolvePlaceResult> {
    const options = {
      paginationRowCount: 1,
      paginationOffset: 0,
      searchKey: item.value,
    }

    const response = await this.poiService.search(options)

    if (!response.ok) {
      return { ok: false, error: response.error || { message: 'No poi info' } }
    }

    const poi = response.body?.pois?.[0]

    return !poi
      ? { ok: false, error: { message: 'No poi info' } }
      : { ok: true, data: { placeId: poi.id, displayAddress: poi.address.display_address, poiInfo: poi } }
  }

  private async checkAvailability(
    originPlaceId: string,
    destinationPlaceId?: string,
    dateRequired?: string
  ): Promise<ResolveAvailabilityResult> {
    const options = {
      originPlaceId,
      destinationPlaceId,
      dateRequired: dateRequired ? new Date(dateRequired) : undefined,
    }

    const response = await this.quotesService.checkAvailability(options)

    if (!response.ok) return { ok: false, error: response.error }

    return { ok: true, data: { placeId: originPlaceId, destinationPlaceId, date: dateRequired } }
  }
}
