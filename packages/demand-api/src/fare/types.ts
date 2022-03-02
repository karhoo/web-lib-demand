import { HttpResponse } from '../http/types'

export type FareBreakdownItem = {
  tax_percentage: number
  discount_percentage?: number
  commission_percentage?: number
  tax_amount: number
  list_price: number
  net_price: number
}

export type FareBreakdown = {
  base: FareBreakdownItem
  commission?: FareBreakdownItem
  extras?: FareBreakdownItem[]
  expenses?: FareBreakdownItem[]
  total: number
  currency: string
}

export enum FinalFareStatuses {
  PENDING = 'PENDING',
  FINAL = 'FINAL',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export type FinalFareResponse = {
  state: keyof typeof FinalFareStatuses
  expected_final_time?: string
  expected_in?: number
  breakdown?: FareBreakdown
}

export interface Fare {
  status(id: string): Promise<HttpResponse<FinalFareResponse>>
}
