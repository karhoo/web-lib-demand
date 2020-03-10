export const journeyLegFieldsRegexp = /^leg-(\d+)-(.+)/i
export const expectedDateFormatRegexp = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/
export const timezoneRegexp = /([+-][0-2]\d:[0-5]\d|Z)$/
export const travellerLocaleRegexp = /^[a-z]{2}-[a-z]{2}$/i

export const travellerLocaleField = 'traveller-locale'

export const passengerInfoFields = [
  'passengers',
  'first-name',
  'last-name',
  'email',
  'phone-number',
  'luggage',
]

export const journeyLegMainFields = [
  'pickup',
  'pickup-kpoi',
  'pickup-place_id',
  'pickup-time',
  'dropoff',
  'dropoff-kpoi',
  'dropoff-place_id',
]

export const deepLinkMetaPrefix = 'meta.'

export const journeyLegMetaPrefix = 'm-'
export const journeyLegPickupMetaPrefix = 'm-pickup-'
export const journeyLegDropoffMetaPrefix = 'm-dropoff-'
