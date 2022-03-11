import { Http } from '../http/types'
import {
  CreateTokenParams,
  CreateTokenResponse,
  ClientNonceParams,
  ClientNonceResponse,
  AddPaymentCardParams,
  Payment,
  PaymentProvidersResponse,
  ClientKeyResponse,
  PaymentMethodsParams,
  PaymentAuthParams,
  PaymentAuthResponse,
  PaymentDetailsParams,
  V68PaymentDetailsParams,
  PaymentMethodsResponse,
  PaymentDetailsResponse,
  ProviderVersion,
} from './types'

export class PaymentService implements Payment {
  private url = 'payments'
  private apiV2 = 'v2'
  private apiV3 = 'v3'

  private http: Http
  private providerApiVersion: ProviderVersion

  constructor(http: Http) {
    this.http = http
  }

  set providerVersion(value: ProviderVersion) {
    this.providerApiVersion = value
  }

  getApiVersionPath() {
    return this.providerApiVersion ? `${this.providerApiVersion}/` : ''
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
      `${this.apiV2}/${this.url}/payment-methods/braintree/client-tokens`,
      {},
      {},
      params
    )
  }

  getBraintreeClientNonce(params: ClientNonceParams) {
    return this.http.post<ClientNonceResponse>(
      `${this.apiV2}/${this.url}/payment-methods/braintree/get-payment-method`,
      params
    )
  }

  addBraintreePaymentCard(params: AddPaymentCardParams) {
    return this.http.post<ClientNonceResponse>(
      `${this.apiV2}/${this.url}/payment-methods/braintree/add-payment-details`,
      params
    )
  }

  getPaymentProvider() {
    return this.http.get<PaymentProvidersResponse>(`${this.apiV3}/${this.url}/providers`)
  }

  getAdyenClientKey() {
    return this.http.get<ClientKeyResponse>(`${this.apiV3}/${this.url}/adyen/client-key`)
  }

  getAdyenPaymentMethods(params: PaymentMethodsParams) {
    return this.http.post<PaymentMethodsResponse>(
      `${this.apiV3}/${this.url}/adyen/${this.getApiVersionPath()}payments-methods`,
      params
    )
  }

  createAdyenPaymentAuth(params: PaymentAuthParams) {
    return this.http.post<PaymentAuthResponse>(
      `${this.apiV3}/${this.url}/adyen/${this.getApiVersionPath()}payments`,
      params
    )
  }

  getAdyenPaymentDetails(params: PaymentDetailsParams) {
    return this.http.post<PaymentDetailsResponse>(`${this.apiV3}/${this.url}/adyen/payments-details`, params)
  }

  getV68AdyenPaymentDetails(params: V68PaymentDetailsParams) {
    return this.http.post<PaymentDetailsResponse>(
      `${this.apiV3}/${this.url}/adyen/v68/payments-details`,
      params
    )
  }
}
