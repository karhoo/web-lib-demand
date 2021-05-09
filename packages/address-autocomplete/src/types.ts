import { LocationDetailsType, LatLng, MeetingPointType, LocationPoiType } from '@karhoo/demand-api'

export type TripCreateModuleOptions = {
  minLengthToSearch: number
  autocompleteDebounceTime: number
  autocompleteLocationRadius: number
  maxLengthForFlightAndTrainNumber: number
  defaultUserPosition?: LatLng
}

export type AutocompleteItem = {
  type?: LocationDetailsType
  placeId: string
  displayAddress: string
}

export type AutocompleteDetails = {
  placeId: string
  address?: {
    displayAddress: string
    line1: string
    line2?: string
    buildingNumber?: string
    streetName?: string
    city: string
    postalCode?: string
    postalCodeExt?: string
    region?: string
    countryCode?: string
  }
  position?: LatLng
  poiType?: LocationPoiType
  timeZone?: string
  currentLocalTime?: string
  details?: {
    iata?: string
    terminal?: string
    type?: LocationDetailsType
  }
  meetingPoint?: {
    position: LatLng
    instructions?: string
    type: 'NOT_SET' | MeetingPointType
  }
}
