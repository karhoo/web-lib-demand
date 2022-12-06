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
    paymentMethod: {
      type: 'card',
    },
  },
  remove: jest.fn(),
  showValidation: jest.fn(),
  handleAction: jest.fn(),
  submit: jest.fn(),
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

    await provider.initialize()
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
    })

    it('should emit an error if there is no payment methods', async () => {
      expect.assertions(1)
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
      expect.assertions(1)
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
    })

    it('should set live enviroment', async () => {
      provider = new AdyenProvider(paymentService, checkoutOptions)
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
    })

    it('should perform a payment with shopper data', async () => {
      provider.shopperData = shopperData
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
    })

    it('should handle payment error', async () => {
      expect.assertions(1)
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
      await provider.tokenizeHostedFields()

      expect(provider.paymentAction).toEqual(getMockedPaymentAuthResponse().body.payload.action)
    })

    it('should save payment data', async () => {
      await provider.tokenizeHostedFields()

      expect(provider.paymentData).toEqual(getMockedPaymentAuthResponse().body.payload.action?.paymentData)
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
      await provider.tokenizeHostedFields()

      expect(provider.paymentData).toEqual('')
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
      await provider.tokenizeHostedFields()

      expect(provider.getNonce()).toEqual('trip_id')
    })

    it('should save nonce', async () => {
      await provider.tokenizeHostedFields()

      expect(provider.getNonce()).toEqual(getMockedPaymentAuthResponse().body.trip_id)
    })

    it('should clear nonce', () => {
      provider.clearPaymentNonce()
      expect(provider.getNonce()).toEqual('')
      expect(provider.paymentData).toEqual('')
    })
  })

  describe('validatePaymentForm', () => {
    it('should showValidation', () => {
      provider.validatePaymentForm()

      expect(cardElement.showValidation).toHaveBeenCalledTimes(1)
    })
  })

  describe('google pay', () => {
    it('should force adyen dropin submit', () => {
      provider.forceGooglePayPopup()

      expect(cardElement.submit).toHaveBeenCalledTimes(1)
    })

    it('should return false if its not google pay', () => {
      const isGooglePay = provider.isGooglePay()
      expect(isGooglePay).toBeFalsy()
    })

    it('should return true if its google pay', () => {
      cardElement.data.paymentMethod.type = 'paywithgoogle'
      const isGooglePay = provider.isGooglePay()
      expect(isGooglePay).toBeTruthy()
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
      await provider.tokenizeHostedFields()
      await provider.startThreeDSecureVerification()

      expect(cardElement.handleAction).toHaveBeenCalledTimes(1)
    })

    it('should throw error if tokenizeHostedFields have not been called', async () => {
      expect.assertions(2)
      try {
        await provider.startThreeDSecureVerification()
      } catch (error) {
        expect(cardElement.handleAction).toHaveBeenCalledTimes(0)
        expect(error).toEqual(new AdyenError(errors[codes.AE04], codes.AE04))
      }
    })

    it('should emit error if no action is defined', async () => {
      expect.assertions(2)
      await provider.tokenizeHostedFields()
      provider.paymentAction = null
      try {
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

      await provider.initialize()
      await provider.tokenizeHostedFields()
      provider.paymentAction = null
      const payload = await provider.startThreeDSecureVerification()

      expect(cardElement.handleAction).toHaveBeenCalledTimes(0)
      expect(resultMessage).toEqual(payload)
    })
  })

  describe('completeThreeDSecureVerification', () => {
    it('should retrun nonce', async () => {
      const locationSearch = '?MD=MD&PaRes=PaRes'
      const params = {
        locationParams: new URLSearchParams(locationSearch),
        nonce: 'nonce',
      }
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
    })

    it('should return nonce using new api', async () => {
      const locationSearch = '?redirectResult=redirectResult'
      const params = {
        locationParams: new URLSearchParams(locationSearch),
        nonce: 'nonce',
      }

      provider.apiVersion = 'v68'
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
    })

    it('should handle payment details error', async () => {
      jest.clearAllMocks()
      expect.assertions(1)
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
      const data = await provider.getSavedCards()

      expect(data).toEqual([])
    })
  })

  describe('getPaymentProviderProps', () => {
    it('should return class prop', () => {
      expect(provider.getPaymentProviderProps().class).toEqual('adyenPsp')
    })
  })
})
