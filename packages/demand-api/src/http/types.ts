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

export type RequestOptions = Omit<RequestInit, 'window' | 'headers'> & {
  method: string
  headers?: Record<string, string>
}

export type MethodRequestOptions = Omit<RequestOptions, 'body' | 'method'>

export type DefaultRequestOptions = Omit<RequestOptions, 'body' | 'method' | 'signal'>

export type DefaultRequestOptionsGetter = () => DefaultRequestOptions | Promise<DefaultRequestOptions>

export type MiddlewareRequestInfo = {
  url: string
  timestamp: string
  options: Omit<RequestOptions, 'headers'> & { headers: Headers }
}

export type HttpResponseMiddleware = <T>(
  response: HttpResponse<T>,
  requestInfo: MiddlewareRequestInfo
) => HttpResponse<T> | Promise<HttpResponse<T>>

export interface Http {
  get<T>(url: string, query?: Query, options?: MethodRequestOptions): Promise<HttpResponse<T>>
  post<T>(url: string, body: object, options?: MethodRequestOptions, query?: Query): Promise<HttpResponse<T>>
  put<T>(url: string, body: object, options?: MethodRequestOptions): Promise<HttpResponse<T>>
  remove<T>(url: string, options?: MethodRequestOptions): Promise<HttpResponse<T>>
  patch<T>(url: string, body: object, options?: MethodRequestOptions): Promise<HttpResponse<T>>
}
