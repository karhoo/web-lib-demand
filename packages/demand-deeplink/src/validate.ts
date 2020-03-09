import isUndefined from 'lodash/isUndefined'
import identity from 'lodash/identity'
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

function validateMeta(data: Dictionary<string>) {
  if (!isObject(data)) {
    return [getError(codes.DP005, 'meta')] // TODO: fix name
  }

  return Object.keys(data).reduce(
    (errors, key) => (isNotEmptyString(data[key]) ? [...errors, getError(codes.DP005, key)] : errors),
    [] as ValidationError[]
  )
}

function validatePassengerInfo(data: PassengerInfo) {
  if (!isObject(data)) {
    return [getError(codes.DP005, 'passengerInfo')]
  }

  return (Object.keys(data) as Array<keyof PassengerInfo>).reduce((errors, key) => {
    const validator = key === 'passengers' || key === 'luggage' ? isPositiveInteger : isNotEmptyString

    !isUndefined(data[key]) && !validator(data[key]) && errors.push(getError(codes.DP005, key))

    return errors
  }, [] as ValidationError[])
}

function validateTravellerLocale(locale?: string) {
  return !locale || /^[a-z]{2}-[a-z]{2}$/i.test(locale) ? [] : [getError(codes.DP003, 'travellerLocale')]
}

function validateRoute(fields: string[]) {
  const errors = []

  if (!fields.filter(isNotEmptyString).length) {
    errors.push(getError(codes.DP005, 'pickup')) // TODO: fix fields
  }

  if (fields.length > 1) {
    errors.push(getError(codes.DP002, 'pickup'))
  }

  return errors
}

function validatePickupDate(date?: string) {
  const errors = [] // TODO: validate date string

  if (!isNotEmptyString(date)) {
    errors.push(getError(codes.DP001, 'pickupDate'))
  }

  return errors
}

function validateLeg(leg: JourneyLeg) {
  if (!isObject(leg)) {
    return [getError(codes.DP005, 'leg')]
  }

  const errors = []
  const pickUpFields = [leg.pickup, leg.pickupPlaceId, leg.pickupKpoi].filter(identity) as string[]
  const dropoffFields = [leg.dropoff, leg.dropoffPlaceId, leg.dropoffKpoi].filter(identity) as string[]

  if (!pickUpFields.length && !dropoffFields.length) {
    errors.push(getError(codes.DP001, 'leg'))
  }

  errors.push(...validateRoute(pickUpFields))
  errors.push(...validateRoute(dropoffFields))
  pickUpFields.length && errors.push(...validatePickupDate(leg.pickupDate))
  leg.passengerInfo && errors.push(...validatePassengerInfo(leg.passengerInfo))
  leg.meta && errors.push(...validateMeta(leg.meta))
  leg.pickupMeta && errors.push(...validateMeta(leg.pickupMeta))
  leg.dropoffMeta && errors.push(...validateMeta(leg.dropoffMeta))

  return errors
}

export function validate(deeplinkData: DeeplinkData): ValidationResponse {
  const errors = []
  const { legs, passengerInfo, travellerLocale, meta, customFields } = deeplinkData

  if (!Array.isArray(legs) || !legs.length) {
    errors.push(getError(codes.DP001, 'legs'))
  }

  legs.forEach(leg => errors.push(...validateLeg(leg)))
  errors.push(...validatePassengerInfo(passengerInfo))
  errors.push(...validateTravellerLocale(travellerLocale))
  meta && errors.push(...validateMeta(meta))
  customFields && errors.push(...validateMeta(customFields))

  return errors.length ? { ok: false, errors } : { ok: true }
}
