import { LocationService } from './LocationService'

describe('LocationService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
    patch: jest.fn(),
  }

  describe('getAddressDetails', () => {
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

  describe('getReverseGeocode', () => {
    const params = {
      latitude: 56.06,
      longitude: -0.07,
    }

    const expectedQuery = {
      latitude: params.latitude,
      longitude: params.longitude,
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call post of http', () => {
      new LocationService(http).getReverseGeocode(params)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith('locations/reverse-geocode', expectedQuery)
    })
  })

  describe('getAddressAutocompleteData', () => {
    const params = {
      query: 'query',
      radius: 100,
      position: {
        latitude: 48.864716,
        longitude: 2.349014,
      },
    }

    const expectedBody = {
      ...params,
      session_token: expect.any(String),
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call post of http', () => {
      new LocationService(http).getAddressAutocompleteData(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('locations/address-autocomplete', expectedBody)
    })

    it('should call post of http with sessionToken', () => {
      const sessionToken = 'sessionToken'

      new LocationService(http).getAddressAutocompleteData({ ...params, sessionToken })

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('locations/address-autocomplete', {
        ...expectedBody,
        session_token: sessionToken,
      })
    })
  })
})
