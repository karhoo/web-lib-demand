import { Locations } from '@karhoo/demand-api'
import dayjs from 'dayjs'
import * as yup from 'yup'
import {
  TripCreateBlocOptions,
  TripCreateFieldTypes,
  TripCreateFormFields,
  TripCreateModuleOptions,
} from './types'
import { Form } from './Form'
import { isDateTimeInFuture } from './tripCreateValidators'
import { defaultTripCreateOptions } from './constants'

export const dropoffSelectedKey = `${TripCreateFormFields.DROPOFF}.selectedAddress`
export const pickupSelectedKey = `${TripCreateFormFields.PICKUP}.selectedAddress`

export const getValidationSchema = (options: TripCreateModuleOptions) => {
  const locationValidationSchema = yup
    .object()
    .shape({
      placeId: yup.string().required(),
      address: yup.object().shape({
        displayAddress: yup.string().required(),
      }),
      timeZone: yup.string().required(),
    })
    .required()

  return yup
    .object({
      [TripCreateFormFields.PICKUP]: yup
        .string()
        .min(options.minLengthToSearch)
        .required(),
      [TripCreateFormFields.DROPOFF]: yup
        .string()
        .min(options.minLengthToSearch)
        .required(),
      [dropoffSelectedKey]: locationValidationSchema,
      [pickupSelectedKey]: locationValidationSchema,
      [TripCreateFormFields.TRAIN_NUMBER]: yup.string().max(options.maxLengthForFlightAndTrainNumber),
      [TripCreateFormFields.FLIGHT_NUMBER]: yup.string().max(options.maxLengthForFlightAndTrainNumber),
      [TripCreateFormFields.PICKUP_DATE]: yup.mixed().when(TripCreateFormFields.IS_ASAP_BOOKING, {
        is: false,
        then: yup
          .date()
          .max(dayjs().add(1, 'year'))
          .required(),
      }),
      [TripCreateFormFields.PICKUP_TIME]: yup.mixed().when(TripCreateFormFields.IS_ASAP_BOOKING, {
        is: false,
        then: yup.string().required(),
      }),
    })
    .test('not-equal-addresses', 'not-equal-addresses', values => {
      return values[pickupSelectedKey].placeId !== values[dropoffSelectedKey].placeId
    })
    .test('date-and-time-must-be-in-future', 'date-and-time-must-be-in-future', values => {
      if (values.IS_ASAP_BOOKING) return true

      return isDateTimeInFuture(
        values[TripCreateFormFields.PICKUP_DATE],
        values[TripCreateFormFields.PICKUP_TIME],
        values[pickupSelectedKey].timeZone || 'Europe/London'
      )
    })
}

export class TripCreateForm {
  static create(locationService: Locations, options?: TripCreateBlocOptions) {
    const mergedOptions = Object.assign({}, options, defaultTripCreateOptions)

    const getFormOptions = (type: TripCreateFieldTypes) => {
      return {
        locationService,
        type,
        options: mergedOptions,
      }
    }

    const formSchema = {
      [TripCreateFormFields.PICKUP]: getFormOptions(TripCreateFieldTypes.AUTOCOMPLETE),
      [TripCreateFormFields.DROPOFF]: getFormOptions(TripCreateFieldTypes.AUTOCOMPLETE),
      [TripCreateFormFields.TRAIN_NUMBER]: getFormOptions(TripCreateFieldTypes.GENERIC),
      [TripCreateFormFields.PICKUP_DATE]: getFormOptions(TripCreateFieldTypes.GENERIC),
      [TripCreateFormFields.PICKUP_TIME]: getFormOptions(TripCreateFieldTypes.GENERIC),
      [TripCreateFormFields.TRAIN_NUMBER]: getFormOptions(TripCreateFieldTypes.GENERIC),
      [TripCreateFormFields.FLIGHT_NUMBER]: getFormOptions(TripCreateFieldTypes.GENERIC),
    }

    return new Form(formSchema, getValidationSchema(mergedOptions))
  }
}
