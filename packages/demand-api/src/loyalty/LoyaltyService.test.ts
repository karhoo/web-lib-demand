import { LoyaltyService } from './LoyaltyService'

describe('LoyaltyService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
    patch: jest.fn(),
  }

  const clientId = 'client'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getStatus', () => {
    it('should call post of http', () => {
      new LoyaltyService(http).getStatus(clientId)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith('loyalty-client/status')
    })
  })

  describe('convertMoneyToPoints', () => {
    const params = {
      amount: 1000,
      currency: 'GBP',
    }

    it('should call post of http', () => {
      new LoyaltyService(http).convertMoneyToPoints(clientId, params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('loyalty-client/money-to-points', params)
    })
  })

  describe('preAuth', () => {
    const params = {
      points: 1000,
    }

    it('should call post of http', () => {
      new LoyaltyService(http).preAuth(clientId, params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('loyalty-client/pre-auth', params)
    })
  })
})
