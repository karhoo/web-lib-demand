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

    it('should call get of http', () => {
      new LoyaltyService(http).convertMoneyToPoints(clientId, params)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith('loyalty-client/exrates/GBP/burnpoints?amount=1000')
    })
  })

  describe('calculatePointsToEarn', () => {
    const params = {
      total_amount: 1000,
      burn_points: 500,
      currency: 'GBP',
    }

    it('should call get of http', () => {
      new LoyaltyService(http).calculatePointsToEarn(clientId, params)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(
        'loyalty-client/exrates/GBP/earnpoints?total_amount=1000&burn_points=500'
      )
    })
  })

  describe('preAuth', () => {
    const params = {
      points: 1000,
      flexpay: false,
      loyalty_membership: '12345678',
    }

    it('should call post of http', () => {
      new LoyaltyService(http).preAuth(clientId, params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('loyalty-client/pre-auth', params)
    })
  })
})
