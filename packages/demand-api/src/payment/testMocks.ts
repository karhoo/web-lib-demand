import { HttpResponse, HttpResponseOk, HttpResponseError, ApiError } from '../http/types'
import { errorCodes } from '../responseCodes'

import {
  CreateTokenResponse,
  ClientNonceResponse,
  PaymentProvidersResponse,
  ProviderId,
  LoyaltyProgram,
} from './types'

const clientNonceResponse = {
  card_type: 'cardType',
  last_four: 'lastFour',
  nonce: 'nonce',
}

const jsonResponseHeaders = new Headers({
  'content-type': 'application/json',
})

const getMock =
  <T>(method: (a?: Partial<T>) => HttpResponseOk<T>) =>
  (partialBody?: Partial<T>) =>
    jest.fn((): Promise<HttpResponse<T>> => Promise.resolve(method(partialBody)))

const getErrorResponse =
  (message: string) =>
  (code = errorCodes.K0001): HttpResponseError<ApiError> => ({
    ok: false,
    status: 500,
    headers: jsonResponseHeaders,
    error: {
      code,
      message: `${message}: Something went wrong`,
    },
  })

export const getMockedPaymentCreateClientTokenResponse = (
  partialBody: Partial<CreateTokenResponse> = {}
): HttpResponseOk<CreateTokenResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    token: 'token',
    ...partialBody,
  },
})

export const getMockedErrorPaymentCreateClientTokenResponse = getErrorResponse('Create client token')

export const getPaymentCreateClientTokenMock = getMock(getMockedPaymentCreateClientTokenResponse)

export const getMockedAddPaymentCardResponse = (
  partialBody: Partial<ClientNonceResponse> = {}
): HttpResponseOk<ClientNonceResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    ...clientNonceResponse,
    ...partialBody,
  },
})

export const getMockedErrorAddPaymentCardResponse = getErrorResponse('Add payment card')

export const getAddPaymentCardMock = getMock(getMockedAddPaymentCardResponse)

export const getMockedPaymentGetClientNonceResponse = (
  partialBody: Partial<ClientNonceResponse> = {}
): HttpResponseOk<ClientNonceResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    ...clientNonceResponse,
    ...partialBody,
  },
})

export const getMockedErrorPaymentGetClientNonceResponse = getErrorResponse('Get client nonce')

export const getPaymentGetClientNonceMock = getMock(getMockedPaymentGetClientNonceResponse)

export const paymentProviderIdBeingUsed: ProviderId = 'Braintree'

export const loyaltyProgramBeingUsed: LoyaltyProgram = { id: 'client', name: 'Client Name' }

export const getMockedPaymentProviderResponse = (): HttpResponseOk<PaymentProvidersResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    provider: {
      id: paymentProviderIdBeingUsed,
    },
    loyalty_programme: loyaltyProgramBeingUsed,
  },
})

export const getMockedPaymentProviderEmptyResponse = (): HttpResponseOk<PaymentProvidersResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {},
})

export const getMockedPaymentProviderWithoutLoyaltyResponse =
  (): HttpResponseOk<PaymentProvidersResponse> => ({
    ok: true,
    status: 200,
    headers: jsonResponseHeaders,
    body: {
      provider: {
        id: paymentProviderIdBeingUsed,
      },
    },
  })

export const getPaymentProviderMock = getMock(getMockedPaymentProviderResponse)
