import { Http } from '../http/types'
import {
  ClientId,
  Loyalty,
  LoyaltyStatusResponse,
  BurnPointsCalcParams,
  BurnPointsCalcResponse,
  EarnPointsCalcParams,
  EarnPointsCalcResponse,
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

  convertMoneyToPoints(clientId: ClientId, params: BurnPointsCalcParams) {
    return this.http.get<BurnPointsCalcResponse>(
      `${this.createUrl(clientId)}/exrates/${params.currency}/burnpoints?amount=${params.amount}`
    )
  }

  calculatePointsToEarn(clientId: ClientId, params: EarnPointsCalcParams) {
    return this.http.get<EarnPointsCalcResponse>(
      `${this.createUrl(clientId)}/exrates/${params.currency}/earnpoints?total_amount=${
        params.total_amount
      }&burn_points=${params.burn_points || 0}`
    )
  }

  preAuth(clientId: ClientId, params: PreAuthParams) {
    return this.http.post<PreAuthResponse>(`${this.createUrl(clientId)}/pre-auth`, params)
  }
}
