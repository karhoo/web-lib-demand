import { mocked } from 'ts-jest/utils'
import { HttpService } from '../http/HttpService'
import { LocationService } from '../location/LocationService'
import { PoiService } from '../poi/PoiService'
import { QuotesService } from '../quotes/QuotesService'
import { QuotesV2Service } from '../quotes/QuotesV2Service'
import { TripService } from '../trip/TripService'
import { FareService } from '../fare/FareService'
import { PaymentService } from '../payment/PaymentService'
import { UserService } from '../user/UserService'
import { AuthService } from '../auth/AuthService'

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
jest.mock('../quotes/QuotesV2Service')
jest.mock('../trip/TripService')
jest.mock('../fare/FareService')
jest.mock('../payment/PaymentService')
jest.mock('../user/UserService')
jest.mock('../auth/AuthService')

describe('getApi', () => {
  const params = {
    url: 'https://api.com',
    defaultRequestOptionsGetter: jest.fn(),
    responseMiddleware: jest.fn(),
    correlationIdPrefix: 'correlationIdPrefix',
    authServiceDefaultOptionsGetter: jest.fn(),
  }

  beforeEach(() => {
    mocked(HttpService).mockClear()
    mocked(LocationService).mockClear()
    mocked(QuotesService).mockClear()
    mocked(QuotesV2Service).mockClear()
    mocked(PoiService).mockClear()
    mocked(TripService).mockClear()
    mocked(FareService).mockClear()
    mocked(PaymentService).mockClear()
    mocked(UserService).mockClear()
    mocked(AuthService).mockClear()
    setDefaultRequestOptionsGetter.mockClear()
    setCorrelationIdPrefix.mockClear()
    setResponseMiddleware.mockClear()
  })

  it('should create new instance of HttpService', () => {
    getApi(params)

    expect(HttpService).toHaveBeenCalledTimes(4)
    expect(HttpService).toHaveBeenCalledWith(`${params.url}/${apiV1}`)
    expect(HttpService).toHaveBeenCalledWith(`${params.url}/${apiV2}`)
    expect(HttpService).toHaveBeenCalledWith(`${params.url}/${apiV1}`)
    expect(HttpService).toHaveBeenCalledWith(`${params.url}`)
  })

  it('should set correlationIdPrefix', () => {
    getApi(params)

    expect(setCorrelationIdPrefix).toHaveBeenCalledTimes(4)
    expect(setCorrelationIdPrefix).toHaveBeenCalledWith(params.correlationIdPrefix)
  })

  it('should set defaultRequestOptionsGetter', () => {
    getApi(params)

    expect(setDefaultRequestOptionsGetter).toHaveBeenCalledTimes(4)
    expect(setDefaultRequestOptionsGetter).toHaveBeenCalledWith(params.defaultRequestOptionsGetter)
    expect(setDefaultRequestOptionsGetter).toHaveBeenCalledWith(params.authServiceDefaultOptionsGetter)
  })

  it('should set responseMiddleware', () => {
    getApi(params)

    expect(setResponseMiddleware).toHaveBeenCalledTimes(4)
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
    expect(QuotesV2Service).toHaveBeenCalledTimes(1)
    expect(QuotesV2Service).toHaveBeenCalledWith(httpService)
    expect(PoiService).toHaveBeenCalledTimes(1)
    expect(PoiService).toHaveBeenCalledWith(httpService)
    expect(TripService).toHaveBeenCalledTimes(1)
    expect(TripService).toHaveBeenCalledWith(httpService)
    expect(FareService).toHaveBeenCalledTimes(1)
    expect(FareService).toHaveBeenCalledWith(httpService)
    expect(PaymentService).toHaveBeenCalledTimes(1)
    expect(PaymentService).toHaveBeenCalledWith(httpService)
    expect(UserService).toHaveBeenCalledTimes(1)
    expect(UserService).toHaveBeenCalledWith(httpService)
    expect(AuthService).toHaveBeenCalledTimes(1)
    expect(AuthService).toHaveBeenCalledWith(httpService)
  })
})
