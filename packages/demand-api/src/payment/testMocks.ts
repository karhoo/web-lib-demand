import { PaymentMethodsResponse } from './types'
import { HttpResponse, HttpResponseOk, HttpResponseError, ApiError } from '../http/types'
import { errorCodes } from '../responseCodes'

import {
  CreateTokenResponse,
  ClientNonceResponse,
  PaymentProvidersResponse,
  OriginKeyResponse,
  PaymentAuthResponse,
  ProviderId,
} from './types'

const clientNonceResponse = {
  card_type: 'cardType',
  last_four: 'lastFour',
  nonce: 'nonce',
}

const getMock = <T>(method: (a?: Partial<T>) => HttpResponseOk<T>) => (partialBody?: Partial<T>) =>
  jest.fn((): Promise<HttpResponse<T>> => Promise.resolve(method(partialBody)))

const getErrorResponse = (message: string) => (code = errorCodes.K0001): HttpResponseError<ApiError> => ({
  ok: false,
  status: 500,
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
  body: {
    ...clientNonceResponse,
    ...partialBody,
  },
})

export const getMockedErrorPaymentGetClientNonceResponse = getErrorResponse('Get client nonce')

export const getPaymentGetClientNonceMock = getMock(getMockedPaymentGetClientNonceResponse)

export const paymentProviderIdBeingUsed: ProviderId = 'Braintree'

export const getMockedPaymentProviderResponse = (): HttpResponseOk<PaymentProvidersResponse> => ({
  ok: true,
  status: 200,
  body: {
    provider: {
      id: paymentProviderIdBeingUsed,
    },
  },
})

export const getPaymentProviderMock = getMock(getMockedPaymentProviderResponse)

export const getMockedAdyenOriginKeyResponse = (): HttpResponseOk<OriginKeyResponse> => ({
  ok: true,
  status: 200,
  body: {
    originKey: 'origin-key',
  },
})

export const getAdyenOriginKeyMock = getMock(getMockedAdyenOriginKeyResponse)

export const getMockedAdyenPaymentMethodsResponse = (): HttpResponseOk<PaymentMethodsResponse> => ({
  ok: true,
  status: 200,
  body: {
    paymentMethods: [],
  },
})

export const getAdyenPaymentMethodsMock = getMock(getMockedAdyenPaymentMethodsResponse)

export const getMockedPaymentAuthResponse = (): HttpResponseOk<PaymentAuthResponse> => ({
  ok: true,
  status: 200,
  body: {
    transaction_id: 'transaction_id',
  },
})

export const getCreateAdyenPaymentAuthMock = getMock(getMockedPaymentAuthResponse)

export const getMockedAdyenPaymentDetailsResponse = (): HttpResponseOk<object> => ({
  ok: true,
  status: 200,
  body: {},
})

export const getAdyenPaymentDetailsMock = getMock(getMockedAdyenPaymentDetailsResponse)
