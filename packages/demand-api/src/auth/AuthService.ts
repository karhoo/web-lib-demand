import { Http } from '../http/types'
import { LoginParams, LoginResponse, RefreshTokenParams, RefreshTokenResponse } from './types'

export class AuthService {
  private url = 'auth'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  login(params: LoginParams) {
    return this.http.post<LoginResponse>(`${this.url}/token`, params)
  }

  refreshToken(params: RefreshTokenParams) {
    return this.http.post<RefreshTokenResponse>(`${this.url}/refresh`, params)
  }
}
