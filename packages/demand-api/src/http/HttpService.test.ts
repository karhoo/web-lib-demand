import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
import { errorCodes } from '../responseCodes'

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

    const getExpectedFetchParams = (data: object = {}) => ({
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
      headers: new Headers({}),
      ...data,
    })

    beforeEach(() => {
      mock()
    })

    it('should make get request', async () => {
      const http = new HttpService(url)
      const response = await http.get(path)

      expect(response).toEqual({ ok: true, status: 200, body })
    })

    it('should call fetchMock with expected url and options', async () => {
      const http = new HttpService(url)

      await http.get(path)

      expect(fetchMock).toBeCalledWith(expectedPath, getExpectedFetchParams())
    })

    it('should call fetchMock with default request options', async () => {
      const options = {
        redirect: 'error' as const,
        headers: {
          'some-header': 'header value',
        },
      }

      const http = new HttpService(url).setDefaultRequestOptionsGetter(() => options)

      await http.get(path)

      expect(fetchMock).toBeCalledWith(
        expectedPath,
        getExpectedFetchParams({ redirect: options.redirect, headers: new Headers(options.headers) })
      )
    })

    it('should call fetchMock with query parameters', async () => {
      await new HttpService(url).get(path, { one: 'oneValue', two: 'twoValue' })

      expect(fetchMock).toBeCalledWith(`${expectedPath}?one=oneValue&two=twoValue`, getExpectedFetchParams())
    })

    it(`should call fetchMock with get method's request options`, async () => {
      const options = { redirect: 'error' as const }

      await new HttpService(url).get(path, undefined, options)

      expect(fetchMock).toBeCalledWith(expectedPath, getExpectedFetchParams(options))
    })

    it('should make post request', async () => {
      const response = await new HttpService(url).post(path, { one: 'oneValue', two: 'twoValue' })

      expect(response).toEqual({ ok: true, status: 200, body })
    })

    it('should call fetchMock with POST method and expected parameters', async () => {
      const requestBody = { one: 'oneValue', two: 'twoValue' }
      const requestHeaders = { origin: 'origin' }

      await new HttpService(url).post(path, requestBody, { headers: requestHeaders })

      expect(fetchMock).toBeCalledWith(
        expectedPath,
        getExpectedFetchParams({
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: new Headers({
            'content-type': 'application/json',
            ...requestHeaders,
          }),
        })
      )
    })

    it('should make put request', async () => {
      const response = await new HttpService(url).put(path, { one: 'oneValue', two: 'twoValue' })

      expect(response).toEqual({ ok: true, status: 200, body })
    })

    it('should call fetchMock with PUT method and expected parameters', async () => {
      const requestBody = { one: 'oneValue', two: 'twoValue' }
      const requestHeaders = { origin: 'origin' }
      const options = { redirect: 'error' as const, headers: requestHeaders }

      await new HttpService(url).put(path, requestBody, options)

      expect(fetchMock).toBeCalledWith(
        expectedPath,
        getExpectedFetchParams({
          method: 'PUT',
          body: JSON.stringify(requestBody),
          redirect: options.redirect,
          headers: new Headers({
            'content-type': 'application/json',
            ...requestHeaders,
          }),
        })
      )
    })

    it('should make delete request', async () => {
      const response = await new HttpService(url).remove(path)

      expect(response).toEqual({ ok: true, status: 200, body })
    })

    it('should call fetchMock with DELETE method and expected parameters', async () => {
      const requestHeaders = { origin: 'origin' }
      const options = { redirect: 'error' as const, headers: requestHeaders }

      await new HttpService(url).remove(path, options)

      expect(fetchMock).toBeCalledWith(
        expectedPath,
        getExpectedFetchParams({
          method: 'DELETE',
          redirect: options.redirect,
          headers: new Headers(requestHeaders),
        })
      )
    })

    it('should call middleware', async () => {
      const middlewareStub = jest.fn()
      const http = new HttpService(url).setResponseMiddleware(middlewareStub)

      await http.get(path)

      expect(middlewareStub).toHaveBeenCalledTimes(1)
      expect(middlewareStub).toHaveBeenCalledWith({
        ok: true,
        status: 200,
        body,
      })
    })
  })
})
