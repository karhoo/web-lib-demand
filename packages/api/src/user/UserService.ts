import { Http } from '../http/types'
import { GetCurrentUserResponse, ResetPasswordParams, GetOrganisationConfigurationResponse } from './types'

export class UserService {
  private url = 'directory'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  getCurrentUser() {
    return this.http.get<GetCurrentUserResponse>(`${this.url}/users/me`)
  }

  resetPassword(params: ResetPasswordParams) {
    return this.http.post<object>(`${this.url}/users/password-reset`, params)
  }

  getOrganisationConfiguration(id: string) {
    return this.http.get<GetOrganisationConfigurationResponse>(`${this.url}/organisations/${id}`)
  }
}
