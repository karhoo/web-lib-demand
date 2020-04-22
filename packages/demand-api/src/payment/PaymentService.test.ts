import { PaymentService } from './PaymentService'

describe('PaymentService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createClientToken', () => {
    const params = {
      organisation_id: 'organisationId',
      currency: 'currency',
    }

    it('should call post of http', () => {
      new PaymentService(http).createClientToken(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(
        'payments/payment-methods/braintree/client-tokens',
        {},
        {},
        params
      )
    })
  })

  describe('getClientNonce', () => {
    const params = {
      payer: {
        id: 'id',
        first_name: 'first_name',
        last_name: 'last_name',
        email: 'email',
      },
      organisation_id: 'organisation_id',
    }

    it('should call post of http', () => {
      new PaymentService(http).getClientNonce(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('payments/payment-methods/braintree/get-nonce', params)
    })
  })

  describe('addPaymentCard', () => {
    const params = {
      payer: {
        id: 'id',
        first_name: 'first_name',
        last_name: 'last_name',
        email: 'email',
      },
      organisation_id: 'organisation_id',
      nonce: 'nonce',
    }

    it('should call post of http', () => {
      new PaymentService(http).addPaymentCard(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(
        'payments/payment-methods/braintree/add-payment-card-details',
        params
      )
    })
  })
})
