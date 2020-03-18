import uuid from 'uuid/v4'
import { ServiceHttp, LocationAddressDetailsParameters } from './types'
import { LocationAddressDetailsResponse } from '../types'

export class LocationService {
  private url = 'locations'

  private http: ServiceHttp

  constructor(http: ServiceHttp) {
    this.http = http
  }

  getAddressDetails({ placeId, sessionToken }: LocationAddressDetailsParameters) {
    const body = {
      place_id: placeId,
      session_token: sessionToken || uuid(),
    }

    return this.http.post<LocationAddressDetailsResponse>(`${this.url}/address-details`, body)
  }
}
