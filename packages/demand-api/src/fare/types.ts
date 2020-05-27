import { HttpResponse } from '../http/types'

type BreakdownItem = Partial<{
  tax_percentage: number
  discount_percentage: number
  commission_percentage: number
  tax_amount: number
  list_price: number
  net_price: number
}>

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
  breakdown?: Partial<{
    base: BreakdownItem
    commission: BreakdownItem
    extras: BreakdownItem[]
    expenses: BreakdownItem[]
    total: number
    currency: string
  }>
}

export interface Fare {
  status(id: string): Promise<HttpResponse<FinalFareResponse>>
}
