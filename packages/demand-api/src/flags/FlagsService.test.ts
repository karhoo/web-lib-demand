import { FlagsService } from './FlagsService'

describe('FlagsService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
  }

  const params = {
    identifier: 'org_id',
    platform: 'web',
  }

  const query = {
    version: '1.0.0',
  }

  describe('getByVersion', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call get of http', () => {
      new FlagsService(http).getByVersion(params)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`flags/${params.identifier}/${params.platform}`, undefined)
    })

    it('should call get of with a query param', () => {
      new FlagsService(http).getByVersion(params, query)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`flags/${params.identifier}/${params.platform}`, query)
    })
  })

  describe('getLatestVersion', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call get of http without a query param to get latest flags', () => {
      new FlagsService(http).getLatestVersion(params)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`flags/${params.identifier}/${params.platform}`, undefined)
    })
  })

  describe('getCurrentVersion', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call get of http to get current version of flags config', () => {
      new FlagsService(http).getCurrentVersion(params)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`flags/${params.identifier}/${params.platform}/version`)
    })
  })
})
