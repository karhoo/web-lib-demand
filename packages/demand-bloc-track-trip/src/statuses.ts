// TODO: import from demand-api
export const TripStatusCodes = {
  ARRIVED: 'ARRIVED',
  BOOKER_CANCELLED: 'BOOKER_CANCELLED',
  COMPLETED: 'COMPLETED',
  CONFIRMED: 'CONFIRMED',
  DRIVER_CANCELLED: 'DRIVER_CANCELLED',
  DRIVER_EN_ROUTE: 'DRIVER_EN_ROUTE',
  NO_DRIVERS_AVAILABLE: 'NO_DRIVERS_AVAILABLE',
  POB: 'POB',
  REQUESTED: 'REQUESTED',
  KARHOO_CANCELLED: 'KARHOO_CANCELLED',
}

export const FinalFareStatuses = {
  PENDING: 'PENDING',
  FINAL: 'FINAL',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED',
}

export const FinalTripStatuses = [
  TripStatusCodes.COMPLETED,
  TripStatusCodes.BOOKER_CANCELLED,
  TripStatusCodes.DRIVER_CANCELLED,
  TripStatusCodes.NO_DRIVERS_AVAILABLE,
]

export const TrackableStatuses = [
  TripStatusCodes.ARRIVED,
  TripStatusCodes.DRIVER_EN_ROUTE,
  TripStatusCodes.POB,
]

export const CancelableStatuses = [
  TripStatusCodes.ARRIVED,
  TripStatusCodes.CONFIRMED,
  TripStatusCodes.DRIVER_EN_ROUTE,
  TripStatusCodes.REQUESTED,
]

export const BeforeDriverEnRouteStatuses = [TripStatusCodes.REQUESTED, TripStatusCodes.CONFIRMED]

export const CancelledByFleetStatuses = [
  TripStatusCodes.NO_DRIVERS_AVAILABLE,
  TripStatusCodes.DRIVER_CANCELLED,
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
