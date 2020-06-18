import { HostedFieldsTokenizePayload, ThreeDSecureVerifyPayload } from 'braintree-web'

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

export type VerifyCardResponse =
  | {
      ok: true
      nonce: string
    }
  | {
      ok: false
      error: VerifyCardError
    }
