import { HttpResponse } from '../http/types'

export type ClientId = string // could be a list of supported clients but lib is public

export type LoyaltyStatusResponse = {
  balance?: number
  can_burn_points?: boolean
}

export type MoneyToPointsParams = {
  amount?: number
  currency?: string // probably should be a list of supported currencies?
}

export type MoneyToPointsResponse = {
  points?: number
}

export type PreAuthParams = {
  points?: number
}

export type PreAuthResponse = {
  nonce?: string
}

export interface Loyalty {
  getStatus(clientId: ClientId): Promise<HttpResponse<LoyaltyStatusResponse>>
  convertMoneyToPoints(
    clientId: ClientId,
    params: MoneyToPointsParams
  ): Promise<HttpResponse<MoneyToPointsResponse>>
  preAuth(clientId: ClientId, params: PreAuthParams): Promise<HttpResponse<PreAuthResponse>>
}
