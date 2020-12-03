import { Http } from '../http/types'
import { PaymentMethodsResponseObject } from '@adyen/adyen-web/dist/types/core/ProcessResponse/PaymentMethodsResponse/types'
import {
  CreateTokenParams,
  CreateTokenResponse,
  ClientNonceParams,
  ClientNonceResponse,
  AddPaymentCardParams,
  Payment,
  PaymentProvidersResponse,
  OriginKeyResponse,
  PaymentMethodsParams,
  PaymentAuthParams,
  PaymentAuthResponse,
  PaymentDetailsParams,
} from './types'

export class PaymentService implements Payment {
  private url = 'payments'
  private apiV2 = 'v2'
  private apiV3 = 'v3'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  /** @deprecated use createBraintreeClientToken instead */

  createClientToken(params: CreateTokenParams) {
    return this.http.post<CreateTokenResponse>(
      `${this.apiV2}/${this.url}/payment-methods/braintree/client-tokens`,
      {},
      {},
      params
    )
  }

  /** @deprecated use getBraintreeClientNonce instead */

  getClientNonce(params: ClientNonceParams) {
    return this.http.post<ClientNonceResponse>(
      `${this.apiV2}/${this.url}/payment-methods/braintree/get-payment-method`,
      params
    )
  }

  /** @deprecated use addBraintreePaymentCard instead */

  addPaymentCard(params: AddPaymentCardParams) {
    return this.http.post<ClientNonceResponse>(
      `${this.apiV2}/${this.url}/payment-methods/braintree/add-payment-details`,
      params
    )
  }

  createBraintreeClientToken(params: CreateTokenParams) {
    return this.http.post<CreateTokenResponse>(
      `${this.apiV3}/${this.url}/payment-methods/braintree/client-tokens`,
      {},
      {},
      params
    )
  }

  getBraintreeClientNonce(params: ClientNonceParams) {
    return this.http.post<ClientNonceResponse>(
      `${this.apiV3}/${this.url}/payment-methods/braintree/get-payment-method`,
      params
    )
  }

  addBraintreePaymentCard(params: AddPaymentCardParams) {
    return this.http.post<ClientNonceResponse>(
      `${this.apiV3}/${this.url}/payment-methods/braintree/add-payment-details`,
      params
    )
  }

  getPaymentProvider() {
    return this.http.get<PaymentProvidersResponse>(`${this.apiV3}/${this.url}/providers`)
  }

  getAdyenOriginKey() {
    return this.http.get<OriginKeyResponse>(`${this.apiV3}/${this.url}/adyen/origin-keys`)
  }

  getAdyenPaymentMethods(params: PaymentMethodsParams) {
    return this.http.post<PaymentMethodsResponseObject>(
      `${this.apiV3}/${this.url}/adyen/payments-methods`,
      params
    )
  }

  createAdyenPaymentAuth(params: PaymentAuthParams) {
    return this.http.post<PaymentAuthResponse>(`${this.apiV3}/${this.url}/adyen/payments`, params)
  }

  getAdyenPaymentDetails(params: PaymentDetailsParams) {
    return this.http.post<object>(`${this.apiV3}/${this.url}/adyen/payments-details`, params)
  }
}
