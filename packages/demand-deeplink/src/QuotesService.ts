import { ServiceHttp } from './Http'

type QuotesAvailabilityParameter = {
  originPlaceId: string
  destinationPlaceId?: string
  dateRequired?: Date
}

// TODO: this is not full response
type QuotesAvailabilityResponse = {
  availabilities?: [{ availability_id?: string }]
  categories?: string[]
}

export class QuotesService {
  private url = 'quotes'

  private http: ServiceHttp

  constructor(http: ServiceHttp) {
    this.http = http
  }

  checkAvailability(params: QuotesAvailabilityParameter) {
    const { dateRequired } = params
    const body = dateRequired ? { ...params, dateRequired: `${dateRequired.getFullYear()}` } : params // TODO: fix this, wrong date format

    return this.http.post<QuotesAvailabilityResponse>(`${this.url}/availability`, body)
  }
}
