import {
  QuoteResponseStatuse,
  QuotePriceType,
  QuotePickUpType,
  QuoteSource,
  LatLng,
  ServiceLevelAgreements,
} from '../sharedTypes'
import { HttpResponse } from '../http/types'

export type QuotePrice = {
  currency_code?: string
  high?: number
  low?: number
  net?: {
    high?: number
    low?: number
  }
}

export interface QuoteLocationParams extends LatLng {
  displayAddress?: string
}

export type QuoteCoverageParams = LatLng & {
  localTimeOfPickup?: string
}

export type QuotesV2SearchParams = {
  origin: QuoteLocationParams
  destination?: QuoteLocationParams
  localTimeOfPickup?: string
}

export type QuotesV2FleetRating = {
  count?: number
  score?: number
}

export type QuotesV2Fleet = {
  id: string
  name: string
  description?: string
  rating?: QuotesV2FleetRating
  logo_url?: string
  terms_conditions_url?: string
  phone_number?: string
}

export type QuotesV2Vehicle = {
  qta?: {
    high_minutes: number
    low_minutes: number
  }
  class: string
  passenger_capacity?: number
  luggage_capacity?: number
}

export type QuoteV2Item = {
  id: string
  price: QuotePrice
  pick_up_type?: QuotePickUpType
  quote_type: QuotePriceType
  source?: QuoteSource
  fleet: QuotesV2Fleet
  vehicle?: QuotesV2Vehicle
  sla?: ServiceLevelAgreements
}

export type QuotesV2Response = {
  id: string
  status: QuoteResponseStatuse
  quotes: QuoteV2Item[]
  availability: {
    vehicles?: {
      classes?: string[]
    }
  }
  validity?: number
}

export type QuotesV2CoverageResponse = {
  coverage: boolean
}

export interface QuotesV2ByIdResponse extends QuotesV2Response {
  quotes: QuoteV2Item[]
}

export interface QuotesV2 {
  checkCoverage(params: QuoteCoverageParams): Promise<HttpResponse<QuotesV2CoverageResponse>>
  quotesSearch(params: QuotesV2SearchParams): Promise<HttpResponse<QuotesV2Response>>
  quotesSearchById(id: string, locale?: string): Promise<HttpResponse<QuotesV2ByIdResponse>>
}
