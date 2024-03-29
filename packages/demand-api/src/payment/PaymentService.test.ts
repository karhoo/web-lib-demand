import { PaymentService } from './PaymentService'

describe('PaymentService', () => {
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

  describe('createClientToken', () => {
    const params = {
      organisation_id: 'organisationId',
      currency: 'currency',
    }

    it('should call post of http', () => {
      new PaymentService(http).createClientToken(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(
        'v2/payments/payment-methods/braintree/client-tokens',
        {},
        {},
        params
      )
    })
  })

  describe('getClientNonce', () => {
    const params = {
      organisation_id: 'organisation_id',
    }

    it('should call post of http', () => {
      new PaymentService(http).getClientNonce(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(
        'v2/payments/payment-methods/braintree/get-payment-method',
        params
      )
    })
  })

  describe('addPaymentCard', () => {
    const params = {
      organisation_id: 'organisation_id',
      nonce: 'nonce',
    }

    it('should call post of http', () => {
      new PaymentService(http).addPaymentCard(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(
        'v2/payments/payment-methods/braintree/add-payment-details',
        params
      )
    })
  })

  describe('createBraintreeClientToken', () => {
    const params = {
      organisation_id: 'organisationId',
      currency: 'currency',
    }

    it('should call post of http', () => {
      new PaymentService(http).createBraintreeClientToken(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(
        'v2/payments/payment-methods/braintree/client-tokens',
        {},
        {},
        params
      )
    })
  })

  describe('getBraintreeClientNonce', () => {
    const params = {
      organisation_id: 'organisation_id',
    }

    it('should call post of http', () => {
      new PaymentService(http).getBraintreeClientNonce(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(
        'v2/payments/payment-methods/braintree/get-payment-method',
        params
      )
    })
  })

  describe('addBraintreePaymentCard', () => {
    const params = {
      organisation_id: 'organisation_id',
      nonce: 'nonce',
    }

    it('should call post of http', () => {
      new PaymentService(http).addBraintreePaymentCard(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(
        'v2/payments/payment-methods/braintree/add-payment-details',
        params
      )
    })
  })

  describe('getPaymentProvider', () => {
    it('should call get of http', () => {
      new PaymentService(http).getPaymentProvider()

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith('v3/payments/providers')
    })
  })
})
