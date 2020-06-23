import { HttpResponseOk, HttpResponseError, ApiError } from '../http/types'
import { errorCodes } from '../responseCodes'

import { TripFollowResponse, TripStatuses } from './types'

const getErrorResponse = (message: string) => (code = errorCodes.K0001): HttpResponseError<ApiError> => ({
  ok: false,
  status: 500,
  error: {
    code,
    message: `${message}: Something went wrong`,
  },
})

export const getMockedTrackTripResponse = (
  partialBody: Partial<TripFollowResponse> = {}
): HttpResponseOk<TripFollowResponse> => ({
  ok: true,
  status: 200,
  body: {
    trip_id: 'trip_id',
    date_scheduled: '2020-05-28T08:17:07Z',
    status: TripStatuses.COMPLETED,
    ...partialBody,
  },
})

export const getMockedErrorTrackTripResponse = getErrorResponse('Track trip')

export const getMockedCancelByFollowCodeResponse = (): HttpResponseOk<object> => ({
  ok: true,
  status: 200,
  body: {},
})
