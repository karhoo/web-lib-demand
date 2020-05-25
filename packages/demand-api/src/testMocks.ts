/* eslint @typescript-eslint/no-explicit-any: 0 */
import { HttpResponse } from './http/types'
import { LocationAddressDetailsResponse, LocationAddressAutocompleteResponse } from './location/types'
import { PoiSearchResponse } from './poi/types'
import {
  QuotesAvailabilityResponse,
  QuotesResponse,
  QuotesByIdResponse,
  QuoteResponseStatuses,
  QuotePriceTypes,
} from './quotes/types'
import { PlaceDetailTypes, MeetingPointTypes } from './sharedTypes'

export const getMockedPoiSearchResponse = (data: any): HttpResponse<PoiSearchResponse> => ({
  ok: true,
  status: 200,
  body: {
    pois: [
      {
        id: `k_poi_placeId:${data?.searchKey ?? ''}`,
        address: {
          display_address: `k_poi_display_address:${data?.searchKey ?? ''}`,
        },
        details: {
          type: PlaceDetailTypes.TRAIN_STATION,
        },
        geojson: 'geojson',
        name: 'name',
        meeting_points: [
          {
            position: {
              latitude: 90,
              longitude: 90,
            },
            type: MeetingPointTypes.DEFAULT,
          },
        ],
        position: {
          latitude: 90,
          longitude: 90,
        },
      },
    ],
  },
})

export const getMockedErrorPoiSearchResponse = (): HttpResponse<PoiSearchResponse> => ({
  ok: false,
  status: 500,
  error: {
    code: 'K001',
    message: `Poi: Something went wrong`,
  },
})

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

export const getMockedLocationAddressDetailsResponse = (
  data: any
): HttpResponse<LocationAddressDetailsResponse> => ({
  ok: true,
  status: 200,
  body: {
    place_id: `location_placeId:${data?.placeId ?? ''}`,
    address: {
      display_address: `location_display_address:${data?.placeId ?? ''}`,
      line_1: 'line_1',
      city: 'city',
    },
  },
})

export const getMockedErrorLocationAddressDetailsResponse = (): HttpResponse<LocationAddressDetailsResponse> => ({
  ok: false,
  status: 500,
  error: {
    code: 'K001',
    message: `Location: Something went wrong`,
  },
})

export const getMockedLocationAddressAutocompleteResponse = (
  data: any
): HttpResponse<LocationAddressAutocompleteResponse> => ({
  ok: true,
  status: 200,
  body: {
    locations: [
      {
        place_id: `autocomplete_placeId:${data?.query ?? ''}`,
        display_address: `autocomplete_display_address:${data?.query ?? ''}`,
        type: 'TRAIN_STATION',
      },
    ],
  },
})

export const getMockedErrorLocationAddressAutocompleteResponse = (): HttpResponse<LocationAddressAutocompleteResponse> => ({
  ok: false,
  status: 500,
  error: {
    code: 'K005',
    message: `Location autocomplete: Something went wrong`,
  },
})

export const mockHttpGet = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { get: true } }))
export const mockHttpPost = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { post: true } }))
export const mockHttpPut = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { put: true } }))
export const mockHttpRemove = jest.fn(() =>
  Promise.resolve({ ok: true, status: 200, body: { remove: true } })
)

export const getLocationGetAddressDetailsMock = () =>
  jest.fn((data: any) => {
    return Promise.resolve(getMockedLocationAddressDetailsResponse(data))
  })

export const getLocationGetAddressAutocompleteDataMock = () =>
  jest.fn((data: any) => {
    return Promise.resolve(getMockedLocationAddressAutocompleteResponse(data))
  })

export const getPoiSearchMock = () =>
  jest.fn((data: any) => {
    return Promise.resolve(getMockedPoiSearchResponse(data))
  })

export const getQuotesCheckAvailabilityMock = () =>
  jest.fn(() => Promise.resolve(getMockedQuotesAvailabilityResponse()))

export const getMockedQuotesSearchResponse = (): QuotesResponse => ({
  id: '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e',
  quote_items: [],
  status: QuoteResponseStatuses.PROGRESSING,
  validity: 599,
})

export const getMockedQuotesSerchByIdResponse = (): QuotesByIdResponse => ({
  id: '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e',
  quote_items: [
    {
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
      pick_up_type: 'DEFAULT',
      qta_high_minutes: 0,
      qta_low_minutes: 0,
      quote_id:
        '0f50d58a-9ab1-11ea-b5f3-022edec4eb5e:ZDU5MDVhM2QtZGE4MC00NWRjLWJkZjItOTAzZWE5ZWEyMjM1O21wdg==',
      quote_type: QuotePriceTypes.FIXED,
      source: 'FLEET',
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
    },
  ],
  status: QuoteResponseStatuses.COMPLETED,
  validity: 600,
})

export const getQuotesSearchMock = () =>
  jest.fn(() => {
    return Promise.resolve(getMockedQuotesSearchResponse())
  })

export const getQuotesSearchByIdMock = () =>
  jest.fn(() => Promise.resolve(getMockedQuotesSerchByIdResponse()))

export const getApiMock = () => {
  const mockLocationGetAddressDetails = getLocationGetAddressDetailsMock()
  const mockLocationGetAddressAutocompleteData = getLocationGetAddressAutocompleteDataMock()
  const mockPoiSearch = getPoiSearchMock()
  const mockQuotesCheckAvailability = getQuotesCheckAvailabilityMock()
  const mockQuoteSearch = getQuotesSearchByIdMock()
  const mockQuoteSearchById = getQuotesSearchByIdMock()

  return {
    locationService: {
      getAddressDetails: mockLocationGetAddressDetails,
      getAddressAutocompleteData: mockLocationGetAddressAutocompleteData,
    },
    poiService: {
      search: mockPoiSearch,
    },
    quotesService: {
      checkAvailability: mockQuotesCheckAvailability,
      quotesSearch: getQuotesSearchMock,
      quotesSearchById: getQuotesSearchByIdMock,
    },
    mockClear: () => {
      ;[
        mockLocationGetAddressDetails,
        mockLocationGetAddressAutocompleteData,
        mockPoiSearch,
        mockQuotesCheckAvailability,
        mockQuoteSearch,
        mockQuoteSearchById,
      ].forEach(m => m.mockClear())
    },
  }
}
