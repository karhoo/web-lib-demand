import { HttpResponse } from '../http/types'

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

type Provider = {
  id: 'Braintree' | 'Adyen'
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

export type OriginKeyResponse = {
  originKey: string
}

export type PaymentMethodsParams = {
  merchantAccount?: string
  channel?: 'iOS' | 'Android' | 'Web'
  countryCode?: string
  shopperLocale?: string
  shopperReference?: string
  amount?: Amount
}

type Group = {
  name?: string
  types?: string[]
  groupType?: string
}

type InputDetail = {
  key?: string
  type?: string
  optional?: boolean
  value?: string
  configuration?: object
  items?: {
    id?: string
    name?: string
  }[]
}

type PaymentMethod = {
  brands?: string[]
  configuration?: object
  name?: string
  type?: string
  supportsRecurring?: boolean
  datails?: InputDetail[]
}

type StoredPaymentMethod = Partial<{
  brand: string
  expiryMonth: string
  expiryYear: string
  holderName: string
  id: string
  lastFour: string
  name: string
  shopperEmail: string
  supportedShopperInteractions: string[]
  type: string
}>

type Card = {
  cvc?: string
  expiryMonth: string
  expiryYear: string
  holderName: string
  issueNumber?: string
  number: string
  startMonth?: string
  startYear?: string
}

type OneClickPaymentMethod = Partial<{
  brands: string[]
  configuration: object
  details: InputDetail[]
  group: {
    name?: string
    paymetnMethodData?: string
    type?: string
  }
  name: string
  recurringDetailReference: string
  supportsRecurring: boolean
  type: string
  storedDetails: {
    card?: Card
    emailAddress?: string
  }
}>

export type PaymentMethodsResponse = {
  groups?: Group[]
  paymentMethods?: PaymentMethod[]
  storedPaymentMethods?: StoredPaymentMethod[]
  oneClickPaymentMethods?: OneClickPaymentMethod[]
}

type PaymentMethodInfo = Partial<{
  type: string
  number: string
  expiryMonth: string
  expiryYear: string
  holderName: string
  cvc: string
}>

export type PaymentAuthParams = {
  payments_payload: {
    amount: Amount
    merchantAccount?: string
    reference: string
    returnUrl: string
    paymentMethod: PaymentMethodInfo
    countryCode?: string
    shopperEmail?: string
    shopperLocale?: string
    shopperReference?: string
    storePaymentMethod?: boolean
  }
  return_url_suffix?: string
}

type ResultCode =
  | 'AuthenticationFinished'
  | 'AuthenticationNotRequired'
  | 'Authorised'
  | 'Cancelled'
  | 'ChallengeShopper'
  | 'Error'
  | 'IdentifyShopper'
  | 'Pending'
  | 'PresentToShopper'
  | 'Received'
  | 'RedirectShopper'
  | 'Refused'

export type PaymentAuthResponse = {
  transaction_id: string
  payload?: {
    merchantReference?: string
    resultCode?: ResultCode
    refusalReasonCode?: string
    refusalReason?: string
    paymentData?: string
  }
}

export type PaymentDetailsParams = {
  transaction_id: string
}

export interface Payment {
  createClientToken(params: CreateTokenParams): Promise<HttpResponse<CreateTokenResponse>>
  getClientNonce(params: ClientNonceParams): Promise<HttpResponse<ClientNonceResponse>>
  addPaymentCard(params: AddPaymentCardParams): Promise<HttpResponse<ClientNonceResponse>>
  createBraintreeClientToken(params: CreateTokenParams): Promise<HttpResponse<CreateTokenResponse>>
  getBraintreeClientNonce(params: ClientNonceParams): Promise<HttpResponse<ClientNonceResponse>>
  addBraintreePaymentCard(params: AddPaymentCardParams): Promise<HttpResponse<ClientNonceResponse>>
  getPaymentProvider(): Promise<HttpResponse<PaymentProvidersResponse>>
  getAdyenOriginKey(): Promise<HttpResponse<OriginKeyResponse>>
  getAdyenPaymentMethods(params: PaymentMethodsParams): Promise<HttpResponse<PaymentMethodsResponse>>
  createAdyenPaymentAuth(params: PaymentAuthParams): Promise<HttpResponse<PaymentAuthResponse>>
  getAdyenPaymentDetails(params: PaymentDetailsParams): Promise<HttpResponse<object>>
}
