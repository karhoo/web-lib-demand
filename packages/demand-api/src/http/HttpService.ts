import { v4 as uuid } from 'uuid'
import {
  Http,
  HttpResponse,
  DefaultRequestOptionsGetter,
  RequestOptions,
  MethodRequestOptions,
  Query,
  HttpResponseMiddleware,
} from './types'
import { errorCodes } from '../responseCodes'

const isOffline = (message: string) => message === 'Failed to fetch' || message.indexOf('offline') !== -1

export async function request<T>(url: string, options: RequestInit): Promise<HttpResponse<T>> {
  try {
    const response = await fetch(url, options)
    const isJsonResponse = (response.headers?.get('content-type') ?? '').indexOf('application/json') !== -1

    const body = isJsonResponse ? await response.json() : {}
    const { ok, status } = response

    return ok ? { ok, status, body } : { ok, status, error: body }
  } catch (error) {
    const message = error.message || ''
    const code = isOffline(message) ? errorCodes.ERR_OFFLINE : errorCodes.ERR_UNKNOWN

    return {
      ok: false,
      status: 0,
      error: {
        code,
        message,
      },
    }
  }
}

export function toJsonBody(body: object, headers: Record<string, string> = {}) {
  return {
    body: JSON.stringify(body),
    headers: { ...headers, 'content-type': 'application/json' },
  }
}

export class HttpService implements Http {
  private url: string

  private getDefaultRequestOptions: DefaultRequestOptionsGetter = () => ({})

  private correlationIdPrefix = ''

  private responseMiddleware: HttpResponseMiddleware = a => a

  constructor(url: string) {
    this.url = url
  }

  public setDefaultRequestOptionsGetter(getter: DefaultRequestOptionsGetter) {
    this.getDefaultRequestOptions = getter

    return this
  }

  public setCorrelationIdPrefix(prefix: string) {
    this.correlationIdPrefix = prefix

    return this
  }

  public setResponseMiddleware(middleware: HttpResponseMiddleware) {
    this.responseMiddleware = middleware

    return this
  }

  public get<T>(url: string, query?: Query, options: MethodRequestOptions = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, { method: 'GET', ...options }, query)
  }

  public post<T>(url: string, body: object, options: MethodRequestOptions = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, { method: 'POST', ...options, ...toJsonBody(body, options.headers) })
  }

  public put<T>(url: string, body: object, options: MethodRequestOptions = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, { method: 'PUT', ...options, ...toJsonBody(body, options.headers) })
  }

  public remove<T>(url: string, options: MethodRequestOptions = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, { method: 'DELETE', ...options })
  }

  private async request<T>(url: string, options: RequestOptions, query?: Query): Promise<HttpResponse<T>> {
    const defaultRequestOptions = {
      credentials: 'include' as const,
      mode: 'cors' as const,
      ...this.getDefaultRequestOptions(),
    }

    const headers = new Headers({
      correlation_id: `${this.correlationIdPrefix}${uuid()}`,
      ...(defaultRequestOptions.headers || {}),
      ...(options.headers || {}),
    })

    return this.responseMiddleware(
      await request<T>(this.createFullUrl(url, query), { ...defaultRequestOptions, ...options, headers })
    )
  }

  private createFullUrl(url: string, params?: Query): string {
    url = `${this.url}/${url}`

    return !params
      ? url
      : url +
          '?' +
          new URLSearchParams(Object.keys(params).map(key => [key, params[key].toString()])).toString()
  }
}
