import date from 'date-and-time'
import { Http } from '../http/types'
import { QuotesV2, QuotesV2SearchParams, QuotesV2Response, QuotesV2ByIdResponse } from './typesV2'
import { toSnakeCase } from '../utils'

export class QuotesV2Service implements QuotesV2 {
  private url = 'quotes'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  quotesSearch(params: QuotesV2SearchParams) {
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

    return this.http.post<QuotesV2Response>(this.url, toSnakeCase(params))
  }

  quotesSearchById(id: string, locale?: string) {
    const query = locale ? { locale } : undefined
    return this.http.get<QuotesV2ByIdResponse>(`${this.url}/${id}`, query)
  }
}
