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
}>

export type DeeplinkData = {
  legs: JourneyLeg[]
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

export type RequestOptions = Omit<RequestInit, 'window'> & {
  method: string
  headers?: Record<string, string>
}

export type DefaultRequestOptions = Omit<RequestOptions, 'body' | 'method' | 'signal'>

export type DeeplinkOptions = {
  url: string
  getDefaultRequestOptions: () => DefaultRequestOptions
}

type PickupField = 'pickup' | 'pickupKpoi' | 'pickupPlaceId'
type DropoffField = 'dropoff' | 'dropoffKpoi' | 'dropoffPlaceId'
export type PlaceField = PickupField | DropoffField

type ResolveError = {
  ok: false
  error: {
    code?: string
    message: string
  }
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

export type ResolvePlaceResult = ResolvePlace | ResolveError

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

export type ResolveAvailabilityResult = ResolveAvailability | ResolveError

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

// ---------------------------------------------------------
// TODO: This is temporary API responses that are not full
// They should be moved outside of this package

export type LocationAddressDetailsResponse = {
  place_id: string
  address?: {
    display_address: string
  }
}

export type PoiResponse = {
  id?: string
  address: {
    display_address: string
  }
}

export type PoiSearchResponse = {
  pois?: PoiResponse[]
}

export type QuotesAvailabilityResponse = {
  availabilities?: [{ availability_id?: string }]
  categories?: string[]
}
