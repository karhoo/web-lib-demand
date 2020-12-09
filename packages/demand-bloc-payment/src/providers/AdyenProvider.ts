import AdyenCheckout from '@adyen/adyen-web'
import CardElement from '@adyen/adyen-web/dist/types/components/Card'
import '@adyen/adyen-web/dist/adyen.css'
import { Payment } from '@karhoo/demand-api'

import {
  AdyenProviderOptions,
  AdyenCheckoutOptions,
  Provider,
  CompleteThreeDSecureVerificationParams,
} from '../types'

import { defaultAdyenOptions } from '../constants'
import { PaymentAction } from '@adyen/adyen-web/dist/types/types'

export class AdyenProvider implements Provider {
  private paymentService: Payment
  private isFormValid = false
  private cardElement?: CardElement

  private options: AdyenProviderOptions
  private checkoutOptions: AdyenCheckoutOptions
  private action: PaymentAction | null = null

  constructor(paymentService: Payment, options: AdyenProviderOptions, isTestEnv = true) {
    this.setValidationStatus = this.setValidationStatus.bind(this)
    this.validatePaymentForm = this.validatePaymentForm.bind(this)
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

  set paymentData(value: string) {
    sessionStorage.setItem('paymentData', value)
  }

  get paymentData() {
    return sessionStorage.getItem('paymentData') || ''
  }

  set paymentAction(value: PaymentAction | null) {
    this.action = value
  }

  get paymentAction() {
    return this.action
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
        redirectFromIssuerMethod: 'get',
      },
      return_url_suffix: '/card-callback',
    })

    if (!makePaymentResponse.ok) {
      throw new Error('Failed to create a payment')
    }

    this.paymentData = makePaymentResponse.body.payload.action?.paymentData || ''

    if (makePaymentResponse.body.payload.action) {
      this.paymentAction = makePaymentResponse.body.payload.action
    }

    return ['meta.trip_id', makePaymentResponse.body.trip_id]
  }

  validatePaymentForm() {
    this.cardElement?.showValidation()
    return this.isFormValid
  }

  dispose() {
    this.cardElement?.remove()
    this.isFormValid = false
  }

  startThreeDSecureVerification() {
    const { paymentAction } = this

    if (paymentAction) {
      this.paymentAction = null
      this.cardElement?.handleAction(paymentAction)
    }

    return Promise.resolve('')
  }

  async completeThreeDSecureVerification(params?: CompleteThreeDSecureVerificationParams) {
    if (!params) {
      return new Error('Missing required params to complete 3d secure')
    }

    const { MD, PaRes, nonce } = params

    await this.paymentService.getAdyenPaymentDetails({
      payments_payload: {
        paymentData: this.paymentData,
        details: {
          MD,
          PaRes,
        },
      },
      trip_id: nonce,
    })

    return nonce
  }

  getSavedCards() {
    return Promise.resolve([])
  }

  saveCard() {
    throw new Error('Not implemented')
  }
}
