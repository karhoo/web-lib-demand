import { codes, errorMessageByCode, getError } from './errors'
import { validate, validateLeg, validateLegToQuotes } from './validate'
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

import { trainTimeParameter, BookingTypes } from './constants'

describe('parse', () => {
  const baseDeeplinkData = {
    legs: [
      {
        ...expectedFirstJourneyLeg,
        pickupKpoi: undefined,
        pickupPlaceId: undefined,
        pickupPosition: undefined,
        dropoffKpoi: undefined,
        dropoffPlaceId: undefined,
        dropoffPosition: undefined,
      },
      {
        ...expectedSecondJourneyLeg,
        pickup: undefined,
        pickupPlaceId: undefined,
        pickupPosition: undefined,
        dropoff: undefined,
        dropoffPlaceId: undefined,
        dropoffPosition: undefined,
      },
    ],
    passengerInfo: expectedPassengerInfo,
    travellerLocale,
    bookingType: BookingTypes.PREBOOK,
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

  describe('in strict mode', () => {
    const strictValidateOptions = {strict: true}

    it('should return ok equals true for valid deeplink', () => {
      expect(validate(baseDeeplinkData)).toEqual({ ok: true })
    })

    it('should return ok equals true for valid deeplink when customFields exist', () => {
      expect(validate(getData({ customFields: { utm_campaign: 'test utm campaign ' } }))).toEqual({
        ok: true,
      })
    })

    it('should return ok equals true for valid deeplink when only legs exist', () => {
      const deeplinkData = {
        legs: baseDeeplinkData.legs,
        passengerInfo: {},
        bookingType: BookingTypes.PREBOOK,
        meta: {},
      }

      expect(validate(deeplinkData)).toEqual({ ok: true })
    })

    it('should return error when legs is empty array', () => {
      const deeplinkData = {
        legs: [],
        passengerInfo: {},
        bookingType: BookingTypes.PREBOOK,
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

    it('should return error if bookingType is neiter ASAP nor PRE-BOOK', () => {
      expect(validate(getData({ bookingType: BookingTypes.CUSTOM }))).toEqual({
        ok: false,
        errors: [getError(codes.DP010, 'bookingType')],
      })
    })

    describe('validateLeg', () => {
      const getData = (data: any) => ({
        ...baseDeeplinkData.legs[0],
        ...data,
      })

      it('should not return error when train time is defined and pickup time is undefined', () => {
        expect(
          validateLeg(
            getData({  meta: { [trainTimeParameter]: '2021-03-10T02:10:00Z' }, dropoff: 'Euston, London NW1 2DS' , pickup: undefined, pickupTime: undefined}),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([])
      })

      it('should return empty array when there is no errors', () => {
        expect(
          validateLeg(baseDeeplinkData.legs[0], BookingTypes.PREBOOK, 'legs.0', strictValidateOptions)
        ).toEqual([])
      })

      it('should return errors when there is no pickup and dropoff', () => {
        expect(
          validateLeg(
            getData({
              pickup: undefined,
              dropoff: undefined,
              pickupTime: undefined,
              pickupPosition: undefined,
              dropoffPosition: undefined,
            }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP001, 'legs.0'), expectedError(codes.DP001, 'legs.0.pickupTime')])
      })

      it('should return errors when pickup is the same as dropoff', () => {
        const pickup = 'place'

        expect(
          validateLeg(
            getData({ pickup, dropoff: pickup }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP006, 'legs.0')])
      })

      it('should return errors when there is pickup but it is empty string', () => {
        expect(
          validateLeg(
            getData({ pickup: '', dropoff: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP001, 'legs.0'), expectedError(codes.DP009, 'legs.0.pickup')])
      })

      it('should return errors when there is dropoff but it is empty string', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, dropoff: '', pickupTime: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP001, 'legs.0'), expectedError(codes.DP001, 'legs.0.pickupTime')])
      })

      it('should return errors when there is dropoff but it is empty string and time is sepcified', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, dropoff: '', pickupTime: '2021-12-09T11:46:00Z' }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP001, 'legs.0'), expectedError(codes.DP009, 'legs.0.pickup')])
      })

      it('should return errors when there is dropoff but there is no pickupTime', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, dropoff: 'dropoff', pickupTime: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP001, 'legs.0.pickupTime')])
      })

      it('should return errors when multiple pickups are provided', () => {
        expect(
          validateLeg(
            getData({ pickup: 'pickup', pickupPlaceId: 'pickupPlaceId' }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.pickup')])
      })

      it('should return errors when pickup and pickupPosition are provided', () => {
        expect(
          validateLeg(
            getData({ pickup: 'pickup', pickupPosition: { lat: '53.1243546', lng: '-0.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.pickup')])
      })

      it('should return errors when multiple dropoffs are provided', () => {
        expect(
          validateLeg(
            getData({ dropoff: 'dropoff', dropoffPlaceId: 'dropoffPlaceId' }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.dropoff')])
      })

      it('should return errors when dropoff and dropoffPosition are provided', () => {
        expect(
          validateLeg(
            getData({ dropoff: 'dropoff', dropoffPosition: { lat: '53.1243546', lng: '-0.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.dropoff')])
      })

      it('should return errors when dropoffPosition and pickupPosition are the same', () => {
        expect(
          validateLeg(
            getData({
              pickupTime: undefined,
              dropoff: undefined,
              dropoffPosition: { lat: '53.1243546', lng: '-0.1743561' },
              pickup: undefined,
              pickupPosition: { lat: '53.1243546', lng: '-0.1743561' },
            }),
            BookingTypes.ASAP,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP012, 'legs.0.pickup')])
      })

      it('should return errors when pickupPosition has incorrect format', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, pickupPosition: { lat: '90.1243546', lng: '-0.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP012, 'legs.0.pickupPosition')])
      })

      it('should return errors when dropoffPosition has incorrect format', () => {
        expect(
          validateLeg(
            getData({ dropoff: undefined, dropoffPosition: { lat: '54.124re3546', lng: '-180.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP012, 'legs.0.dropoffPosition')])
      })

      it('should return errors when one coordinate of pickupPosition is undefined', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, pickupPosition: { lat: undefined, lng: '-121.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP012, 'legs.0.pickupPosition')])
      })

      it('should return errors when one coordinate of dropoffPosition is undefined', () => {
        expect(
          validateLeg(
            getData({ dropoff: undefined, dropoffPosition: { lat: undefined, lng: '-165.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP012, 'legs.0.dropoffPosition')])
      })

      it('should return errors when multiple pickups with pickupKpoi are provided', () => {
        expect(
          validateLeg(
            getData({ pickupKpoi: 'pickupKpoi', pickupPlaceId: 'pickupPlaceId' }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.pickup')])
      })

      it('should return errors when pickupTime is provided and pickup not', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, pickupTime: '2021-12-09T11:46:00Z' }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP009, 'legs.0.pickup')])
      })

      it('should return errors when incorrect time format', () => {
        expect(
          validateLeg(
            getData({ pickup: 'pickup', pickupTime: '2020-08-09T18:31:42' }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([
          expectedError(codes.DP003, 'legs.0.pickupTime'),
          expectedError(codes.DP004, 'legs.0.pickupTime'),
        ])
      })

      it('should return errors if pickup is provided and pickupTime not', () => {
        expect(
          validateLeg(
            getData({ pickup: 'pickup', pickupTime: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP001, 'legs.0.pickupTime')])
      })

      it('should return multiple errors if multiple pickup is provided and pickupTime not', () => {
        expect(
          validateLeg(
            getData({ pickup: 'pickup', pickupPlaceId: 'pickupPlaceId', pickupTime: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([
          expectedError(codes.DP002, 'legs.0.pickup'),
          expectedError(codes.DP001, 'legs.0.pickupTime'),
        ])
      })

      it('should return errors if pickupTime has no timezone', () => {
        expect(
          validateLeg(
            getData({ pickupTime: '2020-08-09T18:31:42' }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([
          expectedError(codes.DP003, 'legs.0.pickupTime'),
          expectedError(codes.DP004, 'legs.0.pickupTime'),
        ])
      })

      it('should return errors if pickupTime has wrong format', () => {
        expect(
          validateLeg(
            getData({ pickupTime: '2020-08-09T18+01:00' }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP003, 'legs.0.pickupTime')])
      })

      it('should return empty array if pickupTime has default timezone', () => {
        expect(
          validateLeg(
            getData({ pickupTime: '2020-08-09T18:31:42Z' }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([])
      })

      it('should return empty array when legs contain valid meta', () => {
        expect(
          validateLeg(
            getData({
              meta: expectedFirstJourneyLegMeta,
              pickupMeta: expectedFirstJourneyLegPickupMeta,
              dropoffMeta: expectedFirstJourneyLegDropoffMeta,
            }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([])
      })

      it('should return errors if train-time has wrong format', () => {
        expect(
          validateLeg(
            getData({ meta: { [trainTimeParameter]: '2020-08-09T18+01:00' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP003, 'legs.0.meta.train-time')])
      })

      it('should return meta errors with train-time error if other meta fields are wrong format', () => {
        expect(
          validateLeg(
            getData({ meta: { train: 4312, [trainTimeParameter]: '2020-08-09T18+01:00' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([
          expectedError(codes.DP005, 'legs.0.meta.train'),
          expectedError(codes.DP003, 'legs.0.meta.train-time'),
        ])
      })

      it('should not return train-time errors if train-time is undefined', () => {
        expect(
          validateLeg(
            getData({ meta: { train: '4312' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([])
      })

      it('should return error if bookingType is neiter ASAP nor PRE-BOOK', () => {
        expect(
          validateLeg(getData({ pickupTime: undefined }), BookingTypes.ASAP, 'legs.0', strictValidateOptions)
        ).toEqual([])
      })

      it('should not return error if defaultBookingType is ASAP and pickupTime is undefined', () => {
        expect(
          validateLeg(
            getData({ bookingType: BookingTypes.CUSTOM }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP010, 'legs.0.bookingType')])
      })

      it('should return error if defaultBookingType is ASAP and pickupTime is specified', () => {
        expect(validateLeg(getData({}), BookingTypes.ASAP, 'legs.0', strictValidateOptions)).toEqual([
          expectedError(codes.DP011, 'legs.0.pickupTime'),
        ])
      })

      it('should not return error if bookingType of the leg is ASAP and pickupTime is undefined', () => {
        expect(
          validateLeg(
            getData({ bookingType: BookingTypes.ASAP, pickupTime: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([])
      })

      it('should return error if defaultBookingType is ASAP and pickupTime is specified', () => {
        expect(
          validateLeg(
            getData({ bookingType: BookingTypes.ASAP }),
            BookingTypes.PREBOOK,
            'legs.0',
            strictValidateOptions
          )
        ).toEqual([expectedError(codes.DP011, 'legs.0.pickupTime')])
      })
    })
  })

  describe('in relaxed mode', () => {
    const relaxedValidateOptions = { strict: false }

    it('should return ok equals true for valid deeplink', () => {
      expect(validate(baseDeeplinkData, relaxedValidateOptions)).toEqual({ ok: true })
    })

    it('should return ok equals true for deeplink without booking type', () => {
      const deeplinkData = {
        ...baseDeeplinkData,
        bookingType: undefined,
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(validate(deeplinkData, relaxedValidateOptions)).toEqual({ ok: true })
    })

    it('should return ok equals true for valid deeplink when customFields exist', () => {
      expect(validate(getData({ customFields: { utm_campaign: 'test utm campaign ' } }))).toEqual({
        ok: true,
      })
    })

    it('should return ok equals true for valid deeplink when only legs exist', () => {
      const deeplinkData = {
        legs: baseDeeplinkData.legs,
        passengerInfo: {},
        bookingType: BookingTypes.PREBOOK,
        meta: {},
      }

      expect(validate(deeplinkData, relaxedValidateOptions)).toEqual({ ok: true })
    })

    it('should return error when legs is empty array', () => {
      const deeplinkData = {
        legs: [],
        passengerInfo: {},
        bookingType: BookingTypes.PREBOOK,
        meta: {},
      }

      expect(validate(deeplinkData, relaxedValidateOptions)).toEqual({
        ok: false,
        errors: [getError(codes.DP001, 'legs')],
      })
    })

    it('should return error when passengers is not a number', () => {
      expect(validate(getData({ passengerInfo: { passengers: NaN } }), relaxedValidateOptions)).toEqual({
        ok: false,
        errors: [getError(codes.DP005, 'passengerInfo.passengers')],
      })
    })

    it('should return error when passengers is negative number', () => {
      expect(validate(getData({ passengerInfo: { passengers: -2 } }), relaxedValidateOptions)).toEqual({
        ok: false,
        errors: [getError(codes.DP005, 'passengerInfo.passengers')],
      })
    })

    it('should return error when passengers is float', () => {
      expect(validate(getData({ passengerInfo: { passengers: 2.22 } }), relaxedValidateOptions)).toEqual({
        ok: false,
        errors: [getError(codes.DP005, 'passengerInfo.passengers')],
      })
    })

    it('should return error when luggage is not a number', () => {
      expect(validate(getData({ passengerInfo: { luggage: NaN } }), relaxedValidateOptions)).toEqual({
        ok: false,
        errors: [getError(codes.DP005, 'passengerInfo.luggage')],
      })
    })

    it('should return error when one of the passengerInfo fileds is empty string', () => {
      expect(validate(getData({ passengerInfo: { email: '' } }), relaxedValidateOptions)).toEqual({
        ok: false,
        errors: [getError(codes.DP005, 'passengerInfo.email')],
      })
    })

    it('should return error when one of the meta fileds is string that contains only spaces', () => {
      expect(validate(getData({ meta: { 'test-field': '   ' } }), relaxedValidateOptions)).toEqual({
        ok: false,
        errors: [getError(codes.DP005, 'meta.test-field')],
      })
    })

    it('should return error when one of the customFields fileds is empty string', () => {
      expect(validate(getData({ customFields: { 'test-field': '' } }), relaxedValidateOptions)).toEqual({
        ok: false,
        errors: [getError(codes.DP005, 'customFields.test-field')],
      })
    })

    it('should return error if bookingType is neiter ASAP nor PRE-BOOK', () => {
      expect(validate(getData({ bookingType: BookingTypes.CUSTOM }), relaxedValidateOptions)).toEqual({
        ok: false,
        errors: [getError(codes.DP010, 'bookingType')],
      })
    })

    describe('validateLeg', () => {
      const getData = (data: any) => ({
        ...baseDeeplinkData.legs[0],
        ...data,
      })

      it('should return empty array when there is no errors', () => {
        expect(
          validateLeg(baseDeeplinkData.legs[0], BookingTypes.PREBOOK, 'legs.0', relaxedValidateOptions)
        ).toEqual([])
      })

      it('should not return errors when there is no pickup and dropoff', () => {
        expect(
          validateLeg(
            getData({
              pickup: undefined,
              dropoff: undefined,
              pickupTime: undefined,
              pickupPosition: undefined,
              dropoffPosition: undefined,
            }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should return errors when pickup is the same as dropoff', () => {
        const pickup = 'place'

        expect(
          validateLeg(
            getData({ pickup, dropoff: pickup }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP006, 'legs.0')])
      })

      it('should not return errors when there is pickup but it is empty string', () => {
        expect(
          validateLeg(
            getData({ pickup: '', dropoff: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should not return errors when there is dropoff but it is empty string', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, dropoff: '', pickupTime: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should not return errors when there is dropoff but it is empty string and time is sepcified', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, dropoff: '', pickupTime: '2021-12-09T11:46:00Z' }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should not return errors when there is dropoff but there is no pickupTime', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, dropoff: 'dropoff', pickupTime: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should return errors when multiple pickups are provided', () => {
        expect(
          validateLeg(
            getData({ pickup: 'pickup', pickupPlaceId: 'pickupPlaceId' }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.pickup')])
      })

      it('should return errors when pickup and pickupPosition are provided', () => {
        expect(
          validateLeg(
            getData({ pickup: 'pickup', pickupPosition: { lat: '53.1243546', lng: '-0.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.pickup')])
      })

      it('should return errors when multiple dropoffs are provided', () => {
        expect(
          validateLeg(
            getData({ dropoff: 'dropoff', dropoffPlaceId: 'dropoffPlaceId' }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.dropoff')])
      })

      it('should return errors when dropoff and dropoffPosition are provided', () => {
        expect(
          validateLeg(
            getData({ dropoff: 'dropoff', dropoffPosition: { lat: '53.1243546', lng: '-0.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.dropoff')])
      })

      it('should return errors when dropoffPosition and pickupPosition are the same', () => {
        expect(
          validateLeg(
            getData({
              pickupTime: undefined,
              dropoff: undefined,
              dropoffPosition: { lat: '53.1243546', lng: '-0.1743561' },
              pickup: undefined,
              pickupPosition: { lat: '53.1243546', lng: '-0.1743561' },
            }),
            BookingTypes.ASAP,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP012, 'legs.0.pickup')])
      })

      it('should return errors when pickupPosition has incorrect format', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, pickupPosition: { lat: '90.1243546', lng: '-0.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP012, 'legs.0.pickupPosition')])
      })

      it('should return errors when dropoffPosition has incorrect format', () => {
        expect(
          validateLeg(
            getData({ dropoff: undefined, dropoffPosition: { lat: '54.124re3546', lng: '-180.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP012, 'legs.0.dropoffPosition')])
      })

      it('should return errors when one coordinate of pickupPosition is undefined', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, pickupPosition: { lat: undefined, lng: '-121.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP012, 'legs.0.pickupPosition')])
      })

      it('should return errors when one coordinate of dropoffPosition is undefined', () => {
        expect(
          validateLeg(
            getData({ dropoff: undefined, dropoffPosition: { lat: undefined, lng: '-165.1743561' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP012, 'legs.0.dropoffPosition')])
      })

      it('should return errors when multiple pickups with pickupKpoi are provided', () => {
        expect(
          validateLeg(
            getData({ pickupKpoi: 'pickupKpoi', pickupPlaceId: 'pickupPlaceId' }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.pickup')])
      })

      it('should not return errors when pickupTime is provided and pickup not', () => {
        expect(
          validateLeg(
            getData({ pickup: undefined, pickupTime: '2021-12-09T11:46:00Z' }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should return errors when incorrect time format', () => {
        expect(
          validateLeg(
            getData({ pickup: 'pickup', pickupTime: '2020-08-09T18:31:42' }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([
          expectedError(codes.DP003, 'legs.0.pickupTime'),
          expectedError(codes.DP004, 'legs.0.pickupTime'),
        ])
      })

      it('should not return errors if pickup is provided and pickupTime not', () => {
        expect(
          validateLeg(
            getData({ pickup: 'pickup', pickupTime: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should return multiple errors if multiple pickup is provided and ignore missing pickupTime', () => {
        expect(
          validateLeg(
            getData({ pickup: 'pickup', pickupPlaceId: 'pickupPlaceId', pickupTime: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP002, 'legs.0.pickup')])
      })

      it('should return errors if pickupTime has no timezone', () => {
        expect(
          validateLeg(
            getData({ pickupTime: '2020-08-09T18:31:42' }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([
          expectedError(codes.DP003, 'legs.0.pickupTime'),
          expectedError(codes.DP004, 'legs.0.pickupTime'),
        ])
      })

      it('should return errors if pickupTime has wrong format', () => {
        expect(
          validateLeg(
            getData({ pickupTime: '2020-08-09T18+01:00' }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP003, 'legs.0.pickupTime')])
      })

      it('should return empty array if pickupTime has default timezone', () => {
        expect(
          validateLeg(
            getData({ pickupTime: '2020-08-09T18:31:42Z' }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should return empty array when legs contain valid meta', () => {
        expect(
          validateLeg(
            getData({
              meta: expectedFirstJourneyLegMeta,
              pickupMeta: expectedFirstJourneyLegPickupMeta,
              dropoffMeta: expectedFirstJourneyLegDropoffMeta,
            }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should return errors if train-time has wrong format', () => {
        expect(
          validateLeg(
            getData({ meta: { [trainTimeParameter]: '2020-08-09T18+01:00' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP003, 'legs.0.meta.train-time')])
      })

      it('should return meta errors with train-time error if other meta fields are wrong format', () => {
        expect(
          validateLeg(
            getData({ meta: { train: 4312, [trainTimeParameter]: '2020-08-09T18+01:00' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([
          expectedError(codes.DP005, 'legs.0.meta.train'),
          expectedError(codes.DP003, 'legs.0.meta.train-time'),
        ])
      })

      it('should not return train-time errors if train-time is undefined', () => {
        expect(
          validateLeg(
            getData({ meta: { train: '4312' } }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should return error if bookingType is neiter ASAP nor PRE-BOOK', () => {
        expect(
          validateLeg(getData({ pickupTime: undefined }), BookingTypes.ASAP, 'legs.0', relaxedValidateOptions)
        ).toEqual([])
      })

      it('should not return error if defaultBookingType is ASAP and pickupTime is undefined', () => {
        expect(
          validateLeg(
            getData({ bookingType: BookingTypes.CUSTOM }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP010, 'legs.0.bookingType')])
      })

      it('should return error if defaultBookingType is ASAP and pickupTime is specified', () => {
        expect(validateLeg(getData({}), BookingTypes.ASAP, 'legs.0', relaxedValidateOptions)).toEqual([
          expectedError(codes.DP011, 'legs.0.pickupTime'),
        ])
      })

      it('should not return error if bookingType of the leg is ASAP and pickupTime is undefined', () => {
        expect(
          validateLeg(
            getData({ bookingType: BookingTypes.ASAP, pickupTime: undefined }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([])
      })

      it('should return error if defaultBookingType is ASAP and pickupTime is specified', () => {
        expect(
          validateLeg(
            getData({ bookingType: BookingTypes.ASAP }),
            BookingTypes.PREBOOK,
            'legs.0',
            relaxedValidateOptions
          )
        ).toEqual([expectedError(codes.DP011, 'legs.0.pickupTime')])
      })
    })
  })

  describe('validateLegToQuotes', () => {
    const getData = (data: any) => ({
      ...baseDeeplinkData.legs[0],
      ...data,
    })

    const expectedResult = (code: string, path: string, ok = false) => ({
      errors: [expectedError(code, path)],
      ok,
    })

    it('should return error if pickup is provided', () => {
      expect(validateLegToQuotes(getData({ pickup: 'pickup' }), 'PRE-BOOK', 'legs.0')).toEqual(
        expectedResult(codes.DP013, 'legs.0')
      )
    })

    it('should return error if one of locations is not provided', () => {
      expect(
        validateLegToQuotes(
          getData({ pickup: undefined, pickupPlaceId: 'id1234', dropoff: undefined }),
          'PRE-BOOK',
          'leg'
        )
      ).toEqual(expectedResult(codes.DP014, 'leg'))
    })

    it('should return error if booking type is PREBOOK and pickup time is not provided', () => {
      expect(
        validateLegToQuotes(
          getData({
            pickup: undefined,
            pickupPlaceId: 'id1234',
            dropoff: undefined,
            dropoffPlaceId: 'id43657',
            pickupTime: undefined,
            bookingType: BookingTypes.PREBOOK,
          }),
          'PRE-BOOK',
          'legs.0'
        )
      ).toEqual(expectedResult(codes.DP001, 'legs.0.pickupTime'))
    })
  })
})
