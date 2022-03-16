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

export type ProviderVersion = 'v68' | undefined

export type Provider = {
  id: ProviderId
  version?: ProviderVersion
}

export type LoyaltyProgram = {
  id?: string
  name?: string
}

type Amount = {
  currency: string
  value: number
}

export type PaymentProvidersResponse = {
  provider?: Provider
  loyalty_programme?: LoyaltyProgram
}

export type ClientKeyResponse = {
  clientKey: string
  environment: string
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
  supply_partner_id: string
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

type OldApiPaymentDetailsParams = {
  trip_id: string
  payments_payload: {
    paymentData: string
    details: {
      MD: string
      PaRes: string
    }
  }
}

type NewApiPaymentDetailsParams = {
  trip_id: string
  payments_payload: {
    details: {
      redirectResult: string
    }
  }
}

export type PaymentDetailsParams = OldApiPaymentDetailsParams | NewApiPaymentDetailsParams

export type PaymentDetailsResponse = {
  action?: Record<string, unknown>
  additionalData: Record<string, string>
  merchantReference: string
  pspReference: string
  refusalReason?: string
  refusalReasonCode?: string
  resultCode: string
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
  getAdyenPaymentMethods(
    params: PaymentMethodsParams,
    version?: ProviderVersion
  ): Promise<HttpResponse<PaymentMethodsResponse>>
  createAdyenPaymentAuth(
    params: PaymentAuthParams,
    version?: ProviderVersion
  ): Promise<HttpResponse<PaymentAuthResponse>>
  getAdyenPaymentDetails(
    params: PaymentDetailsParams,
    version?: ProviderVersion
  ): Promise<HttpResponse<PaymentDetailsResponse>>
}
