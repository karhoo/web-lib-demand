import { SampleBloc } from './SampleBloc'

describe('SampleBloc', () => {
  const quotesMock = {
    checkAvailability: jest.fn(),
    quotesSearch: jest.fn(),
    quotesSearchById: jest.fn(),
  }

  describe('loadQuotes', () => {
    it('should be a function', () => {
      expect(typeof new SampleBloc(quotesMock).loadQuotes).toBe('function')
    })
  })
})
