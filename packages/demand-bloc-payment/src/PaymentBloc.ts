import { Payment, ProviderId } from '@karhoo/demand-api'

import {
  Provider,
  PaymentOptions,
  PaymentNonceResponse,
  SaveCardResponse,
  Payer,
  CardsInfo,
  CardInfo,
} from './types'
import { defaultPaymentOptions, errors } from './constants'
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
    const providersResponse = await fetchPaymentProvider(paymentService)
    const apiVersion = providersResponse.provider?.version

    const targetId = options.preselectProvider || (providersResponse.provider?.id ?? '')
    const loyaltyClientId = providersResponse.loyalty_programme?.id
    const provider = getPaymentProvider(providers, targetId)
    provider.apiVersion = apiVersion

    const paymentOptions = {
      ...options,
      loyaltyClientId,
      apiVersion,
    }

    return new PaymentBloc(provider, paymentOptions, cardsInfo)
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
        this.provider.initialize(payer),
        paymentCardsEnabled && payer ? this.provider.getSavedCards(payer) : null,
      ])
    )

    const [, cards] = await this.pendingInitialisation.promise
    if (payer && cards) {
      this.cardsInfo?.setPaymentCards(cards, payer)
    }
  }

  async verifyCardWithThreeDSecure(amount: number, email?: string) {
    const params = new URLSearchParams(location.search) // eslint-disable-line no-restricted-globals
    const nonce = this.provider.getNonce()

    try {
      if (nonce) {
        try {
          await this.provider.completeThreeDSecureVerification({
            nonce,
            locationParams: params,
          })

          return { ok: true, nonce }
        } catch (error) {
          this.provider.clearPaymentNonce()
          return { ok: false, error }
        }
      }

      const { nonce: paymentNonce, resultCode, details } = await this.getPaymentDetails()

      if (resultCode) {
        return { ok: true, nonce: paymentNonce }
      }

      const verifiedNonce = await this.provider.startThreeDSecureVerification(
        amount,
        paymentNonce,
        details,
        email
      )

      const resultNonce = paymentNonce && verifiedNonce
      return { ok: true, nonce: resultNonce }
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
      const { nonce } = await this.getPaymentDetails()

      return { ok: true, nonce }
    } catch (error) {
      return { ok: false, error: error as Error }
    }
  }

  private async getPaymentDetails() {
    const selectedCard = this.cardsInfo?.getSelectedPaymentCard()

    if (selectedCard?.nonce) {
      return { nonce: selectedCard.nonce, resultCode: '' }
    }

    const { nonce, resultCode, details } = await this.provider.tokenizeHostedFields()

    return { nonce, resultCode, details }
  }

  async savePaymentCard(payer: Payer): Promise<SaveCardResponse> {
    try {
      const { nonce } = await this.provider.tokenizeHostedFields()
      const response = await this.provider.saveCard(nonce, payer)

      if (!response) {
        return { ok: false, error: new Error('Not possible to save a card') }
      }

      return response.ok ? { ok: true } : { ok: false, error: new Error(response.error.message) }
    } catch (error) {
      return { ok: false, error: error as Error }
    }
  }

  getPaymentProviderProps() {
    return this.provider.getPaymentProviderProps()
  }

  getLoyaltyClientId() {
    return this.options.loyaltyClientId
  }
}

export const fetchPaymentProvider = async (paymentService: Payment) => {
  const response = await paymentService.getPaymentProvider()
  if (!response.ok) {
    throw new Error('Cannot fetch payment provider')
  }

  return response.body
}

export const getPaymentProvider = (providers: PaymentProvidersMap, targetId: string) => {
  const found = Object.entries(providers).find(([id]) => id === targetId)
  if (!found) throw new Error('Unknown payment provider')

  const [_, provider] = found
  return provider
}
