export const journeyLegFieldsRegexp = /^leg-(\d+)-(.+)/i
export const expectedTimeFormatRegexp =
  /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/
export const brokenTimeFormatRegexp =
  /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([ ][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([ ][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([ ][0-2]\d:[0-5]\d|Z))$/
export const timezoneRegexp = /([+-][0-2]\d:[0-5]\d|Z)$/
export const travellerLocaleRegexp = /^[a-z]{2}-[a-z]{2}$/i
export const latitudeRegexp = /^(\+|-)?(?:90(?:(?:\.0{1,})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,})?))$/
export const longitudeRegexp =
  /^(\+|-)?(?:180(?:(?:\.0{1,})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,})?))$/

export const travellerLocaleParameter = 'traveller-locale'
export const bookingTypeParameter = 'booking-type'
export const passengerParameter = 'passengers'
export const firstNameParameter = 'first-name'
export const lastNameParameter = 'last-name'
export const emailParameter = 'email'
export const phoneNumberParameter = 'phone-number'
export const luggageParameter = 'luggage'
export const pickupParameter = 'pickup'
export const pickupKpoiParameter = 'pickup-kpoi'
export const pickupPlaceIdParameter = 'pickup-place_id'
export const pickupLatitudeParameter = 'pickup-lat'
export const pickupLongitudeParameter = 'pickup-lng'
export const pickupTimeParameter = 'pickup-time'
export const dropoffParameter = 'dropoff'
export const dropoffKpoiParameter = 'dropoff-kpoi'
export const dropoffPlaceIdParameter = 'dropoff-place_id'
export const dropoffLatitudeParameter = 'dropoff-lat'
export const dropoffLongitudeParameter = 'dropoff-lng'
export const trainTimeParameter = 'train-time'

export const passengerInfoFields = [
  passengerParameter,
  firstNameParameter,
  lastNameParameter,
  emailParameter,
  phoneNumberParameter,
  luggageParameter,
]

export const journeyLegMainFields = [
  pickupParameter,
  pickupKpoiParameter,
  pickupPlaceIdParameter,
  pickupLatitudeParameter,
  pickupLongitudeParameter,
  pickupTimeParameter,
  dropoffParameter,
  dropoffKpoiParameter,
  dropoffPlaceIdParameter,
  dropoffLatitudeParameter,
  dropoffLongitudeParameter,
  bookingTypeParameter,
]

export const deepLinkMetaPrefix = 'meta.'

export const journeyLegPrefix = 'leg-'

export const journeyLegMetaPrefix = 'm-'
export const journeyLegPickupMetaPrefix = 'm-pickup-'
export const journeyLegDropoffMetaPrefix = 'm-dropoff-'

export const journeyLegMetaPrefixes: Record<string, string> = {
  pickupMeta: journeyLegPickupMetaPrefix,
  dropoffMeta: journeyLegDropoffMetaPrefix,
  meta: journeyLegMetaPrefix,
  passengerInfo: journeyLegMetaPrefix,
}

export enum BookingTypes {
  ASAP = 'ASAP',
  PREBOOK = 'PRE-BOOK',
  CUSTOM = 'CUSTOM',
}
