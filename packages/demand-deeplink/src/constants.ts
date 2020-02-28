export const journeyLegFieldsRegexp = /^leg-(\d+)-(.+)/i

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

export const journeyLegCommonFields = [...journeyLegMainFields, ...passengerInfoFields]

export const deepLinkMetaPrefix = 'meta.'

export const journeyLegMetaPrefix = 'm-'
export const journeyLegPickupMetaPrefix = 'm-pickup-'
export const journeyLegDropoffMetaPrefix = 'm-dropoff-'
