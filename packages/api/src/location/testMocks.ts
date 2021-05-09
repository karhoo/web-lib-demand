/* eslint @typescript-eslint/no-explicit-any: 0 */
import { HttpResponse } from '../http/types'
import { errorCodes } from '../responseCodes'

import { LocationAddressDetailsResponse, LocationAddressAutocompleteResponse } from './types'

const getErrorResponse = <T>(message: string) => (code = errorCodes.K0001): HttpResponse<T> => ({
  ok: false,
  status: 500,
  error: {
    code,
    message: `${message}: Something went wrong`,
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
    position: {
      latitude: 51.56,
      longitude: -0.46,
    },
  },
})

export const getMockedErrorLocationAddressDetailsResponse = getErrorResponse<LocationAddressDetailsResponse>(
  'Location address details'
)

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

export const getMockedErrorLocationAddressAutocompleteResponse = getErrorResponse<
  LocationAddressAutocompleteResponse
>('Location autocomplete')

export const getMockedErrorReverseGeocodeResponse = getErrorResponse<LocationAddressDetailsResponse>(
  'Location Reverse Geocode'
)

export const getLocationGetAddressDetailsMock = () =>
  jest.fn((data: any) => {
    return Promise.resolve(getMockedLocationAddressDetailsResponse(data))
  })

export const getLocationGetReverseGeocodeMock = () =>
  jest.fn((data: any) => {
    return Promise.resolve(getMockedLocationAddressDetailsResponse(data))
  })

export const getLocationGetAddressAutocompleteDataMock = () =>
  jest.fn((data: any) => {
    return Promise.resolve(getMockedLocationAddressAutocompleteResponse(data))
  })
