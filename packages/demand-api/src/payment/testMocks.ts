import { PaymentMethodsResponse, PaymentDetailsResponse } from './types'
import { HttpResponse, HttpResponseOk, HttpResponseError, ApiError } from '../http/types'
import { errorCodes } from '../responseCodes'

import {
  CreateTokenResponse,
  ClientNonceResponse,
  PaymentProvidersResponse,
  ClientKeyResponse,
  PaymentAuthResponse,
  ProviderId,
  LoyaltyProgram,
} from './types'
import { PaymentAction } from '@adyen/adyen-web/dist/types/types'

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

export const getMockedAdyenClientKeyResponse = (): HttpResponseOk<ClientKeyResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    clientKey: 'origin-key',
    environment: 'test',
  },
})

export const getAdyenClientKeyMock = getMock(getMockedAdyenClientKeyResponse)
export const getMockedErrorAdyenClientKeyResponse = getErrorResponse('No client key received')

export const getMockedAdyenPaymentMethodsResponse = (): HttpResponseOk<PaymentMethodsResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    paymentMethods: [],
  },
})

export const getAdyenPaymentMethodsMock = getMock(getMockedAdyenPaymentMethodsResponse)
export const getMockedErrorAdyenPaymentMethodsResponse = getErrorResponse('No payment methods received')

export const getMockedPaymentAuthResponse = (): HttpResponseOk<PaymentAuthResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    trip_id: 'trip_id',
    payload: {
      action: {
        paymentData: 'paymentData',
        type: 'redirect',
      } as PaymentAction,
    },
  },
})

export const getCreateAdyenPaymentAuthMock = getMock(getMockedPaymentAuthResponse)
export const getMockedErrorAdyenPaymentAuthResponse = getErrorResponse('Failed to create a payment')

export const getMockedAdyenPaymentDetailsResponse = (): HttpResponseOk<PaymentDetailsResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    additionalData: { cardSummary: '0000' },
    merchantReference: 'merchantReference',
    pspReference: 'pspReference',
    resultCode: 'Authorised',
  },
})

export const getAdyenPaymentDetailsMock = getMock(getMockedAdyenPaymentDetailsResponse)
export const getMockedErrorAdyenPaymentDetailsResponse = getErrorResponse('Failed to create a payment')

export const getMockedAdyenPaymentDetailsRefusedResponse = (): HttpResponseOk<PaymentDetailsResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    additionalData: { cardSummary: '0000' },
    merchantReference: 'merchantReference',
    pspReference: 'pspReference',
    resultCode: 'Refused',
    refusalReasonCode: 'CVC Declined',
  },
})

export const getAdyenPaymentDetailsRefusedMock = getMock(getMockedAdyenPaymentDetailsRefusedResponse)
