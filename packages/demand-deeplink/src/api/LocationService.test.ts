import { LocationService } from './LocationService'

describe('LocationService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
  }

  describe('checkAvailability', () => {
    const params = {
      placeId: 'placeId',
    }

    const expectedBody = {
      place_id: params.placeId,
      session_token: expect.any(String),
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call post of http', () => {
      new LocationService(http).getAddressDetails(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('locations/place-details', expectedBody)
    })

    it('should call post of http with sessionToken', () => {
      const sessionToken = 'sessionToken'

      new LocationService(http).getAddressDetails({ ...params, sessionToken })

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('locations/place-details', {
        ...expectedBody,
        session_token: sessionToken,
      })
    })
  })
})
