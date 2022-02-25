import { HttpResponse } from '../http/types'
import { Quote } from '../quotes/types'
import {
  CommonPoiType,
  LatLng,
  MeetingPointType,
  VehicleAttributes,
  ServiceLevelAgreements,
} from '../sharedTypes'

export type PassengerDetails = {
  first_name?: string
  last_name: string
  email?: string
  phone_number: string
  locale?: string
}

type Passengers = {
  additional_passengers?: number
  luggage?: {
    total: number
  }
  passenger_details: PassengerDetails[]
}

type Address = {
  display_address: string
  place_id: string
  poi_type?: 'NOT_SET_POI_TYPE' | CommonPoiType
  position?: LatLng
  timezone?: string
}

export enum TripStatuses {
  ARRIVED = 'ARRIVED',
  BOOKER_CANCELLED = 'BOOKER_CANCELLED',
  COMPLETED = 'COMPLETED',
  CONFIRMED = 'CONFIRMED',
  DRIVER_CANCELLED = 'DRIVER_CANCELLED',
  DRIVER_EN_ROUTE = 'DRIVER_EN_ROUTE',
  NO_DRIVERS_AVAILABLE = 'NO_DRIVERS_AVAILABLE',
  POB = 'POB',
  REQUESTED = 'REQUESTED',
  KARHOO_CANCELLED = 'KARHOO_CANCELLED',
  PREAUTH_DECLINED = 'PREAUTH_DECLINED',
  INCOMPLETE = 'INCOMPLETE',
  FAILED = 'FAILED',
}

export type TripStatus = keyof typeof TripStatuses

export type TripFollowResponse = {
  passengers?: Passengers
  status: TripStatus
  state_details?: string
  origin?: Address
  destination?: Address
  date_scheduled?: string
  date_booked?: string
  quote?: Quote
  display_trip_id?: string
  fleet_info?: {
    fleet_id?: string
    name?: string
    logo_url?: string
    description?: string
    phone_number?: string
    terms_conditions_url?: string
    email?: string
  }
  vehicle?: {
    vehicle_class: string
    description?: string
    vehicle_license_plate: string
    attributes?: VehicleAttributes
    driver: {
      first_name: string
      last_name: string
      phone_number: string
      photo_url?: string
      license_number?: string
    }
    type: string
    tags?: Array<string>
  }
  tracking?: {
    position?: LatLng
    direction?: {
      kph: number
      heading: number
    }
    origin_eta?: number
    destination_eta?: number
  }
  train_number?: string
  train_time?: string
  flight_number?: string
  trip_id?: string
  id?: string
  meeting_point?: {
    position?: LatLng
    type?: 'NOT_SET' | MeetingPointType
    instructions?: string
    note?: string
  }
  service_level_agreements?: ServiceLevelAgreements
  meta?: {
    [k: string]: string
  }
}

export type BookATripParams = {
  meta?: object
  quote_id: string
  passengers: Passengers
  partner_trip_id?: string
  flight_number?: string
  train_number?: string
  cost_center_reference?: string
  payment_nonce: string
  train_time?: string
  loyalty_programme?: string
  loyalty_points?: number
}

export type BookATripWithoutNonceParams = {
  quote_id: string
  passengers: Passengers
  meta?: object
  partner_trip_id?: string
  comments?: string
  flight_number?: string
  train_number?: string
  cost_center_reference?: string
  train_time?: string
}

export interface BookATripResponse extends TripFollowResponse {
  agent?: {
    organisation_id?: string
    organisation_name?: string
    user_id?: string
    user_name?: string
  }
  cancelled_by?: {
    email?: string
    first_name?: string
    last_name?: string
    id?: string
  }
  comments?: string
  cost_center_reference?: string
  origin: Address
  destination: Address
  external_trip_id?: string
  follow_code?: string
  id: string
  partner_trip_id?: string
  quote: Quote
  traveller_id?: string
  fare?: {
    total: number
    currency: string
    gratuity_percent?: number
    breakdown?: {
      value: number
      name: string
      description?: string
    }[]
  }
}

export type CancellationParams = {
  reason: string
  explanation?: string
}

export type OrderOptions =
  | 'id'
  | 'date'
  | 'booking_date'
  | 'reference'
  | 'name'
  | 'surname'
  | 'vehicle'
  | 'state'
  | 'fleet'
  | 'origin'
  | 'destination'
  | '-id'
  | '-date'
  | '-booking_date'
  | '-reference'
  | '-name'
  | '-surname'
  | '-vehicle'
  | '-state'
  | '-fleet'
  | '-origin'
  | '-destination'

export type SearchParams = {
  trip_states?: TripStatus[]
  trip_type?: 'BOTH' | 'PREBOOK' | 'ASAP'
  created_after?: string
  email?: string
  traveller_id?: string
  prebook_time_after?: string
  prebook_time_before?: string
  trip_time_before?: string
  trip_time_after?: string
  only_without_final_price?: boolean
  pagination_offset?: number
  pagination_row_count?: number
  fleet_id?: string
  partner_trip_id?: string
  external_trip_id?: string
  forename?: string
  lastname?: string
  display_trip_id?: string
  order_by?: OrderOptions[]
}

export type SearchResponse = {
  bookings?: BookATripResponse[]
}

export type GetTripStatusResponse = {
  status: TripStatus
  position?: LatLng
  timestamp?: string
}

export type GetTripPositionResponse = {
  position?: LatLng
  direction?: {
    kph: number
    heading: number
  }
  origin_eta?: number
  destination_eta?: number
}

export type GetTripCancelFeeResponse = {
  cancellation_fee: boolean
  fee?: {
    currency: string
    type: string
    value: number
  }
}

export interface Trip {
  trackTrip(id: string): Promise<HttpResponse<TripFollowResponse>>
  book(params: BookATripParams): Promise<HttpResponse<BookATripResponse>>
  bookWithoutNonce(params: BookATripWithoutNonceParams): Promise<HttpResponse<BookATripResponse>>
  getBookingDetails(id: string): Promise<HttpResponse<BookATripResponse>>
  getTripStatus(id: string): Promise<HttpResponse<GetTripStatusResponse>>
  getTripPosition(id: string): Promise<HttpResponse<GetTripPositionResponse>>
  cancel(id: string, params: CancellationParams): Promise<HttpResponse<object>>
  cancelByFollowCode(code: string, params: CancellationParams): Promise<HttpResponse<object>>
  search(params: SearchParams): Promise<HttpResponse<SearchResponse>>
  getCancelFee(id: string): Promise<HttpResponse<GetTripCancelFeeResponse>>
}
