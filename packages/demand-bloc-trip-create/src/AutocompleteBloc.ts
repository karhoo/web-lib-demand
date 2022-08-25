import {
  Locations,
  LocationAddressAutocompleteResponseItem,
  LocationAddressDetailsResponse,
} from '@karhoo/demand-api'
import { v4 as uuid } from 'uuid'

import { BehaviorSubject, Subject } from 'rxjs'
import { debounceTime, switchMap, map, filter } from 'rxjs/operators'
import { AutocompleteItem, AutocompleteDetails, TripCreateModuleOptions } from './types'
import { deepMapKeys, snakeToCamel, createStream } from './utils'
import { defaultAutocompleteOptions } from './constants'

const defaultAutocompleteData: AutocompleteItem[] = []

const locationItemTransformer = (item: LocationAddressAutocompleteResponseItem) => ({
  type: item.type,
  placeId: item.place_id,
  displayAddress: item.display_address,
})

const placeDetailsTransformer = (item: LocationAddressDetailsResponse) =>
  deepMapKeys(item, snakeToCamel) as AutocompleteDetails

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

  constructor(locationService: Locations, options: TripCreateModuleOptions) {
    this.locationService = locationService
    this.options = {
      ...defaultAutocompleteOptions,
      ...options,
    }
  }

  get query() {
    return createStream(this.query$).pipe(map(query => query.value))
  }

  get selectedAddress() {
    return createStream(this.selectedAddress$)
  }

  get error() {
    return createStream(this.error$)
  }

  get results() {
    return this.getFetchedResults()
  }

  private getFetchedResults() {
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
    } else {
      this.onError(data?.error?.message || 'locationService.getAddressDetails error')
    }
  }

  dispose() {
    this.query$.complete()
    this.selectedAddress$.complete()
    this.error$.complete()
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
