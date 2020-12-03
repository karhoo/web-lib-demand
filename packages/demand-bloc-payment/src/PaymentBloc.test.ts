import { set } from 'lodash'

import {
  getAddPaymentCardMock,
  getApiMock,
  getMockedErrorAddPaymentCardResponse,
  getMockedPaymentProviderResponse,
  paymentProviderIdBeingUsed,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import { creditCardType, errors } from './constants'

import { PaymentBloc, PaymentProvidersMap, fetchPaymentProvider, getPaymentProvider } from './PaymentBloc'

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
    tokenizeHostedFields: jest.fn(() => Promise.resolve(['key1', tokenizeHostedFieldsResponse.nonce])),
    validatePaymentForm: jest.fn(() => true),
    verifyWithThreeDSecure: jest.fn(() => Promise.resolve(verifyCardWithThreeDSecureResponse)),
    getSavedCards: jest.fn(() => Promise.resolve(cards)),
    saveCard: getAddPaymentCardMock(),
  }

  const providersMapMock: PaymentProvidersMap = {
    Braintree: providerMock,
    Adyen: providerMock,
  }

  const getPaymentProviderBeingUsed = () => providersMapMock[paymentProviderIdBeingUsed]

  const cardsInfoMock = {
    setPaymentCards: jest.fn(),
    getSelectedPaymentCard: jest.fn(() => cards[0]),
    clear: jest.fn(),
  }

  const api = getApiMock()

  const { paymentService: paymentServiceMock } = api

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('initPayment', () => {
    it('should call initialize of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: false },
      })
      await payment.initPayment()
      expect(providerMock.initialize).toBeCalledTimes(1)
    })

    it('should call getSavedCards of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      await payment.initPayment(payer)
      expect(providerMock.getSavedCards).toBeCalledTimes(1)
      expect(providerMock.getSavedCards).toBeCalledWith(payer)
    })

    it('should call setPaymentCards of cardsInfo', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      await payment.initPayment(payer)
      expect(cardsInfoMock.setPaymentCards).toBeCalledTimes(1)
      expect(cardsInfoMock.setPaymentCards).toBeCalledWith(cards, payer)
    })

    it('should throw error if paymentCardsEnabled is true and cardsInfo is not provided', async done => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
      })

      payment.initPayment(payer).catch(error => {
        expect(error.message).toBe(errors.noCardsInfo)
        done()
      })
    })

    it('should throw operationCancelled error if dispose has been called', async done => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      payment.initPayment(payer).catch(error => {
        expect(error.message).toBe(errors.operationCancelled)
        done()
      })

      payment.dispose()
    })
  })

  describe('dispose', () => {
    it('should call dispose of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()

      await payment.dispose()
      expect(providerBeingUsedMock.dispose).toBeCalledTimes(1)
    })

    it('should call clear of cardsInfo', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      await payment.dispose()
      expect(cardsInfoMock.clear).toBeCalledTimes(1)
    })
  })

  describe('validatePaymentDetails', () => {
    it('should call validatePaymentForm of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      payment.validatePaymentDetails()
      expect(providerBeingUsedMock.validatePaymentForm).toBeCalledTimes(1)
    })

    it('should return true', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      const mocked = providerBeingUsedMock as jest.Mocked<typeof providerBeingUsedMock>
      mocked.validatePaymentForm.mockReturnValueOnce(true)
      expect(payment.validatePaymentDetails()).toBe(true)
    })

    it('should call getSelectedPaymentCard of cardsInfo', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      payment.validatePaymentDetails()

      expect(cardsInfoMock.getSelectedPaymentCard).toBeCalledTimes(1)
      expect(providerMock.validatePaymentForm).toBeCalledTimes(0)
    })

    it('should call validatePaymentForm of provider if getSelectedPaymentCard of cardsInfo returns empty array', async () => {
      cardsInfoMock.getSelectedPaymentCard.mockImplementationOnce(() => undefined as any)

      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      payment.validatePaymentDetails()

      expect(cardsInfoMock.getSelectedPaymentCard).toBeCalledTimes(1)
      expect(providerMock.validatePaymentForm).toBeCalledTimes(1)
    })
  })

  describe('verifyCardWithThreeDSecure', () => {
    it('should call tokenizeHostedFields of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      await payment.verifyCardWithThreeDSecure(10)
      expect(providerMock.tokenizeHostedFields).toBeCalledTimes(1)
    })

    it('should call verifyWithThreeDSecure of provider', async () => {
      const amount = 10
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      await payment.verifyCardWithThreeDSecure(amount)

      const providerBeingUsedMock = getPaymentProviderBeingUsed()

      expect(providerBeingUsedMock.verifyWithThreeDSecure).toBeCalledTimes(1)
      expect(providerBeingUsedMock.verifyWithThreeDSecure).toBeCalledWith(
        amount,
        tokenizeHostedFieldsResponse.nonce
      )
    })

    it('should return nonce', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      const mocked = providerBeingUsedMock as jest.Mocked<typeof providerBeingUsedMock>
      const nonce = 'testNonce'
      mocked.verifyWithThreeDSecure.mockReturnValueOnce(
        Promise.resolve({
          ...verifyCardWithThreeDSecureResponse,
          nonce,
        })
      )

      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({ ok: true, nonce })
    })

    it('should return nonce when liabilityShifted is true', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      const mocked = providerBeingUsedMock as jest.Mocked<typeof providerBeingUsedMock>
      const nonce = 'testNonce'
      mocked.verifyWithThreeDSecure.mockReturnValueOnce(
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
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      const mocked = providerBeingUsedMock as jest.Mocked<typeof providerBeingUsedMock>
      mocked.verifyWithThreeDSecure.mockReturnValueOnce(
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
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      const mocked = providerBeingUsedMock as jest.Mocked<typeof providerBeingUsedMock>
      const error = new Error('')
      mocked.verifyWithThreeDSecure.mockReturnValueOnce(Promise.reject(error))
      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({ ok: false, error })
    })

    it('should return error when tokenizeHostedFields emits error', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      const mocked = providerBeingUsedMock as jest.Mocked<typeof providerBeingUsedMock>
      const error = new Error('')
      mocked.tokenizeHostedFields.mockReturnValueOnce(Promise.reject(error))

      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({ ok: false, error })
    })
  })

  describe('getPaymentNonce', () => {
    it('should call tokenizeHostedFields of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      await payment.getPaymentNonce()

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      expect(providerBeingUsedMock.tokenizeHostedFields).toBeCalledTimes(1)
    })

    it('should return nonce', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const result = await payment.getPaymentNonce()

      expect(result).toEqual({ ok: true, nonce: tokenizeHostedFieldsResponse.nonce })
    })

    it('should return error', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      const mocked = providerBeingUsedMock as jest.Mocked<typeof providerBeingUsedMock>
      const error = new Error('test')
      mocked.tokenizeHostedFields.mockReturnValueOnce(Promise.reject(error))

      const result = await payment.getPaymentNonce()
      expect(result).toEqual({ ok: false, error })
    })

    it('should return nonce of selected card', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      const data = await payment.getPaymentNonce()
      expect(cardsInfoMock.getSelectedPaymentCard).toHaveBeenCalledTimes(1)
      expect(data).toEqual({ ok: true, nonce: cards[0].nonce })
    })

    it('should call tokenizeHostedFields of provider if getSelectedPaymentCard of cardsInfoMock returns undefined', async () => {
      cardsInfoMock.getSelectedPaymentCard.mockImplementationOnce(() => undefined as any)

      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      await payment.getPaymentNonce()
      expect(providerMock.tokenizeHostedFields).toBeCalledTimes(1)
    })

    it('should call tokenizeHostedFields of provider if getSelectedPaymentCard of cardsInfoMock returns card without nonce', async () => {
      cardsInfoMock.getSelectedPaymentCard.mockImplementationOnce(() => ({} as any))

      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      await payment.getPaymentNonce()

      expect(providerMock.tokenizeHostedFields).toBeCalledTimes(1)
    })
  })

  describe('savePaymentCard', () => {
    it('should call tokenizeHostedFields of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      await payment.savePaymentCard(payer)

      expect(providerMock.tokenizeHostedFields).toBeCalledTimes(1)
    })

    it('should call saveCard of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      await payment.savePaymentCard(payer)

      expect(providerMock.saveCard).toBeCalledTimes(1)
      expect(providerMock.saveCard).toBeCalledWith(tokenizeHostedFieldsResponse.nonce, payer)
    })

    it('should return status', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      const result = await payment.savePaymentCard(payer)

      expect(result).toEqual({ ok: true })
    })

    it('should return tokenizeHostedFields error', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      const mocked = providerBeingUsedMock as jest.Mocked<typeof providerBeingUsedMock>
      const error = new Error('test')
      mocked.tokenizeHostedFields.mockImplementationOnce(() => Promise.reject(error))

      const result = await payment.savePaymentCard(payer)

      expect(result).toEqual({ ok: false, error })
    })

    it('should return saveCard error', async () => {
      const response = getMockedErrorAddPaymentCardResponse()

      providerMock.saveCard.mockImplementationOnce(() => Promise.resolve(response))

      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      const result = await payment.savePaymentCard(payer)

      expect(result).toEqual({ ok: false, error: new Error(response.error.message) })
    })
  })

  describe('fetchPaymentProvider', () => {
    it('should call getPaymentProvider on Payment Service', async () => {
      const data = await fetchPaymentProvider(paymentServiceMock)
      expect(paymentServiceMock.getPaymentProvider).toBeCalledTimes(1)
      expect(data).toStrictEqual(getMockedPaymentProviderResponse().body)
    })
  })

  describe('getPaymentProvider', () => {
    it('should return payment provider depending on the response from payment service', async () => {
      const response = await fetchPaymentProvider(paymentServiceMock)
      const data = getPaymentProvider(providersMapMock, response)
      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      expect(data).toStrictEqual(providerBeingUsedMock)
    })

    it('should throw an error if unknown provider ID passed', async () => {
      const response = getMockedPaymentProviderResponse().body
      set(response, 'provider.id', '')
      expect(() => getPaymentProvider(providersMapMock, response)).toThrow(Error)
    })
  })
})
