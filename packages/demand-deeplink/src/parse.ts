import isUndefined from 'lodash/isUndefined'
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
  passengerInfoFields,
  travellerLocaleParameter,
  passengerParameter,
  luggageParameter,
  emailParameter,
  phoneNumberParameter,
  pickupParameter,
  pickupKpoiParameter,
  pickupPlaceIdParameter,
  pickupLatitudeParameter,
  pickupLongitudeParameter,
  pickupTimeParameter,
  firstNameParameter,
  lastNameParameter,
  dropoffParameter,
  dropoffKpoiParameter,
  dropoffPlaceIdParameter,
  dropoffLatitudeParameter,
  dropoffLongitudeParameter,
  bookingTypeParameter,
  BookingTypes,
  brokenTimeFormatRegexp,
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

function getBookingType(type?: string) {
  if (!type) {
    return BookingTypes.PREBOOK
  }

  const value = type.toUpperCase()

  return value === BookingTypes.PREBOOK || value === BookingTypes.ASAP ? value : BookingTypes.CUSTOM
}

function getPassengerInfo(data: Dictionary<string>): PassengerInfo {
  return {
    passengers: data[passengerParameter] ? parseFloat(data[passengerParameter]) : undefined,
    firstName: data[firstNameParameter],
    lastName: data[lastNameParameter],
    email: data[emailParameter],
    phoneNumber: data[phoneNumberParameter],
    luggage: data[luggageParameter] ? parseFloat(data[luggageParameter]) : undefined,
  }
}

function getJourneyLeg(data: Dictionary<string>): JourneyLeg {
  const pickupMeta = transformMapByKey(data, journeyLegPickupMetaPrefix, isLegPickupMeta)
  const dropoffMeta = transformMapByKey(data, journeyLegDropoffMetaPrefix, isLegDropoffMeta)
  const passengerInfo = transformMapByKey(data, journeyLegMetaPrefix, isLegPassengerInfoMeta)
  const bookingType = !isUndefined(data[bookingTypeParameter])
    ? getBookingType(data[bookingTypeParameter])
    : undefined

  const meta = transformMapByKey(
    data,
    journeyLegMetaPrefix,
    key => isLegMeta(key) && !isLegPickupMeta(key) && !isLegDropoffMeta(key) && !isLegPassengerInfoMeta(key)
  )

  const pickupPosition =
    data[pickupLatitudeParameter] || data[pickupLongitudeParameter]
      ? {
          lat: Number(data[pickupLatitudeParameter]) || undefined,
          lng: Number(data[pickupLongitudeParameter]) || undefined,
        }
      : undefined

  const dropoffPosition =
    data[dropoffLatitudeParameter] || data[dropoffLongitudeParameter]
      ? {
          lat: Number(data[dropoffLatitudeParameter]) || undefined,
          lng: Number(data[dropoffLongitudeParameter]) || undefined,
        }
      : undefined

  return {
    pickup: data[pickupParameter],
    pickupKpoi: data[pickupKpoiParameter],
    pickupPlaceId: data[pickupPlaceIdParameter],
    pickupPosition,
    pickupTime: data[pickupTimeParameter],
    dropoff: data[dropoffParameter],
    dropoffKpoi: data[dropoffKpoiParameter],
    dropoffPlaceId: data[dropoffPlaceIdParameter],
    dropoffPosition,
    bookingType,
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
    let value = v && v.trim()
    const key = k && k.trim().toLowerCase()

    // We are accepting a date with the space before the timezone. It's wrong format which results
    // in an error when parsing the date, so to avoid further troubles we are detecting dates here
    // and then converting them to correct format with + sign in the place of space
    if (brokenTimeFormatRegexp.test(value)) {
      const date = value.replace(' ', '+')
      if (!isNaN(Date.parse(date))) {
        value = date
      }
    }

    key && value && result.push([key, value])
  })

  return result
}

export function parse(query: string): DeeplinkData {
  const data = parseSearchString(query)
  const legFields = data.filter(([key]) => isLegQueryParameter(key))
  const passengerFields = data.filter(([key]) => passengerInfoFields.indexOf(key) >= 0)
  const metaFields = data.filter(([key]) => key.indexOf(deepLinkMetaPrefix) === 0)

  const expectedKeys = [
    [travellerLocaleParameter],
    [bookingTypeParameter],
    ...metaFields,
    ...passengerFields,
    ...legFields,
  ].map(([key]) => key)

  const customFields = data.filter(([key]) => expectedKeys.indexOf(key) === -1)

  return {
    legs: getJourneyLegs(legFields),
    passengerInfo: getPassengerInfo(fromPairs(passengerFields)),
    travellerLocale: fromPairs(data)[travellerLocaleParameter],
    bookingType: getBookingType(fromPairs(data)[bookingTypeParameter]),
    meta: transformMapByKey(fromPairs(metaFields), deepLinkMetaPrefix),
    ...(customFields.length ? { customFields: fromPairs(customFields) } : {}),
  }
}
