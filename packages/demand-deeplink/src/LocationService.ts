import { ServiceHttp } from './Http'
import { toSnakeCase } from './utils'

export type LocationAddressDetailsParameters = {
  placeId: string
  sessionToken?: string
}

// TODO: this is not full response
export type LocationAddressDetailsResponse = {
  place_id: string
  address?: {
    display_address: string
  }
}

export class LocationService {
  private url = 'locations'

  private http: ServiceHttp

  constructor(http: ServiceHttp) {
    this.http = http
  }

  getAddressDetails({ placeId, sessionToken }: LocationAddressDetailsParameters) {
    const body = toSnakeCase({
      placeId,
      sessionToken: sessionToken || 'test', // TODO: refactor this
    })

    return this.http.post<LocationAddressDetailsResponse>(`${this.url}/address-details`, body)
  }
}
