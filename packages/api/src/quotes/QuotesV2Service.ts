import date from 'date-and-time'
import { Http } from '../http/types'
import {
  QuotesV2,
  QuotesV2SearchParams,
  QuotesV2Response,
  QuotesV2ByIdResponse,
  QuotesV2CoverageResponse,
  QuoteCoverageParams,
} from './typesV2'
import { toSnakeCase } from '../utils'

export class QuotesV2Service implements QuotesV2 {
  private url = 'quotes'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  private formatPickUpTime(time: string) {
    return date.format(date.parse(time, 'YYYY-MM-DDTHH:mm...') as Date, 'YYYY-MM-DDTHH:mm')
  }

  private isValidPickupTime(time?: string) {
    return time ? date.isValid(time, 'YYYY-MM-DD HH:mm') : true
  }

  private rejectWithWrongTimeFormat() {
    return Promise.reject({
      code: 'K0002',
      message: 'Pickup local time wrong format',
    })
  }

  quotesSearch(params: QuotesV2SearchParams) {
    const { localTimeOfPickup } = params

    return this.isValidPickupTime(localTimeOfPickup)
      ? this.http.post<QuotesV2Response>(this.url, toSnakeCase(params))
      : this.rejectWithWrongTimeFormat()
  }

  checkCoverage(params: QuoteCoverageParams) {
    const { localTimeOfPickup } = params
    let formattedDate

    if (localTimeOfPickup) {
      formattedDate = this.formatPickUpTime(localTimeOfPickup)

      if (!this.isValidPickupTime(formattedDate)) return this.rejectWithWrongTimeFormat()
    }

    const query = toSnakeCase(
      formattedDate
        ? { ...params, localTimeOfPickup: formattedDate }
        : (params as Omit<QuoteCoverageParams, 'localTimeOfPickup'>)
    )

    return this.http.get<QuotesV2CoverageResponse>(`${this.url}/coverage`, query)
  }

  quotesSearchById(id: string, locale?: string) {
    const query = locale ? { locale } : undefined
    return this.http.get<QuotesV2ByIdResponse>(`${this.url}/${id}`, query)
  }
}
