import {
  TripStatuses,
  MeetingPointTypes,
  PoiTypes,
  TripFollowResponse,
  BookATripResponse,
} from '@karhoo/demand-api'

import { tripFollowTransformer, tripTransformer } from './tripTransformer'

const tripInfo: TripFollowResponse = {
  date_booked: '2020-05-28T08:17:07Z',
  date_scheduled: '2020-05-29T14:00:00Z',
  destination: {
    display_address: 'London Bridge, London SE1 9RA, UK',
    place_id: 'ChIJxRO7WVEDdkgRrGM1fCYoHqY',
    poi_type: PoiTypes.ENRICHED,
    position: {
      latitude: 51.507877,
      longitude: -0.0877321,
    },
    timezone: 'Europe/London',
  },
  display_trip_id: 'display_trip_id',
  fleet_info: {
    description: 'description',
    email: 'email',
    fleet_id: 'fleet_id',
    logo_url: 'logo_url',
    name: 'QA Fleet - Network UK - custom config',
    phone_number: '+44800000000',
    terms_conditions_url: 'terms_conditions_url',
  },
  meeting_point: {
    instructions: 'instructions',
    note: 'note',
    position: {
      latitude: 1,
      longitude: 2,
    },
    type: MeetingPointTypes.DROP_OFF,
  },
  meta: {},
  origin: {
    display_address: 'South Tottenham railway station',
    place_id: 'ChIJ13n7cxUcdkgRSxEfugBRdj0',
    poi_type: PoiTypes.REGULATED,
    position: {
      latitude: 51.50735,
      longitude: -0.1277583,
    },
    timezone: 'Europe/London',
  },
  passengers: {
    additional_passengers: 0,
    luggage: {
      total: 0,
    },
    passenger_details: [
      {
        email: 'test@test.com',
        first_name: 'name',
        last_name: 'something',
        locale: 'en_GB',
        phone_number: '+441234567890',
      },
    ],
  },
  quote: {
    breakdown: [],
    currency: 'GBP',
    gratuity_percent: 0,
    high_price: 675,
    low_price: 675,
    qta_high_minutes: 0,
    qta_low_minutes: 0,
    source: 'FLEET',
    total: 675,
    type: 'FIXED',
    vehicle_attributes: {
      child_seat: false,
      electric: false,
      hybrid: false,
      luggage_capacity: 2,
      passenger_capacity: 4,
    },
    vehicle_class: 'saloon',
  },
  status: TripStatuses.CONFIRMED,
  tracking: {
    destination_eta: 11,
    origin_eta: 11,
    position: {
      latitude: 51.517525,
      longitude: -0.12962864,
    },
  },
  flight_number: 'flight_number',
  train_number: 'train_number',
  train_time: 'train_time',
  vehicle: {
    attributes: {
      child_seat: false,
      electric: false,
      hybrid: false,
      luggage_capacity: 0,
      passenger_capacity: 0,
    },
    description: '',
    driver: {
      first_name: 'first_name',
      last_name: 'last_name',
      license_number: 'license_number',
      phone_number: 'phone_number',
      photo_url: 'photo_url',
    },
    type: 'standard',
    vehicle_class: 'saloon',
    vehicle_license_plate: 'vehicle_license_plate',
  },
}
const expectedTripInfo = {
  driver: {
    name: `${tripInfo.vehicle?.driver?.first_name} ${tripInfo.vehicle?.driver?.last_name}`.trim(),
    phoneNumber: tripInfo.vehicle?.driver?.phone_number,
    vehicleDescription: tripInfo.vehicle?.description,
    licensePlate: tripInfo.vehicle?.vehicle_license_plate,
    licenseNumber: tripInfo.vehicle?.driver?.license_number,
  },
  fleet: {
    phoneNumber: tripInfo.fleet_info?.phone_number,
    name: tripInfo.fleet_info?.name,
    termsAndConditionsUrl: tripInfo.fleet_info?.terms_conditions_url,
    supplierLogoUrl: tripInfo.fleet_info?.logo_url,
    fleetId: tripInfo.fleet_info?.fleet_id,
    vehicleClass: tripInfo.quote?.vehicle_class,
  },
  vehicle: {
    vehicleDescription: tripInfo.vehicle?.description,
    licensePlate: tripInfo.vehicle?.vehicle_license_plate,
    vehicleClass: tripInfo.quote?.vehicle_class,
    vehicleType: tripInfo.vehicle?.type,
    tags: [],
  },
  priceInfo: {
    currencyCode: tripInfo.quote?.currency,
    price: tripInfo.quote?.total,
    type: tripInfo.quote?.type,
  },
  passengersAndLuggage: {
    numberOfLuggage: tripInfo.passengers?.luggage?.total,
    additionalPassengers: tripInfo.passengers?.additional_passengers,
    passengersDetails: tripInfo.passengers?.passenger_details,
  },
  etaBreakdown: {
    from: '0',
    to: '0',
  },
  dateScheduled: tripInfo.date_scheduled,
  dateBooked: tripInfo.date_booked,
  originalDateScheduled: '',
  originDisplayName: tripInfo.origin?.display_address,
  originPlaceId: tripInfo.origin?.place_id,
  originPosition: tripInfo.origin?.position,
  originTimezone: tripInfo.origin?.timezone,
  originEta: tripInfo.tracking?.origin_eta,
  destinationDisplayName: tripInfo.destination?.display_address,
  destinationPlaceId: tripInfo.destination?.place_id,
  destinationPosition: tripInfo.destination?.position,
  destinationEta: tripInfo.tracking?.destination_eta,
  driverPosition: tripInfo.tracking?.position,
  meetDriverMessage: tripInfo.meeting_point?.instructions,
  meetingPointPosition: tripInfo.meeting_point?.position,
  stateDetails: '',
  trainNumber: tripInfo.train_number,
  trainTime: tripInfo.train_time,
  tripId: tripInfo.display_trip_id,
  flightNumber: tripInfo.flight_number,
  internalTripId: null,
  serviceLevelAgreements: null,
  meta: tripInfo.meta,
  status: tripInfo.status,
}

