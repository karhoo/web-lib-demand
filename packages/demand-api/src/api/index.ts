import { HttpService } from '../http/HttpService'
import { LocationService } from '../location/LocationService'
import { PoiService } from '../poi/PoiService'
import { QuotesService } from '../quotes/QuotesService'
import { QuotesV2Service } from '../quotes/QuotesV2Service'
import { TripService } from '../trip/TripService'
import { FareService } from '../fare/FareService'
import { PaymentService } from '../payment/PaymentService'
import { FlagsService } from '../flags/FlagsService'
import { UserService } from '../user/UserService'
import { AuthService } from '../auth/AuthService'

import { Api, ApiOptions } from './types'
import { defaultUrl, apiV1, apiV2 } from './constants'

export function getApi(apiOptions: ApiOptions = {}): Api {
  const {
    url = defaultUrl,
    defaultRequestOptionsGetter,
    responseMiddleware,
    correlationIdPrefix = '',
    authServiceDefaultOptionsGetter = () => ({}),
  } = apiOptions

  const v1 = `${url}/${apiV1}`
  const v2 = `${url}/${apiV2}`
  const commonHttpPath = `${url}`

  const httpV1 = new HttpService(v1).setCorrelationIdPrefix(correlationIdPrefix)
  const httpV2 = new HttpService(v2).setCorrelationIdPrefix(correlationIdPrefix)
  const httpCommon = new HttpService(commonHttpPath).setCorrelationIdPrefix(correlationIdPrefix)

  const httpForAuthService = new HttpService(v1)
    .setCorrelationIdPrefix(correlationIdPrefix)
    .setDefaultRequestOptionsGetter(authServiceDefaultOptionsGetter)

  if (defaultRequestOptionsGetter) {
    httpV1.setDefaultRequestOptionsGetter(defaultRequestOptionsGetter)
    httpV2.setDefaultRequestOptionsGetter(defaultRequestOptionsGetter)
    httpCommon.setDefaultRequestOptionsGetter(defaultRequestOptionsGetter)
  }

  if (responseMiddleware) {
    httpV1.setResponseMiddleware(responseMiddleware)
    httpV2.setResponseMiddleware(responseMiddleware)
    httpCommon.setResponseMiddleware(responseMiddleware)
    httpForAuthService.setResponseMiddleware(responseMiddleware)
  }

  return {
    locationService: new LocationService(httpV1),
    poiService: new PoiService(httpV1),
    quotesService: new QuotesService(httpV1),
    quotesV2Service: new QuotesV2Service(httpV2),
    tripService: new TripService(httpV1),
    fareService: new FareService(httpV1),
    paymentService: new PaymentService(httpCommon),
    flagsService: new FlagsService(httpV1),
    userService: new UserService(httpV1),
    authService: new AuthService(httpForAuthService),
  }
}
