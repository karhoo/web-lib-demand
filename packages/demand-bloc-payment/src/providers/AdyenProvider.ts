import AdyenCheckout from '@adyen/adyen-web'
import CardElement from '@adyen/adyen-web/dist/types/components/Dropin'
import { PaymentAction } from '@adyen/adyen-web/dist/types/types'
import { Payment, ProviderVersion } from '@karhoo/demand-api'

import {
  AdyenProviderOptions,
  AdyenCheckoutOptions,
  Provider,
  CompleteThreeDSecureVerificationParams,
  Payer,
  AdyenShopperData,
  ResultCodes,
} from '../types'
import { defaultAdyenOptions } from '../constants'
import { AdyenError, handleRefusalResponse, errors, codes } from './adyenErrors'
import noop from 'lodash/noop'

export class AdyenProvider implements Provider {
  private paymentService: Payment
  private isFormValid = false
  private cardElement?: CardElement
  private submitGooglePayPayment: Function
  private submitGooglePayPaymentPayload: Object | undefined

  private options: AdyenProviderOptions
  private checkoutOptions: AdyenCheckoutOptions
  private action: PaymentAction | null = null
  private shopper: AdyenShopperData | object = {}

  constructor(paymentService: Payment, options: AdyenProviderOptions, submitGooglePayPayment?: Function) {
    this.setValidationStatus = this.setValidationStatus.bind(this)
    this.validatePaymentForm = this.validatePaymentForm.bind(this)
    this.paymentService = paymentService
    this.submitGooglePayPayment = submitGooglePayPayment || noop

    this.options = {
      ...defaultAdyenOptions,
      ...options,
    }

    this.checkoutOptions = {
      locale: this.options.locale || 'en',
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

  set apiVersion(value: ProviderVersion) {
    this.options = {
      ...this.options,
      apiVersion: value,
    }
  }

  getNonce() {
    return sessionStorage.getItem('adyenNonce') || ''
  }

  private setValidationStatus({ isValid }: { isValid: boolean }) {
    this.isFormValid = isValid
  }

  // @ts-ignore: no appropriate type in Adyen lib
  onAdyenSubmit = state => {
    if (state.data.paymentMethod.type === 'paywithgoogle') {
      this.submitGooglePayPayment(this.submitGooglePayPaymentPayload)
    }
  }

  async initialize(payer?: Payer) {
    if (payer) {
      this.shopperData = {
        shopperReference: payer?.id,
        shopperEmail: payer?.email,
      }
    }

    const paymentMethodsReq = this.paymentService.getAdyenPaymentMethods(
      {
        amount: this.checkoutOptions.amount,
        shopperLocale: this.checkoutOptions.locale,
        ...this.shopperData,
      },
      this.options.apiVersion
    )

    const clientKeyReq = this.paymentService.getAdyenClientKey()

    const [paymentMethodsResponse, clientKeyResponse] = await Promise.all([paymentMethodsReq, clientKeyReq])

    if (!paymentMethodsResponse.ok) {
      throw new AdyenError(errors[codes.AE01], codes.AE01)
    }

    if (!clientKeyResponse.ok) {
      throw new AdyenError(errors[codes.AE02], codes.AE02)
    }

    // @ts-ignore: AdyenCheckout accept `any` but its not allowed in our TS configuration
    const checkout = await AdyenCheckout({
      ...this.checkoutOptions,
      translations: this.options.translations,
      environment: clientKeyResponse.body.environment,
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
      onSubmit: this.onAdyenSubmit,
    })

    this.cardElement = checkout.create('dropin').mount(`#${this.options.dropinContainerId}`)
  }

  async tokenizeHostedFields() {
    const makePaymentResponse = await this.paymentService.createAdyenPaymentAuth(
      {
        consent_mode_supported: this.options.enableStoreDetails,
        supply_partner_id: this.options.fleetId,
        payments_payload: {
          ...this.checkoutOptions,
          ...this.cardElement?.data,
          ...this.shopperData,
          redirectFromIssuerMethod: 'get',
          returnUrl: this.options.returnUrl,
          origin: window.location.origin,
        },
      },
      this.options.apiVersion
    )

    if (!makePaymentResponse.ok) {
      throw new AdyenError(errors[codes.AE03], codes.AE03)
    }

    handleRefusalResponse(makePaymentResponse.body.payload)
    if (makePaymentResponse.body.payload.resultCode === ResultCodes.AUTHORISED) {
      this.nonce = makePaymentResponse.body.trip_id
      return {
        nonce: makePaymentResponse.body.trip_id,
        resultCode: makePaymentResponse.body.payload.resultCode,
      }
    }

    this.paymentData = makePaymentResponse.body.payload.action?.paymentData || ''

    if (makePaymentResponse.body.payload.action) {
      this.paymentAction = makePaymentResponse.body.payload.action
    }

    this.nonce = makePaymentResponse.body.trip_id

    return { nonce: makePaymentResponse.body.trip_id }
  }

  isGooglePay() {
    return this.cardElement?.data?.paymentMethod?.type === 'paywithgoogle'
  }

  forceGooglePayPopup(payload?: Object) {
    this.submitGooglePayPaymentPayload = payload
    this.cardElement?.submit()
  }

  validatePaymentForm() {
    this.cardElement?.showValidation()
    return this.isFormValid
  }

  clearPaymentNonce() {
    this.paymentData = ''
    this.nonce = ''
  }

  dispose() {
    this.cardElement?.remove()
    this.isFormValid = false
    this.clearPaymentNonce()
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

  async completeThreeDSecureVerification(params: CompleteThreeDSecureVerificationParams) {
    const { locationParams, nonce } = params

    const oldPayload = {
      trip_id: nonce,
      payments_payload: {
        paymentData: this.paymentData,
        details: {
          MD: locationParams.get('MD') || '',
          PaRes: locationParams.get('PaRes') || '',
        },
      },
    }

    const newPayload = {
      trip_id: nonce,
      payments_payload: {
        details: {
          redirectResult: locationParams.get('redirectResult') || '',
        },
      },
    }

    const payload = this.options.apiVersion ? newPayload : oldPayload

    const paymentDetailsResponse = await this.paymentService.getAdyenPaymentDetails(
      payload,
      this.options.apiVersion
    )

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
