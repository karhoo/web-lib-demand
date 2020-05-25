export type LatLng = {
  latitude: number
  longitude: number
}

export enum MeetingPointTypes {
  DEFAULT = 'DEFAULT',
  PICK_UP = 'PICK_UP',
  DROP_OFF = 'DROP_OFF',
  MEET_AND_GREET = 'MEET_AND_GREET',
  CURB_SIDE = 'CURB_SIDE',
  STAND_BY = 'STAND_BY',
}

export enum PlaceDetailTypes {
  AIRPORT = 'AIRPORT',
  TRAIN_STATION = 'TRAIN_STATION',
  METRO_STATION = 'METRO_STATION',
  PORT = 'PORT',
  HOTEL = 'HOTEL',
  OTHER = 'OTHER',
}

export enum PoiTypes {
  ENRICHED = 'ENRICHED',
  REGULATED = 'REGULATED',
  NEAREST = 'NEAREST',
}

export type MeetingPointType = keyof typeof MeetingPointTypes

export type CommonDetailsType = keyof typeof PlaceDetailTypes

export type CommonPoiType = keyof typeof PoiTypes

export type VehicleAttributes = Partial<{
  child_seat: boolean
  electric: boolean
  hybrid: boolean
  luggage_capacity: number
  passenger_capacity: number
}>
