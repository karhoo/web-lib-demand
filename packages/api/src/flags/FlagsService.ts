import { Http } from '../http/types'
import { FlagsRequestPathParameters, FlagsResponse, FlagsVersionType } from './types'

export class FlagsService {
  private url = 'flags'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  getByVersion(params: FlagsRequestPathParameters, query?: FlagsVersionType) {
    return this.http.get<FlagsResponse>(`${this.url}/${params.identifier}/${params.platform}`, query)
  }

  getLatestVersion(params: FlagsRequestPathParameters) {
    return this.getByVersion(params)
  }

  getCurrentVersion(params: FlagsRequestPathParameters) {
    return this.http.get<FlagsVersionType>(`${this.url}/${params.identifier}/${params.platform}/version`)
  }
}
