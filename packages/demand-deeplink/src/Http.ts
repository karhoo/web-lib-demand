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

export interface ServiceHttp {
  get<T>(url: string, query?: Query): Promise<HttpResponse<T>>
  post<T>(url: string, body: object): Promise<HttpResponse<T>>
  put<T>(url: string, body: object): Promise<HttpResponse<T>>
  remove<T>(url: string): Promise<HttpResponse<T>>
}

type Query = Record<string, string | number>

type RequestOptions = Omit<RequestInit, 'window'> & {
  method: string
  headers?: Record<string, string>
}

type DefaultRequestOptions = Omit<RequestOptions, 'body' | 'method' | 'signal'>

async function request<T>(url: string, options: RequestInit): Promise<HttpResponse<T>> {
  try {
    const response = await fetch(url, options)

    if (
      !(
        response &&
        response.headers &&
        (response.headers.get('Content-Type') || '').includes('application/json')
      )
    ) {
      throw new Error(`Unsupported content type: ${response.headers.get('Content-Type')}`)
    }

    const body = await response.json()
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

  private requestOptions: DefaultRequestOptions = {
    credentials: 'include',
    mode: 'cors',
    redirect: 'error',
  }

  constructor(url: string, requestOptions?: DefaultRequestOptions) {
    this.url = url

    if (requestOptions) {
      this.requestOptions = { ...this.requestOptions, ...requestOptions }
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
    const headers = new Headers({ ...(this.requestOptions.headers || {}), ...(options.headers || {}) })

    return request<T>(this.createFullUrl(url, query), { ...this.requestOptions, ...options, headers })
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
