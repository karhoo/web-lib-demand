import { Deeplink, ResolveResponse } from './resolve' // eslint-disable-line
import {
  LocationAddressDetailsParameters,
  PoiSearchParams,
  QuotesAvailabilityParams,
  HttpResponse,
  Query,
} from './api/types'
import { LocationAddressDetailsResponse, PoiSearchResponse, QuotesAvailabilityResponse } from './types'

jest.mock('./api', () => ({
  HttpService: class HttpService {
    get(url: string, query?: Query): Promise<HttpResponse<{}>> {
      return Promise.resolve({ ok: true, status: 200, body: {} })
    }
    post(url: string, body: object): Promise<HttpResponse<{}>> {
      return Promise.resolve({ ok: true, status: 200, body: {} })
    }
    put(url: string, body: object): Promise<HttpResponse<{}>> {
      return Promise.resolve({ ok: true, status: 200, body: {} })
    }
    remove(url: string): Promise<HttpResponse<{}>> {
      return Promise.resolve({ ok: true, status: 200, body: {} })
    }
  },
  LocationService: class LocationService {
    getAddressDetails(
      params: LocationAddressDetailsParameters
    ): Promise<HttpResponse<LocationAddressDetailsResponse>> {
      return Promise.resolve({
        ok: true,
        status: 200,
        body: {
          place_id: 'location_placeId',
          address: {
            display_address: 'location_display_address',
          },
        },
      })
    }
  },
  PoiService: class PoiService {
    search(params: PoiSearchParams): Promise<HttpResponse<PoiSearchResponse>> {
      return Promise.resolve({
        ok: true,
        status: 200,
        body: {
          pois: [
            {
              id: 'poi_placeId',
              address: {
                display_address: 'poi_display_address',
              },
            },
          ],
        },
      })
    }
  },
  QuotesService: class QuotesService {
    checkAvailability(params: QuotesAvailabilityParams): Promise<HttpResponse<QuotesAvailabilityResponse>> {
      return Promise.resolve({
        ok: true,
        status: 200,
        body: {
          availabilities: [{ availability_id: 'availability_id' }],
          categories: ['test'],
        },
      })
    }
  },
}))

describe('Deeplink', () => {
  it('should true be true', done => {
    const subscriber = (result: ResolveResponse) => {
      if (result.done === true) {
        expect(result.error).toBe(undefined)
        done()
      }
    }

    const search = `?leg-1-pickup=20+Rue+Jean+Rey%2C+75015+Paris%2C+France&leg-1-pickup-time=2020-08-09T18%3A31%3A42-03%3A30&leg-1-dropoff=Mercure%2C+Paris%2C+Hotel&leg-1-m-pickup-test=pickup+test&leg-1-m-pickup-second-test=pickup+second+test&leg-1-m-dropoff-test=dropoff+test&leg-1-m-dropoff-second-test=dropoff+second+test&leg-1-m-test=test&leg-1-m-second-test=second+test&email=email%40of.user&luggage=2&passengers=3&first-name=first+name&last-name=last+name&phone-number=%2B441234567890&traveller-locale=en-GB&meta.first=first+meta&meta.second=second-meta&customFieldTest=test+123&custom-field-test=Test+test`

    const deeplink = new Deeplink(search, { url: 'url', getDefaultRequestOptions: () => ({}) })

    deeplink.resolve(subscriber)
  })
})
