import { HostedFieldFieldOptions, BraintreeError } from 'braintree-web'
import { HttpResponse, ClientNonceResponse } from '@karhoo/demand-api'

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

type TokenizePayload = {
  nonce: string
  options?: ThreeDSecureOptions
  resultCode?: string
}

type PaymentProviderProps = {
  class?: string
}

export type ThreeDSecureOptions = {
  bin?: string
}

// Currently this type is based on braintree types. In the future this might be changed
export type Provider = {
  initialize(payer?: Payer): Promise<void> | void
  clearPaymentNonce: () => void
  dispose(): Promise<void> | void
  tokenizeHostedFields(): Promise<TokenizePayload>
  validatePaymentForm(): boolean
  startThreeDSecureVerification(
    amount: number,
    nonce: string,
    options?: ThreeDSecureOptions,
    email?: string
  ): Promise<string | Error>
  getSavedCards(): Promise<CardInfo[]>
  saveCard(nonce: string): Promise<HttpResponse<ClientNonceResponse>> | void
  getPaymentProviderProps(): PaymentProviderProps
  isGooglePay(): boolean
  forceGooglePayPopup(payload?: Object): void
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
  allowedBinValues?: string[]
}

export type FullBraintreeProviderOptions = Omit<
  Required<BraintreeProviderOptions>,
  'logger' | 'allowedBinValues'
> & {
  logger?: Logger
  allowedBinValues?: string[]
}
