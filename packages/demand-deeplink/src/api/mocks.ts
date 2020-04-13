/* eslint @typescript-eslint/no-explicit-any: 0 */
import {
  LocationAddressDetailsResponse,
  LocationAddressAutocompleteResponse,
  PoiSearchResponse,
  QuotesAvailabilityResponse,
} from '../types'
import { HttpResponse } from './types'

export const getMockedPoiSearchResponse = (data: any): HttpResponse<PoiSearchResponse> => ({
  ok: true,
  status: 200,
  body: {
    pois: [
      {
        id: `k_poi_placeId:${data.searchKey}`,
        address: {
          display_address: `k_poi_display_address:${data.searchKey}`,
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
        type: `autocomplete_type:${data.query}`,
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