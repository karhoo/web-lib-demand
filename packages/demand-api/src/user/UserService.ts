import { Http } from '../http/types'
import { GetCurrentUserResponse, ResetPasswordParams, GetOrganisationConfigurationResponse } from './types'

export class UserService {
  private url = 'directory'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  getCurrentUser() {
    try {
      return this.http.get<GetCurrentUserResponse>(`${this.url}/users/me`)
    } catch (e) {}
  }

  resetPassword(params: ResetPasswordParams) {
    try {
      return this.http.post<object>(`${this.url}/users/password-reset`, params)
    } catch (e) {}
  }

  getOrganisationConfiguration(id: string) {
    try {
      return this.http.get<GetOrganisationConfigurationResponse>(`${this.url}/organisations/${id}`)
    } catch (e) {}
  }
}
