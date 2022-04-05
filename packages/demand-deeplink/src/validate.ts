import isUndefined from 'lodash/isUndefined'
import {
  expectedTimeFormatRegexp,
  timezoneRegexp,
  travellerLocaleRegexp,
  passengerParameter,
  luggageParameter,
  trainTimeParameter,
  BookingTypes,
  latitudeRegexp,
  longitudeRegexp,
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
  BookingType,
  Position,
  ValidationOptions,
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

function validateBookingType(
  bookingType: BookingType,
  fieldName = 'bookingType',
  { strict }: ValidationOptions
) {
  if (!strict && !bookingType) {
    return []
  }

  if (bookingType === BookingTypes.ASAP || bookingType === BookingTypes.PREBOOK) {
    return []
  }

  return [getError(codes.DP010, fieldName)]
}

function validateRoute(fields: string[], fieldName: string) {
  const errors: { code: string; path: string; error: string }[] = []

  if (!fields.filter(isNotEmptyString).length) {
    errors.push(getError(codes.DP005, fieldName))
  }

  if (fields.length > 1) {
    errors.push(getError(codes.DP002, fieldName))
  }

  return errors
}

function validatePlace(
  placeFields: string[],
  placePosition: Position | undefined,
  placeFieldsName: string,
  placePositionName: string
) {
  const errors = []

  if (placeFields.length) {
    errors.push(...validateRoute(placeFields, placeFieldsName))
    placePosition && errors.push(getError(codes.DP002, placePositionName))
  }

  if (!placeFields.length && placePosition) {
    errors.push(...validatePosition(placePosition, placePositionName))
  }

  return errors
}

function validateTime(time: string | undefined, fieldName: string, { strict }: ValidationOptions) {
  if (!time) {
    return strict ? [getError(codes.DP001, fieldName)] : []
  }

  const errors = expectedTimeFormatRegexp.test(time) ? [] : [getError(codes.DP003, fieldName)]

  return timezoneRegexp.test(time) ? errors : errors.concat([getError(codes.DP004, fieldName)])
}

function validatePickupTime(
  time: string | undefined,
  bookingType: BookingType,
  { strict }: ValidationOptions
) {
  const errors = []

  if (bookingType === BookingTypes.ASAP && !isUndefined(time)) {
    errors.push(getError(codes.DP011, 'pickupTime'))
  }

  if (bookingType === BookingTypes.PREBOOK) {
    errors.push(...validateTime(time, 'pickupTime', { strict }))
  }

  return errors
}

function validatePosition(position: Position, path: string) {
  const { lat, lng } = position

  return (lat && !latitudeRegexp.test(lat.toString())) ||
    (lng && !longitudeRegexp.test(lng.toString())) ||
    !lat ||
    !lng
    ? [getError(codes.DP012, path)]
    : []
}

export function validateLeg(
  leg: JourneyLeg,
  defaultBookingType: BookingType,
  path: string,
  { strict }: ValidationOptions
) {
  const errors = []

  // TODO: maybe let's exclude all empty: undefined, empty string etc
  const pickUpFields = excludeUndefined([leg.pickup, leg.pickupPlaceId, leg.pickupKpoi])
  const dropoffFields = excludeUndefined([leg.dropoff, leg.dropoffPlaceId, leg.dropoffKpoi])
  const pickupPosition = leg.pickupPosition
  const dropoffPosition = leg.dropoffPosition

  const collectErrors = (currentErrors: ValidationError[]) =>
    errors.push(
      ...currentErrors.map(item => {
        item.path = `${path}.${item.path}`
        return item
      })
    )

  if (strict && !pickUpFields.length && !dropoffFields.length && !pickupPosition && !dropoffPosition) {
    errors.push(getError(codes.DP001, path))
  }

  if (pickUpFields.length && dropoffFields.length && pickUpFields[0] === dropoffFields[0]) {
    errors.push(getError(codes.DP006, path))
  }

  if (leg.bookingType) {
    collectErrors(validateBookingType(leg.bookingType, 'bookingType', { strict }))
  }

  const activeBookingType = leg.bookingType ?? defaultBookingType

  if (pickUpFields.length || pickupPosition) {
    collectErrors(validatePlace(pickUpFields, pickupPosition, 'pickupPosition', 'pickup'))
  }

  if (dropoffFields.length || dropoffPosition) {
    collectErrors(validatePlace(dropoffFields, dropoffPosition, 'dropoffPosition', 'dropoff'))
  }

  if (strict && !pickUpFields.length && !pickupPosition && !isUndefined(leg.pickupTime)) {
    collectErrors([getError(codes.DP009, 'pickup')])
  }

  collectErrors(validatePickupTime(leg.pickupTime, activeBookingType, { strict }))

  !isUndefined(leg.passengerInfo) && collectErrors(validatePassengerInfo(leg.passengerInfo))

  !isUndefined(leg.meta) &&
    collectErrors([
      ...validateMeta(leg.meta),
      ...(!isUndefined(leg.meta[trainTimeParameter])
        ? validateTime(leg.meta[trainTimeParameter], `meta.${trainTimeParameter}`, { strict })
        : []),
    ])

  !isUndefined(leg.pickupMeta) && collectErrors(validateMeta(leg.pickupMeta, 'pickupMeta'))
  !isUndefined(leg.dropoffMeta) && collectErrors(validateMeta(leg.dropoffMeta, 'dropoffMeta'))

  return errors
}

export function validate(
  deeplinkData: DeeplinkData,
  { strict }: ValidationOptions = { strict: true }
): ValidationResponse {
  const errors = []
  const { legs, passengerInfo, travellerLocale, meta, customFields, bookingType } = deeplinkData

  if (legs.length) {
    legs.forEach((leg, index) => errors.push(...validateLeg(leg, bookingType, `legs.${index}`, { strict })))
  } else {
    errors.push(getError(codes.DP001, 'legs'))
  }

  errors.push(
    ...validatePassengerInfo(passengerInfo),
    ...validateTravellerLocale(travellerLocale),
    ...validateBookingType(bookingType, 'bookingType', { strict }),
    ...validateMeta(meta)
  )

  !isUndefined(customFields) && errors.push(...validateMeta(customFields, 'customFields'))

  return errors.length ? { ok: false, errors } : { ok: true }
}

export function validateLegToQuotes(leg: JourneyLeg, defaultBookingType: BookingType, path: string) {
  const errors = []
  const pickUpFields = excludeUndefined([leg.pickup, leg.pickupPlaceId, leg.pickupKpoi])
  const dropoffFields = excludeUndefined([leg.dropoff, leg.dropoffPlaceId, leg.dropoffKpoi])
  const pickupPosition = leg.pickupPosition
  const dropoffPosition = leg.dropoffPosition
  const bookingType = leg.bookingType ?? defaultBookingType

  if (leg.pickup || leg.dropoff) {
    errors.push(getError(codes.DP013, path))
  }

  if ((!pickUpFields.length && !pickupPosition) || (!dropoffFields.length && !dropoffPosition)) {
    errors.push(getError(codes.DP014, path))
  }

  if (bookingType === BookingTypes.PREBOOK && isUndefined(leg.pickupTime)) {
    errors.push(getError(codes.DP001, 'pickupTime'))
  }

  errors.push(...validateLeg(leg, bookingType, 'legs.1', { strict: true }))

  return errors.length ? { ok: false, errors } : { ok: true }
}
