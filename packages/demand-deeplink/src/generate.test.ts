import { BookingTypes } from './constants'
import {
  expectedFirstJourneyLeg,
  expectedFirstJourneyLegWithMeta,
  expectedSecondJourneyLeg,
  expectedPassengerInfo,
  expectedMeta,
  expectedCustomFields,
} from './testData'

import { generate } from './generate'

describe('generate', () => {
  it('should generate deeplink with 1 leg', () => {
    expect(
      generate({
        legs: [expectedFirstJourneyLegWithMeta],
        passengerInfo: expectedPassengerInfo,
        travellerLocale: 'en-GB',
        bookingType: BookingTypes.PREBOOK,
        meta: expectedMeta,
        customFields: expectedCustomFields,
      })
    ).toEqual(
      `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-kpoi=MPH&leg-1-pickup-place_id=pickup-place_id&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-dropoff-kpoi=MPH007&leg-1-dropoff-place_id=dropoff-place_id&leg-1-m-pickup-test=pickup+test&leg-1-m-pickup-second-test=pickup+second+test&leg-1-m-dropoff-test=dropoff+test&leg-1-m-dropoff-second-test=dropoff+second+test&leg-1-m-test=test&leg-1-m-second-test=second+test&email=email%40of.user&luggage=2&passengers=3&first-name=first+name&last-name=last+name&phone-number=%2B441234567890&traveller-locale=en-GB&meta.first=first+meta&meta.second=second-meta&customFieldTest=test+123&custom-field-test=Test+test&booking-type=PRE-BOOK`
    )
  })

  it('should generate deeplink with 1 leg without leg meta in it', () => {
    expect(
      generate({
        legs: [expectedFirstJourneyLeg],
        passengerInfo: expectedPassengerInfo,
        travellerLocale: 'en-GB',
        bookingType: BookingTypes.PREBOOK,
        meta: expectedMeta,
        customFields: expectedCustomFields,
      })
    ).toEqual(
      `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-kpoi=MPH&leg-1-pickup-place_id=pickup-place_id&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-dropoff-kpoi=MPH007&leg-1-dropoff-place_id=dropoff-place_id&email=email%40of.user&luggage=2&passengers=3&first-name=first+name&last-name=last+name&phone-number=%2B441234567890&traveller-locale=en-GB&meta.first=first+meta&meta.second=second-meta&customFieldTest=test+123&custom-field-test=Test+test&booking-type=PRE-BOOK`
    )
  })

  it('should generate deeplink with more than 1 leg', () => {
    expect(
      generate({
        legs: [expectedFirstJourneyLegWithMeta, expectedSecondJourneyLeg],
        passengerInfo: expectedPassengerInfo,
        travellerLocale: 'en-GB',
        bookingType: BookingTypes.PREBOOK,
        meta: expectedMeta,
        customFields: expectedCustomFields,
      })
    ).toEqual(
      `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-kpoi=MPH&leg-1-pickup-place_id=pickup-place_id&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-dropoff-kpoi=MPH007&leg-1-dropoff-place_id=dropoff-place_id&leg-1-m-pickup-test=pickup+test&leg-1-m-pickup-second-test=pickup+second+test&leg-1-m-dropoff-test=dropoff+test&leg-1-m-dropoff-second-test=dropoff+second+test&leg-1-m-test=test&leg-1-m-second-test=second+test&leg-2-pickup=Mercure%2C+Paris%2C+Hotel&leg-2-pickup-kpoi=MPH2&leg-2-pickup-place_id=pickup-place_id2&leg-2-pickup-time=2020-08-10T18%3A31%3A42-03%3A30&leg-2-dropoff=45+Rue+du+Dr+Babinski%2C+75018+Paris&leg-2-dropoff-kpoi=234&leg-2-dropoff-place_id=dropoff-place_id2&email=email%40of.user&luggage=2&passengers=3&first-name=first+name&last-name=last+name&phone-number=%2B441234567890&traveller-locale=en-GB&meta.first=first+meta&meta.second=second-meta&customFieldTest=test+123&custom-field-test=Test+test&booking-type=PRE-BOOK`
    )
  })

  it('should generate deeplink without traveller locale', () => {
    expect(
      generate({
        legs: [expectedFirstJourneyLegWithMeta],
        passengerInfo: expectedPassengerInfo,
        meta: expectedMeta,
        bookingType: BookingTypes.PREBOOK,
        customFields: expectedCustomFields,
      })
    ).toEqual(
      `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-kpoi=MPH&leg-1-pickup-place_id=pickup-place_id&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-dropoff-kpoi=MPH007&leg-1-dropoff-place_id=dropoff-place_id&leg-1-m-pickup-test=pickup+test&leg-1-m-pickup-second-test=pickup+second+test&leg-1-m-dropoff-test=dropoff+test&leg-1-m-dropoff-second-test=dropoff+second+test&leg-1-m-test=test&leg-1-m-second-test=second+test&email=email%40of.user&luggage=2&passengers=3&first-name=first+name&last-name=last+name&phone-number=%2B441234567890&meta.first=first+meta&meta.second=second-meta&customFieldTest=test+123&custom-field-test=Test+test&booking-type=PRE-BOOK`
    )
  })

  it('should generate deeplink without passenger info when passengerInfo is empty', () => {
    expect(
      generate({
        legs: [expectedFirstJourneyLegWithMeta],
        passengerInfo: {},
        travellerLocale: 'en-GB',
        bookingType: BookingTypes.PREBOOK,
        meta: expectedMeta,
        customFields: expectedCustomFields,
      })
    ).toEqual(
      `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-kpoi=MPH&leg-1-pickup-place_id=pickup-place_id&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-dropoff-kpoi=MPH007&leg-1-dropoff-place_id=dropoff-place_id&leg-1-m-pickup-test=pickup+test&leg-1-m-pickup-second-test=pickup+second+test&leg-1-m-dropoff-test=dropoff+test&leg-1-m-dropoff-second-test=dropoff+second+test&leg-1-m-test=test&leg-1-m-second-test=second+test&traveller-locale=en-GB&meta.first=first+meta&meta.second=second-meta&customFieldTest=test+123&custom-field-test=Test+test&booking-type=PRE-BOOK`
    )
  })

  it('should generate deeplink without meta when meta is empty', () => {
    expect(
      generate({
        legs: [expectedFirstJourneyLegWithMeta],
        passengerInfo: expectedPassengerInfo,
        travellerLocale: 'en-GB',
        bookingType: BookingTypes.PREBOOK,
        meta: {},
        customFields: expectedCustomFields,
      })
    ).toEqual(
      `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-kpoi=MPH&leg-1-pickup-place_id=pickup-place_id&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-dropoff-kpoi=MPH007&leg-1-dropoff-place_id=dropoff-place_id&leg-1-m-pickup-test=pickup+test&leg-1-m-pickup-second-test=pickup+second+test&leg-1-m-dropoff-test=dropoff+test&leg-1-m-dropoff-second-test=dropoff+second+test&leg-1-m-test=test&leg-1-m-second-test=second+test&email=email%40of.user&luggage=2&passengers=3&first-name=first+name&last-name=last+name&phone-number=%2B441234567890&traveller-locale=en-GB&customFieldTest=test+123&custom-field-test=Test+test&booking-type=PRE-BOOK`
    )
  })

  it('should generate deeplink without custom fields', () => {
    expect(
      generate({
        legs: [expectedFirstJourneyLegWithMeta],
        passengerInfo: expectedPassengerInfo,
        travellerLocale: 'en-GB',
        bookingType: BookingTypes.PREBOOK,
        meta: expectedMeta,
      })
    ).toEqual(
      `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-kpoi=MPH&leg-1-pickup-place_id=pickup-place_id&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-dropoff-kpoi=MPH007&leg-1-dropoff-place_id=dropoff-place_id&leg-1-m-pickup-test=pickup+test&leg-1-m-pickup-second-test=pickup+second+test&leg-1-m-dropoff-test=dropoff+test&leg-1-m-dropoff-second-test=dropoff+second+test&leg-1-m-test=test&leg-1-m-second-test=second+test&email=email%40of.user&luggage=2&passengers=3&first-name=first+name&last-name=last+name&phone-number=%2B441234567890&traveller-locale=en-GB&meta.first=first+meta&meta.second=second-meta&booking-type=PRE-BOOK`
    )
  })

  it('should generate deeplink with booking type in journey leg', () => {
    expect(
      generate({
        legs: [{ ...expectedFirstJourneyLegWithMeta, bookingType: BookingTypes.ASAP }],
        passengerInfo: expectedPassengerInfo,
        travellerLocale: 'en-GB',
        bookingType: BookingTypes.PREBOOK,
        meta: expectedMeta,
      })
    ).toEqual(
      `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-kpoi=MPH&leg-1-pickup-place_id=pickup-place_id&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-dropoff-kpoi=MPH007&leg-1-dropoff-place_id=dropoff-place_id&leg-1-m-pickup-test=pickup+test&leg-1-m-pickup-second-test=pickup+second+test&leg-1-m-dropoff-test=dropoff+test&leg-1-m-dropoff-second-test=dropoff+second+test&leg-1-m-test=test&leg-1-m-second-test=second+test&leg-1-booking-type=ASAP&email=email%40of.user&luggage=2&passengers=3&first-name=first+name&last-name=last+name&phone-number=%2B441234567890&traveller-locale=en-GB&meta.first=first+meta&meta.second=second-meta&booking-type=PRE-BOOK`
    )
  })
})
