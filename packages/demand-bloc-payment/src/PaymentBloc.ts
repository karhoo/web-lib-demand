import { Payment, PaymentProvidersResponse, ProviderId } from '@karhoo/demand-api'

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

export type PaymentProvidersMap = {
  [id in ProviderId]: Provider
}

type PaymentBlocProps = {
  providers: PaymentProvidersMap
  paymentService: Payment
  options?: PaymentOptions
  cardsInfo?: CardsInfo
}

export class PaymentBloc {
  private provider: Provider
  private cardsInfo?: CardsInfo
  private options: PaymentOptions

  private pendingInitialisation?: CancellablePromise<[void, CardInfo[] | null]>

  private constructor(provider: Provider, options: PaymentOptions, cardsInfo?: CardsInfo) {
    this.provider = provider
    this.options = options

    if (this.options.paymentCardsEnabled) {
      this.cardsInfo = cardsInfo
    }
  }

  static async create({
    providers,
    paymentService,
    options = defaultPaymentOptions,
    cardsInfo,
  }: PaymentBlocProps) {
    const providerResponse = await fetchPaymentProvider(paymentService)
    const provider = getPaymentProvider(providers, providerResponse)
    return new PaymentBloc(provider, options, cardsInfo)
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

    const [_, nonce] = await this.provider.tokenizeHostedFields()

    return nonce
  }

  async savePaymentCard(payer: Payer): Promise<SaveCardResponse> {
    try {
      const [_, value] = await this.provider.tokenizeHostedFields()
      const response = await this.provider.saveCard(value, payer)

      if (!response) {
        return { ok: false, error: new Error('Not possible to save a card') }
      }

      return response.ok ? { ok: true } : { ok: false, error: new Error(response.error.message) }
    } catch (error) {
      return { ok: false, error }
    }
  }
}

export const fetchPaymentProvider = async (paymentService: Payment) => {
  const response = await paymentService.getPaymentProvider()
  if (!response.ok) {
    throw new Error('Cannot fetch payment provider')
  }

  return response.body
}

export const getPaymentProvider = (
  providers: PaymentProvidersMap,
  paymentProviderResponse: PaymentProvidersResponse
) => {
  const targetId = paymentProviderResponse.provider?.id ?? ''
  const found = Object.entries(providers).find(([id]) => id === targetId)
  if (!found) throw new Error('Unknown payment provider')

  const [_, provider] = found
  return provider
}
