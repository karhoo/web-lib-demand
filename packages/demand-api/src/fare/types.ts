type BreakdownItem = Partial<{
  tax_percentage: number
  discount_percentage: number
  commission_percentage: number
  tax_amount: number
  list_price: number
  net_price: number
}>

export type FinalFareResponse = {
  state: 'PENDING' | 'FINAL' | 'CANCELLED' | 'FAILED'
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
