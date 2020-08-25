import toPairs from 'lodash/toPairs'
import isUndefined from 'lodash/isUndefined'
import flatten from 'lodash/flatten'
import {
  HttpResponse,
  LocationAddressDetailsResponse,
  LocationAddressAutocompleteResponse,
  PoiSearchResponse,
} from '@karhoo/demand-api'
import {
  getApiMock,
  getMockedQuotesV2SearchResponse,
  getMockedPoiSearchResponse,
  getMockedLocationAddressDetailsResponse,
  getMockedErrorLocationAddressDetailsResponse,
  getMockedLocationAddressAutocompleteResponse,
  getMockedErrorLocationAddressAutocompleteResponse,
  getMockedErrorPoiSearchResponse,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import { ResolveResponse } from './types'
import { codes, getError } from './errors'
import {
  firstJourneyLegWithPlaceOnly,
  firstJourneyLegWithKpoiOnly,
  firstJourneyLegWithPlaceIdOnly,
  secondJourneyLeg,
  passengerInfo,
} from './testData'

import { Deeplink } from './Deeplink'

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

  const api = getApiMock()

  beforeEach(() => {
    api.mockClear()
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

      const deeplink = new Deeplink(getSearchString(legs), api)

      deeplink.resolve(subscriber)
    }

    const getPoiSubscriberResult = (
      response: HttpResponse<PoiSearchResponse>,
      isPickup: boolean,
      searchValue: string
    ) => {
      const result = response.ok
        ? {
            ok: true,
            data: {
              placePosition: {
                latitude: response.body.pois?.[0].position.latitude,
                longitude: response.body.pois?.[0].position.longitude,
              },
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
          ...result,
          isPickup,
          searchValue,
        },
      }
    }

    const getLocationGetAddressAutocompleteData = (
      response: HttpResponse<LocationAddressAutocompleteResponse>,
      isPickup: boolean,
      searchValue: string
    ) => {
      const result = response.ok
        ? {
            ok: true,
            data: {
              placeId: response.body.locations[0].place_id,
              displayAddress: response.body.locations[0].display_address,
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
          ...result,
          isPickup,
          searchValue,
        },
      }
    }

    const getAddressDetailsSubscriberResult = (
      response: HttpResponse<LocationAddressDetailsResponse>,
      isPickup: boolean,
      searchValue: string
    ) => {
      const result = response.ok
        ? {
            ok: true,
            data: {
              placePosition: {
                latitude: response.body.position?.latitude,
                longitude: response.body.position?.longitude,
              },
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
          ...result,
          isPickup,
          searchValue,
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

    it('should call getAddressAutocompleteData of LocationService twice', done => {
      resolve(() => {
        expect(api.locationService.getAddressAutocompleteData).toBeCalledTimes(2)
        expect(api.locationService.getAddressAutocompleteData).toBeCalledWith({
          query: firstJourneyLegWithPlaceOnly['leg-1-pickup'],
        })
        expect(api.locationService.getAddressAutocompleteData).toBeCalledWith({
          query: firstJourneyLegWithPlaceOnly['leg-1-dropoff'],
        })
      }, done)
    })

    it('should call subscriber with address autocomplete data when pickup and dropoff are provided', done => {
      resolve((result, subscriber) => {
        expect(subscriber).toBeCalledWith(
          getLocationGetAddressAutocompleteData(
            getMockedLocationAddressAutocompleteResponse({
              query: firstJourneyLegWithPlaceOnly['leg-1-pickup'],
            }),
            true,
            firstJourneyLegWithPlaceOnly['leg-1-pickup']
          )
        )
        expect(subscriber).toBeCalledWith(
          getLocationGetAddressAutocompleteData(
            getMockedLocationAddressAutocompleteResponse({
              query: firstJourneyLegWithPlaceOnly['leg-1-dropoff'],
            }),
            false,
            firstJourneyLegWithPlaceOnly['leg-1-dropoff']
          )
        )
      }, done)
    })

    it('should call subscriber with address autocomplete error', done => {
      api.locationService.getAddressAutocompleteData.mockReturnValueOnce(
        Promise.resolve(getMockedErrorLocationAddressAutocompleteResponse())
      )

      resolve((result, subscriber) => {
        expect(subscriber).toBeCalledWith(
          getLocationGetAddressAutocompleteData(
            getMockedErrorLocationAddressAutocompleteResponse(),
            true,
            firstJourneyLegWithPlaceOnly['leg-1-pickup']
          )
        )
      }, done)
    })

    it('should call search of PoiService twice', done => {
      const legs = [firstJourneyLegWithKpoiOnly]

      resolve(
        () => {
          expect(api.poiService.search).toBeCalledTimes(2)
          expect(api.poiService.search).toBeCalledWith({
            paginationOffset: 0,
            paginationRowCount: 1,
            searchKey: firstJourneyLegWithKpoiOnly['leg-1-pickup-kpoi'],
          })
          expect(api.poiService.search).toBeCalledWith({
            paginationOffset: 0,
            paginationRowCount: 1,
            searchKey: firstJourneyLegWithKpoiOnly['leg-1-dropoff-kpoi'],
          })
        },
        done,
        legs
      )
    })

    it('should call subscriber with poi data when pickupKpoi and dropoffKpoi are provided', done => {
      const legs = [firstJourneyLegWithKpoiOnly]

      resolve(
        (result, subscriber) => {
          expect(subscriber).toBeCalledWith(
            getPoiSubscriberResult(
              getMockedPoiSearchResponse({
                searchKey: firstJourneyLegWithKpoiOnly['leg-1-pickup-kpoi'],
              }),
              true,
              firstJourneyLegWithKpoiOnly['leg-1-pickup-kpoi']
            )
          )
          expect(subscriber).toBeCalledWith(
            getPoiSubscriberResult(
              getMockedPoiSearchResponse({
                searchKey: firstJourneyLegWithKpoiOnly['leg-1-dropoff-kpoi'],
              }),
              false,
              firstJourneyLegWithKpoiOnly['leg-1-dropoff-kpoi']
            )
          )
        },
        done,
        legs
      )
    })

    it('should call subscriber with poi error', done => {
      const legs = [firstJourneyLegWithKpoiOnly]

      api.poiService.search.mockReturnValueOnce(Promise.resolve(getMockedErrorPoiSearchResponse()))

      resolve(
        (result, subscriber) => {
          expect(subscriber).toBeCalledWith(
            getPoiSubscriberResult(
              getMockedErrorPoiSearchResponse(),
              true,
              firstJourneyLegWithKpoiOnly['leg-1-pickup-kpoi']
            )
          )
        },
        done,
        legs
      )
    })

    it('should call checkAvailability of QuotesService once', done => {
      resolve(() => {
        expect(api.quotesV2Service.quotesSearch).toBeCalledTimes(1)
        expect(api.quotesV2Service.quotesSearch).toBeCalledWith({
          originPlaceId: `autocomplete_placeId:${firstJourneyLegWithPlaceOnly['leg-1-pickup']}`,
          destinationPlaceId: `autocomplete_placeId:${firstJourneyLegWithPlaceOnly['leg-1-dropoff']}`,
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
            searchedParams: {
              originPlaceId: `autocomplete_placeId:${firstJourneyLegWithPlaceOnly['leg-1-pickup']}`,
              destinationPlaceId: `autocomplete_placeId:${firstJourneyLegWithPlaceOnly['leg-1-dropoff']}`,
              dateRequired: firstJourneyLegWithPlaceOnly['leg-1-pickup-time'],
            },
          },
        })
      }, done)
    })

    it('should call checkAvailability of QuotesService once with empty destinationPlaceId when dropoff does not exists', done => {
      const legs = [{ ...firstJourneyLegWithPlaceOnly, 'leg-1-dropoff': undefined }]

      resolve(
        () => {
          expect(api.quotesV2Service.quotesSearch).toBeCalledTimes(1)
          expect(api.quotesV2Service.quotesSearch).toBeCalledWith({
            originPlaceId: `autocomplete_placeId:${firstJourneyLegWithPlaceOnly['leg-1-pickup']}`,
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
        () => {
          expect(api.quotesV2Service.quotesSearch).toBeCalledTimes(1)
          expect(api.quotesV2Service.quotesSearch).toBeCalledWith({
            originPlaceId: `autocomplete_placeId:${firstJourneyLegWithPlaceOnly['leg-1-dropoff']}`,
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
        () => {
          expect(api.quotesV2Service.quotesSearch).toBeCalledTimes(2)
        },
        done,
        legs
      )
    })

    it('should not call checkAvailability of QuotesService if call to Poi Service returns error', done => {
      const legs = [firstJourneyLegWithKpoiOnly]

      api.poiService.search.mockReturnValueOnce(Promise.resolve(getMockedErrorPoiSearchResponse()))

      resolve(
        () => {
          expect(api.quotesV2Service.quotesSearch).toBeCalledTimes(0)
        },
        done,
        legs
      )
    })

    it('should call checkAvailability of QuotesService once when both legs has the same search params', done => {
      const legs = [firstJourneyLegWithPlaceOnly, firstJourneyLegWithPlaceOnly]

      resolve(
        () => {
          expect(api.quotesV2Service.quotesSearch).toBeCalledTimes(1)
        },
        done,
        legs
      )
    })

    it('should call getAddressDetails of LocationService twice when place_id is provided', done => {
      const legs = [firstJourneyLegWithPlaceIdOnly]

      resolve(
        () => {
          expect(api.locationService.getAddressDetails).toBeCalledTimes(2)
          expect(api.locationService.getAddressDetails).toBeCalledWith({
            placeId: firstJourneyLegWithPlaceIdOnly['leg-1-pickup-place_id'],
          })
          expect(api.locationService.getAddressDetails).toBeCalledWith({
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
              true,
              firstJourneyLegWithPlaceIdOnly['leg-1-pickup-place_id']
            )
          )
          expect(subscriber).toBeCalledWith(
            getAddressDetailsSubscriberResult(
              getMockedLocationAddressDetailsResponse({
                placeId: firstJourneyLegWithPlaceIdOnly['leg-1-dropoff-place_id'],
              }),
              false,
              firstJourneyLegWithPlaceIdOnly['leg-1-dropoff-place_id']
            )
          )
        },
        done,
        legs
      )
    })

    it('should call subscriber with address details error response', done => {
      const legs = [firstJourneyLegWithPlaceIdOnly]

      api.locationService.getAddressDetails.mockReturnValueOnce(
        Promise.resolve(getMockedErrorLocationAddressDetailsResponse())
      )

      resolve(
        (result, subscriber) => {
          expect(subscriber).toBeCalledWith(
            getAddressDetailsSubscriberResult(
              getMockedErrorLocationAddressDetailsResponse(),
              true,
              firstJourneyLegWithPlaceIdOnly['leg-1-pickup-place_id']
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
        () => {
          expect(api.poiService.search).toBeCalledTimes(2)
        },
        done,
        legs
      )
    })

    it('should call search of PoiService three times', done => {
      const legs = [
        firstJourneyLegWithKpoiOnly,
        {
          ...secondJourneyLeg,
          'leg-2-pickup': undefined,
          'leg-2-pickup-place_id': undefined,
          'leg-2-dropoff': undefined,
          'leg-2-dropoff-place_id': undefined,
          'leg-2-pickup-kpoi': firstJourneyLegWithKpoiOnly['leg-1-pickup-kpoi'],
          'leg-2-dropoff-kpoi': 'Some random place',
        },
      ]

      resolve(
        () => {
          expect(api.poiService.search).toBeCalledTimes(3)
        },
        done,
        legs
      )
    })

    it('should call search of PoiService two times if first journey is opposite to second', done => {
      const legs = [
        firstJourneyLegWithKpoiOnly,
        {
          ...secondJourneyLeg,
          'leg-2-pickup': undefined,
          'leg-2-pickup-place_id': undefined,
          'leg-2-dropoff': undefined,
          'leg-2-dropoff-place_id': undefined,
          'leg-2-pickup-kpoi': firstJourneyLegWithKpoiOnly['leg-1-dropoff-kpoi'],
          'leg-2-dropoff-kpoi': firstJourneyLegWithKpoiOnly['leg-1-pickup-kpoi'],
        },
      ]

      resolve(
        () => {
          expect(api.poiService.search).toBeCalledTimes(2)
        },
        done,
        legs
      )
    })

    it('should not call subscriber after unsubscribe was called', async () => {
      const subscriber = jest.fn()
      const deeplink = new Deeplink(getSearchString(), api)

      const result = deeplink.resolve(subscriber)

      result.unsubscribe()

      await new Promise(resolve => setTimeout(resolve, 10))

      expect(subscriber).toHaveBeenCalledTimes(0)
    })

    it('should call subscriber 2 times', async () => {
      api.quotesV2Service.quotesSearch.mockReturnValueOnce(
        new Promise(resolve => setTimeout(() => resolve(getMockedQuotesV2SearchResponse()), 20))
      )

      const subscriber = jest.fn()
      const deeplink = new Deeplink(getSearchString(), api)

      const result = deeplink.resolve(subscriber)

      await new Promise(resolve => setTimeout(resolve, 10))

      result.unsubscribe()

      expect(subscriber).toHaveBeenCalledTimes(2)
    })

    it('should throw error if deeplink is not valid', () => {
      const legs = [{ ...firstJourneyLegWithPlaceOnly, 'leg-1-pickup-time': undefined }]

      const deeplink = new Deeplink(getSearchString(legs), api)

      try {
        deeplink.resolve(jest.fn())
      } catch (error) {
        expect(error.message).toEqual(expect.any(String))
      }
    })
  })

  describe('isValid', () => {
    it('should return error when deeplink is not valid', () => {
      const legs = [{ ...firstJourneyLegWithPlaceOnly, 'leg-1-pickup-time': undefined }]

      const deeplink = new Deeplink(getSearchString(legs), api)

      expect(deeplink.isValid()).toEqual({ ok: false, errors: [getError(codes.DP001, 'legs.0.pickupTime')] })
    })
  })
})
