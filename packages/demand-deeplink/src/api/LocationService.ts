import { v4 as uuid } from 'uuid'
import { Http, LocationAddressDetailsParameters } from './types'
import { LocationAddressDetailsResponse } from '../types'

export class LocationService {
  private url = 'locations'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  getAddressDetails({ placeId, sessionToken }: LocationAddressDetailsParameters) {
    const body = {
      place_id: placeId,
      session_token: sessionToken || uuid(),
    }

    return this.http.post<LocationAddressDetailsResponse>(`${this.url}/place-details`, body)
  }
}
