import { concat, map, switchMap } from 'rxjs/operators'
import { QuotesBloc } from './QuotesBloc'
import { QuotesService } from '@karhoo/demand-api'
import {cold, hot, time} from 'jest-marbles';

describe('QuotesBloc', () => {
  const quotesMock = {
    checkAvailability: jest.fn(),
    quotesSearch: jest.fn(),
    quotesSearchById: jest.fn(),
  }

  describe('requestQuotes', () => {
    it('Should concatenate two cold observables into single cold observable', () => {
      const bloc = new QuotesBloc(quotesMock)

      bloc.requestQuotes({
        originPlaceId: '1',
        destinationPlaceId: '2',
        localTimeOfPickup: '2',
      })

      const expected = hot('^ab', { a: true, b: false })

      expect(bloc.loading.pipe(map(a => a))).toBeObservable(expected)
    })
  })
})
