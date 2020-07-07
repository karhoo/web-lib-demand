import {
  HostedFieldsTokenizePayload,
  ThreeDSecureVerifyPayload,
  HostedFieldFieldOptions,
  BraintreeError,
} from 'braintree-web'

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

export type PaymentNonceResponse =
  | {
      ok: true
      nonce: string
    }
  | {
      ok: false
      error: Error
    }

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

export type Payer = {
  id: string
  email: string
  first_name: string
  last_name: string
}
