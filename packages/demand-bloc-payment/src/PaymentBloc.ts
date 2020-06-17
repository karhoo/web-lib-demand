import { Provider, PaymentOptions, VerifyCardResponse } from './types'

export const creditCardType = 'CreditCard'

export const defaultPaymentOptions = {
  paymentCardsEnabled: false,
}

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
      const nonce = await this.getThreeDSecurePaymentDetails()
      const response = await this.provider.verifyWithThreeDSecure(amount, nonce)

      return response.liabilityShifted || response.type !== creditCardType
        ? { ok: true, nonce: response.nonce }
        : { ok: false, error: new Error('Verify card response does not meet requirements') }
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

  private initPaymentProvider() {
    return this.provider.initialize()
  }

  private async getThreeDSecurePaymentDetails() {
    const tokenizeResponse = await this.provider.tokenizeHostedFields()

    return tokenizeResponse.nonce
  }

  private initPaymentCards() {
    // TBD
  }
}
