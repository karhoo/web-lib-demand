import { ServiceHttp, PoiSearchParams } from './types'
import { PoiSearchResponse } from '../types'
import { toSnakeCase } from '../utils'

export class PoiService {
  private url = 'poi'

  private http: ServiceHttp

  constructor(http: ServiceHttp) {
    this.http = http
  }

  search(params: PoiSearchParams) {
    return this.http.get<PoiSearchResponse>(
      this.url,
      toSnakeCase<PoiSearchParams, Record<string, string>>(params)
    )
  }
}
