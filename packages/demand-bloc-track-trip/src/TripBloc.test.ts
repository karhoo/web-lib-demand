import { Observable } from 'rxjs'
import { mocked } from 'ts-jest/utils'
import { TripStatuses, HttpResponse, TripFollowResponse } from '@karhoo/demand-api'
import {
  getMockedTrackTripResponse,
  getMockedErrorTrackTripResponse,
  getMockedFinalFareResponse,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import { poll } from './polling'
import * as transformer from './tripTransformer'

import { TripBloc } from './TripBloc'

jest.mock('./polling', () => ({ poll: jest.fn() }))

describe('TripBloc', () => {
  const defaultTrackTripResponse = getMockedTrackTripResponse()
  const defaultFinalFareResponse = getMockedFinalFareResponse()

  const tripServiceMock = {
    cancelByFollowCode: jest.fn((): Promise<any> => Promise.resolve({})),
    trackTrip: jest.fn(
      (): Promise<HttpResponse<TripFollowResponse>> => Promise.resolve(defaultTrackTripResponse)
    ),
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

      mocked(poll).mockImplementation((fn: () => any) => {
        return new Observable(observer => {
          fn()
            .then((response: any) => {
              observer.next(response)
              observer.complete()
            })
            .then(() => {
              resolve()
            })
        })
      })
    })

    it('should call poll', () => {
      mocked(poll).mockReset()
      mocked(poll).mockImplementationOnce(() => new Observable(observer => {})) //eslint-disable-line

      bloc.track(id)

      expect(poll).toBeCalledTimes(1)
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

      expect(poll).toBeCalledTimes(2)
    })

    it('should call poll once when status is not in FinalFareStatuses', async () => {
      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(getMockedTrackTripResponse({ status: TripStatuses.CONFIRMED }))
      )

      bloc.track(id)

      await promise

      expect(poll).toBeCalledTimes(1)
    })

    it('should call poll once when status is COMPLETED and there is no trip_id', async () => {
      tripServiceMock.trackTrip.mockReturnValueOnce(
        Promise.resolve(getMockedTrackTripResponse({ status: TripStatuses.COMPLETED, trip_id: undefined }))
      )

      bloc.track(id)

      await promise

      expect(poll).toBeCalledTimes(1)
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
})
