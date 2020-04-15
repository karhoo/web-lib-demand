import { HttpService } from '../http/HttpService'
import { LocationService } from '../location/LocationService'
import { PoiService } from '../poi/PoiService'
import { QuotesService } from '../quotes/QuotesService'

import { Api, ApiOptions } from './types'
import { defaultUrl, apiV1 } from './constants'

export function getApi(apiOptions: ApiOptions = {}): Api {
  const {
    url = defaultUrl,
    defaultRequestOptionsGetter = () => ({}),
    responseMiddleware = a => a,
    correlationIdPrefix = '',
  } = apiOptions

  const v1 = `${url}/${apiV1}`

  const httpV1 = new HttpService(v1)
    .setCorrelationIdPrefix(correlationIdPrefix)
    .setDefaultRequestOptionsGetter(defaultRequestOptionsGetter)
    .setResponseMiddleware(responseMiddleware)

  return {
    locationService: new LocationService(httpV1),
    poiService: new PoiService(httpV1),
    quotesService: new QuotesService(httpV1),
  }
}
