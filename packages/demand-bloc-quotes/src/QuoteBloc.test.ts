import { QuoteBloc } from './QuoteBloc'

describe('QuoteBloc', () => {
  const quotesMock = {
    checkAvailability: jest.fn(),
    quotesSearch: jest.fn(),
    quotesSearchById: jest.fn(),
  }

  describe('loadQuotes', () => {
    it('should be a function', () => {
      expect(typeof new QuoteBloc(quotesMock).loadQuotes).toBe('function')
    })
  })
})
