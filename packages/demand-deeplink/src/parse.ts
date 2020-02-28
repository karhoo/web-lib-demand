import fromPairs from 'lodash/fromPairs'

export type Dictionary<T> = {
  [index: string]: T
}

export type KeyValueList = [string, string][]

export type PassengerInfo = Partial<{
  passengers: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  luggage: number
}>

export type JourneyLeg = Partial<{
  pickup: string
  pickupKpoi: string
  pickupPlaceId: string
  pickupDate: string
  pickupMeta: Dictionary<string>
  dropoff: string
  dropoffKpoi: string
  dropoffPlaceId: string
  dropoffMeta: Dictionary<string>
  passengerInfo: PassengerInfo
  meta: Dictionary<string>
}>

export type DeeplinkData = {
  legs: JourneyLeg[]
  passengerInfo: PassengerInfo
  travellerLocale?: string
  meta: Dictionary<string>
  customFields?: Dictionary<string>
}

const passengerInfoFields = ['passengers', 'first-name', 'last-name', 'email', 'phone-number', 'luggage']

const travellerLocaleField = 'traveller-locale'

const legMainFields = [
  'pickup',
  'pickup-kpoi',
  'pickup-place_id',
  'pickup-time',
  'dropoff',
  'dropoff-kpoi',
  'dropoff-place_id',
]

const legCommonFields = [...legMainFields, ...passengerInfoFields]

const legFieldsRegexp = /^leg-(\d+)-(.+)/i

const matchLegQueryParameter = (key: string) => key.match(legFieldsRegexp)

const isLegCommonQueryParameter = (key: string) => {
  const name = matchLegQueryParameter(key)?.[2]

  return !!name && legCommonFields.some(field => field === name)
}

const isLegMetaQueryParameter = (key: string) => matchLegQueryParameter(key)?.[2]?.indexOf('m-') === 0

const isLegQueryParameter = (key: string) => isLegCommonQueryParameter(key) || isLegMetaQueryParameter(key)

function filterMap(data: Dictionary<string>, prefix: string, filter: (key: string) => boolean) {
  return Object.keys(data).reduce((result, key) => {
    if (filter(key)) {
      result[key.replace(prefix, '')] = data[key]
    }

    return result
  }, {} as Dictionary<string>)
}

function getPassengerInfo(data: Dictionary<string>): PassengerInfo {
  return {
    passengers: parseInt(data.passengers, 10),
    firstName: data['first-name'],
    lastName: data['last-name'],
    email: data.email,
    phoneNumber: data['phone-number'],
    luggage: parseInt(data.luggage, 10),
  }
}

function getJourneyLeg(data: Dictionary<string>): JourneyLeg {
  // TODO: fix keys
  const metaPrefix = 'm-'
  const pickupMetaPrefix = 'm-pickup-'
  const dropoffMetaPrefix = 'm-dropoff-'

  return {
    pickup: data.pickup,
    pickupKpoi: data['pickup-kpoi'],
    pickupPlaceId: data['pickup-place_id'],
    pickupDate: data['pickup-time'],
    pickupMeta: filterMap(data, pickupMetaPrefix, key => key.indexOf(pickupMetaPrefix) === 0),
    dropoff: data.dropoff,
    dropoffKpoi: data['pickup-kpoi'],
    dropoffPlaceId: data['dropoff-place_id'],
    dropoffMeta: filterMap(data, dropoffMetaPrefix, key => key.indexOf(dropoffMetaPrefix) === 0),
    passengerInfo: getPassengerInfo(data),
    meta: filterMap(
      data,
      metaPrefix,
      key =>
        key.indexOf(metaPrefix) === 0 &&
        key.indexOf(pickupMetaPrefix) !== 0 &&
        key.indexOf(dropoffMetaPrefix) !== 0
    ),
  }
}

export function getJourneyLegs(legsInfo: KeyValueList) {
  const data: Dictionary<Dictionary<string>> = {}

  for (const [key, value] of legsInfo) {
    const itemInfo = matchLegQueryParameter(key)

    if (!itemInfo) {
      continue
    }

    const [_, index, name] = itemInfo

    if (!data[index]) {
      data[index] = {}
    }

    data[index][name] = value
  }

  return Object.keys(data)
    .sort((a, b) => (parseInt(a, 10) < parseInt(b, 10) ? -1 : 1))
    .map(index => getJourneyLeg(data[index]))
}

export function parse(query: string): DeeplinkData {
  const data: KeyValueList = query
    .split('&')
    .map(item => item.split('=').map(item => item && decodeURIComponent(item)))
    .filter(([key, value]) => key && value)
    .map(([key, value]) => [key.toLowerCase(), value])

  const legFields = data.filter(([key]) => isLegQueryParameter(key))
  const passengerFields = data.filter(([key]) => passengerInfoFields.indexOf(key) >= 0)
  const metaFields = data.filter(([key]) => key.indexOf('meta.') === 0)

  const expectedKeys = [[travellerLocaleField], ...metaFields, ...passengerFields, ...legFields].map(
    ([key]) => key
  )

  const customFields = data.filter(([key]) => expectedKeys.indexOf(key) < 0)

  return {
    legs: getJourneyLegs(legFields),
    passengerInfo: getPassengerInfo(fromPairs(passengerFields)),
    travellerLocale: fromPairs(data)[travellerLocaleField],
    meta: fromPairs(metaFields.map(([key, value]) => [key.replace('meta.', ''), value])),
    ...(customFields.length ? { customFields: fromPairs(customFields) } : {}),
  }
}
