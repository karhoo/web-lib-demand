import { Http } from '../http/types'
import {
  TripFollowResponse,
  BookATripParams,
  BookATripResponse,
  CancellationParams,
  SearchParams,
  SearchResponse,
} from './types'

export class TripService {
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

  cancel(id: string, params: CancellationParams) {
    return this.http.post<object>(`${this.url}/${id}/cancel`, params)
  }

  cancelByFollowCode(code: string, params: CancellationParams) {
    return this.http.post<object>(`${this.url}/follow/${code}/cancel`, params)
  }

  search(params: SearchParams) {
    return this.http.post<SearchResponse>(`${this.url}/search`, params)
  }
}