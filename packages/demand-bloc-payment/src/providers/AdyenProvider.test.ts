import {
  getAddPaymentCardMock,
  getAdyenPaymentMethodsMock,
  getCreateAdyenPaymentAuthMock,
  getMockedPaymentAuthResponse,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import { AdyenProvider } from './AdyenProvider'

const cardElement = {
  data: {
    testData: '1',
  },
  remove: jest.fn(),
  showValidation: jest.fn(),
  handleAction: jest.fn(),
}

jest.mock('@adyen/adyen-web', () => () => ({
  create: jest.fn(() => ({
    mount: jest.fn(() => cardElement),
  })),
}))

describe('AdyenProvider', () => {
  const currencyCode = 'EUR'
  const amount = 1000

  const paymentService = {
    createClientToken: jest.fn(),
    getClientNonce: jest.fn(),
    addPaymentCard: getAddPaymentCardMock(),
    createBraintreeClientToken: jest.fn(),
    getBraintreeClientNonce: jest.fn(),
    addBraintreePaymentCard: getAddPaymentCardMock(),
    getPaymentProvider: jest.fn(),
    getAdyenOriginKey: jest.fn(),
    getAdyenPaymentMethods: getAdyenPaymentMethodsMock(),
    createAdyenPaymentAuth: getCreateAdyenPaymentAuthMock(),
    getAdyenPaymentDetails: jest.fn(),
  }

  let provider: AdyenProvider

  const checkoutOptions = {
    clientKey: 'clientKey',
    dropinContainerId: 'card-container',
    price: amount,
    currencyCode,
  }

  const adyenCheckoutOptions = {
    amount: {
      currency: 'EUR',
      value: 1000,
    },
    channel: 'Web',
    clientKey: 'clientKey',
    environment: 'test',
    locale: 'en',
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    provider = new AdyenProvider(paymentService, checkoutOptions, true)

    await provider.initialize()
  })

  describe('initialize', () => {
    it('should get payment methods', async () => {
      expect(paymentService.getAdyenPaymentMethods).toBeCalledTimes(1)
      expect(paymentService.getAdyenPaymentMethods).toBeCalledWith({
        amount: {
          value: amount,
          currency: currencyCode,
        },
        shopperLocale: 'en',
      })
    })

    it('should emit an error if there is no payment methods', async () => {
      paymentService.getAdyenPaymentMethods.mockImplementationOnce(() =>
        Promise.resolve({ ok: false, status: 404, error: { message: 'Test error' } })
      )

      try {
        await provider.initialize()
      } catch (error) {
        expect(error).toEqual(new Error('No payment methods received'))
      }
    })
  })

  describe('paymentData', () => {
    it('should get paymentData', () => {
      expect(provider.paymentData).toEqual('')
    })
  })

  describe('tokenizeHostedFields', () => {
    it('should perform a payment', async () => {
      await provider.tokenizeHostedFields()

      expect(paymentService.createAdyenPaymentAuth).toBeCalledTimes(1)
      expect(paymentService.createAdyenPaymentAuth).toBeCalledWith({
        payments_payload: {
          redirectFromIssuerMethod: 'get',
          ...adyenCheckoutOptions,
          ...cardElement.data,
        },
        return_url_suffix: '/card-callback',
      })
    })

    it('should set live enviroment', async () => {
      provider = new AdyenProvider(paymentService, checkoutOptions, false)

      await provider.initialize()
      await provider.tokenizeHostedFields()

      expect(paymentService.createAdyenPaymentAuth).toBeCalledTimes(1)
      expect(paymentService.createAdyenPaymentAuth).toBeCalledWith({
        payments_payload: {
          redirectFromIssuerMethod: 'get',
          ...adyenCheckoutOptions,
          ...cardElement.data,
          environment: 'live',
        },
        return_url_suffix: '/card-callback',
      })
    })

    it('should handle payment error', async () => {
      paymentService.createAdyenPaymentAuth.mockImplementationOnce(() =>
        Promise.resolve({ ok: false, status: 404, error: { message: 'Test error' } })
      )

      try {
        await provider.tokenizeHostedFields()
      } catch (error) {
        expect(error).toEqual(new Error('Failed to create a payment'))
      }
    })

    it('should save payment action', async () => {
      await provider.tokenizeHostedFields()

      expect(provider.paymentAction).toEqual(getMockedPaymentAuthResponse().body.payload.action)
    })

    it('should save payment data', async () => {
      await provider.tokenizeHostedFields()

      expect(provider.paymentData).toEqual(getMockedPaymentAuthResponse().body.payload.action?.paymentData)
    })

    it('should not crash if action is not provided', async () => {
      paymentService.createAdyenPaymentAuth.mockImplementationOnce(() =>
        Promise.resolve({ ok: true, status: 200, body: { payload: {}, trip_id: 'trip_id' } })
      )
      await provider.tokenizeHostedFields()

      expect(provider.paymentData).toEqual('')
    })
  })

  describe('validatePaymentForm', () => {
    it('should showValidation', () => {
      provider.validatePaymentForm()

      expect(cardElement.showValidation).toHaveBeenCalledTimes(1)
    })
  })

  describe('dispose', () => {
    it('should remove dropin', () => {
      provider.dispose()

      expect(cardElement.remove).toHaveBeenCalledTimes(1)
    })
  })

  describe('startThreeDSecureVerification', () => {
    it('should handle 3d secure action', async () => {
      await provider.tokenizeHostedFields()
      await provider.startThreeDSecureVerification()

      expect(cardElement.handleAction).toHaveBeenCalledTimes(1)
    })

    it('should do nothing if tokenizeHostedFields have not been called', () => {
      provider.startThreeDSecureVerification()

      expect(cardElement.handleAction).toHaveBeenCalledTimes(0)
    })

    it('should do nothing if handleAction is not a function', () => {
      provider.startThreeDSecureVerification()

      expect(cardElement.handleAction).toHaveBeenCalledTimes(0)
    })
  })

  describe('completeThreeDSecureVerification', () => {
    it('should throw error if required params are missing', async () => {
      try {
        await provider.completeThreeDSecureVerification()
      } catch (error) {
        expect(error).toEqual(new Error('Missing required params to complete 3d secure'))
      }
    })
  })
})
