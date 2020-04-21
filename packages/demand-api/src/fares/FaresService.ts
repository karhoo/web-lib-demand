import { Http } from '../http/types'
import { FinalFareResponse } from './types'

export class FaresService {
  private url = 'fares'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  status(tripId: string) {
    return this.http.get<FinalFareResponse>(`${this.url}/trip/${tripId}`)
  }
}
