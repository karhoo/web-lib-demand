import { mocked } from 'ts-jest/utils'
import toPairs from 'lodash/toPairs'
import isUndefined from 'lodash/isUndefined'
import flatten from 'lodash/flatten'
import { Deeplink } from './resolve'
import {
  LocationAddressDetailsResponse,
  PoiSearchResponse,
  QuotesAvailabilityResponse,
  ResolveResponse,
} from './types'
import { HttpService, LocationService, PoiService, QuotesService } from './api'
import { HttpResponse } from './api/types'
import {
  firstJourneyLegWithPlaceOnly,
  firstJourneyLegWithKpoiOnly,
  firstJourneyLegWithPlaceIdOnly,
  secondJourneyLeg,
  passengerInfo,
} from './testData'

const getMockedPoiSearchResponse = (data: any): HttpResponse<PoiSearchResponse> => ({
  ok: true,
  status: 200,
  body: {
    pois: [
      {
        id: `poi_placeId:${data.searchKey}`,
        address: {
          display_address: `poi_display_address:${data.searchKey}`,
        },
      },
    ],
  },
})

const getMockedErrorPoiSearchResponse = (): HttpResponse<PoiSearchResponse> => ({
  ok: false,
  status: 500,
  error: {
    code: 'K001',
    message: `Poi: Something went wrong`,
  },
})

const getMockedQuotesAvailabilityResponse = (): HttpResponse<QuotesAvailabilityResponse> => ({
  ok: true,
  status: 200,
  body: {
    availabilities: [{ availability_id: 'availability_id' }],
    categories: ['test'],
  },
})

const getMockedErrorQuotesAvailabilityResponse = (): HttpResponse<QuotesAvailabilityResponse> => ({
  ok: false,
  status: 500,
  error: {
    code: 'K001',
    message: `Availability: Something went wrong`,
  },
})

const getMockedLocationAddressDetailsResponse = (
  data: any
): HttpResponse<LocationAddressDetailsResponse> => ({
  ok: true,
  status: 200,
  body: {
    place_id: `location_placeId:${data.placeId}`,
    address: {
      display_address: `location_display_address:${data.placeId}`,
    },
  },
})

const getMockedErrorLocationAddressDetailsResponse = (
  data: any
): HttpResponse<LocationAddressDetailsResponse> => ({
  ok: false,
  status: 500,
  error: {
    code: 'K001',
    message: `Location: Something went wrong`,
  },
})

const mockLocationGetAddressDetails = jest.fn((data: any) => {
  return Promise.resolve(getMockedLocationAddressDetailsResponse(data))
})

const mockPoiSearch = jest.fn((data: any) => {
  return Promise.resolve(getMockedPoiSearchResponse(data))
})

const mockQuotesCheckAvailability = jest.fn(() => Promise.resolve(getMockedQuotesAvailabilityResponse()))

const mockHttpGet = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { get: true } }))
const mockHttpPost = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { post: true } }))
const mockHttpPut = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { put: true } }))
const mockHttpRemove = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { remove: true } }))

jest.mock('./api', () => ({
  HttpService: jest.fn().mockImplementation(() => {
    return {
      get: mockHttpGet,
      post: mockHttpPost,
      put: mockHttpPut,
      remove: mockHttpRemove,
    }
  }),
  LocationService: jest.fn().mockImplementation(() => {
    return {
      getAddressDetails: mockLocationGetAddressDetails,
    }
  }),
  PoiService: jest.fn().mockImplementation(() => {
    return {
      search: mockPoiSearch,
    }
  }),
  QuotesService: jest.fn().mockImplementation(() => {
    return {
      checkAvailability: mockQuotesCheckAvailability,
    }
  }),
}))