describe('tripFollowTransformer', () => {
  it('should return value with defult parameters for not required properties', () => {
    expect(tripFollowTransformer({ status: TripStatuses.CONFIRMED })).toEqual({
      driver: null,
      fleet: {
        phoneNumber: '',
        name: '',
        termsAndConditionsUrl: '',
        supplierLogoUrl: '',
        fleetId: '',
        vehicleClass: '',
      },
      vehicle: {
        vehicleDescription: '',
        licensePlate: '',
        vehicleClass: '',
        vehicleType: '',
        tags: [],
      },
      priceInfo: {
        currencyCode: '',
        type: '',
      },
      passengersAndLuggage: {
        numberOfLuggage: 0,
        additionalPassengers: 0,
        passengersDetails: [],
      },
      etaBreakdown: {
        from: '',
        to: '',
      },
      dateScheduled: '',
      dateBooked: '',
      originalDateScheduled: '',
      originDisplayName: '',
      originPlaceId: '',
      originPosition: {},
      originTimezone: '',
      destinationDisplayName: '',
      destinationPlaceId: '',
      destinationPosition: {},
      driverPosition: {},
      meetDriverMessage: '',
      meetingPointPosition: {},
      status: TripStatuses.CONFIRMED,
      stateDetails: '',
      flightNumber: null,
      trainNumber: null,
      trainTime: null,
      tripId: null,
      internalTripId: null,
      serviceLevelAgreements: null,
      meta: null,
    })
  })

  it('should originEta be 0 when status is ARRIVED', () => {
    expect(tripFollowTransformer({ status: TripStatuses.ARRIVED }).originEta).toEqual(0)
  })

  it('should return originalDateScheduled', () => {
    const dateScheduled = '2020-05-29T14:00:00Z'
    const originalDateScheduled = '2020-05-29T13:58:00Z'

    expect(
      tripFollowTransformer({
        status: TripStatuses.ARRIVED,
        date_scheduled: dateScheduled,
        meta: { original_date_scheduled: originalDateScheduled },
      }).originalDateScheduled
    ).toEqual(originalDateScheduled)
  })

  it('should not return originalDateScheduled if difference between dateScheduled and originalDateScheduled is less than minute', () => {
    const dateScheduled = '2020-05-29T14:00:00Z'
    const originalDateScheduled = '2020-05-29T13:59:20Z'

    expect(
      tripFollowTransformer({
        status: TripStatuses.ARRIVED,
        date_scheduled: dateScheduled,
        meta: { original_date_scheduled: originalDateScheduled },
      }).originalDateScheduled
    ).toBe('')
  })

  it('should return expected result', () => {
    expect(tripFollowTransformer(tripInfo)).toEqual(expectedTripInfo)
  })

  it('should transform the sla if present', () => {
    const dateScheduled = '2020-05-29T14:00:00Z'
    const originalDateScheduled = '2020-05-29T13:59:20Z'
    const sla = {
      free_cancellation: {
        type: 'TimeBeforePickup',
        minutes: 30,
      },
      free_waiting_time: {
        minutes: 20,
      },
    }
    expect(
      tripFollowTransformer({
        status: TripStatuses.ARRIVED,
        date_scheduled: dateScheduled,
        meta: { original_date_scheduled: originalDateScheduled },
        service_level_agreements: sla,
      }).serviceLevelAgreements
    ).toEqual(sla)
  })
})

describe('tripTransformer', () => {
  it('should return expected result', () => {
    const data: BookATripResponse & TripFollowResponse = {
      ...tripInfo,
      id: 'id',
      origin: { display_address: 'display_address', place_id: 'place_id' },
      destination: { display_address: 'display_address', place_id: 'place_id' },
      quote: {
        total: 1,
        currency: 'string',
      },
      meeting_point: {
        position: {
          latitude: 1,
          longitude: 2,
        },
        type: 'NOT_SET',
      },
    }
    expect(tripTransformer(data)).toEqual({
      ...expectedTripInfo,
      destinationDisplayName: 'display_address',
      destinationPlaceId: 'place_id',
      destinationPosition: {},
      etaBreakdown: {
        from: '',
        to: '',
      },
      internalTripId: 'id',
      meetDriverMessage: '',
      originDisplayName: 'display_address',
      originPlaceId: 'place_id',
      originPosition: {},
      originTimezone: '',
      priceInfo: {
        currencyCode: 'string',
        price: 1,
        type: '',
      },
    })
  })
})
