import { codes, errorMessageByCode, getError } from './errors'
import { validate, validateLeg } from './validate'
import {
  travellerLocale,
  expectedFirstJourneyLeg,
  expectedFirstJourneyLegDropoffMeta,
  expectedFirstJourneyLegMeta,
  expectedFirstJourneyLegPickupMeta,
  expectedPassengerInfo,
  expectedSecondJourneyLeg,
  expectedMeta,
} from './testData'

import { trainTime } from './constants'

describe('parse', () => {
  const baseDeeplinkData = {
    legs: [
      {
        ...expectedFirstJourneyLeg,
        pickupKpoi: undefined,
        pickupPlaceId: undefined,
        dropoffKpoi: undefined,
        dropoffPlaceId: undefined,
      },
      {
        ...expectedSecondJourneyLeg,
        pickup: undefined,
        pickupPlaceId: undefined,
        dropoff: undefined,
        dropoffPlaceId: undefined,
      },
    ],
    passengerInfo: expectedPassengerInfo,
    travellerLocale,
    meta: expectedMeta,
  }

  const getData = (data: any) => ({
    ...baseDeeplinkData,
    ...data,
  })

  const expectedError = (code: string, path: string) => ({
    code,
    path,
    error: errorMessageByCode[code],
  })

  it('should return ok equals true for valid deeplink', () => {
    expect(validate(baseDeeplinkData)).toEqual({ ok: true })
  })

  it('should return ok equals true for valid deeplink when customFields exist', () => {
    expect(validate(getData({ customFields: { utm_campaign: 'test utm campaign ' } }))).toEqual({ ok: true })
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
      errors: [getError(codes.DP001, 'legs')],
    })
  })

  it('should return error when passengers is not a number', () => {
    expect(validate(getData({ passengerInfo: { passengers: NaN } }))).toEqual({
      ok: false,
      errors: [getError(codes.DP005, 'passengerInfo.passengers')],
    })
  })

  it('should return error when passengers is negative number', () => {
    expect(validate(getData({ passengerInfo: { passengers: -2 } }))).toEqual({
      ok: false,
      errors: [getError(codes.DP005, 'passengerInfo.passengers')],
    })
  })

  it('should return error when passengers is float', () => {
    expect(validate(getData({ passengerInfo: { passengers: 2.22 } }))).toEqual({
      ok: false,
      errors: [getError(codes.DP005, 'passengerInfo.passengers')],
    })
  })

  it('should return error when luggage is not a number', () => {
    expect(validate(getData({ passengerInfo: { luggage: NaN } }))).toEqual({
      ok: false,
      errors: [getError(codes.DP005, 'passengerInfo.luggage')],
    })
  })

  it('should return error when one of the passengerInfo fileds is empty string', () => {
    expect(validate(getData({ passengerInfo: { email: '' } }))).toEqual({
      ok: false,
      errors: [getError(codes.DP005, 'passengerInfo.email')],
    })
  })

  it('should return error when one of the meta fileds is string that contains only spaces', () => {
    expect(validate(getData({ meta: { 'test-field': '   ' } }))).toEqual({
      ok: false,
      errors: [getError(codes.DP005, 'meta.test-field')],
    })
  })

  it('should return error when one of the customFields fileds is empty string', () => {
    expect(validate(getData({ customFields: { 'test-field': '' } }))).toEqual({
      ok: false,
      errors: [getError(codes.DP005, 'customFields.test-field')],
    })
  })

  describe('validateLeg', () => {
    const getData = (data: any) => ({
      ...baseDeeplinkData.legs[0],
      ...data,
    })

    it('should return empty array when there is no errors', () => {
      expect(validateLeg(baseDeeplinkData.legs[0], 'legs.0')).toEqual([])
    })

    it('should return errors when there is no pickup and dropoff', () => {
      expect(
        validateLeg(getData({ pickup: undefined, dropoff: undefined, pickupTime: undefined }), 'legs.0')
      ).toEqual([expectedError(codes.DP001, 'legs.0')])
    })

    it('should return errors when pickup is the same as dropoff', () => {
      const pickup = 'place'

      expect(validateLeg(getData({ pickup, dropoff: pickup }), 'legs.0')).toEqual([
        expectedError(codes.DP006, 'legs.0'),
      ])
    })

    it('should return errors when there is pickup but it is empty string', () => {
      expect(validateLeg(getData({ pickup: '', dropoff: undefined }), 'legs.0')).toEqual([
        expectedError(codes.DP005, 'legs.0.pickup'),
      ])
    })

    it('should return errors when there is dropoff but it is empty string', () => {
      expect(
        validateLeg(getData({ pickup: undefined, dropoff: '', pickupTime: undefined }), 'legs.0')
      ).toEqual([expectedError(codes.DP005, 'legs.0.dropoff')])
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

    it('should return errors when pickupTime is provided and pickup not', () => {
      expect(
        validateLeg(getData({ pickup: undefined, pickupTime: '2020-08-09T18:31:42' }), 'legs.0')
      ).toEqual([expectedError(codes.DP009, 'legs.0.pickupTime')])
    })

    it('should return errors if pickup is provided and pickupTime not', () => {
      expect(validateLeg(getData({ pickup: 'pickup', pickupTime: undefined }), 'legs.0')).toEqual([
        expectedError(codes.DP001, 'legs.0.pickupTime'),
      ])
    })

    it('should return multiple errors if multiple pickup is provided and pickupTime not', () => {
      expect(
        validateLeg(
          getData({ pickup: 'pickup', pickupPlaceId: 'pickupPlaceId', pickupTime: undefined }),
          'legs.0'
        )
      ).toEqual([
        expectedError(codes.DP002, 'legs.0.pickup'),
        expectedError(codes.DP001, 'legs.0.pickupTime'),
      ])
    })

    it('should return errors if pickupTime has no timezone', () => {
      expect(validateLeg(getData({ pickupTime: '2020-08-09T18:31:42' }), 'legs.0')).toEqual([
        expectedError(codes.DP003, 'legs.0.pickupTime'),
        expectedError(codes.DP004, 'legs.0.pickupTime'),
      ])
    })

    it('should return errors if pickupTime has wrong format', () => {
      expect(validateLeg(getData({ pickupTime: '2020-08-09T18+01:00' }), 'legs.0')).toEqual([
        expectedError(codes.DP003, 'legs.0.pickupTime'),
      ])
    })

    it('should return empty array if pickupTime has default timezone', () => {
      expect(validateLeg(getData({ pickupTime: '2020-08-09T18:31:42Z' }), 'legs.0')).toEqual([])
    })

    it('should return empty array when legs contain valid meta', () => {
      expect(
        validateLeg(
          getData({
            meta: expectedFirstJourneyLegMeta,
            pickupMeta: expectedFirstJourneyLegPickupMeta,
            dropoffMeta: expectedFirstJourneyLegDropoffMeta,
          }),
          'legs.0'
        )
      ).toEqual([])
    })

    it('should return errors if train-time has wrong format', () => {
      expect(validateLeg(getData({ meta: { [trainTime]: '2020-08-09T18+01:00' } }), 'legs.0')).toEqual([
        expectedError(codes.DP003, 'legs.0.meta.train-time'),
      ])
    })
  })
})
