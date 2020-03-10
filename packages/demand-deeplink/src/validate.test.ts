import { camelCase, toPairs, fromPairs } from 'lodash'

import { codes, errorMessageByCode } from './errors'
import { validate, validateLeg } from './validate'

describe('parse', () => {
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

  // const firstJourneyLegMeta = {
  //   'leg-1-m-test': 'test',
  //   'leg-1-m-second-test': 'second test',
  // }

  // const firstJourneyLegPickupMeta = {
  //   'leg-1-m-pickup-test': 'pickup test',
  //   'leg-1-m-pickup-second-test': 'pickup second test',
  // }

  // const firstJourneyLegDropoffMeta = {
  //   'leg-1-m-dropoff-test': 'dropoff test',
  //   'leg-1-m-dropoff-second-test': 'dropoff second test',
  // }

  const secondJourneyLeg = {
    'leg-2-pickup': 'Mercure, Paris, Hotel',
    'leg-2-pickup-kpoi': 'MPH2',
    'leg-2-pickup-place_id': 'pickup-place_id2',
    'leg-2-dropoff': '45 Rue du Dr Babinski, 75018 Paris',
    'leg-2-dropoff-kpoi': '234',
    'leg-2-dropoff-place_id': 'dropoff-place_id2',
    'leg-2-pickup-time': '2020-08-10T18:31:42-03:30',
  }

  const baseDeeplinkData = {
    legs: [
      {
        pickup: firstJourneyLeg['leg-1-pickup'],
        pickupKpoi: undefined,
        pickupPlaceId: undefined,
        pickupDate: firstJourneyLeg['leg-1-pickup-time'],
        dropoff: firstJourneyLeg['leg-1-dropoff'],
        dropoffKpoi: undefined,
        dropoffPlaceId: undefined,
      },
      {
        pickup: undefined,
        pickupKpoi: secondJourneyLeg['leg-2-pickup-kpoi'],
        pickupPlaceId: undefined,
        pickupDate: secondJourneyLeg['leg-2-pickup-time'],
        dropoff: undefined,
        dropoffKpoi: secondJourneyLeg['leg-2-pickup-kpoi'],
        dropoffPlaceId: undefined,
      },
    ],
    passengerInfo: {
      ...fromPairs(toPairs(passengerInfo).map(([key, value]) => [camelCase(key), value])),
      luggage: parseInt(passengerInfo.luggage, 10),
      passengers: parseInt(passengerInfo.passengers, 10),
    },
    travellerLocale,
    meta: {
      first: meta['meta.first'],
      second: meta['meta.second'],
    },
  }

  // const expectedFirstJourneyLegMeta = {
  //   test: firstJourneyLegMeta['leg-1-m-test'],
  //   'second-test': firstJourneyLegMeta['leg-1-m-second-test'],
  // }

  // const expectedFirstJourneyLegPickupMeta = {
  //   test: firstJourneyLegPickupMeta['leg-1-m-pickup-test'],
  //   'second-test': firstJourneyLegPickupMeta['leg-1-m-pickup-second-test'],
  // }

  // const expectedFirstJourneyLegDropoffMeta = {
  //   test: firstJourneyLegDropoffMeta['leg-1-m-dropoff-test'],
  //   'second-test': firstJourneyLegDropoffMeta['leg-1-m-dropoff-second-test'],
  // }

  it('should return ok equals true for valid deeplink', () => {
    expect(validate(baseDeeplinkData)).toEqual({ ok: true })
  })

  it('should return ok equals true for valid deeplink when customFields exist', () => {
    const deeplinkData = {
      ...baseDeeplinkData,
      customFields: {
        utm_campaign: 'test utm campaign ',
      },
    }

    expect(validate(deeplinkData)).toEqual({ ok: true })
  })

  it('should return ok equals true for valid deeplink when only legs exist', () => {
    const deeplinkData = {
      legs: baseDeeplinkData.legs,
      passengerInfo: {},
      meta: {},
    }

    expect(validate(deeplinkData)).toEqual({ ok: true })
  })

  it('should return error when legs is empty array', () => {
    const deeplinkData = {
      legs: [],
      passengerInfo: {},
      meta: {},
    }

    expect(validate(deeplinkData)).toEqual({
      ok: false,
      errors: [{ code: codes.DP001, path: 'legs', error: errorMessageByCode[codes.DP001] }],
    })
  })

  it('should return error when passengers is not a number', () => {
    const deeplinkData = {
      ...baseDeeplinkData,
      passengerInfo: {
        passengers: NaN,
      },
    }

    expect(validate(deeplinkData)).toEqual({
      ok: false,
      errors: [
        { code: codes.DP005, path: 'passengerInfo.passengers', error: errorMessageByCode[codes.DP005] },
      ],
    })
  })

  it('should return error when passengers is negative number', () => {
    const deeplinkData = {
      ...baseDeeplinkData,
      passengerInfo: {
        passengers: -2,
      },
    }

    expect(validate(deeplinkData)).toEqual({
      ok: false,
      errors: [
        { code: codes.DP005, path: 'passengerInfo.passengers', error: errorMessageByCode[codes.DP005] },
      ],
    })
  })

  it('should return error when passengers is float', () => {
    const deeplinkData = {
      ...baseDeeplinkData,
      passengerInfo: {
        passengers: 2.22,
      },
    }

    expect(validate(deeplinkData)).toEqual({
      ok: false,
      errors: [
        { code: codes.DP005, path: 'passengerInfo.passengers', error: errorMessageByCode[codes.DP005] },
      ],
    })
  })

  it('should return error when luggage is not a number', () => {
    const deeplinkData = {
      ...baseDeeplinkData,
      passengerInfo: {
        luggage: NaN,
      },
    }

    expect(validate(deeplinkData)).toEqual({
      ok: false,
      errors: [{ code: codes.DP005, path: 'passengerInfo.luggage', error: errorMessageByCode[codes.DP005] }],
    })
  })

  it('should return error when one of the passengerInfo fileds is empty string', () => {
    const deeplinkData = {
      ...baseDeeplinkData,
      passengerInfo: {
        email: '',
      },
    }

    expect(validate(deeplinkData)).toEqual({
      ok: false,
      errors: [{ code: codes.DP005, path: 'passengerInfo.email', error: errorMessageByCode[codes.DP005] }],
    })
  })

  it('should return when one of the meta fileds is string that contains only spaces', () => {
    const deeplinkData = {
      ...baseDeeplinkData,
      meta: {
        'test-field': '   ',
      },
    }

    expect(validate(deeplinkData)).toEqual({
      ok: false,
      errors: [{ code: codes.DP005, path: 'meta.test-field', error: errorMessageByCode[codes.DP005] }],
    })
  })

  it('should return when one of the meta fileds is string that contains only spaces', () => {
    const deeplinkData = {
      ...baseDeeplinkData,
      customFields: {
        'test-field': '   ',
      },
    }

    expect(validate(deeplinkData)).toEqual({
      ok: false,
      errors: [
        { code: codes.DP005, path: 'customFields.test-field', error: errorMessageByCode[codes.DP005] },
      ],
    })
  })

  describe('validateLeg', () => {
    const getData = (data: any) => ({ // eslint-disable-line
      ...baseDeeplinkData.legs[0],
      ...data,
    })

    const expectedError = (code: string, path: string) => ({
      code,
      path,
      error: errorMessageByCode[code],
    })

    it('should return empty array when there is no errors', () => {
      expect(validateLeg(baseDeeplinkData.legs[0], 'legs.0')).toEqual([])
    })

    it('should return errors when there is no pickup and dropoff', () => {
      expect(validateLeg(getData({ pickup: undefined, dropoff: undefined }), 'legs.0')).toEqual([
        expectedError(codes.DP001, 'legs.0'),
      ])
    })

    it('should return errors when there is pickup but it is empty string', () => {
      expect(validateLeg(getData({ pickup: '', dropoff: undefined }), 'legs.0')).toEqual([
        expectedError(codes.DP005, 'legs.0.pickup'),
      ])
    })

    it('should return errors when there is dropoff but it is empty string', () => {
      expect(validateLeg(getData({ pickup: undefined, dropoff: '' }), 'legs.0')).toEqual([
        expectedError(codes.DP005, 'legs.0.dropoff'),
      ])
    })

    it('should return errors when multiple pickups are provided', () => {
      expect(validateLeg(getData({ pickup: 'pickup', pickupPlaceId: 'pickupPlaceId' }), 'legs.0')).toEqual([
        expectedError(codes.DP002, 'legs.0.pickup'),
      ])
    })

    it('should return errors when multiple dropoffs are provided', () => {
      expect(
        validateLeg(getData({ dropoff: 'dropoff', dropoffPlaceId: 'dropoffPlaceId' }), 'legs.0')
      ).toEqual([expectedError(codes.DP002, 'legs.0.dropoff')])
    })

    it('should return errors when multiple pickups with pickupKpoi are provided', () => {
      expect(
        validateLeg(getData({ pickupKpoi: 'pickupKpoi', pickupPlaceId: 'pickupPlaceId' }), 'legs.0')
      ).toEqual([expectedError(codes.DP002, 'legs.0.pickup')])
    })

    it('should return errors if pickup is provided and pickupDate not', () => {
      expect(validateLeg(getData({ pickup: 'pickup', pickupDate: undefined }), 'legs.0')).toEqual([
        expectedError(codes.DP001, 'legs.0.pickupDate'),
      ])
    })

    it('should return multiple errors if multiple pickup is provided and pickupTime not', () => {
      expect(
        validateLeg(
          getData({ pickup: 'pickup', pickupPlaceId: 'pickupPlaceId', pickupDate: undefined }),
          'legs.0'
        )
      ).toEqual([
        expectedError(codes.DP002, 'legs.0.pickup'),
        expectedError(codes.DP001, 'legs.0.pickupDate'),
      ])
    })

    it('should return errors if pickupDate has no timezone', () => {
      expect(validateLeg(getData({ pickupDate: '2020-08-09T18:31:42' }), 'legs.0')).toEqual([
        expectedError(codes.DP003, 'legs.0.pickupDate'),
        expectedError(codes.DP004, 'legs.0.pickupDate'),
      ])
    })

    it('should return errors if pickupDate has wrong format', () => {
      expect(validateLeg(getData({ pickupDate: '2020-08-09T18+01:00' }), 'legs.0')).toEqual([
        expectedError(codes.DP003, 'legs.0.pickupDate'),
      ])
    })

    it('should return empty array if pickupDate has default timezone', () => {
      expect(validateLeg(getData({ pickupDate: '2020-08-09T18:31:42Z' }), 'legs.0')).toEqual([])
    })
  })
})
