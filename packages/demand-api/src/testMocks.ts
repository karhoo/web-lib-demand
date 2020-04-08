/* eslint @typescript-eslint/no-explicit-any: 0 */
import { HttpResponse } from './http/types'
import { LocationAddressDetailsResponse, LocationAddressAutocompleteResponse } from './location/types'
import { PoiSearchResponse } from './poi/types'
import { QuotesAvailabilityResponse } from './quotes/types'

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
          type: 'TRAIN_STATION',
        },
        geojson: 'geojson',
        name: 'name',
        meeting_points: [
          {
            position: {
              latitude: 90,
              longitude: 90,
            },
            type: 'DEFAULT',
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
    place_id: `location_placeId:${data.placeId}`,
    address: {
      display_address: `location_display_address:${data.placeId}`,
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
        place_id: `autocomplete_placeId:${data.query}`,
        display_address: `autocomplete_display_address:${data.query}`,
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

export const mockLocationGetAddressDetails = jest.fn((data: any) => {
  return Promise.resolve(getMockedLocationAddressDetailsResponse(data))
})

export const mockLocationGetAddressAutocompleteData = jest.fn((data: any) => {
  return Promise.resolve(getMockedLocationAddressAutocompleteResponse(data))
})

export const mockPoiSearch = jest.fn((data: any) => {
  return Promise.resolve(getMockedPoiSearchResponse(data))
})

export const mockQuotesCheckAvailability = jest.fn(() =>
  Promise.resolve(getMockedQuotesAvailabilityResponse())
)

export const mockHttpGet = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { get: true } }))
export const mockHttpPost = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { post: true } }))
export const mockHttpPut = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { put: true } }))
export const mockHttpRemove = jest.fn(() =>
  Promise.resolve({ ok: true, status: 200, body: { remove: true } })
)
