import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
import { errorCodes } from '../responseCodes'

import { HttpService, request, toJsonBody, getJsonBody } from './HttpService'

const uuidValue = 'uuidValue'

jest.mock('uuid', () => ({ v4: () => uuidValue }))

enableFetchMocks()

describe('HttpService', () => {
  beforeEach(() => {
    fetchMock.mockReset()
  })

  describe('request', () => {
    it('should return json response', async () => {
      const body = { data: '12345' }
      const headers = { 'content-type': 'application/json' }

      fetchMock.mockOnce(JSON.stringify(body), { headers })

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({ ok: true, status: 200, body, headers: new Headers(headers) })
    })

    it('should return body as empty object when response does not contain json', async () => {
      fetchMock.mockOnce('123')

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({
        ok: true,
        status: 200,
        body: {},
        headers: expect.any(Headers),
      })
    })

    it('should return body as empty object when content-type is not application/json', async () => {
      const headers = { 'content-type': 'text/plain' }
      fetchMock.mockOnce('123', { headers })

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({ ok: true, status: 200, body: {}, headers: new Headers(headers) })
    })

    it('should return json response containing error', async () => {
      const error = { code: 'K001', message: 'something went wrong' }
      const headers = { 'content-type': 'application/json' }

      fetchMock.mockOnce(JSON.stringify(error), { headers, status: 500 })

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({ ok: false, status: 500, error, headers: new Headers(headers) })
    })

    it('should return response with error in case of unexpected error', async () => {
      const headers = { 'content-type': 'application/json' }
      fetchMock.mockOnce('1{}', { headers })

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({
        ok: false,
        status: 0,
        headers: new Headers(),
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
        headers: new Headers(),
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
        headers: new Headers(),
        error: { code: errorCodes.ERR_OFFLINE, message },
      })
    })

    it('should return a response with an empty message', async () => {
      fetchMock.mockRejectOnce(new Error())

      const response = await request('url', { method: 'GET' })

      expect(response).toEqual({
        ok: false,
        status: 0,
        headers: new Headers(),
        error: { code: errorCodes.ERR_UNKNOWN, message: '' },
      })
    })
  })

  describe('getJsonBody', () => {
    const data = { test: 'test' }

    const response: any = { text: jest.fn(() => JSON.stringify(data)) }

    it('should call text', async () => {
      await getJsonBody(response)

      expect(response.text).toBeCalledTimes(1)
    })

    it('should return json body', async () => {
      expect(await getJsonBody(response)).toEqual(data)
    })

    it('should return empty object in case of empty body', async () => {
      response.text.mockReturnValueOnce('')

      expect(await getJsonBody(response)).toEqual({})
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
    const responseHeaders = { 'content-type': 'application/json' }

    const mock = () => {
      fetchMock.mockOnce(JSON.stringify(body), { headers: responseHeaders })
    }

    const getExpectedFetchParams = (data: object = {}, headers = {}) => ({
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
      headers: new Headers({
        correlation_id: uuidValue,
        ...headers,
      }),
      ...data,
    })

    beforeEach(() => {
      mock()
    })

    it('should make get request', async () => {
      const http = new HttpService(url)
      const response = await http.get(path)

      expect(response).toEqual({ ok: true, status: 200, body, headers: new Headers(responseHeaders) })
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
        getExpectedFetchParams({ redirect: options.redirect }, options.headers)
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

      expect(response).toEqual({ ok: true, status: 200, body, headers: new Headers(responseHeaders) })
    })

    it('should call fetchMock with POST method and expected parameters', async () => {
      const requestBody = { one: 'oneValue', two: 'twoValue' }
      const requestHeaders = { origin: 'origin' }

      await new HttpService(url).post(path, requestBody, { headers: requestHeaders })

      expect(fetchMock).toBeCalledWith(
        expectedPath,
        getExpectedFetchParams(
          {
            method: 'POST',
            body: JSON.stringify(requestBody),
          },
          {
            'content-type': 'application/json',
            ...requestHeaders,
          }
        )
      )
    })

    it('should make put request', async () => {
      const response = await new HttpService(url).put(path, { one: 'oneValue', two: 'twoValue' })

      expect(response).toEqual({ ok: true, status: 200, body, headers: new Headers(responseHeaders) })
    })

    it('should call fetchMock with PUT method and expected parameters', async () => {
      const requestBody = { one: 'oneValue', two: 'twoValue' }
      const requestHeaders = { origin: 'origin' }
      const options = { redirect: 'error' as const, headers: requestHeaders }

      await new HttpService(url).put(path, requestBody, options)

      expect(fetchMock).toBeCalledWith(
        expectedPath,
        getExpectedFetchParams(
          {
            method: 'PUT',
            body: JSON.stringify(requestBody),
            redirect: options.redirect,
          },
          {
            'content-type': 'application/json',
            ...requestHeaders,
          }
        )
      )
    })

    it('should make delete request', async () => {
      const response = await new HttpService(url).remove(path)

      expect(response).toEqual({ ok: true, status: 200, body, headers: new Headers(responseHeaders) })
    })

    it('should call fetchMock with DELETE method and expected parameters', async () => {
      const requestHeaders = { origin: 'origin' }
      const options = { redirect: 'error' as const, headers: requestHeaders }

      await new HttpService(url).remove(path, options)

      expect(fetchMock).toBeCalledWith(
        expectedPath,
        getExpectedFetchParams(
          {
            method: 'DELETE',
            redirect: options.redirect,
          },
          requestHeaders
        )
      )
    })

    it('should make patch request', async () => {
      const response = await new HttpService(url).patch(path, { one: 'oneValue', two: 'twoValue' })

      expect(response).toEqual({ ok: true, status: 200, body, headers: new Headers(responseHeaders) })
    })

    it('should call fetchMock with PATCH method and expected parameters', async () => {
      const requestBody = { one: 'oneValue', two: 'twoValue' }
      const requestHeaders = { origin: 'origin' }
      const options = { redirect: 'error' as const, headers: requestHeaders }

      await new HttpService(url).patch(path, requestBody, options)

      expect(fetchMock).toBeCalledWith(
        expectedPath,
        getExpectedFetchParams(
          {
            method: 'PATCH',
            body: JSON.stringify(requestBody),
            redirect: options.redirect,
          },
          {
            'content-type': 'application/json',
            ...requestHeaders,
          }
        )
      )
    })

    it('should call middleware', async () => {
      const timestamp = '2020-06-05T08:22:29.224Z'

      jest.spyOn(Date.prototype, 'toISOString').mockReturnValueOnce(timestamp)

      const middlewareStub = jest.fn()
      const http = new HttpService(url).setResponseMiddleware(middlewareStub)

      const expectedResponse = {
        ok: true,
        status: 200,
        body,
        headers: new Headers(responseHeaders),
      }

      const expectedRequestInfo = {
        url: `${url}/${path}`,
        options: {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
          headers: new Headers({
            correlation_id: uuidValue,
          }),
        },
        timestamp,
      }

      await http.get(path)

      expect(middlewareStub).toHaveBeenCalledTimes(1)
      expect(middlewareStub).toHaveBeenCalledWith(expectedResponse, expectedRequestInfo)
    })

    it('should use correlation id prefix', async () => {
      const prefix = 'prefix'

      await new HttpService(url).setCorrelationIdPrefix('prefix').get(path)

      expect(fetchMock).toBeCalledWith(
        expectedPath,
        getExpectedFetchParams({}, { correlation_id: `${prefix}${uuidValue}` })
      )
    })
  })
})
