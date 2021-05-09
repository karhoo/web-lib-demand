import { v4 as uuid } from 'uuid'
import { Http } from '../http/types'
import { LatLng } from '../sharedTypes'
import {
  Locations,
  LocationAddressDetailsParameters,
  LocationAddressAutocompleteParams,
  LocationAddressDetailsResponse,
  LocationAddressAutocompleteResponse,
} from './types'

import { toSnakeCase } from '../utils'

export class LocationService implements Locations {
  private url = 'locations'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  /** @deprecated use getReverseGeocode method instead */
  getAddressDetails({ placeId, sessionToken }: LocationAddressDetailsParameters) {
    const body = {
      place_id: placeId,
      session_token: sessionToken || uuid(),
    }

    return this.http.post<LocationAddressDetailsResponse>(`${this.url}/place-details`, body)
  }

  getReverseGeocode({ latitude, longitude }: LatLng) {
    const query = {
      latitude,
      longitude,
    }

    return this.http.get<LocationAddressDetailsResponse>(`${this.url}/reverse-geocode`, query)
  }

  getAddressAutocompleteData(data: LocationAddressAutocompleteParams) {
    const body = data.sessionToken ? data : { ...data, sessionToken: uuid() }

    return this.http.post<LocationAddressAutocompleteResponse>(
      `${this.url}/address-autocomplete`,
      toSnakeCase(body)
    )
  }
}
