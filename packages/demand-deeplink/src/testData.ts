import camelCase from 'lodash/camelCase'
import toPairs from 'lodash/toPairs'
import fromPairs from 'lodash/fromPairs'

export const travellerLocale = 'en-GB'

export const passengerInfo = {
  email: 'email@of.user',
  luggage: '2',
  passengers: '3',
  'first-name': 'first name',
  'last-name': 'last name',
  'phone-number': '+441234567890',
}

export const meta = {
  'meta.first': 'first meta',
  'meta.second': 'second-meta',
}

export const firstJourneyLeg = {
  'leg-1-pickup': '20 Rue Jean Rey, 75015 Paris, France',
  'leg-1-pickup-kpoi': 'MPH',
  'leg-1-pickup-place_id': 'pickup-place_id',
  'leg-1-dropoff': 'Mercure, Paris, Hotel',
  'leg-1-dropoff-kpoi': 'MPH007',
  'leg-1-dropoff-place_id': 'dropoff-place_id',
  'leg-1-pickup-time': '2020-08-09T18:31:42-03:30',
}

export const firstJourneyLegWithPlaceOnly = {
  ...firstJourneyLeg,
  'leg-1-pickup-kpoi': undefined,
  'leg-1-pickup-place_id': undefined,
  'leg-1-dropoff-kpoi': undefined,
  'leg-1-dropoff-place_id': undefined,
}

export const firstJourneyLegWithKpoiOnly = {
  ...firstJourneyLeg,
  'leg-1-pickup': undefined,
  'leg-1-pickup-place_id': undefined,
  'leg-1-dropoff': undefined,
  'leg-1-dropoff-place_id': undefined,
}

export const firstJourneyLegWithPlaceIdOnly = {
  ...firstJourneyLeg,
  'leg-1-pickup-kpoi': undefined,
  'leg-1-pickup': undefined,
  'leg-1-dropoff-kpoi': undefined,
  'leg-1-dropoff': undefined,
}

export const firstJourneyLegMeta = {
  'leg-1-m-test': 'test',
  'leg-1-m-second-test': 'second test',
}

export const firstJourneyLegPickupMeta = {
  'leg-1-m-pickup-test': 'pickup test',
  'leg-1-m-pickup-second-test': 'pickup second test',
}

export const firstJourneyLegDropoffMeta = {
  'leg-1-m-dropoff-test': 'dropoff test',
  'leg-1-m-dropoff-second-test': 'dropoff second test',
}

export const secondJourneyLeg = {
  'leg-2-pickup': 'Mercure, Paris, Hotel',
  'leg-2-pickup-kpoi': 'MPH2',
  'leg-2-pickup-place_id': 'pickup-place_id2',
  'leg-2-dropoff': '45 Rue du Dr Babinski, 75018 Paris',
  'leg-2-dropoff-kpoi': '234',
  'leg-2-dropoff-place_id': 'dropoff-place_id2',
  'leg-2-pickup-time': '2020-08-10T18:31:42-03:30',
}

export const expectedPassengerInfo = {
  ...fromPairs(toPairs(passengerInfo).map(([key, value]) => [camelCase(key), value])),
  luggage: parseInt(passengerInfo.luggage, 10),
  passengers: parseInt(passengerInfo.passengers, 10),
}

export const expectedMeta = {
  first: meta['meta.first'],
  second: meta['meta.second'],
}

export const expectedFirstJourneyLeg = {
  pickup: firstJourneyLeg['leg-1-pickup'],
  pickupKpoi: firstJourneyLeg['leg-1-pickup-kpoi'],
  pickupPlaceId: firstJourneyLeg['leg-1-pickup-place_id'],
  pickupTime: firstJourneyLeg['leg-1-pickup-time'],
  dropoff: firstJourneyLeg['leg-1-dropoff'],
  dropoffKpoi: firstJourneyLeg['leg-1-dropoff-kpoi'],
  dropoffPlaceId: firstJourneyLeg['leg-1-dropoff-place_id'],
}

export const expectedFirstJourneyLegMeta = {
  test: firstJourneyLegMeta['leg-1-m-test'],
  'second-test': firstJourneyLegMeta['leg-1-m-second-test'],
}

export const expectedFirstJourneyLegPickupMeta = {
  test: firstJourneyLegPickupMeta['leg-1-m-pickup-test'],
  'second-test': firstJourneyLegPickupMeta['leg-1-m-pickup-second-test'],
}

export const expectedFirstJourneyLegDropoffMeta = {
  test: firstJourneyLegDropoffMeta['leg-1-m-dropoff-test'],
  'second-test': firstJourneyLegDropoffMeta['leg-1-m-dropoff-second-test'],
}

export const expectedFirstJourneyLegWithMeta = {
  ...expectedFirstJourneyLeg,
  pickupMeta: expectedFirstJourneyLegPickupMeta,
  dropoffMeta: expectedFirstJourneyLegDropoffMeta,
  meta: expectedFirstJourneyLegMeta,
}

export const expectedSecondJourneyLeg = {
  pickup: secondJourneyLeg['leg-2-pickup'],
  pickupKpoi: secondJourneyLeg['leg-2-pickup-kpoi'],
  pickupPlaceId: secondJourneyLeg['leg-2-pickup-place_id'],
  pickupTime: secondJourneyLeg['leg-2-pickup-time'],
  dropoff: secondJourneyLeg['leg-2-dropoff'],
  dropoffKpoi: secondJourneyLeg['leg-2-dropoff-kpoi'],
  dropoffPlaceId: secondJourneyLeg['leg-2-dropoff-place_id'],
}

export const expectedCustomFields = {
  customFieldTest: 'test 123',
  'custom-field-test': 'Test test',
}
