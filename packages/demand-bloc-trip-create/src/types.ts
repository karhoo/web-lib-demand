import { Observable } from 'rxjs'
import { LocationDetailsType, LatLng, MeetingPointType, LocationPoiType, Locations } from '@karhoo/demand-api'

export type TripCreateBlocOptions = {
  minLengthToSearch?: number
  autocompleteDebounceTime?: number
  autocompleteLocationRadius?: number
  maxLengthForFlightAndTrainNumber?: number
  defaultUserPosition?: LatLng
}

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

export type PrefillAutocompleteFieldValue = {
  query?: string
  selectedAddress?: AutocompleteDetails
  results?: AutocompleteItem[]
}

export interface TripCreateFieldItem {
  query: Observable<string>
  selectedAddress?: Observable<AutocompleteDetails>
  results?: Observable<AutocompleteItem[]>

  onChange(value: string): void
  onError(value: string): void
  onSelect?: (value: string) => void
  prefill(value: PrefillAutocompleteFieldValue | string): void
  dispose(): void
}

export type TripCreateModuleFields = {
  [key: string]: TripCreateFieldItem
}

export enum TripCreateFieldTypes {
  AUTOCOMPLETE = 'AUTOCOMPLETE',
  GENERIC = 'GENERIC',
}

export interface TripCreateModule {
  dispose(): void

  values: Observable<object>
  createStream(fieldName: string, schema: FormSchemaValue): void | Error
  getStream(fieldName: string): TripCreateFieldItem
}

export enum TripCreateFormFields {
  PICKUP = 'PICKUP',
  DROPOFF = 'DROPOFF',
  TRAIN_NUMBER = 'TRAIN_NUMBER',
  FLIGHT_NUMBER = 'FLIGHT_NUMBER',
  PICKUP_DATE = 'PICKUP_DATE',
  PICKUP_TIME = 'PICKUP_TIME',
  IS_ASAP_BOOKING = 'IS_ASAP_BOOKING',
}

export enum PassengerDetailsFormFields {
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
  EMAIL = 'EMAIL',
  PHONE_NUMBER = 'PHONE_NUMBER',
  COMMENT = 'COMMENT',
}

export type FormSchemaValue = {
  type: keyof typeof TripCreateFieldTypes
  locationService?: Locations
  options?: TripCreateModuleOptions
}

export type FormSchema = {
  [K: string]: FormSchemaValue
}

export type ListOfFields = {
  [key: string]: string
}
