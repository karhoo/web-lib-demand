import { errors } from './constants'

import { getCancellablePromise } from './utils'

describe('utils', () => {
  describe('getCancellablePromise', () => {
    const value = { test: 'test' }

    it('should return result', async () => {
      const cancellablePromise = getCancellablePromise(
        new Promise(resolve => {
          setTimeout(() => resolve(value), 0)
        })
      )

      const result = await cancellablePromise.promise

      expect(result).toEqual(value)
    })

    it('should throw operationCancelled error if dispose has been called', done => {
      const cancellablePromise = getCancellablePromise(
        new Promise(resolve => {
          setTimeout(() => resolve(value), 0)
        })
      )

      cancellablePromise.promise.catch(error => {
        expect(error.message).toBe(errors.operationCancelled)

        done()
      })

      cancellablePromise.cancel()
    })
  })
})
