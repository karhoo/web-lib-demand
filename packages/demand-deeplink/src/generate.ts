import fromPairs from 'lodash/fromPairs'
import toPairs from 'lodash/toPairs'
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

import { parse } from './parse'

const deeplink = location.search

const deeplinkData = parse(deeplink)

function availableFields(data: object): object {
  const result: KeyValueList = []

  toPairs(data).forEach(([key, value]) => {
    key && !isNil(value) && result.push([key, value])
  })

  return fromPairs(result)
}

function passengerInfoAvailableFields(data: PassengerInfo): PassengerInfo {
  return availableFields(deeplinkData.passengerInfo)
}

function legsWithAvailableFields(data: Array<JourneyLeg>): Array<JourneyLeg> {
  const result: Array<JourneyLeg> = []

  data.forEach(leg => result.push(availableFields(leg)))

  return result
}
