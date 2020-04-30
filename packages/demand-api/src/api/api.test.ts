import { mocked } from 'ts-jest/utils'
import { HttpService } from '../http/HttpService'
import { LocationService } from '../location/LocationService'
import { PoiService } from '../poi/PoiService'
import { QuotesService } from '../quotes/QuotesService'
import { TripService } from '../trip/TripService'
import { FareService } from '../fare/FareService'
import { PaymentService } from '../payment/PaymentService'

import { defaultUrl, apiV1, apiV2 } from './constants'
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
jest.mock('../trip/TripService')
jest.mock('../fare/FareService')
jest.mock('../payment/PaymentService')

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
    mocked(TripService).mockClear()
    mocked(FareService).mockClear()
    mocked(PaymentService).mockClear()
    setDefaultRequestOptionsGetter.mockClear()
    setCorrelationIdPrefix.mockClear()
    setResponseMiddleware.mockClear()
  })

  it('should create new instance of HttpService', () => {
    getApi(params)

    expect(HttpService).toHaveBeenCalledTimes(2)
    expect(HttpService).toHaveBeenCalledWith(`${params.url}/${apiV1}`)
    expect(HttpService).toHaveBeenCalledWith(`${params.url}/${apiV2}`)
  })

  it('should set correlationIdPrefix', () => {
    getApi(params)

    expect(setCorrelationIdPrefix).toHaveBeenCalledTimes(2)
    expect(setCorrelationIdPrefix).toHaveBeenCalledWith(params.correlationIdPrefix)
  })

  it('should set defaultRequestOptionsGetter', () => {
    getApi(params)

    expect(setDefaultRequestOptionsGetter).toHaveBeenCalledTimes(2)
    expect(setDefaultRequestOptionsGetter).toHaveBeenCalledWith(params.defaultRequestOptionsGetter)
  })

  it('should set responseMiddleware', () => {
    getApi(params)

    expect(setResponseMiddleware).toHaveBeenCalledTimes(2)
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
    expect(QuotesService).toHaveBeenCalledWith(httpService)
    expect(PoiService).toHaveBeenCalledTimes(1)
    expect(PoiService).toHaveBeenCalledWith(httpService)
    expect(TripService).toHaveBeenCalledTimes(1)
    expect(TripService).toHaveBeenCalledWith(httpService)
    expect(FareService).toHaveBeenCalledTimes(1)
    expect(FareService).toHaveBeenCalledWith(httpService)
    expect(PaymentService).toHaveBeenCalledTimes(1)
    expect(PaymentService).toHaveBeenCalledWith(httpService)
  })
})
