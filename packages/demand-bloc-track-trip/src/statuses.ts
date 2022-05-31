import { TripStatuses, TripStatus, FinalFareStatuses } from '@karhoo/demand-api'

export { TripStatuses, FinalFareStatuses }

export const FinalTripStatuses: TripStatus[] = [
  TripStatuses.COMPLETED,
  TripStatuses.BOOKER_CANCELLED,
  TripStatuses.DRIVER_CANCELLED,
  TripStatuses.NO_DRIVERS_AVAILABLE,
]

export const TrackableStatuses: TripStatus[] = [
  TripStatuses.ARRIVED,
  TripStatuses.DRIVER_EN_ROUTE,
  TripStatuses.POB,
]

export const CancelableStatuses = [
  TripStatuses.ARRIVED,
  TripStatuses.CONFIRMED,
  TripStatuses.DRIVER_EN_ROUTE,
  TripStatuses.REQUESTED,
]

export const BeforeDriverEnRouteStatuses: TripStatus[] = [TripStatuses.REQUESTED, TripStatuses.CONFIRMED]

export const CancelledByFleetStatuses: TripStatus[] = [
  TripStatuses.NO_DRIVERS_AVAILABLE,
  TripStatuses.DRIVER_CANCELLED,
]

export const StateDetailsCodes = {
  REASON_NOT_SET: 'REASON_NOT_SET',
  REQUESTED_BY_PASSENGER: 'REQUESTED_BY_PASSENGER',
  PASSENGER_DIDNT_SHOW_UP: 'PASSENGER_DIDNT_SHOW_UP',
  DRIVER_CANCELED: 'DRIVER_CANCELED',
  NO_AVAILABILITY_IN_THE_AREA: 'NO_AVAILABILITY_IN_THE_AREA',
  FLEET_CANCELLED: 'FLEET_CANCELLED',
  DISPATCH_CANCELLED: 'DISPATCH_CANCELLED',
}

export const CancelledByFleetStateDetails = [
  StateDetailsCodes.REQUESTED_BY_PASSENGER,
  StateDetailsCodes.PASSENGER_DIDNT_SHOW_UP,
  StateDetailsCodes.DRIVER_CANCELED,
  StateDetailsCodes.NO_AVAILABILITY_IN_THE_AREA,
]

export const CancellationReasons = {
  FOUND_BETTER_PRICE: 'FOUND_BETTER_PRICE',
  NOT_NEEDED_ANYMORE: 'NOT_NEEDED_ANYMORE',
  CAN_NOT_FIND_VEHICLE: 'CAN_NOT_FIND_VEHICLE',
  DRIVER_IS_LATE: 'DRIVER_IS_LATE',
  DRIVER_DIDNT_SHOW_UP: 'DRIVER_DIDNT_SHOW_UP',
  NOT_CLEAR_MEETING_INSTRUCTIONS: 'NOT_CLEAR_MEETING_INSTRUCTIONS',
  COULD_NOT_CONTACT_CARRIER: 'COULD_NOT_CONTACT_CARRIER',
  ASKED_BY_DRIVER_TO_CANCEL: 'ASKED_BY_DRIVER_TO_CANCEL',
  OTHER_USER_REASON: 'OTHER_USER_REASON',
}
