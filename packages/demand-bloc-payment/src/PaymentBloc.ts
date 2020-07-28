import {
  Provider,
  PaymentOptions,
  VerifyCardResponse,
  PaymentNonceResponse,
  SaveCardResponse,
  Payer,
  CardsInfo,
  CardInfo,
} from './types'
import { creditCardType, defaultPaymentOptions, errors } from './constants'
import { getCancellablePromise, CancellablePromise } from './utils'

export class PaymentBloc {
  private provider: Provider

  private cardsInfo?: CardsInfo

  private options: PaymentOptions

  private pendingInitialisation?: CancellablePromise<[void, CardInfo[] | null]>

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

    this.pendingInitialisation = getCancellablePromise(
      Promise.all([
        this.provider.initialize(),
        paymentCardsEnabled && payer ? this.provider.getSavedCards(payer) : null,
      ])
    )

    const [, cards] = await this.pendingInitialisation.promise

    if (payer && cards) {
      this.cardsInfo?.setPaymentCards(cards, payer)
    }
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
    this.pendingInitialisation?.cancel()
    this.pendingInitialisation = undefined

    await this.cardsInfo?.clear()
    await this.provider.dispose()
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

  private async getPaymentDetails() {
    const selectedCard = this.cardsInfo?.getSelectedPaymentCard()

    if (selectedCard?.nonce) {
      return selectedCard.nonce
    }

    const tokenizeResponse = await this.provider.tokenizeHostedFields()

    return tokenizeResponse.nonce
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
