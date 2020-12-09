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
      expect(http.post).toHaveBeenCalledWith(
        'v2/payments/payment-methods/braintree/get-payment-method',
        params
      )
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
      payer: {
        id: 'id',
        first_name: 'first_name',
        last_name: 'last_name',
        email: 'email',
      },
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

  describe('getOriginKey', () => {
    it('should call get of http', () => {
      new PaymentService(http).getAdyenOriginKey()

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith('v3/payments/adyen/origin-keys')
    })
  })

  describe('getPaymentMethods', () => {
    it('should call post of http', () => {
      const params = {
        merchantAccount: 'testAccount',
        countryCode: 'UK',
        amount: {
          currency: 'GBR',
          value: 35,
        },
      }

      new PaymentService(http).getAdyenPaymentMethods(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('v3/payments/adyen/payments-methods', params)
    })
  })

  describe('createPaymentAuth', () => {
    it('should call post of http', () => {
      const params = {
        payments_payload: {
          amount: {
            currency: 'GBR',
            value: 35,
          },
          merchantAccount: 'testAccount',
          reference: 'reference',
          returnUrl: 'https://your-company.com/checkout?shopperOrder=12xy',
          paymentMethod: {
            type: 'test',
            number: '1234',
            expiryMonth: '11',
            expiryYear: '2022',
            holderName: 'Name',
            cvc: '123',
          },
        },
      }

      new PaymentService(http).createAdyenPaymentAuth(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('v3/payments/adyen/payments', params)
    })
  })

  describe('getPaymentDetails', () => {
    it('should call post of http', () => {
      const params = {
        trip_id: 'trip_id',
      }

      new PaymentService(http).getAdyenPaymentDetails(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith('v3/payments/adyen/payments-details', params)
    })
  })
})
