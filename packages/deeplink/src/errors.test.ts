import { getError } from './errors'

describe('getError', () => {
  it('should put empty string into error', () => {
    expect(getError('123', 'pickup')).toEqual({
      code: '123',
      path: 'pickup',
      error: '',
    })
  })
})
