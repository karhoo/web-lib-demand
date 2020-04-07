import { v4 as uuid } from 'uuid'
import {
  Http,
  LocationAddressDetailsParameters,
  LocationAddressAutocompleteParams,
  LocationAddressDetailsResponse,
  LocationAddressAutocompleteResponse,
} from './types'
import { toSnakeCase } from './utils'

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

  getAddressAutocompleteData(data: LocationAddressAutocompleteParams) {
    const body = data.sessionToken ? data : { ...data, sessionToken: uuid() }

    return this.http.post<LocationAddressAutocompleteResponse>(
      `${this.url}/address-autocomplete`,
      toSnakeCase(body)
    )
  }
}
