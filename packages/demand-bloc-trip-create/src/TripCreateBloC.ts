import { Locations } from '@karhoo/demand-api'
import {
  TripCreateModule,
  TripCreateModuleOptions,
  TripCreateBlocOptions,
  TripCreateModuleFields,
  TripCreateFieldTypes,
  TripCreateAutocompleteField,
  TripCreateField,
} from './types'
import { AutocompleteBloc } from './AutocompleteBloc'
import { FieldBloc } from './FieldBloc'

const defaultOptions = {
  minLengthToSearch: 3,
  autocompleteDebounceTime: 500,
  autocompleteLocationRadius: 1100000,
}

export class TripCreateBloC implements TripCreateModule {
  private locationService: Locations
  private options: TripCreateModuleOptions

  private fields: TripCreateModuleFields = {}

  constructor(locationService: Locations, options: TripCreateBlocOptions) {
    this.locationService = locationService

    this.options = Object.assign({}, options, defaultOptions)
  }

  private getFieldInstance(
    type = TripCreateFieldTypes.GENERIC
  ): TripCreateAutocompleteField | TripCreateField {
    if (type === TripCreateFieldTypes.AUTOCOMPLETE) {
      return new AutocompleteBloc(this.locationService, this.options)
    }

    return new FieldBloc()
  }

  getStream(fieldName: string, type: TripCreateFieldTypes) {
    if (!this.fields[fieldName]) {
      this.fields[fieldName] = this.getFieldInstance(type)
    }

    return this.fields[fieldName]
  }
}
