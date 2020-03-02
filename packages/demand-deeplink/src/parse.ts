import fromPairs from 'lodash/fromPairs'

import {
  deepLinkMetaPrefix,
  journeyLegFieldsRegexp,
  journeyLegCommonFields,
  journeyLegMetaPrefix,
  journeyLegDropoffMetaPrefix,
  journeyLegPickupMetaPrefix,
  travellerLocaleField,
  passengerInfoFields,
} from './constants'

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

const matchLegQueryParameter = (key: string) => key.match(journeyLegFieldsRegexp)

const isLegCommonQueryParameter = (key: string) => {
  const name = matchLegQueryParameter(key)?.[2]

  return !!name && journeyLegCommonFields.some(field => field === name)
}

const isLegMetaQueryParameter = (key: string) =>
  matchLegQueryParameter(key)?.[2]?.indexOf(journeyLegMetaPrefix) === 0

const isLegQueryParameter = (key: string) => isLegCommonQueryParameter(key) || isLegMetaQueryParameter(key)

function transformMapByKey(
  data: Dictionary<string>,
  keyPrefix: string,
  filter: (key: string) => boolean = () => true
) {
  const result: Dictionary<string> = {}

  for (const key of Object.keys(data)) {
    if (filter(key)) {
      result[key.replace(keyPrefix, '')] = data[key]
    }
  }

  return result
}

function getPassengerInfo(data: Dictionary<string>): PassengerInfo {
  return {
    passengers: data.passengers ? parseInt(data.passengers, 10) : undefined,
    firstName: data['first-name'],
    lastName: data['last-name'],
    email: data.email,
    phoneNumber: data['phone-number'],
    luggage: data.luggage ? parseInt(data.luggage, 10) : undefined,
  }
}

function getJourneyLeg(data: Dictionary<string>): JourneyLeg {
  return {
    pickup: data.pickup,
    pickupKpoi: data['pickup-kpoi'],
    pickupPlaceId: data['pickup-place_id'],
    pickupDate: data['pickup-time'],
    pickupMeta: transformMapByKey(
      data,
      journeyLegPickupMetaPrefix,
      key => key.indexOf(journeyLegPickupMetaPrefix) === 0
    ),
    dropoff: data.dropoff,
    dropoffKpoi: data['pickup-kpoi'],
    dropoffPlaceId: data['dropoff-place_id'],
    dropoffMeta: transformMapByKey(
      data,
      journeyLegDropoffMetaPrefix,
      key => key.indexOf(journeyLegDropoffMetaPrefix) === 0
    ),
    passengerInfo: getPassengerInfo(data),
    meta: transformMapByKey(
      data,
      journeyLegMetaPrefix,
      key =>
        key.indexOf(journeyLegMetaPrefix) === 0 &&
        key.indexOf(journeyLegPickupMetaPrefix) !== 0 &&
        key.indexOf(journeyLegDropoffMetaPrefix) !== 0
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

    const [, index, name] = itemInfo

    if (!data[index]) {
      data[index] = {}
    }

    data[index][name] = value
  }

  return Object.keys(data)
    .sort((a, b) => (parseInt(a, 10) < parseInt(b, 10) ? -1 : 1))
    .map(index => getJourneyLeg(data[index]))
}

function parseSearchString(query: string) {
  const result: KeyValueList = []
  const data = new URLSearchParams(query)

  data.forEach((value, key) => {
    key && value && result.push([key, value])
  })

  return result
}

export function parse(query: string): DeeplinkData {
  const data = parseSearchString(query)
  const legFields = data.filter(([key]) => isLegQueryParameter(key))
  const passengerFields = data.filter(([key]) => passengerInfoFields.indexOf(key) >= 0)
  const metaFields = data.filter(([key]) => key.indexOf(deepLinkMetaPrefix) === 0)

  const expectedKeys = [[travellerLocaleField], ...metaFields, ...passengerFields, ...legFields].map(
    ([key]) => key
  )

  const customFields = data.filter(([key]) => expectedKeys.indexOf(key) === -1)

  return {
    legs: getJourneyLegs(legFields),
    passengerInfo: getPassengerInfo(fromPairs(passengerFields)),
    travellerLocale: fromPairs(data)[travellerLocaleField],
    meta: transformMapByKey(fromPairs(metaFields), deepLinkMetaPrefix),
    ...(customFields.length ? { customFields: fromPairs(customFields) } : {}),
  }
}
