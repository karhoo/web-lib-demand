import { HttpResponse } from '../http/types'
import { PaymentMethodsResponseObject } from '@adyen/adyen-web/dist/types/core/ProcessResponse/PaymentMethodsResponse/types'
import { CoreOptions } from '@adyen/adyen-web/dist/types/core/types'
import { PaymentAction } from '@adyen/adyen-web/dist/types/types'

export type CreateTokenParams = {
  organisation_id: string
  currency: string
}

export type CreateTokenResponse = {
  token?: string
}

export type ClientNonceParams = {
  payer: {
    id: string
    first_name: string
    last_name: string
    email: string
  }
  organisation_id: string
}

export type ClientNonceResponse = {
  nonce?: string
  last_four?: string
  card_type?: string
}

export interface AddPaymentCardParams extends ClientNonceParams {
  nonce: string
}

export type ProviderId = 'Braintree' | 'Adyen'

export type Provider = {
  id: ProviderId
}

type LoyaltyProgrammes = {
  id?: string
  name?: string
}

type Amount = {
  currency: string
  value: number
}

export type PaymentProvidersResponse = {
  provider?: Provider
  loyalty_programmes?: LoyaltyProgrammes[]
}

export type ClientKeyResponse = {
  clientKey: string
}

export type PaymentMethodsParams = {
  merchantAccount?: string
  channel?: 'iOS' | 'Android' | 'Web'
  countryCode?: string
  shopperLocale?: string
  shopperReference?: string
  amount?: Amount
}

export type PaymentAuthParams = {
  payments_payload: CoreOptions
}

export type PaymentAuthResponse = {
  trip_id: string
  payload: {
    action?: PaymentAction
    resultCode?: string
    refusalReasonCode?: string
  }
}

export type PaymentDetailsParams = {
  trip_id: string
  payments_payload: {
    paymentData: string
    details: {
      MD: string
      PaRes: string
    }
  }
}

export type PaymentMethodsResponse = PaymentMethodsResponseObject
export interface Payment {
  createClientToken(params: CreateTokenParams): Promise<HttpResponse<CreateTokenResponse>>
  getClientNonce(params: ClientNonceParams): Promise<HttpResponse<ClientNonceResponse>>
  addPaymentCard(params: AddPaymentCardParams): Promise<HttpResponse<ClientNonceResponse>>
  createBraintreeClientToken(params: CreateTokenParams): Promise<HttpResponse<CreateTokenResponse>>
  getBraintreeClientNonce(params: ClientNonceParams): Promise<HttpResponse<ClientNonceResponse>>
  addBraintreePaymentCard(params: AddPaymentCardParams): Promise<HttpResponse<ClientNonceResponse>>
  getPaymentProvider(): Promise<HttpResponse<PaymentProvidersResponse>>
  getAdyenClientKey(): Promise<HttpResponse<ClientKeyResponse>>
  getAdyenPaymentMethods(params: PaymentMethodsParams): Promise<HttpResponse<PaymentMethodsResponse>>
  createAdyenPaymentAuth(params: PaymentAuthParams): Promise<HttpResponse<PaymentAuthResponse>>
  getAdyenPaymentDetails(params: PaymentDetailsParams): Promise<HttpResponse<object>>
}
