export type JourneyLeg = Partial<{
  pickup: string
  pickupKpoi: string
  pickupPlaceId: string
  pickupDate: string
  pickupMeta: { [key: string]: string }
  dropoff: string
  dropoffKpoi: string
  dropoffPlaceId: string
  dropOffMeta: { [key: string]: string }
  meta: { [key: string]: string }
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
  meta: { [key: string]: string }
  customFields?: { [key: string]: string }
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
  const info = matchLegQueryParameter(key)

  return !!info && legMainFields.some(field => field === info[2])
}

const isLegMetaQueryParameter = (key: string) => {
  const info = matchLegQueryParameter(key)

  return !!info && info[2].indexOf('m-') === 0
}

const isLegQueryParameter = (key: string) => isLegMainQueryParameter(key) || isLegMetaQueryParameter(key)

function fromPairs(data: string[][]) {
  return data.reduce((result, [key, value]) => {
    result[key] = value

    return result
  }, {} as { [key: string]: string })
}

function filterMap(data: { [key: string]: string }, filter: (key: string) => boolean) {
  return Object.keys(data).reduce((result, key) => {
    if (filter(key)) {
      result[key] = data[key]
    }

    return result
  }, {} as { [key: string]: string })
}

function getPassengerInfo(data: { [key: string]: string }): PassengerInfo {
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

function getJourneyLeg(data: { [key: string]: string }): JourneyLeg {
  // TODO: fix keys
  const metaPrefix = 'm-'
  const pickupMetaPrefix = 'm-pickup'
  const dropOffMetaPrefix = 'm-dropoff'

  return {
    pickup: data.pickup,
    pickupKpoi: data['pickup-kpoi'],
    pickupPlaceId: data['pickup-place_id'],
    pickupDate: data['pickup-time'],
    pickupMeta: filterMap(data, key => key.indexOf(pickupMetaPrefix) === 0),
    dropoff: data.dropoff,
    dropoffKpoi: data['pickup-kpoi'],
    dropoffPlaceId: data['dropoff-place_id'],
    dropOffMeta: filterMap(data, key => key.indexOf(dropOffMetaPrefix) === 0),
    meta: filterMap(
      data,
      key =>
        key.indexOf(metaPrefix) === 0 &&
        key.indexOf(pickupMetaPrefix) !== 0 &&
        key.indexOf(dropOffMetaPrefix) !== 0
    ),
  }
}

function getJourneyLegs(legsInfo: string[][]) {
  const data: { [key: string]: { [key: string]: string } } = {}

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
  const data = query
    .split('&')
    .map(item => item.split('=').map(item => item && decodeURIComponent(item)))
    .filter(([key, value]) => key && value)
    .map(([key, value]) => [key.toLocaleLowerCase(), value])

  const legFields = data.filter(([key]) => isLegQueryParameter(key))
  const passengerFields = data.filter(([key]) => deeplinkMainFields.indexOf(key) >= 0)
  const metaFields = data.filter(([key]) => key.indexOf('meta.') === 0)

  const expectedKeys = [...metaFields, ...passengerFields, ...legFields].map(([key]) => key)

  const customFields = data.filter(([key]) => expectedKeys.indexOf(key) < 0)

  return {
    legs: getJourneyLegs(legFields),
    ...getPassengerInfo(fromPairs(passengerFields)),
    meta: fromPairs(metaFields),
    ...(customFields.length ? { customFields: fromPairs(customFields) } : {}),
  }
}
