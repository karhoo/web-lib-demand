import { QuotesService } from './QuotesService'

describe('QuotesService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
    patch: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('checkAvailability', () => {
    const params = {
      originPlaceId: 'originPlaceId',
      destinationPlaceId: 'destinationPlaceId',
    }

    const expectedBody = {
      origin_place_id: 'originPlaceId',
      destination_place_id: 'destinationPlaceId',
    }

    it('should call post of http without date', () => {
      new QuotesService(http).checkAvailability(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('quotes/availability', expectedBody)
    })

    it('should call post of http with date', () => {
      new QuotesService(http).checkAvailability({ ...params, dateRequired: '2020-03-03T18:00:00+01:00' })

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('quotes/availability', {
        ...expectedBody,
        date_required: '2020-03-03T17:00',
      })
    })
  })

  describe('quotesSearch', () => {
    const params = {
      originPlaceId: 'originPlaceId',
      destinationPlaceId: 'destinationPlaceID',
    }

    it('should call post of http without local_time_of_pickup', () => {
      new QuotesService(http).quotesSearch(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('quotes', {
        origin_place_id: params.originPlaceId,
        destination_place_id: params.destinationPlaceId,
        local_time_of_pickup: undefined,
      })
    })

    it('should call post of http with local_time_of_pickup in correct format', () => {
      new QuotesService(http).quotesSearch({ ...params, localTimeOfPickup: '2018-02-02T14:14' })

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('quotes', {
        origin_place_id: params.originPlaceId,
        destination_place_id: params.destinationPlaceId,
        local_time_of_pickup: '2018-02-02T14:14',
      })
    })

    it('should not call post of http if local_time_of_pickup in wrong format', () => {
      const result = new QuotesService(http).quotesSearch({
        ...params,
        localTimeOfPickup: '2020-03-03T18:00:00+01:00',
      })

      expect(result).toEqual(
        Promise.reject({
          code: 'K0002',
          message: 'Pickup local time wrong format',
        })
      )

      expect(http.post).not.toHaveBeenCalled()
    })
  })

  describe('quotesSearchById', () => {
    const id = '123asd'

    it('should call get of http', () => {
      new QuotesService(http).quotesSearchById(id)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`quotes/${id}`, undefined)
    })

    it('should call get of http with locale in query params', () => {
      new QuotesService(http).quotesSearchById(id, 'en-GB')

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`quotes/${id}`, { locale: 'en-GB' })
    })
  })
})
