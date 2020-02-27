import { getJourneyLegs, parse } from './parse'
import toPairs from 'lodash/toPairs'
import kebabCase from 'lodash/kebabCase'

describe('parse', () => {
  const firstJourneyLeg = {
    'leg-1-pickup': '20 Rue Jean Rey, 75015 Paris, France',
    'leg-1-pickup-kpoi': 'MPH',
    'leg-1-pickup-place_id': 'pickup-place_id',
    'leg-1-dropoff': 'Mercure, Paris, Hotel',
    'leg-1-dropoff-kpoi': 'MPH',
    'leg-1-dropoff-place_id': 'dropoff-place_id',
    'leg-1-pickup-time': '2020-08-09T18:31:42-03:30',
  }

  const firstJourneyLegMeta = {
    'leg-1-m-test': 'test',
    'leg-1-m-second-test': 'second test',
  }

  const firstJourneyLegPickupMeta = {
    'leg-1-m-pickup-test': 'pickup test',
    'leg-1-m-pickup-second-test': 'pickup second test',
  }

  const firstJourneyLegDropoffMeta = {
    'leg-1-m-dropoff-test': 'dropoff test',
    'leg-1-m-dropoff-second-test': 'dropoff second test',
  }

  const secondJourneyLeg = {
    'leg-2-pickup': 'Mercure, Paris, Hotel',
    'leg-2-pickup-kpoi': 'MPH2',
    'leg-2-pickup-place_id': 'pickup-place_id2',
    'leg-2-dropoff': '45 Rue du Dr Babinski, 75018 Paris',
    'leg-2-dropoff-kpoi': '234',
    'leg-2-dropoff-place_id': 'dropoff-place_id2',
    'leg-2-pickup-time': '2020-08-10T18:31:42-03:30',
  }

  const passengerInfo = {
    email: 'email@of.user',
    firstName: 'first name',
    lastName: 'last name',
    luggage: '2',
    passengers: '3',
    phoneNumber: '+441234567890',
  }

  it('should return empty info', () => {
    expect(parse('')).toEqual({
      legs: [],
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      luggage: NaN,
      passengers: NaN,
      phoneNumber: undefined,
      travellerLocale: undefined,
      meta: {},
    })
  })

  it('should return passenger info', () => {
    expect(parse('')).toEqual({
      legs: [],
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      luggage: NaN,
      passengers: NaN,
      phoneNumber: undefined,
      travellerLocale: undefined,
      meta: {},
    })
  })

  it('should return passenger info', () => {
    expect(
      parse(
        toPairs(passengerInfo)
          .map(([key, value]) => `${kebabCase(key)}=${value}`)
          .join('&')
      )
    ).toEqual({
      legs: [],
      travellerLocale: undefined,
      meta: {},
      ...passengerInfo,
      luggage: parseInt(passengerInfo.luggage, 10),
      passengers: parseInt(passengerInfo.passengers, 10),
    })
  })

  describe('getJourneyLegs', () => {
    it('should return empty array', () => {
      expect(getJourneyLegs([])).toEqual([])
    })

    it('should return JourneyLeg', () => {
      expect(getJourneyLegs(toPairs(firstJourneyLeg))).toEqual([
        {
          pickup: firstJourneyLeg['leg-1-pickup'],
          pickupKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
          pickupPlaceId: firstJourneyLeg['leg-1-pickup-place_id'],
          pickupDate: firstJourneyLeg['leg-1-pickup-time'],
          pickupMeta: {},
          dropoff: firstJourneyLeg['leg-1-dropoff'],
          dropoffKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
          dropoffPlaceId: firstJourneyLeg['leg-1-dropoff-place_id'],
          dropOffMeta: {},
          meta: {},
        },
      ])
    })

    it('should return JourneyLegs when multiple legs are available', () => {
      expect(getJourneyLegs([...toPairs(firstJourneyLeg), ...toPairs(secondJourneyLeg)])).toEqual([
        {
          pickup: firstJourneyLeg['leg-1-pickup'],
          pickupKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
          pickupPlaceId: firstJourneyLeg['leg-1-pickup-place_id'],
          pickupDate: firstJourneyLeg['leg-1-pickup-time'],
          pickupMeta: {},
          dropoff: firstJourneyLeg['leg-1-dropoff'],
          dropoffKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
          dropoffPlaceId: firstJourneyLeg['leg-1-dropoff-place_id'],
          dropOffMeta: {},
          meta: {},
        },
        {
          pickup: secondJourneyLeg['leg-2-pickup'],
          pickupKpoi: secondJourneyLeg['leg-2-pickup-kpoi'],
          pickupPlaceId: secondJourneyLeg['leg-2-pickup-place_id'],
          pickupDate: secondJourneyLeg['leg-2-pickup-time'],
          pickupMeta: {},
          dropoff: secondJourneyLeg['leg-2-dropoff'],
          dropoffKpoi: secondJourneyLeg['leg-2-pickup-kpoi'],
          dropoffPlaceId: secondJourneyLeg['leg-2-dropoff-place_id'],
          dropOffMeta: {},
          meta: {},
        },
      ])
    })

    it('should have meta', () => {
      expect(getJourneyLegs([...toPairs(firstJourneyLeg), ...toPairs(firstJourneyLegMeta)])).toEqual([
        {
          pickup: firstJourneyLeg['leg-1-pickup'],
          pickupKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
          pickupPlaceId: firstJourneyLeg['leg-1-pickup-place_id'],
          pickupDate: firstJourneyLeg['leg-1-pickup-time'],
          pickupMeta: {},
          dropoff: firstJourneyLeg['leg-1-dropoff'],
          dropoffKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
          dropoffPlaceId: firstJourneyLeg['leg-1-dropoff-place_id'],
          dropOffMeta: {},
          meta: {
            test: firstJourneyLegMeta['leg-1-m-test'],
            'second-test': firstJourneyLegMeta['leg-1-m-second-test'],
          },
        },
      ])
    })

    it('should have pickup meta', () => {
      expect(getJourneyLegs([...toPairs(firstJourneyLeg), ...toPairs(firstJourneyLegPickupMeta)])).toEqual([
        {
          pickup: firstJourneyLeg['leg-1-pickup'],
          pickupKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
          pickupPlaceId: firstJourneyLeg['leg-1-pickup-place_id'],
          pickupDate: firstJourneyLeg['leg-1-pickup-time'],
          pickupMeta: {
            test: firstJourneyLegPickupMeta['leg-1-m-pickup-test'],
            'second-test': firstJourneyLegPickupMeta['leg-1-m-pickup-second-test'],
          },
          dropoff: firstJourneyLeg['leg-1-dropoff'],
          dropoffKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
          dropoffPlaceId: firstJourneyLeg['leg-1-dropoff-place_id'],
          dropOffMeta: {},
          meta: {},
        },
      ])
    })

    it('should have dropoff meta', () => {
      expect(getJourneyLegs([...toPairs(firstJourneyLeg), ...toPairs(firstJourneyLegDropoffMeta)])).toEqual([
        {
          pickup: firstJourneyLeg['leg-1-pickup'],
          pickupKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
          pickupPlaceId: firstJourneyLeg['leg-1-pickup-place_id'],
          pickupDate: firstJourneyLeg['leg-1-pickup-time'],
          pickupMeta: {},
          dropoff: firstJourneyLeg['leg-1-dropoff'],
          dropoffKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
          dropoffPlaceId: firstJourneyLeg['leg-1-dropoff-place_id'],
          dropOffMeta: {
            test: firstJourneyLegDropoffMeta['leg-1-m-dropoff-test'],
            'second-test': firstJourneyLegDropoffMeta['leg-1-m-dropoff-second-test'],
          },
          meta: {},
        },
      ])
    })
  })
})
