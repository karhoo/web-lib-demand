/* eslint @typescript-eslint/no-explicit-any: 0 */
import dayjs from 'dayjs'

const futureDate = dayjs().add(1, 'd')

export const dataToValidate: { [x: string]: any } = {
  TRAIN_NUMBER: '1234',
  FLIGHT_NUMBER: '4567FR',
  PICKUP_DATE: futureDate.format(),
  IS_ASAP_BOOKING: false,
  PICKUP_TIME: futureDate.format('HH:mm'),
  PICKUP: 'london 1',
  'PICKUP.results': [
    {
      type: 'TRAIN_STATION',
      placeId: 'k_005f8ca4-eb41-11e9-8162-969c8418bcef',
      displayAddress: '27 London St, Paddington, London W2 1HH, UK',
    },
    {
      type: 'TRAIN_STATION',
      placeId: 'k_6868ef26-2970-11e9-af7a-0a580a040e2c',
      displayAddress: 'Praed St, Paddington, London W2 1RH, UK',
    },
    {
      type: 'OTHER',
      placeId: 'k_baa8060e-6783-11ea-849a-d6d2b6caf6d6',
      displayAddress: '27 London St, Paddington, London W2 1HH, UK',
    },
    {
      type: 'NOT_SET_DETAILS_TYPE',
      placeId: 'ChIJR3R1t1IFdkgRBBCQVT8sJQo',
      displayAddress: 'Paddington, London, UK',
    },
    {
      type: 'TRAIN_STATION',
      placeId: 'ChIJA5Pzcq0adkgRFCNswz5vknQ',
      displayAddress: 'Paddington Station, Praed Street, London, UK',
    },
    {
      type: 'NOT_SET_DETAILS_TYPE',
      placeId: 'ChIJz6TyuLIadkgR9NjSUndr1IY',
      displayAddress: 'Paddington Station, London Street, London, UK',
    },
    {
      type: 'NOT_SET_DETAILS_TYPE',
      placeId: 'ChIJYXZohAkQdkgRfyZIWSl03SM',
      displayAddress: 'Paddington Recreation Ground, Randolph Avenue, London, UK',
    },
    {
      type: 'NOT_SET_DETAILS_TYPE',
      placeId: 'ChIJ34KItLMadkgROvNfT68adkg',
      displayAddress: 'Paddington Basin, London, UK',
    },
  ],
  'PICKUP.selectedAddress': {
    address: {
      buildingNumber: '23',
      city: '',
      countryCode: 'GB',
      displayAddress: '27 London St, Paddington, London W2 1HH, UK',
      line1: '27 London St, 27, London Street',
      line2: 'Paddington',
      postalCode: 'W2 1HH',
      postalCodeExt: '',
      region: '',
      streetName: '22',
    },
    currentLocalTime: '2021-02-01T09:14:56Z',
    details: { iata: '', terminal: '', type: 'TRAIN_STATION' },
    meetingPoint: {
      instructions:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis erat tempus ipsum eleifend imperdiet. Integer suscipit, metus nec dictum tempus, erat sed."',
      position: { latitude: 51.5156303, longitude: -0.17446910000000004 },
      type: 'DEFAULT',
    },
    placeId: 'k_005f8ca4-eb41-11e9-8162-969c8418bcef',
    poiType: 'NEAREST',
    position: { latitude: 51.5156303, longitude: -0.1744691 },
    timeZone: 'Europe/London',
  },
  DROPOFF: 'london',
  'DROPOFF.results': [
    {
      type: 'TRAIN_STATION',
      placeId: 'k_005f8ca4-eb41-11e9-8162-969c8418bcef',
      displayAddress: '27 London St, Paddington, London W2 1HH, UK',
    },
    {
      type: 'TRAIN_STATION',
      placeId: 'k_5a3b9632-294f-11e9-af7a-0a580a040e2c',
      displayAddress: 'London St Pancras International',
    },
    {
      type: 'TRAIN_STATION',
      placeId: 'k_476dae9d-78b3-11e9-a919-0a580a040d71',
      displayAddress: '174 Camden High St, Camden Town, London NW1 0NE, UK',
    },
    {
      type: 'AIRPORT',
      placeId: 'k_0c94ff89-ff5f-11e7-9117-0a580a2c1458',
      displayAddress: 'London Heathrow Terminal 2',
    },
    {
      type: 'TRAIN_STATION',
      placeId: 'k_11b06d08-90ea-11e9-a549-a6aba2828359',
      displayAddress: 'Charing Cross, London WC2N 5DR, UK',
    },
    {
      type: 'NOT_SET_DETAILS_TYPE',
      placeId: 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
      displayAddress: 'London, UK',
    },
    {
      type: 'NOT_SET_DETAILS_TYPE',
      placeId: 'ChIJxRO7WVEDdkgRrGM1fCYoHqY',
      displayAddress: 'London Bridge, London, UK',
    },
    {
      type: 'NOT_SET_DETAILS_TYPE',
      placeId: 'ChIJc2nSALkEdkgRkuoJJBfzkUI',
      displayAddress: 'London Eye, London, UK',
    },
    {
      type: 'NOT_SET_DETAILS_TYPE',
      placeId: 'ChIJY5PQNOTdX0gRL_NVxyr6Ib0',
      displayAddress: 'Londonderry, UK',
    },
    {
      type: 'AIRPORT',
      placeId: 'ChIJ6W3FzTRydkgRZ0H2Q1VT548',
      displayAddress: 'London Heathrow Airport (LHR), Longford, UK',
    },
  ],
  'DROPOFF.selectedAddress': {
    address: {
      buildingNumber: 'Terminal 2',
      city: 'London',
      countryCode: 'GB',
      displayAddress: 'London Heathrow Terminal 2',
      line1: 'Queens, NY 11430, USA',
      line2: '11430',
      postalCode: 'TW6 1RR',
      postalCodeExt: '',
      region: 'England',
      streetName: 'Inner Ring E',
    },
    currentLocalTime: '2021-02-01T09:15:02Z',
    details: { iata: 'LHR', terminal: 'Terminal 2 & 3', type: 'AIRPORT' },
    meetingPoint: {
      instructions: 'Terminal 2',
      position: { latitude: 51.4717211355648, longitude: -0.45155156403779995 },
      type: 'MEET_AND_GREET',
    },
    placeId: 'k_0c94ff89-ff5f-11e7-9117-0a580a2c1458',
    poiType: 'NEAREST',
    position: { latitude: 51.477373768659966, longitude: -0.439440861926863 },
    timeZone: 'Europe/London',
  },
}
