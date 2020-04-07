export type ApiError = {
  code?: string
  message: string
}

type HttpResponsePayload = {
  status: number
}

export type HttpResponseOk<T> = HttpResponsePayload & {
  ok: true
  body: T
}

export type HttpResponseError<T> = HttpResponsePayload & {
  ok: false
  error: T
}

export type HttpResponse<T, TError = ApiError> = HttpResponseOk<T> | HttpResponseError<TError>

export type Query = Record<string, string | number>

export type RequestOptions = Omit<RequestInit, 'window'> & {
  method: string
  headers?: Record<string, string>
}

export type DefaultRequestOptions = Omit<RequestOptions, 'body' | 'method' | 'signal'>

export interface Http {
  get<T>(url: string, query?: Query): Promise<HttpResponse<T>>
  post<T>(url: string, body: object): Promise<HttpResponse<T>>
  put<T>(url: string, body: object): Promise<HttpResponse<T>>
  remove<T>(url: string): Promise<HttpResponse<T>>
}

export type LocationAddressDetailsParameters = {
  placeId: string
  sessionToken?: string
}

export type LocationAddressAutocompleteParams = {
  query: string
  position?: {
    latitude: number
    longitude: number
  }
  radius?: number
  sessionToken?: string
}

export type PoiSearchParams = {
  paginationRowCount: number
  paginationOffset: number
  searchTerm?: string
  searchKey?: string
}

export type QuotesAvailabilityParams = {
  originPlaceId: string
  destinationPlaceId?: string
  dateRequired?: string
}

type LatLng = {
  latitude: number
  longitude: number
}

type MeetingPointType = 'DEFAULT' | 'PICK_UP' | 'DROP_OFF' | 'MEET_AND_GREET' | 'CURB_SIDE' | 'STAND_BY'

type LocationPOIType = 'NOT_SET_POI_TYPE' | 'ENRICHED' | 'REGULATED' | 'NEAREST'

type LocationDetailsType =
  | 'NOT_SET_DETAILS_TYPE'
  | 'AIRPORT'
  | 'TRAIN_STATION'
  | 'METRO_STATION'
  | 'PORT'
  | 'HOTEL'
  | 'OTHER'

export type LocationAddressDetailsResponse = {
  place_id: string
  address?: {
    display_address: string
    line_1: string
    line_2?: string
    building_number?: string
    street_name?: string
    city: string
    postal_code?: string
    postal_code_ext?: string
    region?: string
    country_code?: string
  }
  position?: LatLng
  poi_type?: LocationPOIType
  time_zone?: string
  current_local_time?: string
  details?: {
    iata?: string
    terminal?: string
    type?: LocationDetailsType
  }
  meeting_point?: {
    position: LatLng
    instructions?: string
    type: 'NOT_SET' | MeetingPointType
  }
}

export type LocationAddressAutocompleteResponseItem = {
  place_id: string
  display_address: string
  type?: LocationDetailsType
}

export type LocationAddressAutocompleteResponse = {
  locations: LocationAddressAutocompleteResponseItem[]
}

type POIType = 'ENRICHED' | 'UNSET' | 'REGULATED' | 'NEAREST'
type POIDetailsType =
  | 'UNSPECIFIED'
  | 'AIRPORT'
  | 'TRAIN_STATION'
  | 'METRO_STATION'
  | 'PORT'
  | 'HOTEL'
  | 'OTHER'

export type PoiResponse = {
  id?: string
  address: {
    building_number?: string
    city?: string
    country_code?: string
    display_address?: string
    line_1?: string
    line_2?: string
    postal_code?: string
    postal_code_ext?: string
    region?: string
    street_name?: string
  }
  description?: string
  details: {
    dispatch_id?: string
    external_id?: string
    fleet_id?: string
    iata?: string
    terminal?: string
    type?: POIDetailsType
  }
  geojson: string
  is_valid?: boolean
  meeting_points: {
    id?: string
    instructions?: string
    position: LatLng
    type: MeetingPointType
  }[]
  name: string
  position: LatLng
  search_keys?: string[]
  type?: POIType
}

export type PoiSearchResponse = {
  pois?: PoiResponse[]
}

export type QuotesAvailabilityResponse = {
  availabilities?: {
    availability_id?: string
    fleet_id?: string
    vehicle_class?: string
    supplier_name?: string
    logo_url?: string
    description?: string
    phone_number?: string
    rating?: number
    terms_conditions_url?: string
    category_name?: string
    integrated_fleet?: boolean
  }[]
  categories?: string[]
}
