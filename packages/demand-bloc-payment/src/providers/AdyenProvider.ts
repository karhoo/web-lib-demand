import AdyenCheckout from '@adyen/adyen-web'
import CardElement from '@adyen/adyen-web/dist/types/components/Card'
import { Payment } from '@karhoo/demand-api'

import { AdyenProviderOptions, AdyenCheckoutOptions, Provider } from '../types'

import { defaultAdyenOptions } from '../constants'

export class AdyenProvider implements Provider {
  private paymentService: Payment
  private isFormValid = false
  private cardElement?: CardElement

  private options: AdyenProviderOptions
  private checkoutOptions: AdyenCheckoutOptions

  constructor(paymentService: Payment, options: AdyenProviderOptions, isTestEnv = true) {
    this.paymentService = paymentService

    const environment = isTestEnv ? 'test' : 'live'

    this.options = {
      ...defaultAdyenOptions,
      ...options,
    }

    this.checkoutOptions = {
      clientKey: this.options.clientKey,
      locale: this.options.locale || 'en',
      environment,
      amount: {
        value: options.price,
        currency: options.currencyCode,
      },
      channel: 'Web',
    }
  }

  private setValidationStatus({ isValid }: { isValid: boolean }) {
    this.isFormValid = isValid
  }

  async initialize() {
    const paymentMethodsResponse = await this.paymentService.getAdyenPaymentMethods({
      amount: this.checkoutOptions.amount,
      shopperLocale: this.checkoutOptions.locale,
    })

    if (!paymentMethodsResponse.ok) {
      throw new Error('No payment methods received')
    }

    const checkout = new AdyenCheckout({
      ...this.checkoutOptions,
      paymentMethodsResponse: paymentMethodsResponse.body,
      onChange: this.setValidationStatus,
      showPayButton: false,
    })

    this.cardElement = checkout.create('card').mount(`#${this.options.dropinContainerId}`)
  }

  async tokenizeHostedFields() {
    const makePaymentResponse = await this.paymentService.createAdyenPaymentAuth({
      payments_payload: {
        ...this.checkoutOptions,
        ...this.cardElement?.data,
      },
      return_url_suffix: '/paymentDetails',
    })

    if (!makePaymentResponse.ok) {
      throw new Error('Failed to create a payment')
    }

    return ['meta.trip_id', makePaymentResponse.body.transaction_id]
  }

  validatePaymentForm() {
    this.cardElement?.showValidation()
    return this.isFormValid
  }

  dispose() {
    this.cardElement?.remove()
    this.isFormValid = false
  }

  verifyWithThreeDSecure() {
    return Promise.resolve({
      type: 'not implemented',
      nonce: 'not implemented',
      details: {
        cardType: 'not implemented',
        lastTwo: '22',
      },
      description: 'not implemented',
      liabilityShiftPossible: false,
      liabilityShifted: false,
    })
  }

  getSavedCards() {
    return Promise.resolve([])
  }

  saveCard() {
    throw new Error('Not implemented')
  }
}
