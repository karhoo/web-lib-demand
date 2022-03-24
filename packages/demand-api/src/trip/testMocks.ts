import { HttpResponseOk, HttpResponseError, ApiError } from '../http/types'
import { errorCodes } from '../responseCodes'

import { TripFollowResponse, TripStatuses, SearchResponse, BookATripResponse, StateDetails } from './types'

export const testBookings: BookATripResponse[] = [
  {
    status: TripStatuses.COMPLETED,
    date_booked: '2021-01-29T12:54:57Z',
    date_scheduled: '2021-02-05T13:50:00Z',
    id: '1ca721df-38df-4cb5-9705-d42d51dcfdce',
    meeting_point: {
      position: { latitude: 48.87048, longitude: 2.3165667 },
      type: 'NOT_SET',
    },
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
    partner_traveller_id: 'xyz',
    passengers: {
      luggage: {
        total: 1,
      },
      passenger_details: [
        {
          email: 'Test@testing.com',
          first_name: 'Test',
          last_name: 'User',
          locale: 'en_GB',
          phone_number: '+15005550006',
        },
      ],
    },
    state_details: StateDetails.ASKED_BY_DISPATCH,
    fare: {
      breakdown: [
        {
          name: 'karhoo_calculated_net_base_rate',
          value: 6,
        },
        {
          name: 'karhoo_calculated_vat',
          value: 0,
        },
        {
          name: 'karhoo_commission_total',
          value: 0,
        },
      ],
      currency: 'GBP',
      total: 835,
    },
    external_trip_id: '23wyehsd-3weoihdsk',
    display_trip_id: '392wyehsdkxc-0wehdsc',
    fleet_info: {
      fleet_id: '9d0ab5e4-2093-42f0-b870-d1b442c40d19',
      logo_url: 'https://cdn.karhoo.com/d/images/logos/cc775eda-950d-4a77-aa83-172d487a4cbf.png',
      name: '[DO NOT TOUCH!] E2E-Fixed',
      phone_number: '+44800000000',
      terms_conditions_url:
        'https://cdn.karhoo.net/d/terms/organisations/f243cf03a532fa307eb40dd779e2ce17.html',
    },
    vehicle: {
      attributes: {
        luggage_capacity: 2,
        passenger_capacity: 2,
      },
      description: 'Black NASA Saturn V',
      driver: {
        first_name: 'Sasha',
        last_name: 'Aleksandr',
        license_number: '111111',
        phone_number: '447111765098',
        photo_url: 'https://cdn.karhoo.net/d/images/driver-photos/331945a42b559bccb77e562d599ecf06.jpg',
      },
      tags: ['executive'],
      type: 'standard',
      vehicle_class: 'executive',
      vehicle_license_plate: 'VZGU0F',
    },
    partner_trip_id: '32987-2397u',
    comments: 'comments',
  },
  {
    status: TripStatuses.CONFIRMED,
    date_booked: '2021-01-29T12:50:40Z',
    date_scheduled: '2021-02-14T12:35:00Z',
    id: 'e0b56b11-9a00-46e5-ad63-b9452768377a',
    meeting_point: {
      position: { latitude: 51.506836, longitude: -0.0884293 },
      type: 'NOT_SET',
    },
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
    flight_number: 'LOT092',
    train_number: 'LO1-092',
    agent: {
      organisation_id: '7928e78f-aa65-4a2c-99a2-643cbe7e14c4',
      organisation_name: 'DefaultOrgForKarhooPortalUsers',
      user_id: '1b7eef89-86f9-4df1-b017-e366ae5462c7',
      user_name: 'E2E User',
    },
    cost_center_reference: '12',
    follow_code: '28121921-291809',
    meta: { key: 'value' },
    train_time: '2021-01-29T19:50:40Z',
    service_level_agreements: {
      free_cancellation: {
        minutes: 0,
        type: 'TimeBeforePickup',
      },
      free_waiting_time: {
        minutes: 0,
      },
    },
  },
]

const jsonResponseHeaders = new Headers({
  'content-type': 'application/json',
})

const getErrorResponse =
  (message: string) =>
  (code = errorCodes.K0001): HttpResponseError<ApiError> => ({
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
