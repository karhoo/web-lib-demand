import { ServiceHttp } from './Http'
import { toSnakeCase } from './utils'

export type PoiSearchParams = {
  paginationRowCount: number
  paginationOffset: number
  searchTerm?: string
  searchKey?: string
}

// TODO: this is not full response
export type PoiResponse = {
  id: string
  address: {
    display_address: string
  }
}

export type PoiSearchResponse = {
  pois?: PoiResponse[]
}

export class PoiService {
  private url = 'poi'

  private http: ServiceHttp

  constructor(http: ServiceHttp) {
    this.http = http
  }

  search(options: PoiSearchParams) {
    return this.http.get<PoiSearchResponse>(
      this.url,
      toSnakeCase<PoiSearchParams, Record<string, string>>(options)
    )
  }
}
