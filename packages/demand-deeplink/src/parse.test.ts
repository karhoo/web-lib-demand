import { toPairs } from 'lodash'

import { getJourneyLegs, parse } from './parse'
import {
  firstJourneyLeg,
  firstJourneyLegDropoffMeta,
  firstJourneyLegMeta,
  firstJourneyLegPickupMeta,
  secondJourneyLeg,
  passengerInfo,
  meta,
  travellerLocale,
  expectedFirstJourneyLeg,
  expectedFirstJourneyLegDropoffMeta,
  expectedFirstJourneyLegMeta,
  expectedFirstJourneyLegPickupMeta,
  expectedPassengerInfo,
  expectedSecondJourneyLeg,
  expectedMeta,
} from './testData'

describe('parse', () => {
  const getQueryString = (data: object) =>
    '?' +
    toPairs(data)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')

  it('should return empty info', () => {
    expect(parse('')).toEqual({
      legs: [],
      passengerInfo: {},
      travellerLocale: undefined,
      meta: {},
    })
  })

  it('should have passenger info', () => {
    expect(parse(getQueryString(passengerInfo))).toEqual({
      legs: [],
      travellerLocale: undefined,
      meta: {},
      passengerInfo: expectedPassengerInfo,
    })
  })

  it('should have travellerLocale', () => {
    expect(parse(`traveller-locale=${travellerLocale}`)).toEqual({
      legs: [],
      travellerLocale,
      meta: {},
      passengerInfo: {},
    })
  })

  it('should have meta', () => {
    expect(parse(getQueryString(meta))).toEqual({
      legs: [],
      travellerLocale: undefined,
      meta: expectedMeta,
      passengerInfo: {},
    })
  })

  it('should have meta customFields', () => {
    const customFields = {
      'custom-field': 'custom field',
      test: 'test',
    }

    expect(parse(getQueryString(customFields))).toEqual({
      legs: [],
      travellerLocale: undefined,
      meta: {},
      passengerInfo: {},
      customFields,
    })
  })

  it('should move unexpected leg parameters to customFields', () => {
    const fields = {
      'leg-1-dropoff': 'dropoff',
      'leg-1-dropoff-some-data': 'some-data',
    }

    expect(parse(getQueryString(fields))).toEqual({
      legs: [
        {
          dropoff: fields['leg-1-dropoff'],
        },
      ],
      travellerLocale: undefined,
      meta: {},
      passengerInfo: {},
      customFields: {
        'leg-1-dropoff-some-data': fields['leg-1-dropoff-some-data'],
      },
    })
  })

  describe('getJourneyLegs', () => {
    it('should return empty array', () => {
      expect(getJourneyLegs([])).toEqual([])
    })

    it('should return JourneyLeg', () => {
      expect(getJourneyLegs(toPairs(firstJourneyLeg))).toEqual([expectedFirstJourneyLeg])
    })

    it('should return JourneyLegs when multiple legs are available', () => {
      expect(getJourneyLegs([...toPairs(firstJourneyLeg), ...toPairs(secondJourneyLeg)])).toEqual([
        expectedFirstJourneyLeg,
        expectedSecondJourneyLeg,
      ])
    })

    it('should have meta', () => {
      expect(getJourneyLegs([...toPairs(firstJourneyLeg), ...toPairs(firstJourneyLegMeta)])).toEqual([
        {
          ...expectedFirstJourneyLeg,
          meta: expectedFirstJourneyLegMeta,
        },
      ])
    })

    it('should have pickupMeta', () => {
      expect(getJourneyLegs([...toPairs(firstJourneyLeg), ...toPairs(firstJourneyLegPickupMeta)])).toEqual([
        {
          ...expectedFirstJourneyLeg,
          pickupMeta: expectedFirstJourneyLegPickupMeta,
        },
      ])
    })

    it('should have dropoffMeta', () => {
      expect(getJourneyLegs([...toPairs(firstJourneyLeg), ...toPairs(firstJourneyLegDropoffMeta)])).toEqual([
        {
          ...expectedFirstJourneyLeg,
          dropoffMeta: expectedFirstJourneyLegDropoffMeta,
        },
      ])
    })

    it('should have passengerInfo', () => {
      expect(
        getJourneyLegs([
          ...toPairs(firstJourneyLeg),
          ...toPairs(passengerInfo).map<[string, string]>(([key, value]) => [`leg-1-m-${key}`, value]),
        ])
      ).toEqual([
        {
          ...expectedFirstJourneyLeg,
          passengerInfo: expectedPassengerInfo,
        },
      ])
    })
  })
})
