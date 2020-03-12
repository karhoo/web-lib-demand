import { generate } from './generate'
import {
  expectedFirstJourneyLeg,
  expectedFirstJourneyLegWithMeta,
  expectedSecondJourneyLeg,
  expectedPassengerInfo,
  expectedMeta,
} from './testData'

describe('generate', () => {
  it('should generate deeplink', () => {
    expect(
      generate({
        legs: [expectedFirstJourneyLegWithMeta, expectedSecondJourneyLeg],
        passengerInfo: expectedPassengerInfo,
        travellerLocale: 'en-GB',
        meta: expectedMeta,
      })
    ).toEqual(
      `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-kpoi=MPH&leg-1-pickup-place_id=pickup-place_id&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-dropoff-kpoi=MPH007&leg-1-dropoff-place_id=dropoff-place_id&leg-1-m-pickup-test=pickup+test&leg-1-m-pickup-second-test=pickup+second+test&leg-1-m-dropoff-test=dropoff+test&leg-1-m-dropoff-second-test=dropoff+second+test&leg-1-m-test=test&leg-1-m-second-test=second+test&leg-2-pickup=Mercure%2C+Paris%2C+Hotel&leg-2-pickup-kpoi=MPH2&leg-2-pickup-place_id=pickup-place_id2&leg-2-pickup-time=2020-08-10T18%3A31%3A42-03%3A30&leg-2-dropoff=45+Rue+du+Dr+Babinski%2C+75018+Paris&leg-2-dropoff-kpoi=234&leg-2-dropoff-place_id=dropoff-place_id2&email=email%40of.user&luggage=2&passengers=3&first-name=first+name&last-name=last+name&phone-number=%2B441234567890&traveller-locale=en-GB&meta.first=first+meta&meta.second=second-meta`
    )
  })

  it('should generate deeplink without passengerInfo and meta if they are empty', () => {
    expect(
      generate({
        legs: [expectedFirstJourneyLeg],
        passengerInfo: {},
        travellerLocale: 'en-GB',
        meta: {},
      })
    ).toEqual(
      `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-kpoi=MPH&leg-1-pickup-place_id=pickup-place_id&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-dropoff-kpoi=MPH007&leg-1-dropoff-place_id=dropoff-place_id&traveller-locale=en-GB`
    )
  })
})
