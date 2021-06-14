import AdyenCheckout from '@adyen/adyen-web'
import CardElement from '@adyen/adyen-web/dist/types/components/Dropin'
import { PaymentAction } from '@adyen/adyen-web/dist/types/types'
import { Payment } from '@karhoo/demand-api'

import {
  AdyenProviderOptions,
  AdyenCheckoutOptions,
  Provider,
  CompleteThreeDSecureVerificationParams,
  Payer,
  AdyenShopperData,
} from '../types'
import { defaultAdyenOptions } from '../constants'
import { AdyenError, handleRefusalResponse, errors, codes } from './adyenErrors'

export class AdyenProvider implements Provider {
  private paymentService: Payment
  private isFormValid = false
  private cardElement?: CardElement

  private options: AdyenProviderOptions
  private checkoutOptions: AdyenCheckoutOptions
  private action: PaymentAction | null = null
  private shopper: AdyenShopperData | object = {}

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

  set shopperData(payer: AdyenShopperData) {
    this.shopper = payer
  }

  get shopperData() {
    return this.shopper
  }

  set nonce(value: string) {
    sessionStorage.setItem('adyenNonce', value)
  }

  getNonce() {
    return sessionStorage.getItem('adyenNonce') || ''
  }

  private setValidationStatus({ isValid }: { isValid: boolean }) {
    this.isFormValid = isValid
  }

  async initialize(payer?: Payer) {
    if (payer) {
      this.shopperData = {
        shopperReference: payer?.id,
        shopperEmail: payer?.email,
      }
    }

    const paymentMethodsReq = this.paymentService.getAdyenPaymentMethods({
      amount: this.checkoutOptions.amount,
      shopperLocale: this.checkoutOptions.locale,
      ...this.shopperData,
    })

    const clientKeyReq = this.paymentService.getAdyenClientKey()

    const [paymentMethodsResponse, clientKeyResponse] = await Promise.all([paymentMethodsReq, clientKeyReq])

    if (!paymentMethodsResponse.ok) {
      throw new AdyenError(errors[codes.AE01], codes.AE01)
    }

    if (!clientKeyResponse.ok) {
      throw new AdyenError(errors[codes.AE02], codes.AE02)
    }

    const checkout = new AdyenCheckout({
      ...this.checkoutOptions,
      clientKey: clientKeyResponse.body.clientKey,
      paymentMethodsResponse: paymentMethodsResponse.body,
      onChange: this.setValidationStatus,
      showPayButton: this.options.showPayButton,
      showStoredPaymentMethods: this.options.showStoredPaymentMethods,
      paymentMethodsConfiguration: {
        card: {
          enableStoreDetails: this.options.enableStoreDetails,
        },
      },
    })

    this.cardElement = checkout.create('dropin').mount(`#${this.options.dropinContainerId}`)
  }

  async tokenizeHostedFields() {
    const makePaymentResponse = await this.paymentService.createAdyenPaymentAuth({
      supply_partner_id: this.options.fleetId,
      payments_payload: {
        ...this.checkoutOptions,
        ...this.cardElement?.data,
        ...this.shopperData,
        redirectFromIssuerMethod: 'get',
        returnUrl: this.options.returnUrl,
      },
    })

    if (!makePaymentResponse.ok) {
      throw new AdyenError(errors[codes.AE03], codes.AE03)
    }

    handleRefusalResponse(makePaymentResponse.body.payload)

    this.paymentData = makePaymentResponse.body.payload.action?.paymentData || ''

    if (makePaymentResponse.body.payload.action) {
      this.paymentAction = makePaymentResponse.body.payload.action
    }

    this.nonce = makePaymentResponse.body.trip_id

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
    const { paymentAction, options } = this
    const { withThreeDSecure } = options

    if (!paymentAction) {
      this.nonce = ''

      return withThreeDSecure
        ? Promise.reject(new AdyenError(errors[codes.AE04], codes.AE04))
        : Promise.resolve('no-payment-action')
    }

    this.paymentAction = null
    this.cardElement?.handleAction(paymentAction)

    return Promise.resolve('')
  }

  async completeThreeDSecureVerification(params?: CompleteThreeDSecureVerificationParams) {
    if (!params) {
      return new Error(errors.missingRequiredParamsFor3dSecure)
    }

    const { MD, PaRes, nonce } = params

    const paymentDetailsResponse = await this.paymentService.getAdyenPaymentDetails({
      payments_payload: {
        paymentData: this.paymentData,
        details: {
          MD,
          PaRes,
        },
      },
      trip_id: nonce,
    })

    if (!paymentDetailsResponse.ok) {
      throw new AdyenError(errors[codes.AE03], codes.AE03)
    }

    handleRefusalResponse(paymentDetailsResponse.body)

    this.nonce = ''

    return nonce
  }

  getSavedCards() {
    return Promise.resolve([])
  }

  saveCard() {
    // Do nothing. The method is useless for this provider type
  }

  getPaymentProviderProps() {
    return {
      class: 'adyenPsp',
    }
  }
}
