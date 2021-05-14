import { Observable } from 'rxjs'
import { mocked } from 'ts-jest/utils'
import {
  errorCodes,
  QuoteV2Item,
  HttpResponse,
  QuotesV2Response,
  QuotesV2ByIdResponse,
  HttpResponseOk,
} from '@karhoo/demand-api'
import {
  getMockedQuotesV2SearchResponse,
  getMockedQuotesV2SerchByIdResponse,
  getMockedErrorQuotesSearchResponse,
  getMockedErrorQuotesSerchByIdResponse,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import { poll } from './polling'
import * as transformer from './transformer'

import { QuotesBloc, defaultValidity, QuotesState } from './QuotesBloc'

export const transformQuotesFromResponse = (
  response: HttpResponseOk<QuotesV2Response>
): transformer.QuoteItem[] => {
  if (response.body?.quotes) {
    return response.body.quotes.map(quote => transformer.transformer(quote))
  }

  return []
}

jest.mock('./polling', () => ({ poll: jest.fn() }))

describe('QuotesBloc', () => {
  const testQuoteItems: QuoteV2Item[] = [
    {
      id: '1',
      price: {
        currency_code: 'GBP',
        high: 2000,
        low: 2000,
      },
      quote_type: 'FIXED',
      fleet: {
        id: '1',
        name: 'Fleet One',
      },
      vehicle: {
        class: 'executive',
        passenger_capacity: 3,
        luggage_capacity: 2,
      },
    },
    {
      id: '2',
      price: {
        currency_code: 'GBP',
        high: 2000,
        low: 2000,
      },
      quote_type: 'FIXED',
      fleet: {
        id: '2',
        name: 'Fleet Two',
      },
      vehicle: {
        class: 'executive',
        passenger_capacity: 5,
        luggage_capacity: 1,
      },
    },
    {
      id: '3',
      price: {
        currency_code: 'GBP',
        high: 2000,
        low: 2000,
      },
      quote_type: 'FIXED',
      fleet: {
        id: '3',
        name: 'Fleet Three',
      },
      vehicle: {
        class: 'executive',
        passenger_capacity: 1,
        luggage_capacity: 1,
      },
    },
  ]

  const filters = {
    numOfLuggage: 1,
    numOfPassengers: 3,
  }

  const searchParams = {
    origin: {
      latitude: 'latitude',
      longitude: 'longitude',
      displayAddress: 'displayAddress',
    },
    destination: {
      latitude: 'latitude',
      longitude: 'longitude',
      displayAddress: 'displayAddress',
    },
    localTimeOfPickup: 'localTimeOfPickup',
  }

  const mockedQuotesSearchResponse = getMockedQuotesV2SearchResponse()
  const mockedQuotesSerchByIdResponse = getMockedQuotesV2SerchByIdResponse({ quotes: testQuoteItems })

  const quotesMock = {
    quotesSearch: jest.fn(
      (): Promise<HttpResponse<QuotesV2Response>> => Promise.resolve(mockedQuotesSearchResponse)
    ),
    quotesSearchById: jest.fn(
      (): Promise<HttpResponse<QuotesV2ByIdResponse>> => Promise.resolve(mockedQuotesSerchByIdResponse)
    ),
  }

  let bloc: QuotesBloc

  const now = 1466424490000

  beforeEach(() => {
    jest.clearAllMocks()

    bloc = new QuotesBloc(quotesMock)
    jest.spyOn(global.Date, 'now').mockImplementation(() => now)
  })

  afterEach(() => {
    bloc.dispose()
  })

  describe('transformQuotesFromResponse', () => {
    it('should return QuoteItem array', () => {
      expect(transformQuotesFromResponse(mockedQuotesSerchByIdResponse)).toEqual(
        testQuoteItems.map(transformer.transformer)
      )
    })

    it('should return empty array if quotes does not exist', () => {
      expect(transformQuotesFromResponse(getMockedQuotesV2SerchByIdResponse({ quotes: undefined }))).toEqual(
        []
      )
    })
  })

  describe('filters', () => {
    it('should get default filters', () => {
      expect(bloc.filters).toEqual({
        numOfLuggage: 0,
        numOfPassengers: 1,
      })
    })

    it('should set filters', () => {
      bloc.filters = filters

      expect(bloc.filters).toEqual(filters)
    })
  })

  describe('searchParams', () => {
    it('should get default searchParams', () => {
      expect(bloc.searchParams).toEqual(null)
    })

    it('should set searchParams', () => {
      bloc.searchParams = searchParams

      expect(bloc.searchParams).toEqual(searchParams)
    })
  })

  describe('requestQuotes', () => {
    let promise: Promise<void>

    beforeEach(() => {
      let resolve: Function

      promise = new Promise(r => {
        resolve = r
      })

      mocked(poll).mockImplementationOnce(fn => {
        return new Observable(observer => {
          fn()
            .then(response => {
              observer.next(response)
              observer.complete()
            })
            .then(() => {
              resolve()
            })
        })
      })
    })

    it('should call quotesSearch of QuotesService', async () => {
      await bloc.requestQuotes(searchParams)

      expect(quotesMock.quotesSearch).toHaveBeenCalledTimes(1)
      expect(quotesMock.quotesSearch).toHaveBeenCalledWith(searchParams)
    })

    it('should call poll', async () => {
      await bloc.requestQuotes(searchParams)

      expect(poll).toHaveBeenCalledTimes(1)
    })

    it('should call transformer', async () => {
      jest.spyOn(transformer, 'transformer')

      bloc.requestQuotes(searchParams)

      await promise

      expect(transformer.transformer).toBeCalledTimes(3)
    })

    it('should emit loading status', async () => {
      const loadingStatuses: boolean[] = []
      const expectedLoadingStatuses = [true, false]

      bloc.loading.subscribe(data => loadingStatuses.push(data))
      bloc.requestQuotes(searchParams)

      await promise

      expect(loadingStatuses).toEqual(expectedLoadingStatuses)
    })

    it('should emit quotes', async () => {
      let quotes: QuotesState = { items: [], validity: defaultValidity }
      const expectedQuotes = {
        items: [
          ...transformQuotesFromResponse(mockedQuotesSearchResponse),
          ...transformQuotesFromResponse(mockedQuotesSerchByIdResponse),
        ],
        validity: now + defaultValidity * 1000,
      }

      bloc.quotes.subscribe(data => {
        quotes = data
      })
      bloc.requestQuotes(searchParams)

      await promise

      expect(quotes).toEqual(expectedQuotes)
    })

    it('should emit matchingQuotes', async () => {
      const matchingQuotes: transformer.QuoteItem[][] = []
      const expectedMatchingQuotes = [[], testQuoteItems.slice(0, 2).map(transformer.transformer)]

      bloc.filters = filters
      bloc.matchingQuotes.subscribe(data => matchingQuotes.push(data))
      bloc.requestQuotes(searchParams)

      await promise

      expect(matchingQuotes).toEqual(expectedMatchingQuotes)
    })

    it('should emit otherAvailibleQuotes', async () => {
      const otherAvailibleQuotes: transformer.QuoteItem[][] = []
      const expectedQuotes = [[], testQuoteItems.slice(2, 4).map(transformer.transformer)]

      bloc.filters = filters
      bloc.otherAvailibleQuotes.subscribe(data => otherAvailibleQuotes.push(data))
      bloc.requestQuotes(searchParams)

      await promise

      expect(otherAvailibleQuotes).toEqual(expectedQuotes)
    })

    it('should loading emit false when quotesSearch response is not ok', done => {
      quotesMock.quotesSearch.mockReturnValueOnce(Promise.resolve(getMockedErrorQuotesSearchResponse()))

      bloc.loading.subscribe(isLoading => {
        if (!isLoading) {
          expect(isLoading).toBe(false)
          done()
        }
      })

      bloc.requestQuotes(searchParams)
    })

    it('should not emit quotes if quotesSearchById response is not ok', done => {
      let quotes: QuotesState = { items: [], validity: defaultValidity }
      quotesMock.quotesSearchById.mockReturnValueOnce(
        Promise.resolve(getMockedErrorQuotesSerchByIdResponse())
      )

      bloc.quotes.subscribe(data => {
        quotes = data
      })
      bloc.loading.subscribe(isLoading => {
        if (!isLoading) {
          expect(quotes).toEqual({ items: [], validity: now + 599 * 1000 })
          done()
        }
      })

      bloc.requestQuotes(searchParams)
    })

    it('should emit noQuotesFound when error code of quotesSearch response is K3002', done => {
      quotesMock.quotesSearch.mockReturnValueOnce(
        Promise.resolve(getMockedErrorQuotesSearchResponse(errorCodes.K3002))
      )

      bloc.noQuotesFound.subscribe(() => done())
      bloc.requestQuotes(searchParams)
    })

    it('should loading emit false in case of unexpected error', done => {
      quotesMock.quotesSearch.mockReturnValueOnce(Promise.reject(new Error('error')))

      bloc.loading.subscribe(isLoading => {
        if (!isLoading) {
          expect(isLoading).toBe(false)
          done()
        }
      })

      bloc.requestQuotes(searchParams)
    })

    it('should emit false in case of unexpected error', done => {
      const error = {
        message: 'someerror',
      }
      quotesMock.quotesSearch.mockReturnValueOnce(
        Promise.resolve({
          ok: false,
          status: 0,
          headers: new Headers(),
          error,
        })
      )

      bloc.quotesLoadingErrors.subscribe(actualError => {
        expect(actualError).toEqual(error)
        done()
      })

      bloc.requestQuotes(searchParams)
    })

    it('should emit quotesExpired', done => {
      quotesMock.quotesSearch.mockReturnValueOnce(
        Promise.resolve(getMockedQuotesV2SearchResponse({ validity: 0 }))
      )

      bloc.quotesExpired.subscribe(() => done())
      bloc.requestQuotes(searchParams)
    })
  })

  describe('scheduleExpiredEvent', () => {
    it('should emit quotesExpired after negative time', done => {
      bloc.scheduleExpiredEvent(now)

      bloc.quotesExpired.subscribe(() => done())
    })
  })

  describe('refreshQuotes', () => {
    const that = {
      _searchParams: searchParams,
      _locale: 'en-GB',
      requestQuotes: jest.fn(),
      timerSubscription: {
        unsubscribe: jest.fn(),
      },
      pollingSubscription: {
        unsubscribe: jest.fn(),
      },
    }

    it('should call unsubscribe of timerSubscription', () => {
      QuotesBloc.prototype.refreshQuotes.call(that)

      expect(that.timerSubscription.unsubscribe).toBeCalledTimes(1)
    })

    it('should call unsubscribe of pollingSubscription', () => {
      QuotesBloc.prototype.refreshQuotes.call(that)

      expect(that.pollingSubscription.unsubscribe).toBeCalledTimes(1)
    })

    it('should call requestQuotes', () => {
      QuotesBloc.prototype.refreshQuotes.call(that)

      expect(that.requestQuotes).toBeCalledTimes(1)
      expect(that.requestQuotes).toBeCalledWith(searchParams, that._locale)
    })

    it('should throw error if searchParams is null', () => {
      try {
        QuotesBloc.prototype.refreshQuotes.call({
          ...that,
          _searchParams: null,
        })
      } catch (error) {
        expect(error instanceof Error).toBe(true)
      }
    })
  })
})
