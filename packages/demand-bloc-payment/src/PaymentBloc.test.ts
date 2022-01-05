import {
  getAddPaymentCardMock,
  getApiMock,
  getMockedErrorAddPaymentCardResponse,
  getMockedPaymentProviderResponse,
  paymentProviderIdBeingUsed,
  loyaltyProgramBeingUsed,
  getMockedPaymentProviderWithoutLoyaltyResponse,
  getMockedPaymentProviderEmptyResponse,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import { errors } from './constants'

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

  const braintreeProvider = {
    initialize: jest.fn(),
    dispose: jest.fn(),
    clearPaymentNonce: jest.fn(),
    tokenizeHostedFields: jest.fn(() => Promise.resolve(['key1', tokenizeHostedFieldsResponse.nonce])),
    validatePaymentForm: jest.fn(() => true),
    startThreeDSecureVerification: jest.fn(() => Promise.resolve('')),
    completeThreeDSecureVerification: jest.fn(() => Promise.resolve('')),
    getSavedCards: jest.fn(() => Promise.resolve(cards)),
    saveCard: getAddPaymentCardMock(),
    getPaymentProviderProps: jest.fn(),
    getNonce: jest.fn(),
  }

  const adyenProvider = {
    initialize: jest.fn(),
    dispose: jest.fn(),
    clearPaymentNonce: jest.fn(),
    tokenizeHostedFields: jest.fn(() => Promise.resolve(['key1', tokenizeHostedFieldsResponse.nonce])),
    validatePaymentForm: jest.fn(() => true),
    startThreeDSecureVerification: jest.fn(() => Promise.resolve('')),
    completeThreeDSecureVerification: jest.fn(() => Promise.resolve('')),
    getSavedCards: jest.fn(() => Promise.resolve(cards)),
    getPaymentProviderProps: jest.fn(),
    saveCard: getAddPaymentCardMock(),
    getNonce: jest.fn(),
  }

  const providersMapMock: PaymentProvidersMap = {
    Braintree: braintreeProvider,
    Adyen: adyenProvider,
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
      expect(getPaymentProviderBeingUsed().initialize).toBeCalledTimes(1)
    })

    it('should initialize certain provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: false, preselectProvider: 'Adyen' },
      })

      await payment.initPayment()

      expect(adyenProvider.initialize).toBeCalledTimes(1)
    })

    it('should call getSavedCards of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      await payment.initPayment(payer)
      expect(getPaymentProviderBeingUsed().getSavedCards).toBeCalledTimes(1)
      expect(getPaymentProviderBeingUsed().getSavedCards).toBeCalledWith(payer)
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

    it('should throw error if paymentCardsEnabled is true and cardsInfo is not provided', async () => {
      expect.assertions(1)

      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
      })

      return payment.initPayment(payer).catch(error => {
        expect(error.message).toBe(errors.noCardsInfo)
      })
    })

    it('should throw operationCancelled error if dispose has been called', async () => {
      expect.assertions(1)

      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      const paymentInstance = payment.initPayment(payer)

      payment.dispose()

      return paymentInstance.catch(error => {
        expect(error.message).toBe(errors.operationCancelled)
      })
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
      expect(getPaymentProviderBeingUsed().validatePaymentForm).toBeCalledTimes(0)
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
      expect(getPaymentProviderBeingUsed().validatePaymentForm).toBeCalledTimes(1)
    })
  })

  describe('verifyCardWithThreeDSecure', () => {
    it('should call tokenizeHostedFields of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      await payment.verifyCardWithThreeDSecure(10)
      expect(getPaymentProviderBeingUsed().tokenizeHostedFields).toBeCalledTimes(1)
    })

    it('should call verifyWithThreeDSecure of provider', async () => {
      const amount = 10
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      await payment.verifyCardWithThreeDSecure(amount)

      const providerBeingUsedMock = getPaymentProviderBeingUsed()

      expect(providerBeingUsedMock.startThreeDSecureVerification).toBeCalledTimes(1)
      expect(providerBeingUsedMock.startThreeDSecureVerification).toBeCalledWith(
        amount,
        tokenizeHostedFieldsResponse.nonce
      )
    })

    it('should return tokenized nonce', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      const mocked = providerBeingUsedMock as jest.Mocked<typeof providerBeingUsedMock>
      const nonce = 'testNonce'
      mocked.startThreeDSecureVerification.mockReturnValueOnce(Promise.resolve(nonce))
      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({
        ok: true,
        nonce: nonce,
      })
    })

    it('should return empty nonce', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({
        ok: true,
        nonce: '',
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
      mocked.startThreeDSecureVerification.mockReturnValueOnce(Promise.reject(error))
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

    it('should completeThreeDSecureVerification if nonce is passed from search params', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const krhutuuid = 'krhutuuid-test'
      const MD = 'MD-test'
      const PaRes = 'PaRes-test'

      // @ts-ignore
      delete window.location

      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      const mocked = providerBeingUsedMock as jest.Mocked<typeof providerBeingUsedMock>
      mocked.getNonce.mockReturnValueOnce(krhutuuid)

      window.location = {
        search: `?MD=${MD}&PaRes=${PaRes}`,
      } as Location

      expect(await payment.verifyCardWithThreeDSecure(10)).toEqual({ ok: true, nonce: krhutuuid })
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
      expect(getPaymentProviderBeingUsed().tokenizeHostedFields).toBeCalledTimes(1)
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

      expect(getPaymentProviderBeingUsed().tokenizeHostedFields).toBeCalledTimes(1)
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

      expect(getPaymentProviderBeingUsed().tokenizeHostedFields).toBeCalledTimes(1)
    })

    it('should call saveCard of provider', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
        options: { paymentCardsEnabled: true },
        cardsInfo: cardsInfoMock,
      })

      await payment.savePaymentCard(payer)

      expect(getPaymentProviderBeingUsed().saveCard).toBeCalledTimes(1)
      expect(getPaymentProviderBeingUsed().saveCard).toBeCalledWith(tokenizeHostedFieldsResponse.nonce, payer)
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

      adyenProvider.saveCard.mockImplementationOnce(() => Promise.resolve(response))
      braintreeProvider.saveCard.mockImplementationOnce(() => Promise.resolve(response))

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

    it('should throw error when wrong provider', async () => {
      const mocked = paymentServiceMock as jest.Mocked<typeof paymentServiceMock>
      const response = getMockedPaymentProviderEmptyResponse()
      mocked.getPaymentProvider.mockImplementationOnce(() => Promise.resolve(response))

      await expect(
        PaymentBloc.create({ providers: providersMapMock, paymentService: mocked })
      ).rejects.toThrow(Error)
    })

    it('should return payment provider props', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      payment.getPaymentProviderProps()
      expect(getPaymentProviderBeingUsed().getPaymentProviderProps).toBeCalledTimes(1)
    })

    it('should return clientId of loyalty program from api', async () => {
      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: paymentServiceMock,
      })

      const clientId = payment.getLoyaltyClientId()
      expect(clientId).toEqual(loyaltyProgramBeingUsed.id)
    })

    it('should return empty clientId of loyalty program when not available', async () => {
      const mocked = paymentServiceMock as jest.Mocked<typeof paymentServiceMock>
      const response = getMockedPaymentProviderWithoutLoyaltyResponse()
      mocked.getPaymentProvider.mockImplementationOnce(() => Promise.resolve(response))

      const payment = await PaymentBloc.create({
        providers: providersMapMock,
        paymentService: mocked,
      })

      const clientId = payment.getLoyaltyClientId()
      expect(clientId).toEqual(undefined)
    })
  })

  describe('getPaymentProvider', () => {
    it('should return payment provider depending on the response from payment service', async () => {
      const data = getPaymentProvider(providersMapMock, paymentProviderIdBeingUsed)
      const providerBeingUsedMock = getPaymentProviderBeingUsed()
      expect(data).toStrictEqual(providerBeingUsedMock)
    })

    it('should throw an error if unknown provider ID passed', async () => {
      expect(() => getPaymentProvider(providersMapMock, '')).toThrow(Error)
    })
  })
})
