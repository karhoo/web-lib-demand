import isUndefined from 'lodash/isUndefined'
import {
  expectedTimeFormatRegexp,
  timezoneRegexp,
  travellerLocaleRegexp,
  passengerParameter,
  luggageParameter,
} from './constants'
import { isNotEmptyString, isObject, isPositiveInteger, excludeUndefined } from './utils'
import { codes, getError } from './errors'
import {
  DeeplinkData,
  JourneyLeg,
  PassengerInfo,
  ValidationResponse,
  ValidationError,
  Dictionary,
} from './types'

const devIsObjectCheck = (data: object, fieldName: string) => {
  if (!isObject(data)) {
    throw new Error(`${fieldName} must be plain object`)
  }
}

function validateMeta(data: Dictionary<string>, fieldName = 'meta') {
  if (process.env.NODE_ENV !== 'production') {
    devIsObjectCheck(data, fieldName)
  }

  return Object.keys(data).reduce(
    (errors, key) =>
      isNotEmptyString(data[key]) ? errors : [...errors, getError(codes.DP005, `${fieldName}.${key}`)],
    [] as ValidationError[]
  )
}

function validatePassengerInfo(data: PassengerInfo) {
  const fieldName = 'passengerInfo'

  if (process.env.NODE_ENV !== 'production') {
    devIsObjectCheck(data, fieldName)
  }

  return (Object.keys(data) as Array<keyof PassengerInfo>).reduce((errors, key) => {
    const validator =
      key === passengerParameter || key === luggageParameter ? isPositiveInteger : isNotEmptyString

    !isUndefined(data[key]) &&
      !validator(data[key]) &&
      errors.push(getError(codes.DP005, `${fieldName}.${key}`))

    return errors
  }, [] as ValidationError[])
}

function validateTravellerLocale(locale?: string) {
  return isUndefined(locale) || travellerLocaleRegexp.test(locale)
    ? []
    : [getError(codes.DP003, 'travellerLocale')]
}

function validateRoute(fields: string[], fieldName: string) {
  const errors = []

  if (!fields.filter(isNotEmptyString).length) {
    errors.push(getError(codes.DP005, fieldName))
  }

  if (fields.length > 1) {
    errors.push(getError(codes.DP002, fieldName))
  }

  return errors
}

function validatePickupTime(time?: string) {
  const fieldName = 'pickupTime'

  if (!time) {
    return [getError(codes.DP001, fieldName)]
  }

  const errors = expectedTimeFormatRegexp.test(time) ? [] : [getError(codes.DP003, fieldName)]

  return timezoneRegexp.test(time) ? errors : errors.concat([getError(codes.DP004, fieldName)])
}

export function validateLeg(leg: JourneyLeg, path: string) {
  const errors = []
  const pickUpFields = excludeUndefined([leg.pickup, leg.pickupPlaceId, leg.pickupKpoi])
  const dropoffFields = excludeUndefined([leg.dropoff, leg.dropoffPlaceId, leg.dropoffKpoi])

  if (!pickUpFields.length && !dropoffFields.length) {
    errors.push(getError(codes.DP001, path))
  } else if (pickUpFields[0] === dropoffFields[0]) {
    errors.push(getError(codes.DP006, path))
  }

  const collectErrors = (currentErrors: ValidationError[]) =>
    errors.push(
      ...currentErrors.map(item => {
        item.path = `${path}.${item.path}`
        return item
      })
    )

  if (pickUpFields.length) {
    collectErrors(validateRoute(pickUpFields, 'pickup'))
    collectErrors(validatePickupTime(leg.pickupTime))
  } else if (!isUndefined(leg.pickupTime)) {
    collectErrors([getError(codes.DP009, 'pickupTime')])
  }

  dropoffFields.length && collectErrors(validateRoute(dropoffFields, 'dropoff'))
  !isUndefined(leg.passengerInfo) && collectErrors(validatePassengerInfo(leg.passengerInfo))
  !isUndefined(leg.meta) && collectErrors(validateMeta(leg.meta))
  !isUndefined(leg.pickupMeta) && collectErrors(validateMeta(leg.pickupMeta, 'pickupMeta'))
  !isUndefined(leg.dropoffMeta) && collectErrors(validateMeta(leg.dropoffMeta, 'dropoffMeta'))

  return errors
}

export function validate(deeplinkData: DeeplinkData): ValidationResponse {
  const errors = []
  const { legs, passengerInfo, travellerLocale, meta, customFields } = deeplinkData

  if (legs.length) {
    legs.forEach((leg, index) => errors.push(...validateLeg(leg, `legs.${index}`)))
  } else {
    errors.push(getError(codes.DP001, 'legs'))
  }

  errors.push(
    ...validatePassengerInfo(passengerInfo),
    ...validateTravellerLocale(travellerLocale),
    ...validateMeta(meta)
  )

  !isUndefined(customFields) && errors.push(...validateMeta(customFields, 'customFields'))

  return errors.length ? { ok: false, errors } : { ok: true }
}
