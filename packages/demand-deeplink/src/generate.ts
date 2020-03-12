import kebabCase from 'lodash/kebabCase'
import isString from 'lodash/isString'

import { DeeplinkData, JourneyLeg, KeyValueList, Dictionary, PassengerInfo } from './types'

import {
  deepLinkMetaPrefix,
  journeyLegMetaPrefix,
  journeyLegDropoffMetaPrefix,
  journeyLegPickupMetaPrefix,
  travellerLocaleParameter,
} from './constants'

function getAvailableParams(
  data: Dictionary<string> | PassengerInfo,
  prefix = '',
  transform = (a: string) => a
): KeyValueList {
  const result: KeyValueList = []
  ;(Object.keys(data) as Array<keyof typeof data>).forEach(key => {
    const value = data[key]
    value && result.push([`${prefix}${transform(key)}`, value.toString()])
  })

  return result
}

function getJorneyLegsParams(data: Array<JourneyLeg>) {
  const result = data.reduce((value, leg: JourneyLeg, index) => {
    const legPrefix = `leg-${index + 1}-`
    let formattedLeg: KeyValueList = []
    ;(Object.keys(leg) as Array<keyof JourneyLeg>).forEach(key => {
      const value = leg[key]
      if (!value) {
        return
      }

      if (isString(value)) {
        const formattedKey =
          key === 'pickupPlaceId' || key === 'dropoffPlaceId'
            ? kebabCase(key.slice(0, -2)) + '_id'
            : kebabCase(key)
        formattedLeg.push([`${legPrefix}${formattedKey}`, value])
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

        const formattedMeta = getAvailableParams(value, legPrefix + metaPrefix)
        formattedLeg = [...formattedLeg, ...formattedMeta]
      }
    })

    return [...value, ...formattedLeg]
  }, [] as KeyValueList)

  return result
}

export function generate(deeplink: DeeplinkData): string {
  const legsParams = getJorneyLegsParams(deeplink.legs)
  const passengerInfoParams = getAvailableParams(deeplink.passengerInfo, '', kebabCase)
  const travellerLocaleParam = deeplink.travellerLocale
    ? [[travellerLocaleParameter, deeplink.travellerLocale]]
    : []
  const metaParams = getAvailableParams(deeplink.meta, deepLinkMetaPrefix)
  const customFieldsParams = deeplink.customFields ? getAvailableParams(deeplink.customFields) : []

  const queryParams = [
    ...legsParams,
    ...passengerInfoParams,
    ...travellerLocaleParam,
    ...metaParams,
    ...customFieldsParams,
  ]
  const queryString = new URLSearchParams(queryParams).toString()

  return '?' + queryString
}
