import { Locations } from '@karhoo/demand-api'
import yup from 'yup'
import { TripCreateBlocOptions, TripCreateFieldTypes, TripCreateFormFields } from './types'
import { Form } from './Form'

const defaultOptions = {
  minLengthToSearch: 3,
  autocompleteDebounceTime: 500,
  autocompleteLocationRadius: 1100000,
}

export class TripCreateForm {
  static create(locationService: Locations, options?: TripCreateBlocOptions) {
    const mergedOptions = Object.assign({}, options, defaultOptions)

    const formSchema = {
      [TripCreateFormFields.PICKUP]: {
        type: TripCreateFieldTypes.AUTOCOMPLETE,
        locationService,
        options: mergedOptions,
      },
      [TripCreateFormFields.DROPOFF]: {
        locationService,
        type: TripCreateFieldTypes.AUTOCOMPLETE,
        options: mergedOptions,
      },
      [TripCreateFormFields.TRAIN_NUMBER]: {
        type: TripCreateFieldTypes.GENERIC,
        // TODO: fix type to not have this fields if type is Generic
        locationService,
        options: mergedOptions,
      },
    }

    const validationSchema = yup.object({
      [TripCreateFormFields.PICKUP]: yup
        .string()
        .min(mergedOptions.minLengthToSearch)
        .required(),
      [TripCreateFormFields.DROPOFF]: yup
        .string()
        .min(mergedOptions.minLengthToSearch)
        .required(),
      [TripCreateFormFields.TRAIN_NUMBER]: yup.string(),
    })

    return new Form(formSchema, validationSchema)
  }
}
