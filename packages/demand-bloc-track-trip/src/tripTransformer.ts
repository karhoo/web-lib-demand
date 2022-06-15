import {
  TripFollowResponse as OriginalTripFollowResponse,
  BookATripResponse,
  PassengerDetails,
  LatLng,
  TripStatus,
  TripStatuses,
  ServiceLevelAgreements,
} from '@karhoo/demand-api'

const dv = (v: string | undefined) => v || ''

export type TripFollowResponse = {
  driver: {
    name: string
    phoneNumber: string
    vehicleDescription: string
    licensePlate: string
    licenseNumber: string
  } | null
  fleet: {
    phoneNumber: string
    name: string
    termsAndConditionsUrl: string
    supplierLogoUrl: string
    fleetId: string
    vehicleClass: string
  }
  vehicle: {
    vehicleDescription: string
    licensePlate: string
    vehicleClass: string
    vehicleType: string
    tags: Array<string>
  }
  etaBreakdown: {
    from: string
    to: string
  }
  priceInfo: {
    currencyCode: string
    price?: number
    type: string
  }
  passengersAndLuggage: {
    numberOfLuggage: number
    additionalPassengers: number
    passengersDetails: PassengerDetails[]
  }
  dateScheduled: string
  dateBooked: string
  originalDateScheduled: string
  originDisplayName: string
  originPlaceId: string
  originPosition: Partial<LatLng>
  originTimezone: string
  originEta?: number
  destinationDisplayName: string
  destinationPlaceId: string
  destinationPosition: Partial<LatLng>
  destinationEta?: number
  driverPosition: Partial<LatLng>
  meetDriverMessage: string
  meetingPointPosition: Partial<LatLng>
  status: TripStatus
  stateDetails: string
  flightNumber: string | null
  trainNumber: string | null
  trainTime: string | null
  tripId: string | null
  internalTripId: string | null
  meta: {
    [k: string]: string
  } | null
  serviceLevelAgreements?: ServiceLevelAgreements | null
}

const baseTransformer = (trip: OriginalTripFollowResponse | BookATripResponse): TripFollowResponse => {
  const {
    fleet_info = {},
    vehicle,
    origin,
    destination,
    date_scheduled,
    date_booked,
    status,
    state_details,
    quote,
    flight_number,
    train_number,
    train_time,
    display_trip_id,
    passengers,
    meeting_point,
    service_level_agreements,
    meta,
  } = trip

  const driver = vehicle
    ? {
        name: `${dv(vehicle?.driver?.first_name)} ${dv(vehicle?.driver?.last_name)}`.trim(),
        phoneNumber: dv(vehicle?.driver?.phone_number),
        vehicleDescription: dv(vehicle?.description),
        licensePlate: dv(vehicle?.vehicle_license_plate),
        licenseNumber: dv(vehicle?.driver?.license_number),
      }
    : null

  const fleet = {
    phoneNumber: dv(fleet_info?.phone_number),
    name: dv(fleet_info?.name),
    termsAndConditionsUrl: dv(fleet_info?.terms_conditions_url),
    supplierLogoUrl: dv(fleet_info?.logo_url),
    fleetId: dv(fleet_info?.fleet_id),
    vehicleClass: dv(vehicle?.vehicle_class || quote?.vehicle_class),
  }

  const vehicleInfo = {
    vehicleDescription: dv(vehicle?.description),
    licensePlate: dv(vehicle?.vehicle_license_plate),
    vehicleClass: dv(vehicle?.vehicle_class || quote?.vehicle_class),
    vehicleType: dv(vehicle?.type),
    tags: vehicle?.tags || [],
  }

  const priceInfo = {
    currencyCode: dv(quote?.currency),
    price: quote?.total,
    type: dv(quote?.type),
  }

  const passengersAndLuggage = {
    numberOfLuggage: passengers?.luggage?.total || 0,
    additionalPassengers: passengers?.additional_passengers || 0,
    passengersDetails: passengers?.passenger_details || [],
  }

  const original_date_scheduled = meta?.original_date_scheduled

  const datesDifference =
    original_date_scheduled &&
    date_scheduled &&
    new Date(date_scheduled).getTime() - new Date(original_date_scheduled).getTime() >= 60000

  const etaBreakdown = {
    from: dv(quote?.qta_low_minutes?.toString()),
    to: dv(quote?.qta_high_minutes?.toString()),
  }

  return {
    driver,
    fleet,
    vehicle: vehicleInfo,
    priceInfo,
    passengersAndLuggage,
    dateScheduled: dv(date_scheduled),
    dateBooked: dv(date_booked),
    originalDateScheduled: datesDifference && original_date_scheduled ? original_date_scheduled : '',
    originDisplayName: dv(origin?.display_address),
    originPlaceId: dv(origin?.place_id),
    originPosition: origin?.position || {},
    originTimezone: dv(origin?.timezone),
    originEta: 0,
    etaBreakdown,
    destinationDisplayName: dv(destination?.display_address),
    destinationPlaceId: dv(destination?.place_id),
    destinationPosition: destination?.position || {},
    destinationEta: undefined,
    driverPosition: {},
    meetDriverMessage: dv(meeting_point?.instructions),
    meetingPointPosition: meeting_point?.position || {},
    status,
    stateDetails: state_details || '',
    flightNumber: flight_number || null,
    trainNumber: train_number || null,
    trainTime: train_time || null,
    tripId: display_trip_id || null,
    internalTripId: null,
    serviceLevelAgreements: service_level_agreements || null,
    meta: meta || null,
  }
}

export const tripFollowTransformer = (trip: OriginalTripFollowResponse): TripFollowResponse => {
  const base = baseTransformer(trip)

  const { tracking, trip_id, status } = trip

  return {
    ...base,
    originEta: status === TripStatuses.ARRIVED ? 0 : tracking?.origin_eta,
    destinationEta: tracking?.destination_eta,
    driverPosition: tracking?.position || {},
    internalTripId: trip_id || null,
  }
}

// for backward compatibility
export const tripTransformer = (trip: BookATripResponse & OriginalTripFollowResponse): TripFollowResponse => {
  const base = baseTransformer(trip)
  const { tracking, trip_id, status, id } = trip

  return {
    ...base,
    // @ts-ignore
    originEta: status === TripStatuses.ARRIVED ? 0 : tracking?.origin_eta,
    internalTripId: trip_id || id || null,
    // @ts-ignore
    destinationEta: tracking?.destination_eta,
    // @ts-ignore
    driverPosition: tracking?.position || {},
  }
}
