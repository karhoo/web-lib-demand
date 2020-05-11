import date from 'date-and-time'
import { Http } from '../http/types'
import {
  QuotesAvailabilityParams,
  QuotesAvailabilityResponse,
  QutesSearchParams,
  QuotesResponse,
  QuotesByIdResponse,
} from './types'
import { toSnakeCase } from '../utils'

export class QuotesService {
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

  quotesSearch(params: QutesSearchParams) {
    const { local_time_of_pickup } = params

    if (local_time_of_pickup) {
      const isValidPickupTime = date.isValid(local_time_of_pickup, 'YYYY-MM-DD HH:mm')

      if (!isValidPickupTime) {
        return Promise.reject({
          code: 'K0002',
          message: 'Pickup local time wrong format',
        })
      }
    }

    return this.http.post<QuotesResponse>(this.url, params)
  }

  quotesSearchById(id: string) {
    return this.http.get<QuotesByIdResponse>(`${this.url}/${id}`)
  }
}
