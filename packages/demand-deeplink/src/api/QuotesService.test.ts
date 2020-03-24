import { QuotesService } from './QuotesService'

describe('QuotesService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
  }

  describe('checkAvailability', () => {
    const params = {
      originPlaceId: 'originPlaceId',
      destinationPlaceId: 'destinationPlaceId',
    }

    const expectedBody = {
      origin_place_id: 'originPlaceId',
      destination_place_id: 'destinationPlaceId',
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call post of http without date', () => {
      new QuotesService(http).checkAvailability(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('quotes/availability', expectedBody)
    })

    it('should call post of http without date', () => {
      new QuotesService(http).checkAvailability({ ...params, dateRequired: '2020-03-03T18:00:00+01:00' })

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('quotes/availability', {
        ...expectedBody,
        date_required: '2020-03-03T17:00',
      })
    })
  })
})
