import { VehicleAttributes } from '../sharedTypes'

export type QuotesAvailabilityParams = {
  originPlaceId: string
  destinationPlaceId?: string
  dateRequired?: string
}

export type QuotesAvailabilityResponse = {
  availabilities?: {
    availability_id?: string
    fleet_id?: string
    vehicle_class?: string
    supplier_name?: string
    logo_url?: string
    description?: string
    phone_number?: string
    rating?: number
    terms_conditions_url?: string
    category_name?: string
    integrated_fleet?: boolean
  }[]
  categories?: string[]
}

export type Quote = {
  type?: string
  total: number
  currency: string
  gratuity_percent?: number
  breakdown?: {
    value: number
    name: string
    description?: string
  }[]
  vehicle_class?: string
  qta_high_minutes?: number
  qta_low_minutes?: number
  vehicle_attributes?: VehicleAttributes
  source?: string
  high_price?: number
  low_price?: number
}
