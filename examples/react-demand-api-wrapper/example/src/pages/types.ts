import { TripCreateAutocompleteField, TripCreateField } from "@karhoo/demand-bloc-trip-create";

export interface FormData {
    pickup: TripCreateAutocompleteField
    dropoff: TripCreateAutocompleteField
    date: TripCreateField
    time: TripCreateField
    passengers: TripCreateField
    luggage: TripCreateField
  }