describe('Deeplink', () => {
  const getSearchString = (legs?: any[]) => {
    const legParams = legs ? flatten(legs.map(toPairs)) : toPairs(firstJourneyLegWithPlaceOnly)

    return (
      '?' +
      new URLSearchParams(
        [...legParams, ...toPairs(passengerInfo)].filter(([, value]) => !isUndefined(value)) as [
          string,
          string
        ][]
      ).toString()
    )
  }

  beforeEach(() => {
    mocked(LocationService).mockClear()
    mocked(PoiService).mockClear()
    mocked(QuotesService).mockClear()

    mockLocationGetAddressDetails.mockClear()
    mockPoiSearch.mockClear()
    mockQuotesCheckAvailability.mockClear()
  })

  describe('resolve', () => {
    const resolve = (
      expects: (result: ResolveResponse, subscriber: any) => void,
      done: jest.DoneCallback,
      legs?: any[]
    ) => {
      const subscriber = jest.fn((result: ResolveResponse) => {
        if (result.done === true) {
          expects(result, subscriber)
          done()
        }
      })

      const deeplink = new Deeplink(getSearchString(legs), {
        url: 'http://url',
        getDefaultRequestOptions: () => ({}),
      })

      deeplink.resolve(subscriber)
    }

    const getPoiSubscriberResult = (
      response: HttpResponse<PoiSearchResponse>,
      type: string,
      baseValue: string
    ) => {
      const result = response.ok
        ? {
            ok: true,
            data: {
              placeId: response.body.pois?.[0]?.id,
              displayAddress: response.body.pois?.[0]?.address.display_address,
              poiInfo: response.body.pois?.[0],
            },
          }
        : {
            ok: false,
            error: response.error,
          }

      return {
        done: false,
        leg: 0,
        place: {
          result,
          type,
          baseValue,
        },
      }
    }

    const getAddressDetailsSubscriberResult = (
      response: HttpResponse<LocationAddressDetailsResponse>,
      type: string,
      baseValue: string
    ) => {
      const result = response.ok
        ? {
            ok: true,
            data: {
              placeId: response.body.place_id,
              displayAddress: response.body.address?.display_address,
              placeInfo: response.body,
            },
          }
        : {
            ok: false,
            error: response.error,
          }

      return {
        done: false,
        leg: 0,
        place: {
          result,
          type,
          baseValue,
        },
      }
    }

    it('should not have errors', done => {
      resolve(result => {
        if (result.done === true) {
          expect(result.error).toBe(undefined)
        }
      }, done)
    })

    it('should call search of PoiService twice', done => {
      resolve(result => {
        expect(mockPoiSearch).toBeCalledTimes(2)
        expect(mockPoiSearch).toBeCalledWith({
          paginationRowCount: 1,
          paginationOffset: 0,
          searchKey: firstJourneyLegWithPlaceOnly['leg-1-pickup'],
        })
        expect(mockPoiSearch).toBeCalledWith({
          paginationRowCount: 1,
          paginationOffset: 0,
          searchKey: firstJourneyLegWithPlaceOnly['leg-1-dropoff'],
        })
      }, done)
    })

    it('should call subscriber with poi data when pickup and dropoff are provided', done => {
      resolve((result, subscriber) => {
        expect(subscriber).toBeCalledWith(
          getPoiSubscriberResult(
            getMockedPoiSearchResponse({ searchKey: firstJourneyLegWithPlaceOnly['leg-1-pickup'] }),
            'pickup',
            firstJourneyLegWithPlaceOnly['leg-1-pickup']
          )
        )
        expect(subscriber).toBeCalledWith(
          getPoiSubscriberResult(
            getMockedPoiSearchResponse({ searchKey: firstJourneyLegWithPlaceOnly['leg-1-dropoff'] }),
            'dropoff',
            firstJourneyLegWithPlaceOnly['leg-1-dropoff']
          )
        )
      }, done)
    })

    it('should call subscriber with poi error', done => {
      mockPoiSearch.mockReturnValueOnce(Promise.resolve(getMockedErrorPoiSearchResponse()))

      resolve((result, subscriber) => {
        expect(subscriber).toBeCalledWith(
          getPoiSubscriberResult(
            getMockedErrorPoiSearchResponse(),
            'pickup',
            firstJourneyLegWithPlaceOnly['leg-1-pickup']
          )
        )
      }, done)
    })

    it('should call checkAvailability of QuotesService once', done => {
      resolve(result => {
        expect(mockQuotesCheckAvailability).toBeCalledTimes(1)
        expect(mockQuotesCheckAvailability).toBeCalledWith({
          originPlaceId: `poi_placeId:${firstJourneyLegWithPlaceOnly['leg-1-pickup']}`,
          destinationPlaceId: `poi_placeId:${firstJourneyLegWithPlaceOnly['leg-1-dropoff']}`,
          dateRequired: firstJourneyLegWithPlaceOnly['leg-1-pickup-time'],
        })
      }, done)
    })

    it('should call subscriber with availability response', done => {
      resolve((result, subscriber) => {
        expect(subscriber).toBeCalledWith({
          done: false,
          leg: 0,
          availability: {
            ok: true,
            data: {
              placeId: `poi_placeId:${firstJourneyLegWithPlaceOnly['leg-1-pickup']}`,
              destinationPlaceId: `poi_placeId:${firstJourneyLegWithPlaceOnly['leg-1-dropoff']}`,
              date: firstJourneyLegWithPlaceOnly['leg-1-pickup-time'],
            },
          },
        })
      }, done)
    })

    it('should call checkAvailability of QuotesService once with empty destinationPlaceId when dropoff does not exists', done => {
      const legs = [{ ...firstJourneyLegWithPlaceOnly, 'leg-1-dropoff': undefined }]

      resolve(
        (result: ResolveResponse) => {
          expect(mockQuotesCheckAvailability).toBeCalledTimes(1)
          expect(mockQuotesCheckAvailability).toBeCalledWith({
            originPlaceId: `poi_placeId:${firstJourneyLegWithPlaceOnly['leg-1-pickup']}`,
            dateRequired: firstJourneyLegWithPlaceOnly['leg-1-pickup-time'],
          })
        },
        done,
        legs
      )
    })

    it('should call checkAvailability of QuotesService once with only originPlaceId when pickup does not exists', done => {
      const legs = [
        { ...firstJourneyLegWithPlaceOnly, 'leg-1-pickup': undefined, 'leg-1-pickup-time': undefined },
      ]

      resolve(
        (result: ResolveResponse) => {
          expect(mockQuotesCheckAvailability).toBeCalledTimes(1)
          expect(mockQuotesCheckAvailability).toBeCalledWith({
            originPlaceId: `poi_placeId:${firstJourneyLegWithPlaceOnly['leg-1-dropoff']}`,
          })
        },
        done,
        legs
      )
    })

    it('should call checkAvailability of QuotesService twice', done => {
      const legs = [
        firstJourneyLegWithPlaceOnly,
        {
          ...secondJourneyLeg,
          'leg-2-pickup-kpoi': undefined,
          'leg-2-pickup-place_id': undefined,
          'leg-2-dropoff-kpoi': undefined,
          'leg-2-dropoff-place_id': undefined,
        },
      ]

      resolve(
        (result: ResolveResponse) => {
          expect(mockQuotesCheckAvailability).toBeCalledTimes(2)
        },
        done,
        legs
      )
    })

    it('should not call checkAvailability of QuotesService if call to Poi Service returns error', done => {
      mockPoiSearch.mockReturnValueOnce(Promise.resolve(getMockedErrorPoiSearchResponse()))

      resolve((result: ResolveResponse) => {
        expect(mockQuotesCheckAvailability).toBeCalledTimes(0)
      }, done)
    })

    it('should call checkAvailability of QuotesService once when both legs has the same search params', done => {
      const legs = [firstJourneyLegWithPlaceOnly, firstJourneyLegWithPlaceOnly]

      resolve(
        (result: ResolveResponse) => {
          expect(mockQuotesCheckAvailability).toBeCalledTimes(1)
        },
        done,
        legs
      )
    })

    it('should call getAddressDetails of LocationService twice when place_id is provided', done => {
      const legs = [firstJourneyLegWithPlaceIdOnly]

      resolve(
        (result: ResolveResponse) => {
          expect(mockLocationGetAddressDetails).toBeCalledTimes(2)
          expect(mockLocationGetAddressDetails).toBeCalledWith({
            placeId: firstJourneyLegWithPlaceIdOnly['leg-1-pickup-place_id'],
          })
          expect(mockLocationGetAddressDetails).toBeCalledWith({
            placeId: firstJourneyLegWithPlaceIdOnly['leg-1-dropoff-place_id'],
          })
        },
        done,
        legs
      )
    })

    it('should call subscriber with address details response', done => {
      const legs = [firstJourneyLegWithPlaceIdOnly]

      resolve(
        (result, subscriber) => {
          expect(subscriber).toBeCalledWith(
            getAddressDetailsSubscriberResult(
              getMockedLocationAddressDetailsResponse({
                placeId: firstJourneyLegWithPlaceIdOnly['leg-1-pickup-place_id'],
              }),
              'pickupPlaceId',
              firstJourneyLegWithPlaceIdOnly['leg-1-pickup-place_id']
            )
          )
          expect(subscriber).toBeCalledWith(
            getAddressDetailsSubscriberResult(
              getMockedLocationAddressDetailsResponse({
                placeId: firstJourneyLegWithPlaceIdOnly['leg-1-dropoff-place_id'],
              }),
              'dropoffPlaceId',
              firstJourneyLegWithPlaceIdOnly['leg-1-dropoff-place_id']
            )
          )
        },
        done,
        legs
      )
    })

    it('should call search of PoiService twice when kpoi is provided', done => {
      const legs = [firstJourneyLegWithKpoiOnly]

      resolve(
        (result: ResolveResponse) => {
          expect(mockPoiSearch).toBeCalledTimes(2)
        },
        done,
        legs
      )
    })

    it('should call search of PoiService three times', done => {
      const legs = [
        firstJourneyLegWithPlaceOnly,
        {
          ...secondJourneyLeg,
          'leg-2-pickup-kpoi': undefined,
          'leg-2-pickup-place_id': undefined,
          'leg-2-dropoff-kpoi': undefined,
          'leg-2-dropoff-place_id': undefined,
          'leg-2-pickup': firstJourneyLegWithPlaceOnly['leg-1-pickup'],
          'leg-2-dropoff': 'Some random place',
        },
      ]

      resolve(
        (result: ResolveResponse) => {
          expect(mockPoiSearch).toBeCalledTimes(3)
        },
        done,
        legs
      )
    })

    it('should call search of PoiService two times if first journey is opposite to second', done => {
      const legs = [
        firstJourneyLegWithPlaceOnly,
        {
          ...secondJourneyLeg,
          'leg-2-pickup-kpoi': undefined,
          'leg-2-pickup-place_id': undefined,
          'leg-2-dropoff-kpoi': undefined,
          'leg-2-dropoff-place_id': undefined,
          'leg-2-pickup': firstJourneyLegWithPlaceOnly['leg-1-dropoff'],
          'leg-2-dropoff': firstJourneyLegWithPlaceOnly['leg-1-pickup'],
        },
      ]

      resolve(
        (result: ResolveResponse) => {
          expect(mockPoiSearch).toBeCalledTimes(2)
        },
        done,
        legs
      )
    })

    it('should not call subscriber after unsubscribe was called', async () => {
      const subscriber = jest.fn()
      const deeplink = new Deeplink(getSearchString(), {
        url: 'http://url',
        getDefaultRequestOptions: () => ({}),
      })

      const result = deeplink.resolve(subscriber)

      result.unsubscribe()

      await new Promise(resolve => setTimeout(resolve, 10))

      expect(subscriber).toHaveBeenCalledTimes(0)
    })

    it('should call subscriber 2 times', async () => {
      mockQuotesCheckAvailability.mockReturnValueOnce(
        new Promise(resolve => setTimeout(() => resolve(getMockedQuotesAvailabilityResponse()), 20))
      )

      const subscriber = jest.fn()
      const deeplink = new Deeplink(getSearchString(), {
        url: 'http://url',
        getDefaultRequestOptions: () => ({}),
      })

      const result = deeplink.resolve(subscriber)

      await new Promise(resolve => setTimeout(resolve, 10))

      result.unsubscribe()

      expect(subscriber).toHaveBeenCalledTimes(2)
    })
  })
})
