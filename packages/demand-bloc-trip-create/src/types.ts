import { Observable } from 'rxjs'
import { Asserts } from 'yup'
import { LocationDetailsType, LatLng, MeetingPointType, LocationPoiType, Locations } from '@karhoo/demand-api'

export type TripCreateBlocOptions = {
  minLengthToSearch?: number
  autocompleteDebounceTime?: number
  autocompleteLocationRadius?: number
  defaultUserPosition?: LatLng
}

export type TripCreateModuleOptions = {
  minLengthToSearch: number
  autocompleteDebounceTime: number
  autocompleteLocationRadius: number
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

export interface TripCreateAutocompleteField {
  query: Observable<string>
  selectedAddress: Observable<AutocompleteDetails>
  results: Observable<AutocompleteItem[]>

  onChange(value: string): void
  onSelect(value: string): void
  prefill(value: PrefillAutocompleteFieldValue): void
  dispose(): void
}

export interface TripCreateField {
  query: Observable<string>

  onChange(value: string): void
  prefill(value: string): void
  dispose(): void
}

export type TripCreateModuleFields = {
  [key: string]: TripCreateAutocompleteField | TripCreateField
}

export enum TripCreateFieldTypes {
  AUTOCOMPLETE = 'AUTOCOMPLETE',
  GENERIC = 'GENERIC',
}

export interface TripCreateModule {
  dispose(): void

  values: Observable<any>
  createStream(fieldName: string, schema: FormSchemaValue): void | Error
  getStream(fieldName: string): TripCreateAutocompleteField | TripCreateField
}

////

export enum TripCreateFormFields {
  PICKUP = 'PICKUP',
  DROPOFF = 'DROPOFF',
  TRAIN_NUMBER = 'TRAIN_NUMBER'
}

export type FormSchemaValue = {
  type: keyof typeof TripCreateFieldTypes,
  locationService?: Locations
  options: TripCreateModuleOptions
}

export type FormSchema = {
  [K: string]: FormSchemaValue
}

// export type FormValidationSchema = {
//   [K: string]: Asserts
// }


