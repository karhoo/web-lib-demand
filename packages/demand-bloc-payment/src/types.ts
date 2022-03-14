import { ThreeDSecureVerifyPayload, HostedFieldFieldOptions, BraintreeError } from 'braintree-web'

import { HttpResponse, ClientNonceResponse, ProviderVersion } from '@karhoo/demand-api'

export type CardInfo = Partial<{
  id: string
  type: string
  lastFour: string
  nonce: string
}>

export type Payer = {
  id: string
  email: string
  first_name: string
  last_name: string
}

type TokenizePayload = string[]
export type ThreeDSecureVerifyResponse = ThreeDSecureVerifyPayload & { type?: string }

export type CompleteThreeDSecureVerificationParams = {
  nonce: string
  locationParams: URLSearchParams
}

type PaymentProviderProps = {
  class?: string
  usePaymentModal?: boolean
}

export type ProviderOptions = {
  apiVersion: ProviderVersion
}

// Currently this type is based on braintree types. In the future this might be changed
export type Provider = {
  initialize(payer?: Payer): Promise<void> | void
  clearPaymentNonce: () => void
  dispose(): Promise<void> | void
  tokenizeHostedFields(): Promise<TokenizePayload>
  validatePaymentForm(): boolean
  completeThreeDSecureVerification(params?: CompleteThreeDSecureVerificationParams): Promise<string | Error>
  startThreeDSecureVerification(amount: number, nonce: string): Promise<string | Error>
  getSavedCards(payer: Payer): Promise<CardInfo[]>
  saveCard(nonce: string, payer: Payer): Promise<HttpResponse<ClientNonceResponse>> | void
  getPaymentProviderProps(): PaymentProviderProps
  getNonce(): string | null
  apiVersion?: ProviderVersion
}

export type CardsInfo = {
  setPaymentCards(cards: CardInfo[], payer: Payer): void
  getSelectedPaymentCard(): CardInfo | undefined
  clear(): Promise<void> | void
}

export type PaymentOptions = {
  paymentCardsEnabled: boolean
  preselectProvider?: string
  loyaltyClientId?: string
  apiVersion?: ProviderVersion
}

export type VerifyCardError = {
  code?: string
  type?: string
  name?: string
  details?: any // eslint-disable-line
  message: string
}

type DefaultPaymentResponse<T = Error> =
  | {
      ok: true
      nonce: string
    }
  | {
      ok: false
      error: T
    }

export type VerifyCardResponse = DefaultPaymentResponse<VerifyCardError>
export type PaymentNonceResponse = DefaultPaymentResponse

export type SaveCardResponse = { ok: true } | { ok: false; error: Error | BraintreeError }

type Logger = {
  error(error: Error | BraintreeError, info?: Record<string, string>): void
}

export type BraintreeProviderOptions = {
  organisationId: string
  currencyCode: string
  logger?: Logger
  invalidFieldClass?: string
  hostedFields?: {
    hostedFieldsConfig: HostedFieldFieldOptions
    hostedFieldsStyles: Record<string, Record<string, string>>
  }
  withThreeDSecure?: boolean
  threeDSecureFields?: {
    iframeContainerId: string
    loadingId?: string
    processingId?: string
  }
  onAddThreeDSecureFrame?: () => void
  onRemoveThreeDSecureFrame?: () => void
}

export type FullBraintreeProviderOptions = Omit<
  Required<BraintreeProviderOptions>,
  'logger' | 'onAddThreeDSecureFrame' | 'onRemoveThreeDSecureFrame'
> & {
  logger?: Logger
  onAddThreeDSecureFrame?: () => void
  onRemoveThreeDSecureFrame?: () => void
}

export type AdyenPaymentMethodsConfiguration = {
  card: {
    enableStoreDetails?: boolean
  }
}

export type AdyenShopperData = {
  shopperReference?: string
  shopperEmail?: string
}

export type AdyenProviderOptions = {
  dropinContainerId: string
  withThreeDSecure?: boolean
  environment?: 'test' | 'live'
  price: number
  currencyCode: string
  returnUrl: string
  locale?: string
  enableStoreDetails?: boolean
  showStoredPaymentMethods?: boolean
  paymentMethodsConfiguration?: AdyenPaymentMethodsConfiguration
  showPayButton?: boolean
  fleetId: string
  apiVersion?: ProviderVersion
}

export type AdyenCheckoutOptions = {
  amount: {
    value: number
    currency: string
  }
  locale: string
  channel: 'Web'
}

export enum ResultCodes {
  AUTHORISED = 'Authorised',
}
