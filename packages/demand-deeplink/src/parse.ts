import fromPairs from 'lodash/fromPairs'
import isNil from 'lodash/isNil'

import { DeeplinkData, JourneyLeg, PassengerInfo, KeyValueList, Dictionary } from './types'

import {
  deepLinkMetaPrefix,
  journeyLegFieldsRegexp,
  journeyLegMainFields,
  journeyLegMetaPrefix,
  journeyLegDropoffMetaPrefix,
  journeyLegPickupMetaPrefix,
  travellerLocaleField,
  passengerInfoFields,
} from './constants'

const legNameIndex = 2

function transformMapByKey(
  data: Dictionary<string>,
  keyPrefix: string,
  filter: (key: string) => boolean = () => true
) {
  return Object.keys(data).reduce(
    (result, key) =>
      filter(key)
        ? {
            ...result,
            [key.replace(keyPrefix, '')]: data[key],
          }
        : result,
    {} as Dictionary<string>
  )
}

function hasData(data: Dictionary<string>) {
  return Object.keys(data).some(key => !isNil(data[key]))
}

const matchLegQueryParameter = (key: string) => key.match(journeyLegFieldsRegexp)

const isLegCommonQueryParameter = (key: string) => {
  const name = matchLegQueryParameter(key)?.[legNameIndex]

  return !!name && journeyLegMainFields.some(field => field === name)
}

const isLegMetaQueryParameter = (key: string) =>
  matchLegQueryParameter(key)?.[legNameIndex]?.indexOf(journeyLegMetaPrefix) === 0

const isLegMeta = (key: string) => key.indexOf(journeyLegMetaPrefix) === 0

const isLegPickupMeta = (key: string) => key.indexOf(journeyLegPickupMetaPrefix) === 0

const isLegDropoffMeta = (key: string) => key.indexOf(journeyLegDropoffMetaPrefix) === 0

const isLegPassengerInfoMeta = (key: string) =>
  passengerInfoFields.some(field => `${journeyLegMetaPrefix}${field}` === key)

const isLegQueryParameter = (key: string) => isLegCommonQueryParameter(key) || isLegMetaQueryParameter(key)

function getPassengerInfo(data: Dictionary<string>): PassengerInfo {
  return {
    passengers: data.passengers ? parseFloat(data.passengers) : undefined,
    firstName: data['first-name'],
    lastName: data['last-name'],
    email: data.email,
    phoneNumber: data['phone-number'],
    luggage: data.luggage ? parseFloat(data.luggage) : undefined,
  }
}

function getJourneyLeg(data: Dictionary<string>): JourneyLeg {
  const pickupMeta = transformMapByKey(data, journeyLegPickupMetaPrefix, isLegPickupMeta)
  const dropoffMeta = transformMapByKey(data, journeyLegDropoffMetaPrefix, isLegDropoffMeta)
  const passengerInfo = transformMapByKey(data, journeyLegMetaPrefix, isLegPassengerInfoMeta)

  const meta = transformMapByKey(
    data,
    journeyLegMetaPrefix,
    key => isLegMeta(key) && !isLegPickupMeta(key) && !isLegDropoffMeta(key) && !isLegPassengerInfoMeta(key)
  )

  return {
    pickup: data.pickup,
    pickupKpoi: data['pickup-kpoi'],
    pickupPlaceId: data['pickup-place_id'],
    pickupDate: data['pickup-time'],
    dropoff: data.dropoff,
    dropoffKpoi: data['pickup-kpoi'],
    dropoffPlaceId: data['dropoff-place_id'],
    ...(hasData(pickupMeta) ? { pickupMeta } : {}),
    ...(hasData(dropoffMeta) ? { dropoffMeta } : {}),
    ...(hasData(meta) ? { meta } : {}),
    ...(hasData(passengerInfo) ? { passengerInfo: getPassengerInfo(passengerInfo) } : {}),
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

  data.forEach((v, k) => {
    const value = v && v.trim()
    const key = k && k.trim().toLowerCase()

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
