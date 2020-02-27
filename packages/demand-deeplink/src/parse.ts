import fromPairs from 'lodash/fromPairs'

export type Dictionary<T> = {
  [index: string]: T
}

export type KeyValueMap = [string, string][]

export type JourneyLeg = Partial<{
  pickup: string
  pickupKpoi: string
  pickupPlaceId: string
  pickupDate: string
  pickupMeta: Dictionary<string>
  dropoff: string
  dropoffKpoi: string
  dropoffPlaceId: string
  dropOffMeta: Dictionary<string>
  meta: Dictionary<string>
}>

export type PassengerInfo = Partial<{
  passengers: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  luggage: number
  travellerLocale: string
}>

export type DeeplinkData = {
  legs: JourneyLeg[]
  meta: Dictionary<string>
  customFields?: Dictionary<string>
} & PassengerInfo

const deeplinkMainFields = [
  'passengers',
  'first-name',
  'last-name',
  'email',
  'phone-number',
  'luggage',
  'traveller-locale',
]

const legMainFields = [
  'pickup',
  'pickup-kpoi',
  'pickup-place_id',
  'pickup-time',
  'dropoff',
  'dropoff-kpoi',
  'dropoff-place_id',
]

const legFieldsRegexp = /^leg-(\d+)-(.+)/i

const matchLegQueryParameter = (key: string) => key.match(legFieldsRegexp)

const isLegMainQueryParameter = (key: string) => {
  const name = matchLegQueryParameter(key)?.[2]

  return !!name && legMainFields.some(field => field === name)
}

const isLegMetaQueryParameter = (key: string) => matchLegQueryParameter(key)?.[2]?.indexOf('m-') === 0

const isLegQueryParameter = (key: string) => isLegMainQueryParameter(key) || isLegMetaQueryParameter(key)

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
    travellerLocale: data['traveller-locale'],
  }
}

function getJourneyLeg(data: Dictionary<string>): JourneyLeg {
  // TODO: fix keys
  const metaPrefix = 'm-'
  const pickupMetaPrefix = 'm-pickup-'
  const dropOffMetaPrefix = 'm-dropoff-'

  return {
    pickup: data.pickup,
    pickupKpoi: data['pickup-kpoi'],
    pickupPlaceId: data['pickup-place_id'],
    pickupDate: data['pickup-time'],
    pickupMeta: filterMap(data, pickupMetaPrefix, key => key.indexOf(pickupMetaPrefix) === 0),
    dropoff: data.dropoff,
    dropoffKpoi: data['pickup-kpoi'],
    dropoffPlaceId: data['dropoff-place_id'],
    dropOffMeta: filterMap(data, dropOffMetaPrefix, key => key.indexOf(dropOffMetaPrefix) === 0),
    meta: filterMap(
      data,
      metaPrefix,
      key =>
        key.indexOf(metaPrefix) === 0 &&
        key.indexOf(pickupMetaPrefix) !== 0 &&
        key.indexOf(dropOffMetaPrefix) !== 0
    ),
  }
}

export function getJourneyLegs(legsInfo: KeyValueMap) {
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
  const data: KeyValueMap = query
    .split('&')
    .map(item => item.split('=').map(item => item && decodeURIComponent(item)))
    .filter(([key, value]) => key && value)
    .map(([key, value]) => [key.toLowerCase(), value])

  const legFields = data.filter(([key]) => isLegQueryParameter(key))
  const passengerFields = data.filter(([key]) => deeplinkMainFields.indexOf(key) >= 0)
  const metaFields = data.filter(([key]) => key.indexOf('meta.') === 0)

  const expectedKeys = [...metaFields, ...passengerFields, ...legFields].map(([key]) => key)

  const customFields = data.filter(([key]) => expectedKeys.indexOf(key) < 0)

  return {
    legs: getJourneyLegs(legFields),
    ...getPassengerInfo(fromPairs(passengerFields)),
    meta: fromPairs(metaFields.map(([key, value]) => [key.replace('meta.', ''), value])),
    ...(customFields.length ? { customFields: fromPairs(customFields) } : {}),
  }
}
