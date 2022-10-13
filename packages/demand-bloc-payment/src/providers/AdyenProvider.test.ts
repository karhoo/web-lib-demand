import {
  getAddPaymentCardMock,
  getAdyenPaymentMethodsMock,
  getCreateAdyenPaymentAuthMock,
  getMockedPaymentAuthResponse,
  getAdyenClientKeyMock,
  getMockedErrorAdyenClientKeyResponse,
  getMockedErrorAdyenPaymentMethodsResponse,
  getMockedErrorAdyenPaymentAuthResponse,
  getAdyenPaymentDetailsMock,
  getMockedErrorAdyenPaymentDetailsResponse,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import { AdyenProvider } from './AdyenProvider'
import { errors, AdyenError, codes } from './adyenErrors'

const cardElement = {
  data: {
    testData: '1',
  },
  remove: jest.fn(),
  showValidation: jest.fn(),
  handleAction: jest.fn(),
}

const payer = {
  id: 'id',
  email: 'email@of.user',
  first_name: 'firstName',
  last_name: 'lastName',
}

const shopperData = {
  shopperReference: payer.id,
  shopperEmail: payer.email,
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
    getAdyenClientKey: getAdyenClientKeyMock(),
    getAdyenPaymentMethods: getAdyenPaymentMethodsMock(),
    createAdyenPaymentAuth: getCreateAdyenPaymentAuthMock(),
    getAdyenPaymentDetails: getAdyenPaymentDetailsMock(),
  }

  let provider: AdyenProvider

  const checkoutOptions = {
    dropinContainerId: 'card-container',
    returnUrl: '/callback',
    price: amount,
    currencyCode,
    withThreeDSecure: true,
    fleetId: 'fleetId',
  }

  const adyenCheckoutOptions = {
    amount: {
      currency: 'EUR',
      value: 1000,
    },
    channel: 'Web',
    locale: 'en',
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    provider = new AdyenProvider(paymentService, checkoutOptions)

    try {
      await provider.initialize()
    } catch (e) {}
  })

  describe('initialize', () => {
    it('should get payment methods', async () => {
      expect(paymentService.getAdyenPaymentMethods).toBeCalledTimes(1)
      expect(paymentService.getAdyenPaymentMethods).toBeCalledWith(
        {
          amount: {
            value: amount,
            currency: currencyCode,
          },
          shopperLocale: 'en',
        },
        undefined
      )
    })

    it('should get payment methods for authorized payer and save his data', async () => {
      jest.clearAllMocks()

      provider = new AdyenProvider(paymentService, checkoutOptions)

      try {
        await provider.initialize(payer)
        expect(provider.shopperData).toEqual(shopperData)
        expect(paymentService.getAdyenPaymentMethods).toBeCalledWith(
          {
            amount: {
              value: amount,
              currency: currencyCode,
            },
            shopperLocale: 'en',
            ...shopperData,
          },
          undefined
        )
      } catch (e) {}
    })

    it('should emit an error if there is no payment methods', async () => {
      paymentService.getAdyenPaymentMethods.mockImplementationOnce(() =>
        Promise.resolve(getMockedErrorAdyenPaymentMethodsResponse())
      )

      try {
        await provider.initialize()
      } catch (error) {
        expect(error).toEqual(new AdyenError(errors[codes.AE01], codes.AE01))
      }
    })

    it('should emit an error if there is no client key', async () => {
      paymentService.getAdyenClientKey.mockImplementationOnce(() =>
        Promise.resolve(getMockedErrorAdyenClientKeyResponse())
      )

      try {
        await provider.initialize()
      } catch (error) {
        expect(error).toEqual(new AdyenError(errors[codes.AE02], codes.AE02))
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
      try {
        await provider.tokenizeHostedFields()

        expect(paymentService.createAdyenPaymentAuth).toBeCalledTimes(1)
        expect(paymentService.createAdyenPaymentAuth).toBeCalledWith(
          {
            supply_partner_id: 'fleetId',
            payments_payload: {
              redirectFromIssuerMethod: 'get',
              ...adyenCheckoutOptions,
              ...cardElement.data,
              returnUrl: '/callback',
              origin: 'http://localhost',
            },
          },
          undefined
        )
      } catch (e) {}
    })

    it('should set live enviroment', async () => {
      provider = new AdyenProvider(paymentService, checkoutOptions)
      try {
        await provider.initialize()
        await provider.tokenizeHostedFields()
        expect(paymentService.createAdyenPaymentAuth).toBeCalledTimes(1)
        expect(paymentService.createAdyenPaymentAuth).toBeCalledWith(
          {
            supply_partner_id: 'fleetId',
            payments_payload: {
              redirectFromIssuerMethod: 'get',
              ...adyenCheckoutOptions,
              ...cardElement.data,
              returnUrl: '/callback',
              origin: 'http://localhost',
            },
          },
          undefined
        )
      } catch (e) {}
    })

    it('should perform a payment with shopper data', async () => {
      provider.shopperData = shopperData
      try {
        await provider.tokenizeHostedFields()

        expect(paymentService.createAdyenPaymentAuth).toBeCalledTimes(1)
        expect(paymentService.createAdyenPaymentAuth).toBeCalledWith(
          {
            supply_partner_id: 'fleetId',
            payments_payload: {
              redirectFromIssuerMethod: 'get',
              ...adyenCheckoutOptions,
              ...cardElement.data,
              ...shopperData,
              returnUrl: '/callback',
              origin: 'http://localhost',
            },
          },
          undefined
        )
      } catch (e) {}
    })

    it('should handle payment error', async () => {
      paymentService.createAdyenPaymentAuth.mockImplementationOnce(() =>
        Promise.resolve(getMockedErrorAdyenPaymentAuthResponse())
      )

      try {
        await provider.tokenizeHostedFields()
      } catch (error) {
        expect(error).toEqual(new AdyenError(errors[codes.AE03], codes.AE03))
      }
    })

    it('should save payment action', async () => {
      try {
        await provider.tokenizeHostedFields()

        expect(provider.paymentAction).toEqual(getMockedPaymentAuthResponse().body.payload.action)
      } catch (e) {}
    })

    it('should save payment data', async () => {
      try {
        await provider.tokenizeHostedFields()

        expect(provider.paymentData).toEqual(getMockedPaymentAuthResponse().body.payload.action?.paymentData)
      } catch (e) {}
    })

    it('should not crash if action is not provided', async () => {
      paymentService.createAdyenPaymentAuth.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-type': 'application/json' }),
          body: { payload: {}, trip_id: 'trip_id' },
        })
      )
      try {
        await provider.tokenizeHostedFields()

        expect(provider.paymentData).toEqual('')
      } catch (e) {}
    })

    it('should save nonce if resultCode is Authorised', async () => {
      paymentService.createAdyenPaymentAuth.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          headers: new Headers({ 'content-type': 'application/json' }),
          body: {
            payload: {
              resultCode: 'Authorised',
            },
            trip_id: 'trip_id',
          },
        })
      )
      try {
        await provider.tokenizeHostedFields()

        expect(provider.getNonce()).toEqual('trip_id')
      } catch (e) {}
    })

    it('should save nonce', async () => {
      try {
        await provider.tokenizeHostedFields()

        expect(provider.getNonce()).toEqual(getMockedPaymentAuthResponse().body.trip_id)
      } catch (e) {}
    })
  })

  describe('validatePaymentForm', () => {
    it('should showValidation', async () => {
      try {
        provider.validatePaymentForm()

        expect(cardElement.showValidation).toHaveBeenCalledTimes(1)
      } catch (e) {}
    })
  })

  describe('dispose', () => {
    it('should remove dropin and clear payment data', () => {
      provider.clearPaymentNonce = jest.fn()
      provider.dispose()

      expect(cardElement.remove).toHaveBeenCalledTimes(1)
      expect((provider as any).isFormValid).toBe(false)
      expect((provider as any).clearPaymentNonce).toBeCalledTimes(1)
    })
  })

  describe('startThreeDSecureVerification', () => {
    it('should handle 3d secure action', async () => {
      try {
        await provider.tokenizeHostedFields()
        await provider.startThreeDSecureVerification()

        expect(cardElement.handleAction).toHaveBeenCalledTimes(1)
      } catch (e) {}
    })

    it('should do nothing if tokenizeHostedFields have not been called', () => {
      try {
        provider.startThreeDSecureVerification()

        expect(cardElement.handleAction).toHaveBeenCalledTimes(0)
      } catch (e) {}
    })

    it('should do nothing if handleAction is not a function', () => {
      try {
        provider.startThreeDSecureVerification()

        expect(cardElement.handleAction).toHaveBeenCalledTimes(0)
      } catch (e) {}
    })

    it('should emit error if no action is defined', async () => {
      try {
        await provider.tokenizeHostedFields()
        provider.paymentAction = null
        await provider.startThreeDSecureVerification()
      } catch (error) {
        expect(cardElement.handleAction).toHaveBeenCalledTimes(0)
        expect(error).toEqual(new AdyenError(errors[codes.AE04], codes.AE04))
      }
    })

    it('should do nothing if no action is defined', async () => {
      jest.clearAllMocks()
      const resultMessage = 'no-payment-action'
      const newOptions = {
        ...checkoutOptions,
        withThreeDSecure: false,
      }

      provider = new AdyenProvider(paymentService, newOptions)

      try {
        await provider.initialize()
        await provider.tokenizeHostedFields()
        provider.paymentAction = null
        const payload = await provider.startThreeDSecureVerification()

        expect(cardElement.handleAction).toHaveBeenCalledTimes(0)
        expect(resultMessage).toEqual(payload)
      } catch (e) {}
    })
  })

  describe('completeThreeDSecureVerification', () => {
    it('should retrun nonce', async () => {
      const locationSearch = '?MD=MD&PaRes=PaRes'
      const params = {
        locationParams: new URLSearchParams(locationSearch),
        nonce: 'nonce',
      }

      try {
        const nonce = await provider.completeThreeDSecureVerification(params)
        expect(paymentService.getAdyenPaymentDetails).toHaveBeenCalledTimes(1)
        expect(paymentService.getAdyenPaymentDetails).toHaveBeenLastCalledWith(
          {
            payments_payload: {
              paymentData: 'paymentData',
              details: {
                MD: params.locationParams.get('MD'),
                PaRes: params.locationParams.get('PaRes'),
              },
            },
            trip_id: params.nonce,
          },
          undefined
        )
        expect(nonce).toBe(params.nonce)
        expect(provider.getNonce()).toEqual('')
      } catch (e) {}
    })

    it('should return nonce using new api', async () => {
      const locationSearch = '?redirectResult=redirectResult'
      const params = {
        locationParams: new URLSearchParams(locationSearch),
        nonce: 'nonce',
      }

      provider.apiVersion = 'v68'
      try {
        const nonce = await provider.completeThreeDSecureVerification(params)
        expect(paymentService.getAdyenPaymentDetails).toHaveBeenCalledTimes(1)
        expect(paymentService.getAdyenPaymentDetails).toHaveBeenLastCalledWith(
          {
            payments_payload: {
              details: {
                redirectResult: params.locationParams.get('redirectResult'),
              },
            },
            trip_id: params.nonce,
          },
          'v68'
        )
        expect(nonce).toBe(params.nonce)
        expect(provider.getNonce()).toEqual('')
      } catch (e) {}
    })

    it('should throw error if required params are missing', async () => {
      jest.clearAllMocks()
      try {
        await provider.completeThreeDSecureVerification()
      } catch (error) {
        expect(error).toEqual(new AdyenError(errors[codes.AE04], codes.AE04))
      }
    })

    it('should handle payment details error', async () => {
      jest.clearAllMocks()
      const locationSearch = '?MD=MD&PaRes=PaRes'
      const params = {
        locationParams: new URLSearchParams(locationSearch),
        nonce: 'nonce',
      }

      paymentService.getAdyenPaymentDetails.mockImplementationOnce(() =>
        Promise.resolve(getMockedErrorAdyenPaymentDetailsResponse())
      )

      try {
        await provider.completeThreeDSecureVerification(params)
      } catch (error) {
        expect(error).toEqual(new AdyenError(errors[codes.AE03], codes.AE03))
      }
    })
  })

  describe('saveCard', () => {
    it('should call mocked method', () => {
      const saveCardSpy = jest.spyOn(provider, 'saveCard')
      provider.saveCard()

      expect(saveCardSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('getSavedCards', () => {
    it('should return a mocked empty data', async () => {
      try {
        const data = await provider.getSavedCards()

        expect(data).toEqual([])
      } catch (e) {}
    })
  })

  describe('getPaymentProviderProps', () => {
    it('should return class prop', () => {
      expect(provider.getPaymentProviderProps().class).toEqual('adyenPsp')
    })
  })
})
