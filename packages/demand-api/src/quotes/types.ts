import { VehicleAttributes } from '../sharedTypes'
import { HttpResponse } from '../http/types'

export enum QuoteResponseStatuses {
  PROGRESSING = 'PROGRESSING',
  COMPLETED = 'COMPLETED',
}

export enum QuotePriceTypes {
  FIXED = 'FIXED',
  ESTIMATED = 'ESTIMATED',
  METERED = 'METERED',
}

export type QuotesAvailabilityParams = {
  originPlaceId: string
  destinationPlaceId?: string
  dateRequired?: string
}

export type QuotesSearchParams = {
  originPlaceId: string
  destinationPlaceId: string
  localTimeOfPickup?: string
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

export type QuoteItem = {
  quote_id: string
  fleet_id?: string
  fleet_description?: string
  availability_id?: string
  fleet_name: string
  phone_number?: string
  pick_up_type?: 'DEFAULT' | 'STAND_BY' | 'CURB_SIDE' | 'MEET_AND_GREET'
  supplier_logo_url?: string
  vehicle_class?: string
  quote_type: QuotePriceTypes
  high_price?: number
  low_price?: number
  currency_code?: string
  qta_high_minutes?: number
  qta_low_minutes?: number
  terms_conditions_url?: string
  category_name?: string
  vehicle_attributes?: VehicleAttributes
  source?: 'FLEET' | 'MARKET'
  validity?: number
}

export type QuotesResponse = {
  id: string
  status: QuoteResponseStatuses
  quote_items?: QuoteItem[]
  validity?: number
}

export interface QuotesByIdResponse extends QuotesResponse {
  quote_items: QuoteItem[]
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

export interface Quotes {
  checkAvailability(params: QuotesAvailabilityParams): Promise<HttpResponse<QuotesAvailabilityResponse>>

  quotesSearch(params: QuotesSearchParams): Promise<HttpResponse<QuotesResponse>>
  quotesSearchById(id: string): Promise<HttpResponse<QuotesByIdResponse>>
}
