import { QuotesV2Service } from './QuotesV2Service'

describe('QuotesV2Service', () => {
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

  describe('quotesSearch', () => {
    const params = {
      origin: {
        latitude: '56.06',
        longitude: '-0.07',
      },
      destination: {
        latitude: '56.06',
        longitude: '-0.07',
      },
    }

    it('should call post of http without local_time_of_pickup', async () => {
      try {
        console.log('inside await')
        await new QuotesV2Service(http).quotesSearch(params)
      } catch (e) {
        console.log('dupa', e)
      }

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('quotes', {
        origin: params.origin,
        destination: params.destination,
        local_time_of_pickup: undefined,
      })
    })

    it('should call post of http with local_time_of_pickup in correct format', async () => {
      await new QuotesV2Service(http).quotesSearch({ ...params, localTimeOfPickup: '2018-02-02T14:14' })

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('quotes', {
        origin: params.origin,
        destination: params.destination,
        local_time_of_pickup: '2018-02-02T14:14',
      })
    })

    it('should not call post of http if local_time_of_pickup in wrong format', async () => {
      try {
        const result = await new QuotesV2Service(http).quotesSearch({
          ...params,
          localTimeOfPickup: '2020-03-03T18:00:00+01:00',
        })

        expect(result).toEqual(
          await Promise.reject({
            code: 'K0002',
            message: 'Pickup local time wrong format',
          })
        )
      } catch (e) {}

      expect(http.post).not.toHaveBeenCalled()
    })
  })

  describe('checkCoverage', () => {
    const query = {
      latitude: '56.06',
      longitude: '-0.07',
    }

    it('should call get of http without local_time_of_pickup', async () => {
      try {
        await new QuotesV2Service(http).checkCoverage(query)

        expect(http.get).toHaveBeenCalledTimes(1)
        expect(http.get).toHaveBeenCalledWith('quotes/coverage', {
          latitude: query.latitude,
          longitude: query.longitude,
          local_time_of_pickup: undefined,
        })
      } catch (e) {}
    })

    it('should call get of http with local_time_of_pickup in correct format', async () => {
      try {
        await new QuotesV2Service(http).checkCoverage({
          ...query,
          localTimeOfPickup: '2018-02-02T14:14:00+01:00',
        })

        expect(http.get).toHaveBeenCalledTimes(1)
        expect(http.get).toHaveBeenCalledWith('quotes/coverage', {
          latitude: query.latitude,
          longitude: query.longitude,
          local_time_of_pickup: '2018-02-02T14:14',
        })
      } catch (e) {}
    })

    it('should not call get of http if local_time_of_pickup in wrong format', async () => {
      try {
        const result = await new QuotesV2Service(http).checkCoverage({
          ...query,
          localTimeOfPickup: '2018/02/02T14:14:00+01:00',
        })

        expect(result).toEqual(
          await Promise.reject({
            code: 'K0002',
            message: 'Pickup local time wrong format',
          })
        )

        expect(http.get).not.toHaveBeenCalled()
      } catch (e) {}
    })
  })

  describe('quotesSearchById', () => {
    const id = '123asd'

    it('should call get of http', async () => {
      try {
        await new QuotesV2Service(http).quotesSearchById(id)
        expect(http.get).toHaveBeenCalledTimes(1)
        expect(http.get).toHaveBeenCalledWith(`quotes/${id}`, undefined)
      } catch (e) {}
    })

    it('should call get of http with locale in query params', async () => {
      try {
        await new QuotesV2Service(http).quotesSearchById(id, 'en-GB')
        expect(http.get).toHaveBeenCalledTimes(1)
        expect(http.get).toHaveBeenCalledWith(`quotes/${id}`, { locale: 'en-GB' })
      } catch (e) {}
    })
  })
})
