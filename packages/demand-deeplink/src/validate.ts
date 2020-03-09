import isUndefined from 'lodash/isUndefined'
import negate from 'lodash/negate'
import { codes, getError } from './errors'
import {
  DeeplinkData,
  JourneyLeg,
  PassengerInfo,
  ValidationResponse,
  ValidationError,
  Dictionary,
} from './types'

const isNotEmptyString = (value: any) => typeof value === 'string' && !!value.trim() // eslint-disable-line
const isPositiveInteger = (value: any) => typeof value === 'number' && !isNaN(value) && value % 1 === 0 && value > 0 // eslint-disable-line
const isObject = (value: any) => Object.prototype.toString.call(value) === '[object Object]' // eslint-disable-line

function validateMeta(data: Dictionary<string>, fieldName = 'meta') {
  if (!isObject(data)) {
    return [getError(codes.DP005, fieldName)]
  }

  return Object.keys(data).reduce(
    (errors, key) =>
      isNotEmptyString(data[key]) ? errors : [...errors, getError(codes.DP005, `${fieldName}.${key}`)],
    [] as ValidationError[]
  )
}

function validatePassengerInfo(data: PassengerInfo) {
  const fieldName = 'passengerInfo'

  if (!isObject(data)) {
    return [getError(codes.DP005, fieldName)]
  }

  return (Object.keys(data) as Array<keyof PassengerInfo>).reduce((errors, key) => {
    const validator = key === 'passengers' || key === 'luggage' ? isPositiveInteger : isNotEmptyString

    !isUndefined(data[key]) &&
      !validator(data[key]) &&
      errors.push(getError(codes.DP005, `${fieldName}.${key}`))

    return errors
  }, [] as ValidationError[])
}

function validateTravellerLocale(locale?: string) {
  return !locale || /^[a-z]{2}-[a-z]{2}$/i.test(locale) ? [] : [getError(codes.DP003, 'travellerLocale')]
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

function validatePickupDate(date?: string) {
  const regexp = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/

  return date && regexp.test(date) ? [] : [getError(codes.DP001, 'pickupDate')]
}

export function validateLeg(leg: JourneyLeg, path: string) {
  if (!isObject(leg)) {
    return [getError(codes.DP005, path)]
  }

  const errors = []

  const pickUpFields = [leg.pickup, leg.pickupPlaceId, leg.pickupKpoi].filter(negate(isUndefined)) as string[]

  const dropoffFields = [leg.dropoff, leg.dropoffPlaceId, leg.dropoffKpoi].filter(
    negate(isUndefined)
  ) as string[]

  if (!pickUpFields.length && !dropoffFields.length) {
    errors.push(getError(codes.DP001, path))
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
    collectErrors(validatePickupDate(leg.pickupDate))
  }

  dropoffFields.length && collectErrors(validateRoute(dropoffFields, 'dropoff'))
  leg.passengerInfo && collectErrors(validatePassengerInfo(leg.passengerInfo))
  leg.meta && collectErrors(validateMeta(leg.meta))
  leg.pickupMeta && collectErrors(validateMeta(leg.pickupMeta, 'pickupMeta'))
  leg.dropoffMeta && collectErrors(validateMeta(leg.dropoffMeta, 'dropoffMeta'))

  return errors
}

export function validate(deeplinkData: DeeplinkData): ValidationResponse {
  const errors = []
  const { legs, passengerInfo, travellerLocale, meta, customFields } = deeplinkData

  if (!Array.isArray(legs) || !legs.length) {
    errors.push(getError(codes.DP001, 'legs'))
  }

  Array.isArray(legs) && legs.forEach((leg, index) => errors.push(...validateLeg(leg, `legs.${index}`)))
  errors.push(...validatePassengerInfo(passengerInfo))
  errors.push(...validateTravellerLocale(travellerLocale))
  errors.push(...validateMeta(meta))
  customFields && errors.push(...validateMeta(customFields, 'customFields'))

  return errors.length ? { ok: false, errors } : { ok: true }
}
