import { getValidationSchema, dropoffSelectedKey, pickupSelectedKey } from './TripCreateForm'
import { dataToValidate } from './mockDataToValidate'
import { TripCreateFormFields } from './types'
import dayjs from 'dayjs'

const params = {
  minLengthToSearch: 3,
  autocompleteDebounceTime: 1000,
  autocompleteLocationRadius: 20000,
  maxLengthForFlightAndTrainNumber: 6,
}

describe('validationSchema', () => {
  it('should return true if all fields are valid', () => {
    const validationSchema = getValidationSchema(params)
    expect(validationSchema.isValidSync(dataToValidate)).toEqual(true)
  })

  it('should allow empty date and time if it is asap booking', () => {
    const validationSchema = getValidationSchema(params)

    expect(
      validationSchema.isValidSync({
        ...dataToValidate,
        [TripCreateFormFields.IS_ASAP_BOOKING]: true,
        [TripCreateFormFields.PICKUP_DATE]: undefined,
        [TripCreateFormFields.PICKUP_TIME]: '',
      })
    ).toEqual(true)
  })

  it.each`
    key                              | condition                                                    | value
    ${'PICKUP'}                      | ${'is undefined'}                                            | ${{ [TripCreateFormFields.PICKUP]: undefined }}
    ${'DROPOFF'}                     | ${'is undefined'}                                            | ${{ [TripCreateFormFields.DROPOFF]: undefined }}
    ${'TRAIN_NUMBER'}                | ${'is not a string'}                                         | ${{ [TripCreateFormFields.TRAIN_NUMBER]: {} }}
    ${'TRAIN_NUMBER'}                | ${`is more than ${params.maxLengthForFlightAndTrainNumber}`} | ${{ [TripCreateFormFields.TRAIN_NUMBER]: Math.random().toString(36) }}
    ${'FLIGHT_NUMBER'}               | ${'is not a string'}                                         | ${{ [TripCreateFormFields.FLIGHT_NUMBER]: {} }}
    ${'FLIGHT_NUMBER'}               | ${`is more than ${params.maxLengthForFlightAndTrainNumber}`} | ${{ [TripCreateFormFields.FLIGHT_NUMBER]: Math.random().toString(36) }}
    ${''}                            | ${'pickup and dropoff addresses are the same'}               | ${{ [dropoffSelectedKey]: dataToValidate[pickupSelectedKey] }}
    ${'PICKUP_DATE'}                 | ${'is missing and IS_ASAP_BOOKING is false'}                 | ${{ [TripCreateFormFields.PICKUP_DATE]: undefined }}
    ${'PICKUP_TIME'}                 | ${'is missing and IS_ASAP_BOOKING is false'}                 | ${{ [TripCreateFormFields.PICKUP_TIME]: undefined }}
    ${'PICKUP_TIME'}                 | ${'is not a string'}                                         | ${{ [TripCreateFormFields.PICKUP_TIME]: new Date() }}
    ${'PICKUP_DATE and PICKUP_TIME'} | ${'is in the past'} | ${{ [TripCreateFormFields.PICKUP_DATE]: dayjs()
    .subtract(1, 'd')
    .format() }}
    ${'PICKUP_DATE and PICKUP_TIME'} | ${'is not in less than 29 minutes'}                          | ${{ [TripCreateFormFields.PICKUP_DATE]: dayjs().format(), [TripCreateFormFields.PICKUP_TIME]: dayjs().format('HH:mm') }}
  `('should return false if $key $condition', ({ value }) => {
    const validationSchema = getValidationSchema(params)

    expect(
      validationSchema.isValidSync({
        ...dataToValidate,
        ...value,
      })
    ).toEqual(false)
  })
})
