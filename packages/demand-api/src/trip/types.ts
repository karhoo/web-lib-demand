import { HttpResponse } from '../http/types'
import { Quote } from '../quotes/types'
import {
  CommonPoiType,
  LatLng,
  MeetingPointType,
  VehicleAttributes,
  ServiceLevelAgreements,
  Breakdown,
} from '../sharedTypes'

export enum TripStatuses {
  CONFIRMED = 'CONFIRMED',
  DRIVER_EN_ROUTE = 'DRIVER_EN_ROUTE',
  ARRIVED = 'ARRIVED',
  POB = 'POB',
  COMPLETED = 'COMPLETED',
  NO_DRIVERS_AVAILABLE = 'NO_DRIVERS_AVAILABLE',
  DRIVER_CANCELLED = 'DRIVER_CANCELLED',
  BOOKER_CANCELLED = 'BOOKER_CANCELLED',
  KARHOO_CANCELLED = 'KARHOO_CANCELLED',
  FAILED = 'FAILED',
  PREAUTH_DECLINED = 'PREAUTH_DECLINED',
  INCOMPLETE = 'INCOMPLETE',
  /** @deprecated no longer in use by API, left for backward compability */
  REQUESTED = 'REQUESTED',
}

export enum StateDetails {
  // Dispatch cancellation reasons
  REQUESTED_BY_USER = 'REQUESTED_BY_USER',
  PASSENGER_DIDNT_SHOW_UP = 'PASSENGER_DIDNT_SHOW_UP',
  DRIVER_CANCELED = 'DRIVER_CANCELED',
  SUPPLIER_CANCELLED = 'SUPPLIER_CANCELLED',
  DISPATCH_CANCELLED = 'DISPATCH_CANCELLED',
  NO_AVAILABILITY_IN_THE_AREA = 'NO_AVAILABILITY_IN_THE_AREA',
  NO_FEE = 'NO_FEE',
  OTHER_DISPATCH_REASON = 'OTHER_DISPATCH_REASON',

  // User cancellation reasons
  DRIVER_DIDNT_SHOW_UP = 'DRIVER_DIDNT_SHOW_UP',
  ETA_TOO_LONG = 'ETA_TOO_LONG',
  DRIVER_IS_LATE = 'DRIVER_IS_LATE',
  CAN_NOT_FIND_VEHICLE = 'CAN_NOT_FIND_VEHICLE',
  NOT_NEEDED_ANYMORE = 'NOT_NEEDED_ANYMORE',
  ASKED_BY_DRIVER_TO_CANCEL = 'ASKED_BY_DRIVER_TO_CANCEL',
  FOUND_BETTER_PRICE = 'FOUND_BETTER_PRICE',
  NOT_CLEAR_MEETING_INSTRUCTIONS = 'NOT_CLEAR_MEETING_INSTRUCTIONS',
  COULD_NOT_CONTACT_CARRIER = 'COULD_NOT_CONTACT_CARRIER',
  OTHER_USER_REASON = 'OTHER_USER_REASON',

  // Karhoo cancellation reasons
  FRAUD = 'FRAUD',
  NO_AVAILABILITY = 'NO_AVAILABILITY',
  ASKED_BY_USER = 'ASKED_BY_USER',
  ASKED_BY_DISPATCH = 'ASKED_BY_DISPATCH',
  ASKED_BY_DRIVER = 'ASKED_BY_DRIVER',
  FAILIURE = 'FAILIURE',
  PREAUTH_FAILED = 'PREAUTH_FAILED',
  OTHER_KARHOO_REASON = 'OTHER_KARHOO_REASON',
}

export type TripStatus = keyof typeof TripStatuses

export type TripFollowResponse = {
  origin?: Address
  destination?: Address
  date_booked?: string
  date_scheduled?: string
  status: TripStatus
  state_details?: StateDetails
  vehicle?: Vehicle
  tracking?: Tracking
  fleet_info?: FleetInfo
  train_number?: string
  trip_id?: string
  display_trip_id?: string
  passengers?: Passengers
  quote?: Quote
  meeting_point?: MeetingPoint
  meta?: Record<string, string>
  train_time?: string
  flight_number?: string
  service_level_agreements?: ServiceLevelAgreements
}

export interface Tracking {
  position?: LatLng
  direction?: Direction
  origin_eta?: number
  destination_eta?: number
}

interface Direction {
  kph: number
  heading: number
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

export interface BookATripResponse {
  id: string
  passengers?: Passengers
  partner_traveller_id?: string
  status: TripStatuses
  state_details?: StateDetails
  origin: Address
  destination: Address
  date_scheduled?: string
  quote: Quote
  fare?: BookingFare
  external_trip_id?: string
  display_trip_id?: string
  fleet_info?: FleetInfo
  vehicle?: Vehicle
  partner_trip_id?: string
  comments?: string
  flight_number?: string
  train_number?: string
  date_booked?: string
  meeting_point: MeetingPoint
  agent?: Agent
  cost_center_reference?: string
  cancelled_by?: CancelledBy
  follow_code?: string
  meta?: Record<string, string>
  train_time?: string
  service_level_agreements?: ServiceLevelAgreements
}

export interface Agent {
  user_id?: string
  user_name?: string
  organisation_id?: string
  organisation_name?: string
}

export interface CancelledBy {
  first_name?: string
  last_name?: string
  id?: string
  email?: string
}

export interface Address {
  display_address: string
  position?: LatLng
  place_id: string
  poi_type?: 'NOT_SET_POI_TYPE' | CommonPoiType
  timezone?: string
}

export interface BookingFare {
  total: number
  currency: string
  gratuity_percent?: number
  breakdown?: Breakdown[]
}

export interface FleetInfo {
  fleet_id?: string
  name?: string
  logo_url?: string
  description?: string
  phone_number?: string
  terms_conditions_url?: string
  email?: string
}

export interface MeetingPoint {
  position: LatLng
  type: 'NOT_SET' | MeetingPointType
  instructions?: string
  note?: string
}

export interface Passengers {
  additional_passengers?: number
  passenger_details: PassengerDetails[]
  luggage?: Luggage
}

export interface Luggage {
  total: number
}

export interface PassengerDetails {
  first_name?: string
  last_name: string
  email?: string
  phone_number: string
  locale?: string
}

export interface FreeCancellation {
  type: string
  minutes: number
}

export interface FreeWaitingTime {
  minutes: number
}

export interface Vehicle {
  type?: string
  tags?: string[]
  vehicle_class: string
  description?: string
  vehicle_license_plate: string
  driver: Driver
  attributes?: VehicleAttributes
}

export interface Driver {
  first_name: string
  last_name: string
  phone_number: string
  photo_url?: string
  license_number?: string
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
