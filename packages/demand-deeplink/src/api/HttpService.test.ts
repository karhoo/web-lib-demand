import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
import { HttpService, request } from './HttpService'

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

      expect(response).toEqual({ ok: false, status: 0, error: { message: expect.any(String) } })
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
