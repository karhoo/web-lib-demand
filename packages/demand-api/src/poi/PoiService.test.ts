import { PoiService } from './PoiService'

describe('PoiService', () => {
  const http = {
    setDefaultRequestOptionsGetter: jest.fn(),
    setResponseMiddleware: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
  }

  describe('search', () => {
    const params = {
      paginationRowCount: 0,
      paginationOffset: 1,
      searchTerm: 'searchTerm',
      searchKey: 'searchKey',
    }

    const expectedParams = {
      pagination_row_count: 0,
      pagination_offset: 1,
      search_term: 'searchTerm',
      search_key: 'searchKey',
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should call get of http', () => {
      new PoiService(http).search(params)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith('poi', expectedParams)
    })
  })
})
