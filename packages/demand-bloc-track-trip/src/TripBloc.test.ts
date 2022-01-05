import { Observable, Subject } from 'rxjs'
import { mocked } from 'jest-mock'
import {
  TripStatuses,
  HttpResponse,
  TripFollowResponse,
  SearchResponse,
  BookATripResponse,
  OrderOptions,
} from '@karhoo/demand-api'
import {
  getMockedTrackTripResponse,
  getMockedErrorTrackTripResponse,
  getMockedFinalFareResponse,
  getMockedSearchResponse,
  getMockedCancelResponse,
  testBookings,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import polling from './polling'
import * as transformer from './tripTransformer'

import { TripBloc } from './TripBloc'

jest.mock('./polling')

describe('TripBloc', () => {
  const defaultTrackTripResponse = getMockedTrackTripResponse()
  const defaultFinalFareResponse = getMockedFinalFareResponse()
  const defaultSearchResponse = getMockedSearchResponse()
  const defaultCancelResponse = getMockedCancelResponse()

  const tripServiceMock = {
    cancelByFollowCode: jest.fn((): Promise<any> => Promise.resolve({})),
    trackTrip: jest.fn(
      (): Promise<HttpResponse<TripFollowResponse>> => Promise.resolve(defaultTrackTripResponse)
    ),
    search: jest.fn((): Promise<HttpResponse<SearchResponse>> => Promise.resolve(defaultSearchResponse)),
    cancel: jest.fn((): Promise<any> => Promise.resolve(defaultCancelResponse)),
    cancelWithTripsFetching: jest.fn((): Promise<any> => Promise.resolve(defaultCancelResponse)),
  }

  const fareServiceMock = {
    status: jest.fn(() => Promise.resolve(defaultFinalFareResponse)),
  }

  const storageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  }

  let bloc: TripBloc

  beforeEach(() => {
    jest.clearAllMocks()

    bloc = new TripBloc(tripServiceMock, fareServiceMock, storageMock)
  })

  afterEach(() => {
    bloc.dispose()
  })

  describe('cancelByFollowCode', () => {
    it('should call cancelByFollowCode', () => {
      const code = 'code'
      const params = {
        reason: 'reason',
      }

      bloc.cancelByFollowCode(code, params)

      expect(tripServiceMock.cancelByFollowCode).toHaveBeenCalledTimes(1)
      expect(tripServiceMock.cancelByFollowCode).toHaveBeenCalledWith(code, params)
    })
  })

  describe('track', () => {
    const id = 'id'
    let promise: Promise<void>

    beforeEach(() => {
      let resolve: Function

      promise = new Promise(r => {
        resolve = r
      })

      mocked(polling).mockImplementation((fn: () => any) => {
        return new Observable(observer => {
          fn().then((response: any) => {
            observer.next(response)
            observer.complete()
            resolve()
          })
        })
      })
    })

    it('should call poll', () => {
      mocked(polling).mockReset()
      mocked(polling).mockImplementationOnce(() => new Observable(observer => {})) //eslint-disable-line

      bloc.track(id)

      expect(polling).toBeCalledTimes(1)
    })

    it('should call tripTransformer', async () => {
      jest.spyOn(transformer, 'tripTransformer')

      bloc.track(id)

      await promise

      expect(transformer.tripTransformer).toBeCalledTimes(1)
      expect(transformer.tripTransformer).toBeCalledWith(defaultTrackTripResponse.body)
    })

    it('should emit trip info', async () => {
      const tripInfo: transformer.TripFollowResponse[] = []
      const expectedTripInfo = [transformer.tripTransformer(defaultTrackTripResponse.body)]

      bloc.trip.subscribe(data => tripInfo.push(data))
      bloc.track(id)

      await promise

      expect(tripInfo).toEqual(expectedTripInfo)
    })

    it('should emit trip info', async () => {
      const tripInfo: transformer.TripFollowResponse[] = []
      const expectedTripInfo = [transformer.tripTransformer(defaultTrackTripResponse.body)]

      bloc.trip.subscribe(data => tripInfo.push(data))
      bloc.track(id)

      await promise

      expect(tripInfo).toEqual(expectedTripInfo)
    })

    it('should not emit trip info', async () => {
      tripServiceMock.trackTrip.mockReturnValueOnce(Promise.resolve(getMockedErrorTrackTripResponse()))

      const tripInfo: transformer.TripFollowResponse[] = []

      bloc.trip.subscribe(data => tripInfo.push(data))
      bloc.track(id)

      await promise

      expect(tripInfo).toEqual([])
    })

    it('should not emit trip info', async () => {
      tripServiceMock.trackTrip.mockReturnValueOnce(Promise.resolve(getMockedErrorTrackTripResponse()))

      const tripInfo: Array<any> = []

      bloc.error.subscribe(value => tripInfo.push(value))
      bloc.track(id)

      await promise

      expect(tripInfo).toEqual([true])
    })

    it('should call getItem twice', async () => {
      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(getMockedTrackTripResponse({ date_scheduled: '2020-05-28T01:00:00Z' }))
      )

      bloc.track(id)

      await promise

      expect(storageMock.getItem).toBeCalledTimes(2)
    })

    it('should call setItem once', async () => {
      const dateScheduled = '2020-05-28T01:00:00Z'

      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(getMockedTrackTripResponse({ date_scheduled: dateScheduled }))
      )

      storageMock.getItem.mockImplementationOnce(() => undefined).mockImplementationOnce(() => dateScheduled)

      bloc.track(id)

      await promise

      expect(storageMock.setItem).toBeCalledTimes(1)
      expect(storageMock.setItem).toBeCalledWith(expect.any(String), dateScheduled)
    })

    it('should not set pickup time in local storage when date_scheduled equals date_booked (ASAP booking)', async () => {
      const dateScheduled = '2020-05-28T01:00:00Z'
      const dateBooked = '2020-05-28T01:00:00Z'
      let pickUpTimeUpdated = false

      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(
          getMockedTrackTripResponse({ date_scheduled: dateScheduled, date_booked: dateBooked })
        )
      )

      bloc.pickUpTimeUpdates.subscribe(() => {
        pickUpTimeUpdated = true
      })
      bloc.track(id)

      await promise

      expect(storageMock.setItem).not.toBeCalled()
      expect(pickUpTimeUpdated).toBe(false)
    })

    it('should emit pickUpTimeUpdates', async () => {
      const previousDateScheduled = '2020-05-28T00:30:00Z'
      const dateScheduled = '2020-05-28T01:00:00Z'
      let pickUpTimeUpdated = false

      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(getMockedTrackTripResponse({ date_scheduled: dateScheduled }))
      )

      storageMock.getItem
        .mockImplementationOnce(() => previousDateScheduled)
        .mockImplementationOnce(() => previousDateScheduled)

      bloc.pickUpTimeUpdates.subscribe(() => {
        pickUpTimeUpdated = true
      })
      bloc.track(id)

      await promise

      expect(storageMock.setItem).toBeCalledTimes(1)
      expect(storageMock.setItem).toBeCalledWith(expect.any(String), dateScheduled)
      expect(pickUpTimeUpdated).toBe(true)
    })

    it('should not call getItem and setItem', async () => {
      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(getMockedTrackTripResponse({ date_scheduled: undefined }))
      )

      bloc.track(id)

      await promise

      expect(storageMock.getItem).toBeCalledTimes(0)
      expect(storageMock.setItem).toBeCalledTimes(0)
    })

    it('should call poll twice when status is COMPLETED', async () => {
      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(getMockedTrackTripResponse({ status: TripStatuses.COMPLETED }))
      )

      bloc.track(id)

      await promise

      expect(polling).toBeCalledTimes(2)
    })

    it('should call poll once when status is not in FinalFareStatuses', async () => {
      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(getMockedTrackTripResponse({ status: TripStatuses.CONFIRMED }))
      )

      bloc.track(id)

      await promise

      expect(polling).toBeCalledTimes(1)
    })

    it('should call poll once when status is COMPLETED and there is no trip_id', async () => {
      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(getMockedTrackTripResponse({ status: TripStatuses.COMPLETED, trip_id: undefined }))
      )

      bloc.track(id)

      await promise

      expect(polling).toBeCalledTimes(1)
    })

    it('should emit finalFare', done => {
      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(getMockedTrackTripResponse({ status: TripStatuses.COMPLETED }))
      )

      bloc.finalFare.subscribe(data => {
        expect(data).toEqual(defaultFinalFareResponse.body)
        done()
      })
      bloc.track(id)
    })
  })

  describe('getTrips', () => {
    const statuses = [TripStatuses.COMPLETED]
    const tripsPagination = 'upcomingTripsOffset'
    const paginationRowCount = 2
    const paginationOffset = 2
    const stream = new Subject<BookATripResponse[]>()
    const order_by: OrderOptions[] = ['date']

    it('should call searchTrips', async () => {
      const searchTripsSpy = jest.spyOn(TripBloc.prototype as any, 'searchTrips')

      await bloc.getTrips(stream, statuses, tripsPagination, paginationOffset, paginationRowCount, order_by)

      expect(searchTripsSpy).toHaveBeenCalled()
      expect(searchTripsSpy).toHaveBeenCalledWith(statuses, {
        pagination_offset: paginationOffset,
        pagination_row_count: paginationRowCount,
        order_by,
      })
    })

    it('should emit trips', async () => {
      const stream = new Subject<BookATripResponse[]>()

      const searchTripsSpy = jest.spyOn(TripBloc.prototype as any, 'searchTrips')
      searchTripsSpy.mockImplementationOnce(() => {
        return Promise.resolve(testBookings)
      })

      const trips: Array<BookATripResponse[]> = []
      stream.subscribe(data => trips.push(data))
      await bloc.getTrips(stream, statuses, tripsPagination, paginationOffset, paginationRowCount, order_by)

      stream.subscribe(data => trips.push(data))

      expect(trips).toEqual([testBookings])
    })
  })

  describe('upcoming, past trips', () => {
    const that = {
      upcomingTrips$: new Subject(),
      pastTrips$: new Subject(),
      options: {
        paginationRowCount: 2,
      },
      getTrips: jest.fn(),
      tripsOffset: {
        upcomingTripsOffset: 2,
        pastTripsOffset: 3,
      },
      getUpcomingTrips: jest.fn(),
      getPastTrips: jest.fn(),
    }
    const statuses: TripStatuses[] = [TripStatuses.CONFIRMED, TripStatuses.REQUESTED]
    const upcomingTripsPagination = 'upcomingTripsOffset'
    const pastTripsPagination = 'pastTripsOffset'
    const paginationOffset = 2
    const order_by: OrderOptions[] = ['date']

    describe('getUpcomingTrips', () => {
      it('should call getTrips', () => {
        TripBloc.prototype.getUpcomingTrips.call(that, { paginationOffset, statuses, order_by })

        expect(that.getTrips).toHaveBeenCalledTimes(1)
        expect(that.getTrips).toHaveBeenCalledWith(
          that.upcomingTrips$,
          statuses,
          upcomingTripsPagination,
          paginationOffset,
          that.options.paginationRowCount,
          order_by
        )
      })
    })

    describe('getNextUpcomingTrips', () => {
      it('should call getUpcomintgTrips', () => {
        TripBloc.prototype.getNextUpcomingTrips.call(that)

        expect(that.getUpcomingTrips).toHaveBeenCalledTimes(1)
        expect(that.getUpcomingTrips).toHaveBeenCalledWith({
          paginationOffset: that.tripsOffset.upcomingTripsOffset,
        })
      })
    })

    describe('getPastTrips', () => {
      it('should call getTrips', () => {
        TripBloc.prototype.getPastTrips.call(that, { paginationOffset, statuses, order_by })

        expect(that.getTrips).toHaveBeenCalledTimes(1)
        expect(that.getTrips).toHaveBeenCalledWith(
          that.pastTrips$,
          statuses,
          pastTripsPagination,
          paginationOffset,
          that.options.paginationRowCount,
          order_by
        )
      })
    })

    describe('getNextPastTrips', () => {
      it('should call getPastTrips', () => {
        TripBloc.prototype.getNextPastTrips.call(that)

        expect(that.getPastTrips).toHaveBeenCalledTimes(1)
        expect(that.getPastTrips).toHaveBeenCalledWith({ paginationOffset: that.tripsOffset.pastTripsOffset })
      })
    })
  })

  describe('cancel', () => {
    it('should call cancel', async () => {
      const code = 'code'
      const params = {
        reason: 'reason',
      }

      await bloc.cancel(code, params)

      expect(tripServiceMock.cancel).toHaveBeenCalledTimes(1)
      expect(tripServiceMock.cancel).toHaveBeenCalledWith(code, params)
    })
  })

  describe('cancelWithTripsFetching', () => {
    it('should call cancel', async () => {
      const code = 'code'
      const cancellationParams = {
        reason: 'reason',
      }

      const searchParams = { paginationRowCount: 2 }

      await bloc.cancelWithTripsFetching(code, cancellationParams, searchParams)

      expect(tripServiceMock.cancel).toHaveBeenCalledTimes(1)
      expect(tripServiceMock.cancel).toHaveBeenCalledWith(code, cancellationParams)
    })

    it('should fetch upcoming trips after cancellation request', async () => {
      const code = 'code'
      const cancellationParams = {
        reason: 'reason',
      }

      const searchParams = { paginationRowCount: 2 }

      const getUpcomingTripsSpy = jest.spyOn(TripBloc.prototype, 'getUpcomingTrips')

      await bloc.cancelWithTripsFetching(code, cancellationParams, searchParams)

      expect(getUpcomingTripsSpy).toHaveBeenCalledTimes(1)
      expect(getUpcomingTripsSpy).toHaveBeenCalledWith(searchParams)
    })
  })

  it('should call unsubscribe of trackSubscription and fareSubscription', () => {
    const that = {
      trackSubscription: {
        unsubscribe: jest.fn(),
      },
      fareSubscription: {
        unsubscribe: jest.fn(),
      },
    }

    bloc.cancelPolling.call(that)

    expect(that.trackSubscription.unsubscribe).toBeCalledTimes(1)
  })
})
