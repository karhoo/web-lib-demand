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

export type HttpResponseMiddleware = <T>(response: HttpResponse<T>) => HttpResponse<T>

export type RequestOptions = Omit<RequestInit, 'window' | 'headers'> & {
  method: string
  headers?: Record<string, string>
}

export type MethodRequestOptions = Omit<RequestOptions, 'body' | 'method'>

export type DefaultRequestOptions = Omit<RequestOptions, 'body' | 'method' | 'signal'>

export type DefaultRequestOptionsGetter = () => DefaultRequestOptions

export interface Http {
  get<T>(url: string, query?: Query, options?: MethodRequestOptions): Promise<HttpResponse<T>>
  post<T>(url: string, body: object, options?: MethodRequestOptions): Promise<HttpResponse<T>>
  put<T>(url: string, body: object, options?: MethodRequestOptions): Promise<HttpResponse<T>>
  remove<T>(url: string, options?: MethodRequestOptions): Promise<HttpResponse<T>>
}
