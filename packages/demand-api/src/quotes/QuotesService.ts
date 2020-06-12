import date from 'date-and-time'
import { Http } from '../http/types'
import {
  Quotes,
  QuotesAvailabilityParams,
  QuotesAvailabilityResponse,
  QuotesSearchParams,
  QuotesResponse,
  QuotesByIdResponse,
} from './types'
import { toSnakeCase } from '../utils'

export class QuotesService implements Quotes {
  private url = 'quotes'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  checkAvailability(params: QuotesAvailabilityParams) {
    const { dateRequired } = params
    const body = toSnakeCase(
      dateRequired
        ? { ...params, dateRequired: date.format(new Date(dateRequired), 'YYYY-MM-DDTHH:mm', true) }
        : params
    )

    return this.http.post<QuotesAvailabilityResponse>(`${this.url}/availability`, body)
  }

  quotesSearch(params: QuotesSearchParams) {
    const { localTimeOfPickup } = params

    if (localTimeOfPickup) {
      const isValidPickupTime = date.isValid(localTimeOfPickup, 'YYYY-MM-DD HH:mm')

      if (!isValidPickupTime) {
        return Promise.reject({
          code: 'K0002',
          message: 'Pickup local time wrong format',
        })
      }
    }

    return this.http.post<QuotesResponse>(this.url, toSnakeCase(params))
  }

  quotesSearchById(id: string, locale?: string) {
    const localeParam = locale ? `?locale=${locale}` : ''
    return this.http.get<QuotesByIdResponse>(`${this.url}/${id}${localeParam}`)
  }
}
