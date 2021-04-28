import { Http } from '../http/types'
import { FinalFareResponse, Fare } from './types'

export class FareService implements Fare {
  private url = 'fares'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  status(tripId: string) {
    return this.http.get<FinalFareResponse>(`${this.url}/trip/${tripId}`)
  }
}
