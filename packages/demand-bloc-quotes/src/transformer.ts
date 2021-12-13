import {
  QuoteV2Item as OriginalQuoteItem,
  QuotePriceType,
  ServiceLevelAgreements,
  QuotePickUpType,
} from '@karhoo/demand-api'

export interface QuoteItem {
  currencyCode: string
  eta?: number | null
  etaBreakdown: {
    from?: number | null
    to?: number | null
  }
  finalPrice?: null
  fleetCapabilities: string[]
  fleetId: string
  fleetLogo: string
  fleetName: string
  fleetPhoneNumber: string
  fleetTermsAndConditions: string
  id: string
  quotedPrice: number | null
  pickUpType?: QuotePickUpType
  type: QuotePriceType | ''
  vehicleClass: string
  vehicleTags: string[]
  vehicleType: string
  vehicleLuggageCapacity: number
  vehiclePassengerCapacity: number
  fleetDescription: string
  originalQuote: OriginalQuoteItem
  serviceLevelAgreements?: ServiceLevelAgreements | null
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
      capabilities = [],
    },
    vehicle: {
      qta: { high_minutes = null, low_minutes = null } = {},
      passenger_capacity = 0,
      luggage_capacity = 0,
      class: vehicle_class = '',
      tags = [],
      type = '',
    } = {},
    service_level_agreements = null,
    pick_up_type,
  } = quote

  return {
    currencyCode: currency_code,
    eta: high_minutes,
    etaBreakdown: {
      from: low_minutes,
      to: high_minutes,
    },
    finalPrice: null,
    fleetCapabilities: capabilities,
    fleetId: fleet_id,
    fleetLogo: logo_url,
    fleetName: name,
    fleetPhoneNumber: phone_number,
    fleetTermsAndConditions: terms_conditions_url,
    id,
    quotedPrice: high,
    pickUpType: pick_up_type,
    type: quote_type,
    vehicleClass: vehicle_class,
    vehicleTags: tags,
    vehicleType: type,
    vehicleLuggageCapacity: luggage_capacity,
    vehiclePassengerCapacity: passenger_capacity,
    fleetDescription: description,
    originalQuote: quote,
    serviceLevelAgreements: service_level_agreements,
  }
}
