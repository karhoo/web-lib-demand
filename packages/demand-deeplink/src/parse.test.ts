import { camelCase, toPairs, fromPairs } from 'lodash'

import { getJourneyLegs, parse } from './parse'

describe('parse', () => {
  const getQueryString = (data: object) =>
    '?' +
    toPairs(data)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')

  const travellerLocale = 'en-GB'

  const passengerInfo = {
    email: 'email@of.user',
    'first-name': 'first name',
    'last-name': 'last name',
    luggage: '2',
    passengers: '3',
    'phone-number': '+441234567890',
  }

  const meta = {
    'meta.first': 'first meta',
    'meta.second': 'second-meta',
  }

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

  const expectedPassengerInfo = {
    ...fromPairs(toPairs(passengerInfo).map(([key, value]) => [camelCase(key), value])),
    luggage: parseInt(passengerInfo.luggage, 10),
    passengers: parseInt(passengerInfo.passengers, 10),
  }

  const expectedMeta = {
    first: meta['meta.first'],
    second: meta['meta.second'],
  }

  const expectedFirstJourneyLeg = {
    pickup: firstJourneyLeg['leg-1-pickup'],
    pickupKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
    pickupPlaceId: firstJourneyLeg['leg-1-pickup-place_id'],
    pickupDate: firstJourneyLeg['leg-1-pickup-time'],
    dropoff: firstJourneyLeg['leg-1-dropoff'],
    dropoffKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
    dropoffPlaceId: firstJourneyLeg['leg-1-dropoff-place_id'],
  }

  const expectedFirstJourneyLegMeta = {
    test: firstJourneyLegMeta['leg-1-m-test'],
    'second-test': firstJourneyLegMeta['leg-1-m-second-test'],
  }

  const expectedFirstJourneyLegPickupMeta = {
    test: firstJourneyLegPickupMeta['leg-1-m-pickup-test'],
    'second-test': firstJourneyLegPickupMeta['leg-1-m-pickup-second-test'],
  }

  const expectedFirstJourneyLegDropoffMeta = {
    test: firstJourneyLegDropoffMeta['leg-1-m-dropoff-test'],
    'second-test': firstJourneyLegDropoffMeta['leg-1-m-dropoff-second-test'],
  }

  const expectedSecondJourneyLeg = {
    pickup: secondJourneyLeg['leg-2-pickup'],
    pickupKpoi: secondJourneyLeg['leg-2-pickup-kpoi'],
    pickupPlaceId: secondJourneyLeg['leg-2-pickup-place_id'],
    pickupDate: secondJourneyLeg['leg-2-pickup-time'],
    dropoff: secondJourneyLeg['leg-2-dropoff'],
    dropoffKpoi: secondJourneyLeg['leg-2-pickup-kpoi'],
    dropoffPlaceId: secondJourneyLeg['leg-2-dropoff-place_id'],
  }

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
          ...toPairs(passengerInfo).map<[string, string]>(([key, value]) => [`leg-1-${key}`, value]),
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
