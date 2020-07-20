import {
  Provider,
  PaymentOptions,
  VerifyCardResponse,
  PaymentNonceResponse,
  SaveCardResponse,
  Payer,
  CardsInfo,
} from './types'
import { creditCardType, defaultPaymentOptions, errors } from './constants'

export class PaymentBloc {
  private provider: Provider

  private cardsInfo?: CardsInfo

  private options: PaymentOptions

  constructor(provider: Provider, options: PaymentOptions = defaultPaymentOptions, cardsInfo?: CardsInfo) {
    this.provider = provider
    this.options = options

    if (this.options.paymentCardsEnabled) {
      this.cardsInfo = cardsInfo
    }
  }

  async initPayment(payer?: Payer) {
    const {
      options: { paymentCardsEnabled },
      cardsInfo,
    } = this

    if (paymentCardsEnabled && !cardsInfo) {
      throw new Error(errors.noCardsInfo)
    }

    await Promise.all([
      this.initPaymentProvider(),
      paymentCardsEnabled && payer ? this.initPaymentCards(payer) : null,
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
    await this.cardsInfo?.clear()
  }

  validatePaymentDetails() {
    return !!this.cardsInfo?.getSelectedPaymentCard() || this.provider.validatePaymentForm()
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
    const selectedCard = this.cardsInfo?.getSelectedPaymentCard()

    if (selectedCard?.nonce) {
      return selectedCard.nonce
    }

    const tokenizeResponse = await this.provider.tokenizeHostedFields()

    return tokenizeResponse.nonce
  }

  private async initPaymentCards(payer: Payer) {
    const cards = await this.provider.getSavedCards(payer)

    this.cardsInfo?.setPaymentCards(cards, payer)
  }

  async savePaymentCard(payer: Payer): Promise<SaveCardResponse> {
    try {
      const { nonce } = await this.provider.tokenizeHostedFields()
      const response = await this.provider.saveCard(nonce, payer)

      return response.ok ? { ok: true } : { ok: false, error: new Error(response.error.message) }
    } catch (error) {
      return { ok: false, error }
    }
  }
}
