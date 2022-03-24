import { toPairs } from 'lodash'

import { BookingTypes } from './constants'
import {
  firstJourneyLeg,
  firstJourneyLegDropoffMeta,
  firstJourneyLegMeta,
  firstJourneyLegPickupMeta,
  firstJourneyLegBookingType,
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
  expectedFirstJourneyLegBookingType,
} from './testData'

import { getJourneyLegs, parse } from './parse'

describe('parse', () => {
  const getQueryString = (data: object) =>
    '?' +
    toPairs(data)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')

  const defaultExpectedInfo = {
    legs: [],
    passengerInfo: {},
    bookingType: BookingTypes.PREBOOK,
    travellerLocale: undefined,
    meta: {},
  }

  it('should return empty info', () => {
    expect(parse('')).toEqual(defaultExpectedInfo)
  })

  it('should have passenger info', () => {
    expect(parse(getQueryString(passengerInfo))).toEqual({
      ...defaultExpectedInfo,
      passengerInfo: expectedPassengerInfo,
    })
  })

  it('should parse wrong pickup time', () => {
    const data = getQueryString({ 'leg-1-pickup-time': '2022-03-24T09:40:42 03:30' })

    expect(parse(data).legs[0].pickupTime).toEqual('2022-03-24T09:40:42+03:30')
  })

  it('should have travellerLocale', () => {
    expect(parse(`traveller-locale=${travellerLocale}`)).toEqual({
      ...defaultExpectedInfo,
      travellerLocale,
    })
  })

  it('should have meta', () => {
    expect(parse(getQueryString(meta))).toEqual({
      ...defaultExpectedInfo,
      meta: expectedMeta,
    })
  })

  it('should have meta customFields', () => {
    const customFields = {
      'custom-field': 'custom field',
      test: 'test',
    }

    expect(parse(getQueryString(customFields))).toEqual({
      ...defaultExpectedInfo,
      customFields,
    })
  })

  it('should have provided bookingType', () => {
    expect(parse(`booking-type=${BookingTypes.ASAP}`)).toEqual({
      ...defaultExpectedInfo,
      bookingType: BookingTypes.ASAP,
    })
  })

  it('should set CUSTOM bookingType in case of unexpected booking type parameter', () => {
    expect(parse(`booking-type=test`)).toEqual({
      ...defaultExpectedInfo,
      bookingType: BookingTypes.CUSTOM,
    })
  })

  it('should move unexpected leg parameters to customFields', () => {
    const fields = {
      'leg-1-dropoff': 'dropoff',
      'leg-1-dropoff-some-data': 'some-data',
    }

    expect(parse(getQueryString(fields))).toEqual({
      ...defaultExpectedInfo,
      legs: [
        {
          dropoff: fields['leg-1-dropoff'],
          pickupPosition: undefined,
          dropoffPosition: undefined,
        },
      ],
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

    it('should have bookingType', () => {
      expect(getJourneyLegs([...toPairs(firstJourneyLeg), ...toPairs(firstJourneyLegBookingType)])).toEqual([
        {
          ...expectedFirstJourneyLeg,
          ...expectedFirstJourneyLegBookingType,
        },
      ])
    })
  })
})
