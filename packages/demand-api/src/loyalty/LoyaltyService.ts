import { Http } from '../http/types'
import {
  ClientId,
  Loyalty,
  LoyaltyStatusResponse,
  MoneyToPointsParams,
  MoneyToPointsResponse,
  PreAuthParams,
  PreAuthResponse,
} from './types'

export class LoyaltyService implements Loyalty {
  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  private createUrl(clientId: ClientId) {
    return `loyalty-${clientId}`
  }

  getStatus(clientId: ClientId) {
    return this.http.get<LoyaltyStatusResponse>(`${this.createUrl(clientId)}/status`)
  }

  convertMoneyToPoints(clientId: ClientId, params: MoneyToPointsParams) {
    return this.http.post<MoneyToPointsResponse>(`${this.createUrl(clientId)}/money-to-points`, params)
  }

  preAuth(clientId: ClientId, params: PreAuthParams) {
    return this.http.post<PreAuthResponse>(`${this.createUrl(clientId)}/pre-auth`, params)
  }
}
