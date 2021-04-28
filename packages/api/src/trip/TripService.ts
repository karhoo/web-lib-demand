import { Http } from '../http/types'
import {
  Trip,
  TripFollowResponse,
  BookATripParams,
  BookATripWithoutNonceParams,
  BookATripResponse,
  GetTripStatusResponse,
  GetTripPositionResponse,
  CancellationParams,
  SearchParams,
  SearchResponse,
  GetTripCancelFeeResponse,
} from './types'

export class TripService implements Trip {
  private url = 'bookings'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  trackTrip(id: string) {
    return this.http.get<TripFollowResponse>(`${this.url}/follow/${id}`)
  }

  book(params: BookATripParams) {
    return this.http.post<BookATripResponse>(`${this.url}/with-nonce`, params)
  }

  bookWithoutNonce(params: BookATripWithoutNonceParams) {
    return this.http.post<BookATripResponse>(`${this.url}`, params)
  }

  getBookingDetails(id: string) {
    return this.http.get<BookATripResponse>(`${this.url}/${id}`)
  }

  getTripStatus(id: string) {
    return this.http.get<GetTripStatusResponse>(`${this.url}/${id}/status`)
  }

  getTripPosition(id: string) {
    return this.http.get<GetTripPositionResponse>(`${this.url}/${id}/track`)
  }

  cancel(id: string, params: CancellationParams) {
    return this.http.post<object>(`${this.url}/${id}/cancel`, params)
  }

  cancelByFollowCode(code: string, params: CancellationParams) {
    return this.http.post<object>(`${this.url}/follow/${code}/cancel`, params)
  }

  search(params: SearchParams) {
    return this.http.post<SearchResponse>(`${this.url}/search`, params)
  }

  getCancelFee(id: string) {
    return this.http.get<GetTripCancelFeeResponse>(`${this.url}/${id}/cancel-fee`)
  }

  getCancelFeeByFollowCode(id: string) {
    return this.http.get<GetTripCancelFeeResponse>(`${this.url}/follow/${id}/cancel-fee`)
  }
}
