import { DefaultRequestOptionsGetter, HttpResponseMiddleware } from '../http/types'
import { LocationService } from '../location/LocationService'
import { PoiService } from '../poi/PoiService'
import { QuotesService } from '../quotes/QuotesService'
import { QuotesV2Service } from '../quotes/QuotesV2Service'
import { TripService } from '../trip/TripService'
import { FareService } from '../fare/FareService'
import { LoyaltyService } from '../loyalty/LoyaltyService'
import { PaymentService } from '../payment/PaymentService'
import { FlagsService } from '../flags/FlagsService'
import { UserService } from '../user/UserService'
import { AuthService } from '../auth/AuthService'

export type ApiOptions = Partial<{
  url: string
  defaultRequestOptionsGetter: DefaultRequestOptionsGetter
  authServiceDefaultOptionsGetter: DefaultRequestOptionsGetter
  responseMiddleware: HttpResponseMiddleware
  correlationIdPrefix: string
}>

export type Api = {
  locationService: LocationService
  poiService: PoiService
  quotesService: QuotesService
  quotesV2Service: QuotesV2Service
  tripService: TripService
  fareService: FareService
  loyaltyService: LoyaltyService
  paymentService: PaymentService
  flagsService: FlagsService
  userService: UserService
  authService: AuthService
}
