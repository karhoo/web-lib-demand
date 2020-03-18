export type ApiError = {
  code?: string
  message: string
}

type HttpResponsePayload = {
  status: number
}

export type HttpResponseOk<T> = HttpResponsePayload & {
  ok: true
  body: T
}

export type HttpResponseError<T> = HttpResponsePayload & {
  ok: false
  error: T
}

export type HttpResponse<T, TError = ApiError> = HttpResponseOk<T> | HttpResponseError<TError>

export type Query = Record<string, string | number>

export interface ServiceHttp {
  get<T>(url: string, query?: Query): Promise<HttpResponse<T>>
  post<T>(url: string, body: object): Promise<HttpResponse<T>>
  put<T>(url: string, body: object): Promise<HttpResponse<T>>
  remove<T>(url: string): Promise<HttpResponse<T>>
}

export type LocationAddressDetailsParameters = {
  placeId: string
  sessionToken?: string
}

export type PoiSearchParams = {
  paginationRowCount: number
  paginationOffset: number
  searchTerm?: string
  searchKey?: string
}

export type QuotesAvailabilityParams = {
  originPlaceId: string
  destinationPlaceId?: string
  dateRequired?: string
}
