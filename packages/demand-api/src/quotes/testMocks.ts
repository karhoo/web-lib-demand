import { HttpResponse, HttpResponseOk, HttpResponseError, ApiError } from '../http/types'
import { errorCodes } from '../responseCodes'

import {
  QuotesResponse,
  QuotesByIdResponse,
  QuotesAvailabilityResponse,
  QuoteResponseStatuses,
  QuotePriceTypes,
} from './types'

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
  pick_up_type: 'DEFAULT' as const,
  qta_high_minutes: 0,
  qta_low_minutes: 0,
  quote_id: '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e:ZDU5MDVhM2QtZGE4MC00NWRjLWJkZjItOTAzZWE5ZWEyMjM1O21wdg==',
  quote_type: QuotePriceTypes.FIXED,
  source: 'FLEET' as const,
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

const getErrorResponse = (message: string) => (code = errorCodes.K0001): HttpResponseError<ApiError> => ({
  ok: false,
  status: 500,
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
  body: {
    id: '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e',
    quote_items: [quote],
    status: QuoteResponseStatuses.COMPLETED,
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
  body: {
    id: '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e',
    quote_items: [],
    status: QuoteResponseStatuses.PROGRESSING,
    validity: 599,
    ...partialBody,
  },
})

export const getMockedErrorQuotesSearchResponse = getErrorResponse('Quotes search')

export const getMockedQuotesAvailabilityResponse = (): HttpResponse<QuotesAvailabilityResponse> => ({
  ok: true,
  status: 200,
  body: {
    availabilities: [{ availability_id: 'availability_id' }],
    categories: ['test'],
  },
})

export const getMockedErrorQuotesAvailabilityResponse = (): HttpResponse<QuotesAvailabilityResponse> => ({
  ok: false,
  status: 500,
  error: {
    code: 'K001',
    message: `Availability: Something went wrong`,
  },
})

export const getQuotesCheckAvailabilityMock = () =>
  jest.fn(() => Promise.resolve(getMockedQuotesAvailabilityResponse()))

export const getQuotesSearchMock = () =>
  jest.fn(() => {
    return Promise.resolve(getMockedQuotesSearchResponse())
  })

export const getQuotesSearchByIdMock = () =>
  jest.fn(() => Promise.resolve(getMockedQuotesSerchByIdResponse()))
