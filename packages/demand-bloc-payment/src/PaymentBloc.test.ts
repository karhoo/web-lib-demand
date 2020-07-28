import {
  getAddPaymentCardMock,
  getMockedErrorAddPaymentCardResponse,
} from '@karhoo/demand-api/dist/mocks/testMocks'

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

  const payer = {
    id: 'id',
    email: 'email@of.user',
    first_name: 'firstName',
    last_name: 'lastName',
  }

  const cards = [
    {
      id: 'id',
      type: 'type',
      lastFour: 'lastFour',
      nonce: 'cardNonce',
    },
  ]

  const providerMock = {
    initialize: jest.fn(),
    dispose: jest.fn(),
    tokenizeHostedFields: jest.fn(() => Promise.resolve(tokenizeHostedFieldsResponse)),
    validatePaymentForm: jest.fn(() => true),
    verifyWithThreeDSecure: jest.fn(() => Promise.resolve(verifyCardWithThreeDSecureResponse)),
    getSavedCards: jest.fn(() => Promise.resolve(cards)),
    saveCard: getAddPaymentCardMock(),
  }

  const cardsInfoMock = {
    setPaymentCards: jest.fn(),
    getSelectedPaymentCard: jest.fn(() => cards[0]),
    clear: jest.fn(),
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

    it('should call getSavedCards of provider', async () => {
      await new PaymentBloc(providerMock, { paymentCardsEnabled: true }, cardsInfoMock).initPayment(payer)

      expect(providerMock.getSavedCards).toBeCalledTimes(1)
      expect(providerMock.getSavedCards).toBeCalledWith(payer)
    })

    it('should call setPaymentCards of cardsInfo', async () => {
      await new PaymentBloc(providerMock, { paymentCardsEnabled: true }, cardsInfoMock).initPayment(payer)

      expect(cardsInfoMock.setPaymentCards).toBeCalledTimes(1)
      expect(cardsInfoMock.setPaymentCards).toBeCalledWith(cards, payer)
    })

    it('should throw error if paymentCardsEnabled is true and cardsInfo is not provided', done => {
      new PaymentBloc(providerMock, { paymentCardsEnabled: true }).initPayment(payer).catch(error => {
        expect(error.message).toBe(errors.noCardsInfo)

        done()
      })
    })

    it('should throw operationCancelled error if dispose has been called', done => {
      const payment = new PaymentBloc(providerMock, { paymentCardsEnabled: true }, cardsInfoMock)

      payment.initPayment(payer).catch(error => {
        expect(error.message).toBe(errors.operationCancelled)

        done()
      })

      payment.dispose()
    })
  })

  describe('dispose', () => {
    it('should call dispose of provider', async () => {
      await payment.dispose()

      expect(providerMock.dispose).toBeCalledTimes(1)
    })

    it('should call clear of cardsInfo', async () => {
      await new PaymentBloc(providerMock, { paymentCardsEnabled: true }, cardsInfoMock).dispose()

      expect(cardsInfoMock.clear).toBeCalledTimes(1)
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

    it('should call getSelectedPaymentCard of cardsInfo', async () => {
      await new PaymentBloc(
        providerMock,
        { paymentCardsEnabled: true },
        cardsInfoMock
      ).validatePaymentDetails()

      expect(cardsInfoMock.getSelectedPaymentCard).toBeCalledTimes(1)
      expect(providerMock.validatePaymentForm).toBeCalledTimes(0)
    })

    it('should call validatePaymentForm of provider if getSelectedPaymentCard of cardsInfo returns empty array', async () => {
      cardsInfoMock.getSelectedPaymentCard.mockImplementationOnce(() => undefined as any)

      await new PaymentBloc(
        providerMock,
        { paymentCardsEnabled: true },
        cardsInfoMock
      ).validatePaymentDetails()

      expect(cardsInfoMock.getSelectedPaymentCard).toBeCalledTimes(1)
      expect(providerMock.validatePaymentForm).toBeCalledTimes(1)
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

    it('should return nonce of selected card', async () => {
      const data = await new PaymentBloc(
        providerMock,
        { paymentCardsEnabled: true },
        cardsInfoMock
      ).getPaymentNonce()

      expect(cardsInfoMock.getSelectedPaymentCard).toHaveBeenCalledTimes(1)
      expect(data).toEqual({ ok: true, nonce: cards[0].nonce })
    })

    it('should call tokenizeHostedFields of provider if getSelectedPaymentCard of cardsInfoMock returns undefined', async () => {
      cardsInfoMock.getSelectedPaymentCard.mockImplementationOnce(() => undefined as any)

      await new PaymentBloc(providerMock, { paymentCardsEnabled: true }, cardsInfoMock).getPaymentNonce()

      expect(providerMock.tokenizeHostedFields).toBeCalledTimes(1)
    })

    it('should call tokenizeHostedFields of provider if getSelectedPaymentCard of cardsInfoMock returns card without nonce', async () => {
      cardsInfoMock.getSelectedPaymentCard.mockImplementationOnce(() => ({} as any))

      await new PaymentBloc(providerMock, { paymentCardsEnabled: true }, cardsInfoMock).getPaymentNonce()

      expect(providerMock.tokenizeHostedFields).toBeCalledTimes(1)
    })
  })

  describe('savePaymentCard', () => {
    it('should call tokenizeHostedFields of provider', async () => {
      await payment.savePaymentCard(payer)

      expect(providerMock.tokenizeHostedFields).toBeCalledTimes(1)
    })

    it('should call saveCard of provider', async () => {
      await payment.savePaymentCard(payer)

      expect(providerMock.saveCard).toBeCalledTimes(1)
      expect(providerMock.saveCard).toBeCalledWith(tokenizeHostedFieldsResponse.nonce, payer)
    })

    it('should return status', async () => {
      const result = await payment.savePaymentCard(payer)

      expect(result).toEqual({ ok: true })
    })

    it('should return tokenizeHostedFields error', async () => {
      const error = new Error('test')

      providerMock.tokenizeHostedFields.mockImplementationOnce(() => Promise.reject(error))

      const result = await payment.savePaymentCard(payer)

      expect(result).toEqual({ ok: false, error })
    })

    it('should return saveCard error', async () => {
      const response = getMockedErrorAddPaymentCardResponse()

      providerMock.saveCard.mockImplementationOnce(() => Promise.resolve(response))

      const result = await payment.savePaymentCard(payer)

      expect(result).toEqual({ ok: false, error: new Error(response.error.message) })
    })
  })
})
