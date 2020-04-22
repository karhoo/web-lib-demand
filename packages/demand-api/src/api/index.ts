import { HttpService } from '../http/HttpService'
import { LocationService } from '../location/LocationService'
import { PoiService } from '../poi/PoiService'
import { QuotesService } from '../quotes/QuotesService'
import { TripService } from '../trip/TripService'
import { FareService } from '../fare/FareService'
import { PaymentService } from '../payment/PaymentService'

import { Api, ApiOptions } from './types'
import { defaultUrl, apiV1, apiV2 } from './constants'

export function getApi(apiOptions: ApiOptions = {}): Api {
  const {
    url = defaultUrl,
    defaultRequestOptionsGetter,
    responseMiddleware,
    correlationIdPrefix = '',
  } = apiOptions

  const v1 = `${url}/${apiV1}`
  const v2 = `${url}/${apiV2}`

  const httpV1 = new HttpService(v1).setCorrelationIdPrefix(correlationIdPrefix)
  const httpV2 = new HttpService(v2).setCorrelationIdPrefix(correlationIdPrefix)

  if (defaultRequestOptionsGetter) {
    httpV1.setDefaultRequestOptionsGetter(defaultRequestOptionsGetter)
  }

  if (responseMiddleware) {
    httpV1.setResponseMiddleware(responseMiddleware)
  }

  return {
    locationService: new LocationService(httpV1),
    poiService: new PoiService(httpV1),
    quotesService: new QuotesService(httpV1),
    tripService: new TripService(httpV1),
    fareService: new FareService(httpV1),
    paymentService: new PaymentService(httpV2),
  }
}
