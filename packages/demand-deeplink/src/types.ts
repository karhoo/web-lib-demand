import {
  HttpResponse,
  LocationAddressDetailsParameters,
  LocationAddressAutocompleteParams,
  LocationAddressDetailsResponse,
  LocationAddressAutocompleteResponse,
  PoiSearchParams,
  PoiSearchResponse,
  PoiResponse,
  QuotesV2SearchParams,
  QuotesV2Response,
  LatLng,
} from '@karhoo/demand-api'

export type Api = {
  locationService: {
    getAddressDetails: (
      params: LocationAddressDetailsParameters
    ) => Promise<HttpResponse<LocationAddressDetailsResponse>>
    getAddressAutocompleteData: (
      params: LocationAddressAutocompleteParams
    ) => Promise<HttpResponse<LocationAddressAutocompleteResponse>>
  }
  poiService: {
    search: (params: PoiSearchParams) => Promise<HttpResponse<PoiSearchResponse>>
  }
  quotesV2Service: {
    quotesSearch: (params: QuotesV2SearchParams) => Promise<HttpResponse<QuotesV2Response>>
  }
}

export type Dictionary<T> = {
  [index: string]: T
}

export type KeyValueList = [string, string][]

export type PassengerInfo = Partial<{
  passengers: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  luggage: number
}>

export type BookingType = 'ASAP' | 'PRE-BOOK' | 'CUSTOM'

export type JourneyLeg = Partial<{
  pickup: string
  pickupKpoi: string
  pickupPlaceId: string
  pickupTime: string
  pickupMeta: Dictionary<string>
  dropoff: string
  dropoffKpoi: string
  dropoffPlaceId: string
  dropoffMeta: Dictionary<string>
  passengerInfo: PassengerInfo
  meta: Dictionary<string>
  bookingType: BookingType
}>

export type DeeplinkData = {
  legs: JourneyLeg[]
  bookingType: BookingType
  passengerInfo: PassengerInfo
  travellerLocale?: string
  meta: Dictionary<string>
  customFields?: Dictionary<string>
}

export type ValidationError = {
  code: string
  path: string
  error: string
}

export type ValidationResponse = {
  ok: boolean
  errors?: ValidationError[]
}

type ResolveError = {
  ok: false
  error: {
    code?: string
    message: string
  }
}

export type ResolvePlace = {
  ok: true
  data: {
    placePosition: LatLng
    displayAddress: string
    placeInfo?: LocationAddressDetailsResponse
    poiInfo?: PoiResponse
  }
}

export type ResolvePlaceResult = ResolvePlace | ResolveError

type ResolvePlaceValue = ResolvePlaceResult & { isPickup: boolean; searchValue: string }

export type ResolveAvailabilityParam = LatLng & { displayAddress: string }

export type ResolveAvailabilityParams = {
  origin: ResolveAvailabilityParam
  destination: ResolveAvailabilityParam
  dateRequired?: string
}

type ResolveAvailability = {
  ok: true
  searchedParams: ResolveAvailabilityParams
}

type ResolveAvailabilityError = ResolveError & { searchedParams?: ResolveAvailabilityParams }

export type ResolveAvailabilityResult = ResolveAvailability | ResolveAvailabilityError

export type ResolveResponse =
  | {
      done: false
      leg: number
      place?: ResolvePlaceValue
      availability?: ResolveAvailabilityResult
    }
  | {
      done: true
      error?: Error
    }
