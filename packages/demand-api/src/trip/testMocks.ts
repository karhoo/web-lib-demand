import { HttpResponseOk, HttpResponseError, ApiError } from '../http/types'
import { errorCodes } from '../responseCodes'

import { TripFollowResponse, TripStatuses, SearchResponse, BookATripResponse } from './types'

export const testBookings: BookATripResponse[] = [
  {
    status: 'COMPLETED',
    date_booked: '2021-01-29T12:54:57Z',
    date_scheduled: '2021-02-05T13:50:00Z',
    id: '1ca721df-38df-4cb5-9705-d42d51dcfdce',
    origin: {
      display_address: 'Élysée Palace, 55 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
      place_id: 'ChIJR-OmjM5v5kcRIi9Yekb0OC4',
      poi_type: 'NOT_SET_POI_TYPE',
      position: { latitude: 48.87048, longitude: 2.3165667 },
      timezone: 'Europe/Paris',
    },
    destination: {
      display_address: '52 Rue Perrault, 75001 Paris, France',
      place_id: 'ChIJTSgKdCFu5kcRZdh3P7k9pXU',
      poi_type: 'NOT_SET_POI_TYPE',
      position: { latitude: 48.860405, longitude: 2.3420718 },
      timezone: 'Europe/Paris',
    },
    quote: {
      breakdown: [],
      currency: 'GBP',
      high_price: 751,
      low_price: 751,
      source: 'FLEET',
      total: 751,
      type: 'METERED',
      vehicle_attributes: {
        child_seat: true,
        electric: true,
        luggage_capacity: 3,
        passenger_capacity: 2,
      },
      vehicle_class: 'executive',
    },
  },
  {
    status: 'CONFIRMED',
    date_booked: '2021-01-29T12:50:40Z',
    date_scheduled: '2021-02-14T12:35:00Z',
    id: 'e0b56b11-9a00-46e5-ad63-b9452768377a',
    origin: {
      display_address: 'London Bridge, London SE1 9RA, UK',
      place_id: 'ChIJCa1dKVcDdkgRAPPhy56rmBk',
      poi_type: 'NOT_SET_POI_TYPE',
      position: { latitude: 51.506836, longitude: -0.0884293 },
      timezone: 'Europe/London',
    },
    destination: {
      display_address: '4 Artillery Row, Westminster, London SW1E 6AS, UK',
      place_id: 'ChIJuSmNkN4EdkgRTfVsZ9JvJ7A',
      poi_type: 'NOT_SET_POI_TYPE',
      position: { latitude: 51.497387, longitude: -0.1358243 },
      timezone: 'Europe/London',
    },
    quote: {
      breakdown: [],
      currency: 'GBP',
      high_price: 788,
      low_price: 788,
      source: 'FLEET',
      total: 788,
      type: 'METERED',
      vehicle_attributes: { child_seat: true, hybrid: true, luggage_capacity: 2, passenger_capacity: 2 },
      vehicle_class: 'saloon',
    },
  },
]

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

export const getMockedTrackTripResponse = (
  partialBody: Partial<TripFollowResponse> = {}
): HttpResponseOk<TripFollowResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    trip_id: 'trip_id',
    date_scheduled: '2020-05-28T08:17:07Z',
    status: TripStatuses.COMPLETED,
    ...partialBody,
  },
})

export const getMockedErrorTrackTripResponse = getErrorResponse('Track trip')

export const getMockedCancelByFollowCodeResponse = (): HttpResponseOk<object> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {},
})

export const getMockedSearchResponse = (): HttpResponseOk<SearchResponse> => ({
  ok: true,
  status: 200,
  headers: jsonResponseHeaders,
  body: {
    bookings: testBookings,
  },
})

export const getMockedCancelResponse = (): HttpResponseOk<object> => ({
  ok: true,
  status: 204,
  headers: jsonResponseHeaders,
  body: {},
})
