import {
  HttpResponse,
  LocationAddressDetailsParameters,
  LocationAddressAutocompleteParams,
  LocationAddressDetailsResponse,
  LocationAddressAutocompleteResponse,
  PoiSearchParams,
  PoiSearchResponse,
  PoiResponse,
  QuoteCoverageParams,
  QuotesV2CoverageResponse,
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
    getReverseGeocode: (params: LatLng) => Promise<HttpResponse<LocationAddressDetailsResponse>>
  }
  poiService: {
    search: (params: PoiSearchParams) => Promise<HttpResponse<PoiSearchResponse>>
  }
  quotesV2Service: {
    checkCoverage: (params: QuoteCoverageParams) => Promise<HttpResponse<QuotesV2CoverageResponse>>
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

export type Position = {
  lat: number | undefined
  lng: number | undefined
}

export type JourneyLeg = Partial<{
  pickup: string
  pickupKpoi: string
  pickupPlaceId: string
  pickupPosition: Position
  pickupTime: string
  pickupMeta: Dictionary<string>
  dropoff: string
  dropoffKpoi: string
  dropoffPlaceId: string
  dropoffPosition: Position
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

// to relax specific validation extend ValidationOptions with allowXYZ property where XYZ is specific rule
export type ValidationOptions = {
  /**
   * If `false`, non of the field will be required and validation will be applied to present fields.
   * Default true
   */
  strict?: boolean
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
    placeId: string
    placePosition: LatLng
    displayAddress: string
    placeInfo?: LocationAddressDetailsResponse
    poiInfo?: PoiResponse
  }
}

export type ResolvePlaceResult = ResolvePlace | ResolveError

type ResolvePlaceValue = ResolvePlaceResult & { isPickup: boolean; searchValue: string }

export type ResolveAvailabilityParams = QuoteCoverageParams

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
