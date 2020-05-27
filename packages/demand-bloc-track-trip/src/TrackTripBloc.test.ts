import { TrackTripBloc } from './TrackTripBloc'

describe('TrackTripBloc', () => {
  const quotesMock = {
    checkAvailability: jest.fn(),
    quotesSearch: jest.fn(),
    quotesSearchById: jest.fn(),
  }

  describe('loadQuotes', () => {
    it('should be a function', () => {
      expect(typeof new TrackTripBloc(quotesMock).loadQuotes).toBe('function')
    })
  })
})
