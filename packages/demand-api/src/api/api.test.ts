import { mocked } from 'ts-jest/utils'
import { HttpService } from '../http/HttpService'
import { LocationService } from '../location/LocationService'
import { PoiService } from '../poi/PoiService'
import { QuotesService } from '../quotes/QuotesService'

import { defaultUrl, apiV1 } from './constants'
import { getApi } from './index'

const setDefaultRequestOptionsGetter = jest.fn(() => httpService)
const setCorrelationIdPrefix = jest.fn(() => httpService)
const setResponseMiddleware = jest.fn(() => httpService)

const httpService: any = {
  setDefaultRequestOptionsGetter,
  setCorrelationIdPrefix,
  setResponseMiddleware,
}

jest.mock('../http/HttpService', () => ({
  HttpService: jest.fn().mockImplementation(() => httpService),
}))
jest.mock('../location/LocationService')
jest.mock('../poi/PoiService')
jest.mock('../quotes/QuotesService')

describe('getApi', () => {
  const params = {
    url: 'https://api.com',
    defaultRequestOptionsGetter: jest.fn(),
    responseMiddleware: jest.fn(),
    correlationIdPrefix: 'correlationIdPrefix',
  }

  beforeEach(() => {
    mocked(HttpService).mockClear()
    mocked(LocationService).mockClear()
    mocked(QuotesService).mockClear()
    mocked(PoiService).mockClear()
    setDefaultRequestOptionsGetter.mockClear()
    setCorrelationIdPrefix.mockClear()
    setResponseMiddleware.mockClear()
  })

  it('should create new instance of HttpService', () => {
    getApi(params)

    expect(HttpService).toHaveBeenCalledTimes(1)
    expect(HttpService).toHaveBeenCalledWith(`${params.url}/${apiV1}`)
  })

  it('should set correlationIdPrefix', () => {
    getApi(params)

    expect(setCorrelationIdPrefix).toHaveBeenCalledTimes(1)
    expect(setCorrelationIdPrefix).toHaveBeenCalledWith(params.correlationIdPrefix)
  })

  it('should set defaultRequestOptionsGetter', () => {
    getApi(params)

    expect(setDefaultRequestOptionsGetter).toHaveBeenCalledTimes(1)
    expect(setDefaultRequestOptionsGetter).toHaveBeenCalledWith(params.defaultRequestOptionsGetter)
  })

  it('should set responseMiddleware', () => {
    getApi(params)

    expect(setResponseMiddleware).toHaveBeenCalledTimes(1)
    expect(setResponseMiddleware).toHaveBeenCalledWith(params.responseMiddleware)
  })

  it('should use default parameters', () => {
    getApi()

    expect(HttpService).toHaveBeenCalledWith(`${defaultUrl}/${apiV1}`)
    expect(setCorrelationIdPrefix).toHaveBeenCalledWith('')
  })

  it('should create services', () => {
    getApi(params)

    expect(LocationService).toHaveBeenCalledTimes(1)
    expect(LocationService).toHaveBeenCalledWith(httpService)
    expect(QuotesService).toHaveBeenCalledTimes(1)
    expect(LocationService).toHaveBeenCalledWith(httpService)
    expect(PoiService).toHaveBeenCalledTimes(1)
    expect(LocationService).toHaveBeenCalledWith(httpService)
  })
})
