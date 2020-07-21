import {
  HostedFieldsTokenizePayload,
  ThreeDSecureVerifyPayload,
  HostedFieldFieldOptions,
  BraintreeError,
} from 'braintree-web'

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

// Currently this type is based on braintree types. In the future this might be changed
export type Provider = {
  initialize(): Promise<void> | void
  dispose(): Promise<void> | void
  tokenizeHostedFields(): Promise<HostedFieldsTokenizePayload>
  validatePaymentForm(): boolean
  verifyWithThreeDSecure(
    amount: number,
    nonce: string
  ): Promise<ThreeDSecureVerifyPayload & { type?: string }>
  getSavedCards(payer: Payer): Promise<CardInfo[]>
  saveCard(nonce: string, payer: Payer): Promise<HttpResponse<ClientNonceResponse>>
}

export type CardsInfo = {
  setPaymentCards(cards: CardInfo[], payer: Payer): void
  getSelectedPaymentCard(): CardInfo | undefined
  clear(): Promise<void> | void
}

export type PaymentOptions = {
  paymentCardsEnabled: boolean
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
}

export type FullBraintreeProviderOptions = Omit<Required<BraintreeProviderOptions>, 'logger'> & {
  logger?: Logger
}
