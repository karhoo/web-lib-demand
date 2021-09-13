import { HttpResponse } from '../http/types'

export type ClientId = string // could be a list of supported clients but lib is public

export type LoyaltyStatusResponse = {
  balance?: number
  can_burn?: boolean
  can_earn?: boolean
}

export type BurnPointsCalcParams = {
  amount?: number
  currency?: string
}

export type BurnPointsCalcResponse = {
  points?: number
}

export type EarnPointsCalcParams = {
  total_amount?: number
  burn_points?: number
  currency?: string
}

export type EarnPointsCalcResponse = {
  points?: number
}

export type PreAuthParams = {
  points?: number
  flexpay?: boolean
}

export type PreAuthResponse = {
  nonce?: string
}

export interface Loyalty {
  getStatus(clientId: ClientId): Promise<HttpResponse<LoyaltyStatusResponse>>
  convertMoneyToPoints(
    clientId: ClientId,
    params: BurnPointsCalcParams
  ): Promise<HttpResponse<BurnPointsCalcResponse>>
  calculatePointsToEarn(
    clientId: ClientId,
    params: EarnPointsCalcParams
  ): Promise<HttpResponse<EarnPointsCalcResponse>>
  preAuth(clientId: ClientId, params: PreAuthParams): Promise<HttpResponse<PreAuthResponse>>
}
