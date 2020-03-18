import date from 'date-and-time'
import { ServiceHttp, QuotesAvailabilityParams } from './types'
import { QuotesAvailabilityResponse } from '../types'
import { toSnakeCase } from '../utils'

export class QuotesService {
  private url = 'quotes'

  private http: ServiceHttp

  constructor(http: ServiceHttp) {
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
}
