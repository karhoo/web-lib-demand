export const journeyLegFieldsRegexp = /^leg-(\d+)-(.+)/i
export const expectedDateFormatRegexp = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/
export const timezoneRegexp = /([+-][0-2]\d:[0-5]\d|Z)$/
export const travellerLocaleRegexp = /^[a-z]{2}-[a-z]{2}$/i

export const travellerLocaleParameter = 'traveller-locale'
export const passengerParameter = 'passengers'
export const firstNameParameter = 'first-name'
export const lastNameParameter = 'last-name'
export const emailParameter = 'email'
export const phoneNumberParameter = 'phone-number'
export const luggageParameter = 'luggage'
export const pickupParameter = 'pickup'
export const pickupKpoiParameter = 'pickup-kpoi'
export const pickupPlaceIdParameter = 'pickup-place_id'
export const pickupTimeParameter = 'pickup-time'
export const dropoffParameter = 'dropoff'
export const dropoffKpoiParameter = 'dropoff-kpoi'
export const dropoffPlaceIdParameter = 'dropoff-place_id'

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
  pickupTimeParameter,
  dropoffParameter,
  dropoffKpoiParameter,
  dropoffPlaceIdParameter,
]

export const deepLinkMetaPrefix = 'meta.'

export const journeyLegMetaPrefix = 'm-'
export const journeyLegPickupMetaPrefix = 'm-pickup-'
export const journeyLegDropoffMetaPrefix = 'm-dropoff-'
