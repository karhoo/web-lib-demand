import { Provider, PaymentOptions, VerifyCardResponse, PaymentNonceResponse } from './types'
import { creditCardType, defaultPaymentOptions, errors } from './constants'

export class PaymentBloc {
  private provider: Provider

  private options: PaymentOptions

  constructor(provider: Provider, options: PaymentOptions = defaultPaymentOptions) {
    this.provider = provider
    this.options = options
  }

  async initPayment() {
    await Promise.all([
      this.initPaymentProvider(),
      this.options.paymentCardsEnabled ? this.initPaymentCards() : null,
    ])
  }

  async verifyCardWithThreeDSecure(amount: number): Promise<VerifyCardResponse> {
    try {
      const nonce = await this.getPaymentDetails()
      const response = await this.provider.verifyWithThreeDSecure(amount, nonce)

      return response.liabilityShifted || response.type !== creditCardType
        ? { ok: true, nonce: response.nonce }
        : { ok: false, error: new Error(errors.verifyCardError) }
    } catch (error) {
      return { ok: false, error }
    }
  }

  async dispose() {
    await this.provider.dispose()
  }

  validatePaymentDetails() {
    return this.provider.validatePaymentForm()
  }

  async getPaymentNonce(): Promise<PaymentNonceResponse> {
    try {
      const nonce = await this.getPaymentDetails()

      return { ok: true, nonce }
    } catch (error) {
      return { ok: false, error }
    }
  }

  private initPaymentProvider() {
    return this.provider.initialize()
  }

  private async getPaymentDetails() {
    const tokenizeResponse = await this.provider.tokenizeHostedFields()

    return tokenizeResponse.nonce
  }

  private initPaymentCards() {
    // TBD
  }
}
