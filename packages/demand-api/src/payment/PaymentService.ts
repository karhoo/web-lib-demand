import { Http } from '../http/types'
import {
  CreateTokenParams,
  CreateTokenResponse,
  ClientNonceParams,
  ClientNonceResponse,
  AddPaymentCardParams,
  Payment,
} from './types'

export class PaymentService implements Payment {
  private url = 'payments'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  createClientToken(params: CreateTokenParams) {
    return this.http.post<CreateTokenResponse>(
      `${this.url}/payment-methods/braintree/client-tokens`,
      {},
      {},
      params
    )
  }

  getClientNonce(params: ClientNonceParams) {
    return this.http.post<ClientNonceResponse>(
      `${this.url}/payment-methods/braintree/get-payment-method`,
      params
    )
  }

  addPaymentCard(params: AddPaymentCardParams) {
    return this.http.post<ClientNonceResponse>(
      `${this.url}/payment-methods/braintree/add-payment-details`,
      params
    )
  }
}
