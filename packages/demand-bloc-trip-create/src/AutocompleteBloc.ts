import {
  Locations,
  LocationAddressAutocompleteResponseItem,
  LocationAddressDetailsResponse,
} from '@karhoo/demand-api'
import { v4 as uuid } from 'uuid'
import camelcaseKeys from 'camelcase-keys'

import { Subject, BehaviorSubject, of } from 'rxjs'
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators'
import {
  TripCreateModuleOptions,
  TripCreateAutocompleteField,
  AutocompleteItem,
  AutocompleteDetails,
} from './types'
import { createStream } from './createStream'

const defaultAutocompleteData: AutocompleteItem[] = []

const locationItemTransformer = (item: LocationAddressAutocompleteResponseItem) => ({
  type: item.type,
  placeId: item.place_id,
  displayAddress: item.display_address,
})

const placeDetailsTransformer = (item: LocationAddressDetailsResponse) =>
  (camelcaseKeys(item, { deep: true }) as unknown) as AutocompleteDetails

export class AutocompleteBloc implements TripCreateAutocompleteField {
  private locationService: Locations
  private options: TripCreateModuleOptions

  private sessionToken = uuid()

  private query$ = new BehaviorSubject<string>('')
  private selectedAddress$ = new Subject<AutocompleteDetails>()

  constructor(locationService: Locations, options: TripCreateModuleOptions) {
    this.locationService = locationService
    this.options = options
  }

  get query() {
    return createStream(this.query$)
  }

  get selectedAddress() {
    return createStream(this.selectedAddress$)
  }

  get results() {
    const { minLengthToSearch, autocompleteDebounceTime } = this.options
    const isValidLength = (text: string) => text.length > minLengthToSearch

    return this.query.pipe(
      debounceTime(autocompleteDebounceTime),
      distinctUntilChanged(),
      switchMap(val =>
        isValidLength(val) ? this.getAddressAutocompleteData(val) : of(defaultAutocompleteData)
      )
    )
  }

  onChange(value: string) {
    this.query$.next(value)
  }

  async onSelect(placeId: string) {
    const data = await this.locationService.getAddressDetails({ placeId, sessionToken: this.sessionToken })

    if (data.ok) {
      this.selectedAddress$.next(placeDetailsTransformer(data.body))
      this.regenerateSessionToken()
    }
  }

  dispose() {
    this.query$.complete()
    this.selectedAddress$.complete()
  }

  private regenerateSessionToken() {
    this.sessionToken = uuid()
  }

  private getAddressAutocompleteData(query: string): Promise<AutocompleteItem[]> {
    return this.locationService
      .getAddressAutocompleteData({
        query,
        sessionToken: this.sessionToken,
        radius: this.options.autocompleteLocationRadius,
        position: this.options.defaultUserPosition,
      })
      .then(response => {
        if (!response.ok) {
          return defaultAutocompleteData
        }

        return response.body.locations.map(locationItemTransformer)
      })
  }
}
