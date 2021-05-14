import { HttpResponse, HttpResponseOk, HttpResponseError, ApiError } from '../http/types'
import { errorCodes } from '../responseCodes'
import { QuotePickUpTypes, QuoteSources, QuoteResponseStatuses, QuotePriceTypes } from '../sharedTypes'

import { QuotesResponse, QuotesByIdResponse, QuotesAvailabilityResponse } from './types'
import { QuotesV2Response, QuotesV2ByIdResponse, QuotesV2CoverageResponse } from './typesV2'

const quote = {
  availability_id: 'ZDU5MDVhM2QtZGE4MC00NWRjLWJkZjItOTAzZWE5ZWEyMjM1O21wdg==',
  category_name: 'MPV',
  currency_code: 'GBP',
  fleet_description:
    'Robot PHV Fleet operating globally. Example description: Regional Private Hire Company operating in London and surroundings.',
  fleet_id: 'd5905a3d-da80-45dc-bdf2-903ea9ea2235',
  fleet_name: 'Global PHV (Robot Fleet WWW)',
  high_price: 3000,
  low_price: 3000,
  phone_number: '+448000000000',
  pick_up_type: QuotePickUpTypes.DEFAULT,
  qta_high_minutes: 0,
  qta_low_minutes: 0,
  quote_id: '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e:ZDU5MDVhM2QtZGE4MC00NWRjLWJkZjItOTAzZWE5ZWEyMjM1O21wdg==',
  quote_type: QuotePriceTypes.FIXED,
  source: QuoteSources.FLEET,
  supplier_logo_url: '',
  terms_conditions_url: '',
  vehicle_attributes: {
    child_seat: false,
    electric: false,
    hybrid: false,
    luggage_capacity: 2,
    passenger_capacity: 4,
  },
  vehicle_class: 'mpv',
}

const quoteV2 = {
  id: 'ZDU5MDVhM2QtZGE4MC00NWRjLWJkZjItOTAzZWE5ZWEyMjM1O21wdg==',
  price: {
    currency_code: 'GBP',
    high: 3000,
    low: 3000,
    net: {
      high: 4000,
      low: 4500,
    },
  },
  pick_up_type: QuotePickUpTypes.DEFAULT,
  quote_type: QuotePriceTypes.METERED,
  source: QuoteSources.FLEET,
  fleet: {
    id: '385468a9-98fb-4267-a6c8-e324dee13714',
    name: 'Karhoo Cabs',
    description: 'This fleet offers great discounts in the evening',
    rating: {
      count: 5,
      score: 6,
    },
    logo_url: 'https://karhoo.com/logo/cab.png',
    terms_conditions_url: 'https://karhoo.com/terms/',
    phone_number: '+44123456789',
  },
  vehicle: {
    qta: {
      high_minutes: 2,
      low_minutes: 5,
    },
    class: 'Saloon',
    passenger_capacity: 2,
    luggage_capacity: 4,
  },
}

const jsonResponseHeaders = new Headers({
  'content-type': 'application/json',
})

const getErrorResponse = (message: string) => (code = errorCodes.K0001): HttpResponseError<ApiError> => ({
  ok: false,
  status: 500,
  headers: jsonResponseHeaders,
  error: {
    code,
    message: `${message}: Something went wrong`,
  },
})

export const getMockedQuotesSerchByIdResponse = (
  partialBody: Partial<QuotesByIdResponse> = {}
): HttpResponseOk<QuotesByIdResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    id: '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e',
    quote_items: [quote],
    status: QuoteResponseStatuses.COMPLETED,
    validity: 600,
    ...partialBody,
  },
})

export const getMockedQuotesV2SerchByIdResponse = (
  partialBody: Partial<QuotesV2ByIdResponse> = {}
): HttpResponseOk<QuotesV2ByIdResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    id: '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e',
    quotes: [quoteV2],
    status: QuoteResponseStatuses.COMPLETED,
    availability: {
      vehicles: {
        classes: ['Saloon'],
      },
    },
    validity: 600,
    ...partialBody,
  },
})

export const getMockedErrorQuotesSerchByIdResponse = getErrorResponse('Quotes search by id')

export const getMockedQuotesSearchResponse = (
  partialBody: Partial<QuotesResponse> = {}
): HttpResponseOk<QuotesResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    id: '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e',
    quote_items: [],
    status: QuoteResponseStatuses.PROGRESSING,
    validity: 599,
    ...partialBody,
  },
})

export const getMockedQuotesV2SearchResponse = (
  partialBody: Partial<QuotesV2Response> = {}
): HttpResponseOk<QuotesV2Response> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    id: '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e',
    quotes: [],
    status: QuoteResponseStatuses.PROGRESSING,
    availability: {
      vehicles: {
        classes: ['Saloon'],
      },
    },
    validity: 599,
    ...partialBody,
  },
})

export const getMockedErrorQuotesSearchResponse = getErrorResponse('Quotes search')

export const getMockedQuotesAvailabilityResponse = (): HttpResponse<QuotesAvailabilityResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    availabilities: [{ availability_id: 'availability_id' }],
    categories: ['test'],
  },
})

export const getMockedQuotesV2CheckCoverageResponse = (): HttpResponse<QuotesV2CoverageResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    coverage: true,
  },
})

export const getMockedErrorQuotesAvailabilityResponse = (): HttpResponse<QuotesAvailabilityResponse> => ({
  ok: false,
  status: 500,
  headers: jsonResponseHeaders,
  error: {
    code: 'K001',
    message: `Availability: Something went wrong`,
  },
})

export const getQuotesCheckAvailabilityMock = () =>
  jest.fn(() => Promise.resolve(getMockedQuotesAvailabilityResponse()))

export const getQuotesV2CheckCoverageMock = () =>
  jest.fn(() => Promise.resolve(getMockedQuotesV2CheckCoverageResponse()))

export const getQuotesSearchMock = () =>
  jest.fn(() => {
    return Promise.resolve(getMockedQuotesSearchResponse())
  })

export const getQuotesV2SearchMock = () =>
  jest.fn(() => {
    return Promise.resolve(getMockedQuotesV2SearchResponse())
  })

export const getQuotesSearchByIdMock = () =>
  jest.fn(() => Promise.resolve(getMockedQuotesSerchByIdResponse()))

export const getQuotesV2SearchByIdMock = () =>
  jest.fn(() => Promise.resolve(getMockedQuotesV2SerchByIdResponse()))
