import { transformer } from './transformer'
import { QuoteItem } from '@karhoo/demand-api'

describe('transformer', () => {
  const originalQuote: QuoteItem = {
    availability_id: 'ODJjZGMzNTktYmVlZC00NWNiLTg3NDMtYmFlYzg0ZTU4YjU3O2V4ZWN1dGl2ZQ==',
    category_name: 'Exec',
    currency_code: 'GBP',
    fleet_description:
      'Robot PHV Fleet for UK. Example description: Regional Private Hire Company operating in London and surroundings.',
    fleet_id: '82cdc359-beed-45cb-8743-baec84e58b57',
    fleet_name: 'PHV Fleet (Robot Fleet GB)',
    high_price: 2000,
    low_price: 2000,
    phone_number: '+44800000000',
    pick_up_type: 'DEFAULT',
    qta_high_minutes: 0,
    qta_low_minutes: 0,
    quote_id:
      'ff773de1-9e6f-11ea-a984-cee7b28f559b:ODJjZGMzNTktYmVlZC00NWNiLTg3NDMtYmFlYzg0ZTU4YjU3O2V4ZWN1dGl2ZQ==',
    quote_type: 'FIXED',
    source: 'FLEET',
    supplier_logo_url: '69279eb83537f0471137a72184f31edb.png',
    terms_conditions_url: '/fleets/7f8d80dc-0872-4fc0-86bd-658488d8fcb2/index.html',
    vehicle_attributes: {
      child_seat: false,
      electric: false,
      hybrid: false,
      luggage_capacity: 2,
      passenger_capacity: 3,
    },
    vehicle_class: 'executive',
  }

  const expectedQuote = {
    currencyCode: 'GBP',
    eta: null,
    finalPrice: null,
    fleetId: '82cdc359-beed-45cb-8743-baec84e58b57',
    fleetLogo: '69279eb83537f0471137a72184f31edb.png',
    fleetName: 'PHV Fleet (Robot Fleet GB)',
    fleetPhoneNumber: '+44800000000',
    fleetTermsAndConditions: '/fleets/7f8d80dc-0872-4fc0-86bd-658488d8fcb2/index.html',
    id:
      'ff773de1-9e6f-11ea-a984-cee7b28f559b:ODJjZGMzNTktYmVlZC00NWNiLTg3NDMtYmFlYzg0ZTU4YjU3O2V4ZWN1dGl2ZQ==',
    quotedPrice: 2000,
    type: 'FIXED',
    vehicleClass: 'executive',
    vehicleLuggageCapacity: 2,
    vehiclePassengerCapacity: 3,
    fleetDescription:
      'Robot PHV Fleet for UK. Example description: Regional Private Hire Company operating in London and surroundings.',
    originalQuote: {
      availability_id: 'ODJjZGMzNTktYmVlZC00NWNiLTg3NDMtYmFlYzg0ZTU4YjU3O2V4ZWN1dGl2ZQ==',
      category_name: 'Exec',
      currency_code: 'GBP',
      fleet_description:
        'Robot PHV Fleet for UK. Example description: Regional Private Hire Company operating in London and surroundings.',
      fleet_id: '82cdc359-beed-45cb-8743-baec84e58b57',
      fleet_name: 'PHV Fleet (Robot Fleet GB)',
      high_price: 2000,
      low_price: 2000,
      phone_number: '+44800000000',
      pick_up_type: 'DEFAULT',
      qta_high_minutes: 0,
      qta_low_minutes: 0,
      quote_id:
        'ff773de1-9e6f-11ea-a984-cee7b28f559b:ODJjZGMzNTktYmVlZC00NWNiLTg3NDMtYmFlYzg0ZTU4YjU3O2V4ZWN1dGl2ZQ==',
      quote_type: 'FIXED',
      source: 'FLEET',
      supplier_logo_url: '69279eb83537f0471137a72184f31edb.png',
      terms_conditions_url: '/fleets/7f8d80dc-0872-4fc0-86bd-658488d8fcb2/index.html',
      vehicle_attributes: {
        child_seat: false,
        electric: false,
        hybrid: false,
        luggage_capacity: 2,
        passenger_capacity: 3,
      },
      vehicle_class: 'executive',
    },
  }

  it('should transform original quote', () => {
    expect(transformer(originalQuote)).toEqual(expectedQuote)
  })

  it('should transform default values', () => {
    const quote: QuoteItem = {
      quote_id: '1',
      fleet_name: 'Robouser',
      quote_type: 'FIXED',
    }

    const expected = {
      currencyCode: '',
      eta: null,
      finalPrice: null,
      fleetId: '',
      fleetLogo: '',
      fleetName: 'Robouser',
      fleetPhoneNumber: '',
      fleetTermsAndConditions: '',
      id: '1',
      quotedPrice: null,
      type: 'FIXED',
      vehicleClass: '',
      vehicleLuggageCapacity: 0,
      vehiclePassengerCapacity: 0,
      fleetDescription: '',
      originalQuote: { quote_id: '1', fleet_name: 'Robouser', quote_type: 'FIXED' },
    }

    expect(transformer(quote)).toEqual(expected)
  })
})
