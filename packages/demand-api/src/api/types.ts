import { DefaultRequestOptionsGetter, HttpResponseMiddleware } from '../http/types'
import { LocationService } from '../location/LocationService'
import { PoiService } from '../poi/PoiService'
import { QuotesService } from '../quotes/QuotesService'
import { TripService } from '../trip/TripService'
import { FareService } from '../fare/FareService'
import { PaymentService } from '../payment/PaymentService'
import { FlagsService } from '../flags/FlagsService'
import { UserService } from '../user/UserService'
import { AuthService } from '../auth/AuthService'

export type ApiOptions = Partial<{
  url: string
  defaultRequestOptionsGetter: DefaultRequestOptionsGetter
  responseMiddleware: HttpResponseMiddleware
  correlationIdPrefix: string
}>

export type Api = {
  locationService: LocationService
  poiService: PoiService
  quotesService: QuotesService
  tripService: TripService
  fareService: FareService
  paymentService: PaymentService
  flagsService: FlagsService
  userService: UserService
  authService: AuthService
}
