import { HttpResponse } from '../http/types'

export type CreateTokenParams = {
  organisation_id: string
  currency: string
}

export type CreateTokenResponse = {
  token?: string
}

export type ClientNonceParams = {
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

export type ProviderId = 'Braintree'

export type Provider = {
  id: ProviderId
}

export type LoyaltyProgram = {
  id?: string
  name?: string
}

export type PaymentProvidersResponse = {
  provider?: Provider
  loyalty_programme?: LoyaltyProgram
}

export interface Payment {
  createClientToken(params: CreateTokenParams): Promise<HttpResponse<CreateTokenResponse>>
  getClientNonce(params: ClientNonceParams): Promise<HttpResponse<ClientNonceResponse>>
  addPaymentCard(params: AddPaymentCardParams): Promise<HttpResponse<ClientNonceResponse>>
  createBraintreeClientToken(params: CreateTokenParams): Promise<HttpResponse<CreateTokenResponse>>
  getBraintreeClientNonce(params: ClientNonceParams): Promise<HttpResponse<ClientNonceResponse>>
  addBraintreePaymentCard(params: AddPaymentCardParams): Promise<HttpResponse<ClientNonceResponse>>
  getPaymentProvider(): Promise<HttpResponse<PaymentProvidersResponse>>
}
