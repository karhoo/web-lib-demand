import { FareService } from './FareService'

describe('FareService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
  }

  describe('status', () => {
    const tripId = '123asdf'

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call get of http', () => {
      new FareService(http).status(tripId)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`fares/trip/${tripId}`)
    })
  })
})
