import {
  Locations,
  LocationAddressAutocompleteResponseItem,
  LocationAddressDetailsResponse,
} from '@karhoo/demand-api'
import { v4 as uuid } from 'uuid'
import camelcaseKeys from 'camelcase-keys'

import { BehaviorSubject, Subject, merge } from 'rxjs'
import { debounceTime, switchMap, map, filter } from 'rxjs/operators'
import { AutocompleteItem, AutocompleteDetails, TripCreateModuleOptions } from './types'
import { createStream } from './createStream'

const defaultAutocompleteData: AutocompleteItem[] = []

const locationItemTransformer = (item: LocationAddressAutocompleteResponseItem) => ({
  type: item.type,
  placeId: item.place_id,
  displayAddress: item.display_address,
})

const placeDetailsTransformer = (item: LocationAddressDetailsResponse) =>
  (camelcaseKeys(item, { deep: true }) as unknown) as AutocompleteDetails

type QueryValueType = {
  value: string
  isPrefill: boolean
}

export class AutocompleteBloc {
  private locationService: Locations
  private options: TripCreateModuleOptions

  private sessionToken = uuid()

  private query$ = new Subject<QueryValueType>()
  private error$ = new BehaviorSubject<string>('')
  private selectedAddress$ = new Subject<AutocompleteDetails>()
  private prefilledResults$ = new Subject<AutocompleteItem[]>()

  constructor(locationService: Locations, options: TripCreateModuleOptions) {
    this.locationService = locationService
    this.options = options
  }

  get query() {
    return createStream(this.query$).pipe(map(query => query.value))
  }

  get selectedAddress() {
    return createStream(this.selectedAddress$)
  }

  get results() {
    return merge(this.getFeatchedResults(), this.prefilledResults$)
  }

  private getFeatchedResults() {
    const { minLengthToSearch = 2, autocompleteDebounceTime } = this.options

    return this.query$.pipe(
      filter(query => !query.isPrefill),
      map(query => query.value),
      filter(query => query.length > minLengthToSearch),
      debounceTime(autocompleteDebounceTime),
      switchMap(val => this.getAddressAutocompleteData(val))
    )
  }

  onChange(value: string) {
    this.query$.next({ value, isPrefill: false })
  }

  onError(error: string) {
    this.error$.next(error)
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
