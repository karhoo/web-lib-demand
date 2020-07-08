import { creditCardType, errors } from './constants'

import { PaymentBloc } from './PaymentBloc'

describe('PaymentBloc', () => {
  const tokenizeHostedFieldsResponse = {
    nonce: 'nonce',
    details: {
      cardType: 'cardType',
      lastTwo: 'lastTwo',
      lastFour: 'lastFour',
    },
    type: 'type',
    description: 'description',
  }

  const verifyCardWithThreeDSecureResponse = {
    nonce: 'veryfied nonce',
    details: {
      cardType: 'cardType',
      lastTwo: 'lastTwo',
    },
    description: 'description',
    liabilityShiftPossible: false,
    liabilityShifted: false,
  }

  const providerMock = {
    initialize: jest.fn(),
    dispose: jest.fn(),
    tokenizeHostedFields: jest.fn(() => Promise.resolve(tokenizeHostedFieldsResponse)) as jest.Mock,
    validatePaymentForm: jest.fn(() => true),
    verifyWithThreeDSecure: jest.fn(() => Promise.resolve(verifyCardWithThreeDSecureResponse)),
  }

  const payment = new PaymentBloc(providerMock)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initPayment', () => {
    it('should call initialize of provider', async () => {
      await payment.initPayment()

      expect(providerMock.initialize).toBeCalledTimes(1)
    })
  })

  describe('dispose', () => {
    it('should call dispose of provider', async () => {
      await payment.dispose()

      expect(providerMock.dispose).toBeCalledTimes(1)
    })
  })

  describe('validatePaymentDetails', () => {
    it('should call validatePaymentForm of provider', async () => {
      payment.validatePaymentDetails()

      expect(providerMock.validatePaymentForm).toBeCalledTimes(1)
    })

    it('should return true', async () => {
      providerMock.validatePaymentForm.mockReturnValueOnce(true)

      expect(payment.validatePaymentDetails()).toBe(true)
    })
  })

  describe('verifyCardWithThreeDSecure', () => {
    it('should call tokenizeHostedFields of provider', async () => {
      await payment.verifyCardWithThreeDSecure(10)

      expect(providerMock.tokenizeHostedFields).toBeCalledTimes(1)
    })

    it('should call verifyWithThreeDSecure of provider', async () => {
      const amount = 10

      await payment.verifyCardWithThreeDSecure(amount)

      expect(providerMock.verifyWithThreeDSecure).toBeCalledTimes(1)
      expect(providerMock.verifyWithThreeDSecure).toBeCalledWith(amount, tokenizeHostedFieldsResponse.nonce)
    })

    it('should return nonce', async () => {
      const nonce = 'testNonce'

      providerMock.verifyWithThreeDSecure.mockReturnValueOnce(
        Promise.resolve({
          ...verifyCardWithThreeDSecureResponse,
          nonce,
        })
      )

      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({ ok: true, nonce })
    })

    it('should return nonce when liabilityShifted is true', async () => {
      const nonce = 'testNonce'

      providerMock.verifyWithThreeDSecure.mockReturnValueOnce(
        Promise.resolve({
          ...verifyCardWithThreeDSecureResponse,
          liabilityShiftPossible: true,
          liabilityShifted: true,
          nonce,
        })
      )

      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({ ok: true, nonce })
    })

    it('should return error when liabilityShifted is false and type is CreditCard', async () => {
      providerMock.verifyWithThreeDSecure.mockReturnValueOnce(
        Promise.resolve({
          ...verifyCardWithThreeDSecureResponse,
          liabilityShifted: false,
          type: creditCardType,
        })
      )

      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({
        ok: false,
        error: new Error(errors.verifyCardError),
      })
    })

    it('should return error when verifyWithThreeDSecure emits error', async () => {
      const error = new Error('')

      providerMock.verifyWithThreeDSecure.mockReturnValueOnce(Promise.reject(error))

      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({ ok: false, error })
    })

    it('should return error when tokenizeHostedFields emits error', async () => {
      const error = new Error('')

      providerMock.tokenizeHostedFields.mockReturnValueOnce(Promise.reject(error))

      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({ ok: false, error })
    })
  })

  describe('getPaymentNonce', () => {
    it('should call tokenizeHostedFields of provider', async () => {
      await payment.getPaymentNonce()

      expect(providerMock.tokenizeHostedFields).toBeCalledTimes(1)
    })

    it('should return nonce', async () => {
      const result = await payment.getPaymentNonce()

      expect(result).toEqual({ ok: true, nonce: tokenizeHostedFieldsResponse.nonce })
    })

    it('should return error', async () => {
      const error = new Error('test')

      providerMock.tokenizeHostedFields.mockReturnValueOnce(Promise.reject(error))

      const result = await payment.getPaymentNonce()

      expect(result).toEqual({ ok: false, error })
    })
  })
})
