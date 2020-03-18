import { DefaultRequestOptions, RequestOptions } from '../types'
import { ServiceHttp, HttpResponse, Query } from './types'

async function request<T>(url: string, options: RequestInit): Promise<HttpResponse<T>> {
  try {
    const response = await fetch(url, options)
    const isJsonResponse = (response?.headers?.get('content-type') ?? '').indexOf('application/json') !== -1

    const body = isJsonResponse ? await response.json() : {}
    const { ok, status } = response

    return ok ? { ok, status, body } : { ok, status, error: body }
  } catch (error) {
    return {
      ok: false,
      status: 0,
      error: {
        message: error.message,
      },
    }
  }
}

function getJsonBody(body: object, headers: Record<string, string> = {}) {
  return {
    body: JSON.stringify(body),
    headers: { ...headers, 'Content-Type': 'application/json' },
  }
}

//TODO: refactor it, add ability to provide auth headers
class HttpService implements ServiceHttp {
  private url: string

  private getDefaultRequestOptions: () => DefaultRequestOptions = () => ({})

  constructor(url: string, getDefaultRequestOptions?: () => DefaultRequestOptions) {
    this.url = url

    if (getDefaultRequestOptions) {
      this.getDefaultRequestOptions = getDefaultRequestOptions
    }
  }

  public get<T>(url: string, query?: Query): Promise<HttpResponse<T>> {
    url = this.createFullUrl(url, query)

    return this.request<T>(url, { method: 'GET' })
  }

  public post<T>(url: string, body: object): Promise<HttpResponse<T>> {
    url = this.createFullUrl(url)

    return this.request<T>(url, { method: 'POST', ...getJsonBody(body) })
  }

  public put<T>(url: string, body: object): Promise<HttpResponse<T>> {
    url = this.createFullUrl(url)

    return this.request<T>(url, { method: 'PUT', ...getJsonBody(body) })
  }

  public remove<T>(url: string): Promise<HttpResponse<T>> {
    url = this.createFullUrl(url)

    return this.request<T>(url, { method: 'DELETE' })
  }

  private request<T>(url: string, options: RequestOptions, query?: Query): Promise<HttpResponse<T>> {
    const defaultRequestOptions = {
      credentials: 'include' as const,
      mode: 'cors' as const,
      ...this.getDefaultRequestOptions(),
    }

    const headers = new Headers({ ...(defaultRequestOptions.headers || {}), ...(options.headers || {}) })

    return request<T>(this.createFullUrl(url, query), { ...defaultRequestOptions, ...options, headers })
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

export { HttpService }
