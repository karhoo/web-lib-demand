import { LatLng, MeetingPointType, CommonDetailsType, CommonPoiType } from '../sharedTypes'
import { HttpResponse } from '../http/types'

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

export type LocationPoiType = 'NOT_SET_POI_TYPE' | CommonPoiType
export type LocationDetailsType = 'NOT_SET_DETAILS_TYPE' | CommonDetailsType

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
  poi_type?: LocationPoiType
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

export interface Locations {
  getAddressDetails(
    params: LocationAddressDetailsParameters
  ): Promise<HttpResponse<LocationAddressDetailsResponse>>
  getAddressAutocompleteData(
    params: LocationAddressAutocompleteParams
  ): Promise<HttpResponse<LocationAddressAutocompleteResponse>>
}
