import { QuoteV2Item as OriginalQuoteItem, QuotePriceType } from '@karhoo/demand-api'

export interface QuoteItem {
  currencyCode: string
  eta?: number | null
  etaBreakdown: {
    from?: number | null
    to?: number | null
  }
  finalPrice?: null
  fleetId: string
  fleetLogo: string
  fleetName: string
  fleetPhoneNumber: string
  fleetTermsAndConditions: string
  id: string
  quotedPrice: number | null
  type: QuotePriceType | ''
  vehicleClass: string
  vehicleLuggageCapacity: number
  vehiclePassengerCapacity: number
  fleetDescription: string
  originalQuote: OriginalQuoteItem
}

export const transformer = (quote: OriginalQuoteItem): QuoteItem => {
  const {
    id,
    quote_type,
    price: { currency_code = '', high = null },
    fleet: {
      id: fleet_id,
      name,
      logo_url = '',
      terms_conditions_url = '',
      phone_number = '',
      description = '',
    },
    vehicle: {
      qta: { high_minutes = null, low_minutes = null } = {},
      passenger_capacity = 0,
      luggage_capacity = 0,
      class: vehicle_class = '',
    } = {},
  } = quote

  return {
    currencyCode: currency_code,
    eta: high_minutes,
    etaBreakdown: {
      from: low_minutes,
      to: high_minutes,
    },
    finalPrice: null,
    fleetId: fleet_id,
    fleetLogo: logo_url,
    fleetName: name,
    fleetPhoneNumber: phone_number,
    fleetTermsAndConditions: terms_conditions_url,
    id,
    quotedPrice: high,
    type: quote_type,
    vehicleClass: vehicle_class,
    vehicleLuggageCapacity: luggage_capacity,
    vehiclePassengerCapacity: passenger_capacity,
    fleetDescription: description,
    originalQuote: quote,
  }
}
