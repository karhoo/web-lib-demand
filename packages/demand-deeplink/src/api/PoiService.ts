import { Http, PoiSearchParams } from './types'
import { PoiSearchResponse } from '../types'
import { toSnakeCase } from '../utils'

export class PoiService {
  private url = 'poi'

  private http: Http

  constructor(http: Http) {
    this.http = http
  }

  search(params: PoiSearchParams) {
    return this.http.get<PoiSearchResponse>(
      this.url,
      toSnakeCase<PoiSearchParams, Record<string, string>>(params)
    )
  }
}