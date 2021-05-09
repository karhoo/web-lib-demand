import { HttpResponse, HttpResponseOk, HttpResponseError, ApiError } from '../http/types'
import { errorCodes } from '../responseCodes'

import { FinalFareResponse, FinalFareStatuses } from './types'

export const getMockedFinalFareResponse = (
  partialBody: Partial<FinalFareResponse> = {}
): HttpResponseOk<FinalFareResponse> => ({
  ok: true,
  status: 200,
  body: {
    state: FinalFareStatuses.FINAL,
    ...partialBody,
  },
})

export const getMockedErrorFinalFareResponse = (code = errorCodes.K0001): HttpResponseError<ApiError> => ({
  ok: false,
  status: 500,
  error: {
    code,
    message: `Track trip: Something went wrong`,
  },
})

export const getFinalFareMock = (partialBody?: Partial<FinalFareResponse>) =>
  jest.fn((): HttpResponse<FinalFareResponse> => getMockedFinalFareResponse(partialBody))
