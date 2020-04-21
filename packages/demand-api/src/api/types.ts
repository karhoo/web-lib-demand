import { DefaultRequestOptionsGetter, HttpResponseMiddleware } from '../http/types'
import { LocationService } from '../location/LocationService'
import { PoiService } from '../poi/PoiService'
import { QuotesService } from '../quotes/QuotesService'
import { TripService } from '../trip/TripService'
import { FaresService } from '../fares/FaresService'

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
  faresService: FaresService
}
