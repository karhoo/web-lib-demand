import fromPairs from 'lodash/fromPairs'
import toPairs from 'lodash/toPairs'
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import kebabCase from 'lodash/kebabCase'
import isObject from 'lodash/isObject'
import assign from 'lodash/assign'

import { DeeplinkData, JourneyLeg, KeyValueList } from './types'

import {
  deepLinkMetaPrefix,
  journeyLegMetaPrefix,
  journeyLegDropoffMetaPrefix,
  journeyLegPickupMetaPrefix,
} from './constants'

function getAvailableFields(data: object): object {
  if (isEmpty(data)) {
    return data
  }

  const result: KeyValueList = []

  toPairs(data).forEach((value, key: string) => {
    key && !isNil(value) && result.push([key, value])
  })

  return fromPairs(result)
}

function formatJorneyLegMeta(data: object, metaPrefix: string): object {
  const availableMetaFields: object = getAvailableFields(data)
  const formattedMeta = {}
  for (const key in availableMetaFields) {
    formattedMeta[`${metaPrefix}${key}`] = availableMetaFields[key]
  }

  return formattedMeta
}

function formatJorneyLegs(data: Array<JourneyLeg>): Array<object> {
  const result: Array<object> = []

  data.forEach((leg: JourneyLeg) => {
    const formattedLeg = {}

    for (const key in leg) {
      if (leg[key]) {
        if (!isObject(leg[key])) {
          formattedLeg[key] = leg[key]
        } else {
          let metaPrefix: string

          switch (key) {
            case 'pickupMeta':
              metaPrefix = journeyLegPickupMetaPrefix
              break

            case 'dropoffMeta':
              metaPrefix = journeyLegDropoffMetaPrefix
              break

            case 'meta':
            case 'passengerInfo':
            default:
              metaPrefix = journeyLegMetaPrefix
              break
          }

          const formattedMeta = formatJorneyLegMeta(leg[key], metaPrefix)
          assign(formattedLeg, formattedMeta)
        }
      }
    }

    result.push(formattedLeg)
  })

  return result
}

function getQueryString(data: object, prefix = ''): string {
  return toPairs(data)
    .map(([key, value]) => `${prefix}${kebabCase(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

function getLegsQueryString(legs: Array<object>): string {
  const legsQueryString = legs.reduce((value, leg, index) => {
    const legPrefix = `leg-${index}-`
    return value + getQueryString(leg, legPrefix) + '&'
  }, '')

  return legsQueryString
}

export function generate(deeplink: DeeplinkData): string {
  const passengerInfo = getAvailableFields(deeplink.passengerInfo)
  const legs = formatJorneyLegs(deeplink.legs)
  const travellerLocale = deeplink.travellerLocale ? deeplink.travellerLocale : ''

  const meta = getAvailableFields(deeplink.meta)

  const customFields = deeplink.customFields ? getAvailableFields(deeplink.customFields) : {}

  const legsQueryString = getLegsQueryString(legs)

  let queryString = '?' + legsQueryString

  if (!isEmpty(passengerInfo)) {
    queryString = queryString + getQueryString(passengerInfo) + '&'
  }

  if (travellerLocale) {
    queryString = queryString + 'traveller-locale=' + travellerLocale + '&'
  }

  if (!isEmpty(meta)) {
    queryString = queryString + getQueryString(meta, deepLinkMetaPrefix) + '&'
  }

  if (!isEmpty(customFields)) {
    queryString = queryString + getQueryString(customFields)
  }

  if (queryString.endsWith('&')) {
    queryString = queryString.slice(0, queryString.length - 1)
  }

  return queryString
}
