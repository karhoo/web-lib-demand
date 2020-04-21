import { DefaultRequestOptionsGetter, HttpResponseMiddleware } from '../http/types'
import { LocationService } from '../location/LocationService'
import { PoiService } from '../poi/PoiService'
import { QuotesService } from '../quotes/QuotesService'

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
}
