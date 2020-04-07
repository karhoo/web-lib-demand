import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
import { errorCodes } from './responseCodes'
import { HttpService, request, toJsonBody } from './HttpService'

enableFetchMocks()

describe('HttpService', () => {
  beforeEach(() => {
    fetchMock.mockReset()
  })

  describe('request', () => {
    it('should return json response', async () => {
      const body = { data: '12345' }

      fetchMock.mockOnce(JSON.stringify(body), {
        headers: { 'content-type': 'application/json' },
      })

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({ ok: true, status: 200, body })
    })

    it('should return body as empty object when response does not contain json', async () => {
      fetchMock.mockOnce('123')

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({ ok: true, status: 200, body: {} })
    })

    it('should return body as empty object when content-type is not application/json', async () => {
      fetchMock.mockOnce('123', { headers: { 'content-type': 'text/plain' } })

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({ ok: true, status: 200, body: {} })
    })

    it('should return json response containing error', async () => {
      const error = { code: 'K001', message: 'something went wrong' }

      fetchMock.mockOnce(JSON.stringify(error), {
        headers: { 'content-type': 'application/json' },
        status: 500,
      })

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({ ok: false, status: 500, error })
    })

    it('should return response with error in case of unexpected error', async () => {
      fetchMock.mockOnce('1{}', {
        headers: { 'content-type': 'application/json' },
      })

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({
        ok: false,
        status: 0,
        error: { code: errorCodes.ERR_UNKNOWN, message: expect.any(String) },
      })
    })

    it('should return response with ERR_OFFLINE error code', async () => {
      const message = 'Failed to fetch'

      fetchMock.mockRejectOnce(new Error(message))

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({
        ok: false,
        status: 0,
        error: { code: errorCodes.ERR_OFFLINE, message },
      })
    })

    it('should return response with ERR_OFFLINE error code and offline message', async () => {
      const message = 'offline'

      fetchMock.mockRejectOnce(new Error(message))

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({
        ok: false,
        status: 0,
        error: { code: errorCodes.ERR_OFFLINE, message },
      })
    })

    it('should return response with empty message', async () => {
      fetchMock.mockRejectOnce(new Error())

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({
        ok: false,
        status: 0,
        error: { code: errorCodes.ERR_UNKNOWN, message: '' },
      })
    })
  })

  describe('toJsonBody', () => {
    const data = { test: 'test' }

    it('should return json body configuration', () => {
      expect(toJsonBody(data)).toEqual({
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' },
      })
    })

    it('should keep headers', () => {
      const headers = { header: 'header' }

      expect(toJsonBody(data, headers)).toEqual({
        body: JSON.stringify(data),
        headers: { ...headers, 'content-type': 'application/json' },
      })
    })
  })

  describe('HttpService', () => {
    const url = 'http://localhost'
    const path = 'test'
    const expectedPath = `${url}/${path}`
    const body = { data: '12345' }
    const mock = () => {
      fetchMock.mockOnce(JSON.stringify(body), {
        headers: { 'content-type': 'application/json' },
      })
    }

    it('should make get request', async () => {
      mock()

      const http = new HttpService(url)

      const response = await http.get(path)

      expect(response).toEqual({ ok: true, status: 200, body })
    })

    it('should call fetchMock with expected url and options', async () => {
      mock()

      const http = new HttpService(url)

      await http.get(path)

      expect(fetchMock).toBeCalledWith(expectedPath, {
        credentials: 'include',
        mode: 'cors',
        method: 'GET',
        headers: new Headers({}),
      })
    })

    it('should call fetchMock with default request options', async () => {
      mock()

      const options = {
        redirect: 'error' as const,
        headers: {
          'some-header': 'header value',
        },
      }

      const http = new HttpService(url, () => options)

      await http.get(path)

      expect(fetchMock).toBeCalledWith(expectedPath, {
        credentials: 'include',
        mode: 'cors',
        method: 'GET',
        redirect: options.redirect,
        headers: new Headers(options.headers),
      })
    })

    it('should call fetchMock with query parameters', async () => {
      mock()

      const http = new HttpService(url)

      await http.get(path, { one: 'oneValue', two: 'twoValue' })

      expect(fetchMock).toBeCalledWith(`${expectedPath}?one=oneValue&two=twoValue`, {
        credentials: 'include',
        mode: 'cors',
        method: 'GET',
        headers: new Headers({}),
      })
    })

    it('should make post request', async () => {
      mock()

      const http = new HttpService(url)

      const response = await http.post(path, { one: 'oneValue', two: 'twoValue' })

      expect(response).toEqual({ ok: true, status: 200, body })
    })

    it('should call fetchMock with POST method and expected body', async () => {
      mock()

      const requestBody = { one: 'oneValue', two: 'twoValue' }
      const http = new HttpService(url)

      await http.post(path, requestBody)

      expect(fetchMock).toBeCalledWith(expectedPath, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: new Headers({
          'content-type': 'application/json',
        }),
      })
    })

    it('should make put request', async () => {
      mock()

      const http = new HttpService(url)

      const response = await http.put(path, { one: 'oneValue', two: 'twoValue' })

      expect(response).toEqual({ ok: true, status: 200, body })
    })

    it('should call fetchMock with PUT method and expected body', async () => {
      mock()

      const requestBody = { one: 'oneValue', two: 'twoValue' }
      const http = new HttpService(url)

      await http.put(path, requestBody)

      expect(fetchMock).toBeCalledWith(expectedPath, {
        credentials: 'include',
        mode: 'cors',
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: new Headers({
          'content-type': 'application/json',
        }),
      })
    })

    it('should make delete request', async () => {
      mock()

      const http = new HttpService(url)

      const response = await http.remove(path)

      expect(response).toEqual({ ok: true, status: 200, body })
    })
  })
})
