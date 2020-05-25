import { QuotesBloc } from './QuotesBloc'

describe('QuotesBloc', () => {
  const quotesMock = {
    checkAvailability: jest.fn(),
    quotesSearch: jest.fn(),
    quotesSearchById: jest.fn(),
  }

  describe('requestQuotes', () => {
    it('should be a function', () => {
      expect(typeof new QuotesBloc(quotesMock).requestQuotes).toBe('function')
    })
  })
})
