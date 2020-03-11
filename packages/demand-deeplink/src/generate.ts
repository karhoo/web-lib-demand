import kebabCase from 'lodash/kebabCase'
import isObject from 'lodash/isObject'

import { DeeplinkData, JourneyLeg, KeyValueList } from './types'

import {
  deepLinkMetaPrefix,
  journeyLegMetaPrefix,
  journeyLegDropoffMetaPrefix,
  journeyLegPickupMetaPrefix,
} from './constants'

function getAvailableParams(data: object, prefix = ''): KeyValueList {
  const result: KeyValueList = []

  for (const key in data) {
    data[key] && result.push([`${prefix}${kebabCase(key)}`, data[key]])
  }

  return result
}

function getJorneyLegsParams(data: Array<JourneyLeg>): KeyValueList {
  let result: KeyValueList = []

  data.forEach((leg: JourneyLeg, index) => {
    const legPrefix = `leg-${index}-`
    let formattedLeg: KeyValueList = []

    for (const key in leg) {
      if (leg[key]) {
        if (!isObject(leg[key])) {
          formattedLeg.push([`${legPrefix}${kebabCase(key)}`, leg[key]])
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

          const formattedMeta = getAvailableParams(leg[key], legPrefix + metaPrefix)
          formattedLeg = [...formattedLeg, ...formattedMeta]
        }
      }
    }

    result = [...result, ...formattedLeg]
  })

  return result
}

export function generate(deeplink: DeeplinkData): string {
  const passengerInfoParams = getAvailableParams(deeplink.passengerInfo)
  const legsParams = getJorneyLegsParams(deeplink.legs)
  const travellerLocaleParam = deeplink.travellerLocale ? ['traveller-locale', deeplink.travellerLocale] : []
  const metaParams = getAvailableParams(deeplink.meta, deepLinkMetaPrefix)
  const customFieldsParams = deeplink.customFields ? getAvailableParams(deeplink.customFields) : []

  const queryParams = [
    ...passengerInfoParams,
    ...legsParams,
    ...travellerLocaleParam,
    ...metaParams,
    ...customFieldsParams,
  ]
  const queryString = new URLSearchParams()

  queryParams.forEach(param => {
    queryString.append(param[0], param[1])
  })

  return queryString.toString()
}
