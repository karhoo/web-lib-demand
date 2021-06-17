import { transformer } from './transformer'
import { QuoteV2Item } from '@karhoo/demand-api'

describe('transformer', () => {
  const originalQuote: QuoteV2Item = {
    id:
      'ff773de1-9e6f-11ea-a984-cee7b28f559b:ODJjZGMzNTktYmVlZC00NWNiLTg3NDMtYmFlYzg0ZTU4YjU3O2V4ZWN1dGl2ZQ==',
    price: {
      currency_code: 'GBP',
      high: 2000,
      low: 2000,
      net: {
        high: 2000,
        low: 2000,
      },
    },
    pick_up_type: 'DEFAULT',
    quote_type: 'FIXED',
    source: 'FLEET',
    fleet: {
      id: '82cdc359-beed-45cb-8743-baec84e58b57',
      name: 'PHV Fleet (Robot Fleet GB)',
      description:
        'Robot PHV Fleet for UK. Example description: Regional Private Hire Company operating in London and surroundings.',
      rating: {
        count: 2,
        score: 2,
      },
      logo_url: '69279eb83537f0471137a72184f31edb.png',
      terms_conditions_url: '/fleets/7f8d80dc-0872-4fc0-86bd-658488d8fcb2/index.html',
      phone_number: '+44800000000',
      capabilities: ['gps_tracking'],
    },
    vehicle: {
      qta: {
        high_minutes: 6,
        low_minutes: 2,
      },
      class: 'executive',
      passenger_capacity: 3,
      luggage_capacity: 2,
      type: 'standard',
      tags: ['electric'],
    },
  }

  const expectedQuote = {
    currencyCode: 'GBP',
    eta: 6,
    etaBreakdown: {
      from: 2,
      to: 6,
    },
    finalPrice: null,
    fleetCapabilities: ['gps_tracking'],
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
    vehicleTags: ['electric'],
    vehicleType: 'standard',
    vehicleLuggageCapacity: 2,
    vehiclePassengerCapacity: 3,
    fleetDescription:
      'Robot PHV Fleet for UK. Example description: Regional Private Hire Company operating in London and surroundings.',
    originalQuote,
    serviceLevelAgreements: null,
  }

  const sla = {
    free_cancellation: {
      type: 'TimeBeforePickup',
      minutes: 30,
    },
    free_waiting_time: {
      minutes: 20,
    },
  }

  it('should transform original quote', () => {
    expect(transformer(originalQuote)).toEqual(expectedQuote)
  })

  it('should transform default values', () => {
    const quote: QuoteV2Item = {
      id: '1',
      fleet: { id: '2', name: 'Robouser' },
      quote_type: 'FIXED',
      price: {},
    }

    const expected = {
      currencyCode: '',
      eta: null,
      etaBreakdown: {
        from: null,
        to: null,
      },
      finalPrice: null,
      fleetCapabilities: [],
      fleetId: '2',
      fleetLogo: '',
      fleetName: 'Robouser',
      fleetPhoneNumber: '',
      fleetTermsAndConditions: '',
      id: '1',
      quotedPrice: null,
      type: 'FIXED',
      vehicleClass: '',
      vehicleTags: [],
      vehicleType: '',
      vehicleLuggageCapacity: 0,
      vehiclePassengerCapacity: 0,
      fleetDescription: '',
      originalQuote: { id: '1', fleet: { id: '2', name: 'Robouser' }, quote_type: 'FIXED', price: {} },
      serviceLevelAgreements: null,
    }

    expect(transformer(quote)).toEqual(expected)
  })

  it('should transform quote with service level agreement', () => {
    const rawQuote = { ...originalQuote, service_level_agreements: sla }
    const newQuote = { ...expectedQuote, originalQuote: rawQuote, serviceLevelAgreements: sla }

    expect(transformer(rawQuote)).toEqual(newQuote)
  })
})
