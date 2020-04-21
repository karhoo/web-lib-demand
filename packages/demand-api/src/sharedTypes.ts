export type LatLng = {
  latitude: number
  longitude: number
}

export type MeetingPointType =
  | 'DEFAULT'
  | 'PICK_UP'
  | 'DROP_OFF'
  | 'MEET_AND_GREET'
  | 'CURB_SIDE'
  | 'STAND_BY'

export type CommonDetailsType = 'AIRPORT' | 'TRAIN_STATION' | 'METRO_STATION' | 'PORT' | 'HOTEL' | 'OTHER'

export type CommonPoiType = 'ENRICHED' | 'REGULATED' | 'NEAREST'

export type VehicleAttributes = Partial<{
  child_seat: boolean
  electric: boolean
  hybrid: boolean
  luggage_capacity: number
  passenger_capacity: number
}>
