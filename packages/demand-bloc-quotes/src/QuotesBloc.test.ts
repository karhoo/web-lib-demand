import { Observable } from 'rxjs'
import { mocked } from 'ts-jest/utils'
import { errorCodes, QuoteItem } from '@karhoo/demand-api'
import {
  getMockedQuotesSearchResponse,
  getMockedQuotesSerchByIdResponse,
  getMockedErrorQuotesSearchResponse,
  getMockedErrorQuotesSerchByIdResponse,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import { poll } from './polling'
import * as transformer from './transformer'

import { QuotesBloc, transformQuotesFromResponse } from './QuotesBloc'

jest.mock('./polling', () => ({ poll: jest.fn() }))

describe('QuotesBloc', () => {
  const testQuoteItems: QuoteItem[] = [
    {
      fleet_name: 'Fleet One',
      quote_id: '1',
      quote_type: 'FIXED',
      vehicle_attributes: {
        luggage_capacity: 2,
        passenger_capacity: 3,
      },
      vehicle_class: 'executive',
    },
    {
      fleet_name: 'Fleet Two',
      quote_id: '2',
      quote_type: 'FIXED',
      vehicle_attributes: {
        luggage_capacity: 2,
        passenger_capacity: 5,
      },
      vehicle_class: 'executive',
    },
    {
      fleet_name: 'Fleet Three',
      quote_id: '3',
      quote_type: 'FIXED',
      vehicle_attributes: {
        luggage_capacity: 1,
        passenger_capacity: 1,
      },
      vehicle_class: 'executive',
    },
  ]

  const filters = {
    numOfLuggage: 1,
    numOfPassengers: 3,
  }

  const searchParams = {
    originPlaceId: 'originPlaceId',
    destinationPlaceId: 'destinationPlaceId',
    localTimeOfPickup: 'localTimeOfPickup',
  }

  const mockedQuotesSearchResponse = getMockedQuotesSearchResponse()
  const mockedQuotesSerchByIdResponse = getMockedQuotesSerchByIdResponse({ quote_items: testQuoteItems })

  const quotesMock = {
    checkAvailability: jest.fn(),
    quotesSearch: jest.fn(() => Promise.resolve(mockedQuotesSearchResponse)),
    quotesSearchById: jest.fn(() => Promise.resolve(mockedQuotesSerchByIdResponse)),
  }

  let bloc: QuotesBloc

  beforeEach(() => {
    jest.clearAllMocks()

    bloc = new QuotesBloc(quotesMock)
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

    it('should return empty array if quote_items does not exist', () => {
      expect(
        transformQuotesFromResponse(getMockedQuotesSerchByIdResponse({ quote_items: undefined }))
      ).toEqual([])
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
      let resolve: any

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
      const quotes: any = []
      const expectedQuotes = [
        transformQuotesFromResponse(mockedQuotesSearchResponse),
        transformQuotesFromResponse(mockedQuotesSerchByIdResponse),
      ]

      bloc.quotes.subscribe(data => quotes.push(data))
      bloc.requestQuotes(searchParams)

      await promise

      expect(quotes).toEqual(expectedQuotes)
    })

    it('should emit matchingQuotes', async () => {
      const matchingQuotes: any[] = []
      const expectedMatchingQuotes = [[], testQuoteItems.slice(0, 2).map(transformer.transformer)]

      bloc.filters = filters
      bloc.matchingQuotes.subscribe(data => matchingQuotes.push(data))
      bloc.requestQuotes(searchParams)

      await promise

      expect(matchingQuotes).toEqual(expectedMatchingQuotes)
    })

    it('should emit otherAvailibleQuotes', async () => {
      const otherAvailibleQuotes: any[] = []
      const expectedQuotes = [[], testQuoteItems.slice(2, 4).map(transformer.transformer)]

      bloc.filters = filters
      bloc.otherAvailibleQuotes.subscribe(data => otherAvailibleQuotes.push(data))
      bloc.requestQuotes(searchParams)

      await promise

      expect(otherAvailibleQuotes).toEqual(expectedQuotes)
    })

    it('should loading emit false when quotesSearch response is not ok', done => {
      quotesMock.quotesSearch.mockReturnValueOnce(
        Promise.resolve(getMockedErrorQuotesSearchResponse()) as any
      )

      bloc.loading.subscribe(isLoading => {
        if (!isLoading) {
          expect(isLoading).toBe(false)
          done()
        }
      })

      bloc.requestQuotes(searchParams)
    })

    it('should not emit quotes if quotesSearchById response is not ok', done => {
      const quotes: any = []
      quotesMock.quotesSearchById.mockReturnValueOnce(
        Promise.resolve(getMockedErrorQuotesSerchByIdResponse()) as any
      )

      bloc.quotes.subscribe(data => quotes.push(data))
      bloc.loading.subscribe(isLoading => {
        if (!isLoading) {
          expect(quotes).toEqual([[]])
          done()
        }
      })

      bloc.requestQuotes(searchParams)
    })

    it('should emit noQuotesFound when error code of quotesSearch response is K3002', done => {
      quotesMock.quotesSearch.mockReturnValueOnce(
        Promise.resolve(getMockedErrorQuotesSearchResponse(errorCodes.K3002) as any)
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

    it('should emit quotesExpired', done => {
      quotesMock.quotesSearch.mockReturnValueOnce(
        Promise.resolve(getMockedQuotesSearchResponse({ validity: 0 }))
      )

      bloc.quotesExpired.subscribe(() => done())
      bloc.requestQuotes(searchParams)
    })
  })

  describe('refreshQuotes', () => {
    const that = {
      _searchParams: searchParams,
      requestQuotes: jest.fn(),
      timerSubscription: {
        unsubscribe: jest.fn(),
      },
    }

    it('should call unsubscribe of timerSubscription', () => {
      QuotesBloc.prototype.refreshQuotes.call(that)

      expect(that.timerSubscription.unsubscribe).toBeCalledTimes(1)
    })

    it('should call requestQuotes', () => {
      QuotesBloc.prototype.refreshQuotes.call(that)

      expect(that.requestQuotes).toBeCalledTimes(1)
      expect(that.requestQuotes).toBeCalledWith(searchParams)
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
