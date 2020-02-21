import { LatLng, MeetingPointType, CommonDetailsType, CommonPoiType } from '../sharedTypes'

export type PoiSearchParams = {
  paginationRowCount: number
  paginationOffset: number
  searchTerm?: string
  searchKey?: string
}

type POIType = 'UNSET' | CommonPoiType
type POIDetailsType = 'UNSPECIFIED' | CommonDetailsType

export type PoiResponse = {
  id?: string
  address: {
    building_number?: string
    city?: string
    country_code?: string
    display_address: string
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
