import { get } from 'lodash'
import { QuoteItem as OriginalQuoteItem } from '@karhoo/demand-api'

export interface QuoteItem {
  currencyCode: string
  eta?: number | null

  finalPrice?: null
  fleetId: string
  fleetLogo: string
  fleetName: string
  fleetPhoneNumber: string
  fleetTermsAndConditions: string
  id: string
  quotedPrice: number | null
  type: 'FIXED' | 'ESTIMATED' | 'METERED' | ''
  vehicleClass: string
  vehicleLuggageCapacity: number
  vehiclePassengerCapacity: number
  fleetDescription: string
  originalQuote: OriginalQuoteItem
}

export const transformer = (quote: OriginalQuoteItem): QuoteItem => {
  const {
    currency_code,
    fleet_id,
    fleet_name,
    high_price,
    qta_high_minutes,
    quote_id,
    quote_type,
    supplier_logo_url,
    vehicle_attributes,
    vehicle_class,
    phone_number,
    terms_conditions_url,
    fleet_description,
  } = quote

  return {
    currencyCode: currency_code || '',
    eta: qta_high_minutes || null,
    finalPrice: null,
    fleetId: fleet_id || '',
    fleetLogo: supplier_logo_url || '',
    fleetName: fleet_name || '',
    fleetPhoneNumber: phone_number || '',
    fleetTermsAndConditions: terms_conditions_url || '',
    id: quote_id,
    quotedPrice: high_price || null,
    type: quote_type || '',
    vehicleClass: vehicle_class || '',
    vehicleLuggageCapacity: get(vehicle_attributes, 'luggage_capacity') || 0,
    vehiclePassengerCapacity: get(vehicle_attributes, 'passenger_capacity') || 0,
    fleetDescription: fleet_description || '',
    originalQuote: quote,
  }
}
