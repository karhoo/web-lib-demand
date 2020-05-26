import { QuotesBloc } from './QuotesBloc'

describe('QuotesBloc', () => {
  const quotesMock = {
    checkAvailability: jest.fn(),
    quotesSearch: jest.fn(),
    quotesSearchById: jest.fn(),
  }

  let bloc: QuotesBloc

  beforeEach(() => {
    bloc = new QuotesBloc(quotesMock)
  })

  afterEach(() => {
    bloc.dispose()
  })

  describe('loading', () => {
    it('should emit true on when starts requesting quotes', done => {
      bloc.loading.subscribe(data => {
        expect(data).toBe(true)
        done()
      })

      bloc.requestQuotes({
        originPlaceId: '1',
        destinationPlaceId: '2',
        localTimeOfPickup: '2',
      })
    })
  })

  describe('filters', () => {
    const _filters = {
      numOfLuggage: 1,
      numOfPassengers: 2,
    }

    it('should set filters', () => {
      bloc.filters = _filters

      expect(bloc.filters).toEqual(_filters)
    })
  })

  describe('searchParams', () => {
    const _searchParams = {
      originPlaceId: '1',
      destinationPlaceId: '2',
      localTimeOfPickup: '3',
    }

    it('should set filters', () => {
      bloc.searchParams = _searchParams

      expect(bloc.searchParams).toEqual(_searchParams)
    })
  })
})
