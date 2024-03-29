import braintree from 'braintree-web'
import {
  getMockedErrorPaymentCreateClientTokenResponse,
  getMockedErrorPaymentGetClientNonceResponse,
  getAddPaymentCardMock,
  getPaymentCreateClientTokenMock,
  getPaymentGetClientNonceMock,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import { errors as baseErrors } from '../constants'

import {
  defaultHostedFieldsConfig,
  defaultHostedFieldsStyles,
  defaultInvalidFieldClass,
  errors,
} from './braintreeConstants'

import { BraintreeProvider, toogleClass } from './BraintreeProvider'

const amount = 10
const bin = 'test_bank_identification_number'
const email = 'test@email.com'
const options = {
  bin,
}

describe('BraintreeProvider', () => {
  const organisationId = 'organisationId'
  const currencyCode = 'currencyCode'
  const token = 'token'
  const cardType = 'cardType'
  const lastFour = 'lastFour'
  const nonce = 'nonce'

  const logger = {
    error: jest.fn(),
  }

  const paymentService = {
    createClientToken: getPaymentCreateClientTokenMock({ token }),
    getClientNonce: getPaymentGetClientNonceMock({
      card_type: cardType,
      last_four: lastFour,
      nonce,
    }),
    addPaymentCard: getAddPaymentCardMock(),
    createBraintreeClientToken: getPaymentCreateClientTokenMock({ token }),
    getBraintreeClientNonce: getPaymentGetClientNonceMock({
      card_type: cardType,
      last_four: lastFour,
      nonce,
    }),
    addBraintreePaymentCard: getAddPaymentCardMock(),
    getPaymentProvider: jest.fn(),
  }

  const client = {
    teardown: jest.fn(),
  }

  const threeDSecure = {
    teardown: jest.fn(),
    verifyCard: jest.fn(),
  }

  const hostedFields = {
    teardown: jest.fn(),
    tokenize: jest.fn(() => Promise.resolve({ nonce: 'test_nonce' })),
    on: jest.fn(),
    getState: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()

    jest.spyOn(braintree.client, 'create').mockImplementation(() => client)
    jest.spyOn(braintree.threeDSecure, 'create').mockImplementation(() => threeDSecure)
    jest.spyOn(braintree.hostedFields, 'create').mockImplementation(() => hostedFields)
  })

  describe('initialize', () => {
    let provider: BraintreeProvider

    beforeEach(() => {
      provider = new BraintreeProvider(paymentService, { organisationId, currencyCode })
    })

    it('should call createClientToken of paymentService', async () => {
      await provider.initialize()

      expect(paymentService.createBraintreeClientToken).toBeCalledTimes(1)
      expect(paymentService.createBraintreeClientToken).toBeCalledWith({
        organisation_id: organisationId,
        currency: currencyCode,
      })
    })

    it('should throw error if createClientToken of paymentService returns error', done => {
      paymentService.createBraintreeClientToken.mockReturnValueOnce(
        Promise.resolve(getMockedErrorPaymentCreateClientTokenResponse())
      )

      provider.initialize().catch(error => {
        expect(error.message).toBe(errors.authorizationToken)

        done()
      })
    })

    it('should call create of braintree.client', async () => {
      await provider.initialize()

      expect(braintree.client.create).toBeCalledTimes(1)
      expect(braintree.client.create).toBeCalledWith({
        authorization: token,
      })
    })

    it('should call create of braintree.threeDSecure', async () => {
      await provider.initialize()

      expect(braintree.threeDSecure.create).toBeCalledTimes(1)
      expect(braintree.threeDSecure.create).toBeCalledWith({
        client,
        version: 2,
      })
    })

    it('should not call create of braintree.threeDSecure if withThreeDSecure is false', async () => {
      await new BraintreeProvider(paymentService, {
        organisationId,
        currencyCode,
        withThreeDSecure: false,
      }).initialize()

      expect(braintree.threeDSecure.create).toBeCalledTimes(0)
    })

    it('should call create of braintree.hostedFields', async () => {
      await provider.initialize()

      expect(braintree.hostedFields.create).toBeCalledTimes(1)
      expect(braintree.hostedFields.create).toBeCalledWith({
        client,
        fields: defaultHostedFieldsConfig,
        styles: defaultHostedFieldsStyles,
      })
    })

    it('should call create of braintree.hostedFields with custom fields and styles', async () => {
      const fields = {
        ...defaultHostedFieldsConfig,
        number: {
          selector: '#customNumber',
          placeholder: 'placeholder',
        },
      }

      const styles = {
        ...defaultHostedFieldsStyles,
        input: {
          margin: '1500px',
        },
      }

      await new BraintreeProvider(paymentService, {
        organisationId,
        currencyCode,
        hostedFields: { hostedFieldsConfig: fields, hostedFieldsStyles: styles },
      }).initialize()

      expect(braintree.hostedFields.create).toBeCalledTimes(1)
      expect(braintree.hostedFields.create).toBeCalledWith({
        client,
        fields,
        styles,
      })
    })

    it('should call on method of hostedFields', async () => {
      await provider.initialize()

      expect(hostedFields.on).toBeCalledTimes(1)
      expect(hostedFields.on).toBeCalledWith('blur', expect.any(Function))
    })

    it('should select element with expected id', async () => {
      const classList = { remove: jest.fn() }
      const event = { emittedBy: 'number', fields: { number: { isValid: true } } }

      hostedFields.on.mockImplementationOnce((a, b) => b(event))

      jest.spyOn(document, 'querySelector').mockImplementationOnce(() => ({ classList } as any))

      await provider.initialize()

      expect(document.querySelector).toBeCalledTimes(1)
      expect(document.querySelector).toBeCalledWith(`#${event.emittedBy}`)
      expect(classList.remove).toBeCalledWith(defaultInvalidFieldClass)
    })

    it('should throw operationCancelled error if dispose has been called', done => {
      provider.initialize().catch(error => {
        expect(error.message).toBe(baseErrors.operationCancelled)

        done()
      })

      provider.dispose()
    })
  })

  describe('tokenizeHostedFields', () => {
    it('should call tokenize of hostedFields', async () => {
      const provider = new BraintreeProvider(paymentService, { organisationId, currencyCode })

      await provider.initialize()
      await provider.tokenizeHostedFields()

      expect(hostedFields.tokenize).toBeCalledTimes(1)
    })

    it('should be rejected with hostedFieldsNotInitialized error', done => {
      const provider = new BraintreeProvider(paymentService, { organisationId, currencyCode })

      provider.tokenizeHostedFields().catch(error => {
        expect(hostedFields.tokenize).toBeCalledTimes(0)
        expect(error.message).toBe(errors.hostedFieldsNotInitialized)

        done()
      })
    })
  })

  describe('dispose', () => {
    let provider: BraintreeProvider

    beforeEach(async () => {
      provider = new BraintreeProvider(paymentService, { organisationId, currencyCode, logger })

      await provider.initialize()
    })

    it('should call teardown of braintree client', async () => {
      await provider.dispose()

      expect(client.teardown).toBeCalledTimes(1)
    })

    it('should call teardown of braintree threeDSecure', async () => {
      await provider.dispose()

      expect(threeDSecure.teardown).toBeCalledTimes(1)
    })

    it('should call teardown of braintree hostedFields', async () => {
      await provider.dispose()

      expect(hostedFields.teardown).toBeCalledTimes(1)
    })

    it('should call error of the logger', async () => {
      const error = new Error('test')

      client.teardown.mockReturnValueOnce(Promise.reject(error))

      await provider.dispose()

      expect(logger.error).toBeCalledTimes(1)
      expect(logger.error).toBeCalledWith(error)
    })

    it('should not call error of the logger', async () => {
      await new BraintreeProvider(paymentService, { organisationId, currencyCode, logger }).dispose()

      expect(logger.error).toBeCalledTimes(0)
    })
  })

  describe('validatePaymentForm', () => {
    const fieldsMock = {
      number: { isValid: true },
      expirationDate: { isValid: true },
      cvv: { isValid: true },
    }

    let provider: BraintreeProvider

    beforeEach(async () => {
      provider = new BraintreeProvider(paymentService, { organisationId, currencyCode })

      await provider.initialize()
    })

    it('should return true', () => {
      hostedFields.getState.mockReturnValueOnce({ fields: fieldsMock })

      expect(provider.validatePaymentForm()).toBe(true)
    })

    it('should return false', () => {
      hostedFields.getState.mockReturnValueOnce({ fields: { ...fieldsMock, cvv: { isValid: false } } })

      expect(provider.validatePaymentForm()).toBe(false)
    })

    it('should call querySelector of the document', () => {
      jest.spyOn(document, 'querySelector').mockImplementation(() => null)

      hostedFields.getState.mockReturnValueOnce({ fields: fieldsMock })

      provider.validatePaymentForm()

      expect(document.querySelector).toBeCalledTimes(3)
      expect(document.querySelector).toBeCalledWith('#number')
      expect(document.querySelector).toBeCalledWith('#expirationDate')
      expect(document.querySelector).toBeCalledWith('#cvv')
    })

    it('should throw hostedFieldsNotInitialized error', done => {
      try {
        new BraintreeProvider(paymentService, { organisationId, currencyCode }).validatePaymentForm()
      } catch (error) {
        expect((error as Error).message).toBe(errors.hostedFieldsNotInitialized)

        done()
      }
    })
  })

  describe('saveCard', () => {
    let provider: BraintreeProvider

    beforeEach(async () => {
      provider = new BraintreeProvider(paymentService, { organisationId, currencyCode })

      await provider.initialize()
    })

    it('should call addPaymentCard of paymentService', async () => {
      await provider.saveCard(nonce)

      expect(paymentService.addBraintreePaymentCard).toBeCalledTimes(1)
      expect(paymentService.addBraintreePaymentCard).toBeCalledWith({
        organisation_id: organisationId,
        nonce,
      })
    })
  })

  describe('getSavedCards', () => {
    let provider: BraintreeProvider

    beforeEach(async () => {
      provider = new BraintreeProvider(paymentService, { organisationId, currencyCode })

      await provider.initialize()
    })

    it('should call getClientNonce of paymentService', async () => {
      await provider.getSavedCards()

      expect(paymentService.getBraintreeClientNonce).toBeCalledTimes(1)
      expect(paymentService.getBraintreeClientNonce).toBeCalledWith({
        organisation_id: organisationId,
      })
    })

    it('should return card info', async () => {
      const data = await provider.getSavedCards()

      expect(data).toEqual([
        {
          id: lastFour,
          type: cardType,
          nonce,
          lastFour,
        },
      ])
    })

    it('should return empty array', async () => {
      paymentService.getBraintreeClientNonce.mockReturnValueOnce(
        Promise.resolve(getMockedErrorPaymentGetClientNonceResponse())
      )

      const data = await provider.getSavedCards()

      expect(data).toEqual([])
    })
  })

  describe('getPaymentProviderProps', () => {
    let provider: BraintreeProvider

    beforeEach(async () => {
      provider = new BraintreeProvider(paymentService, { organisationId, currencyCode, logger })
    })

    it('should return correct props', () => {
      expect(provider.getPaymentProviderProps().class).toEqual('braintreePsp')
    })
  })

  describe('startThreeDSecureVerification', () => {
    let provider: BraintreeProvider

    const verifyCardMockResponse = {
      liabilityShifted: true,
      nonce: '',
      details: {},
      description: '',
      liabilityShiftPossible: true,
    }

    beforeEach(async () => {
      provider = new BraintreeProvider(paymentService, { organisationId, currencyCode, logger })

      threeDSecure.verifyCard.mockImplementationOnce(() => Promise.resolve(verifyCardMockResponse))

      await provider.initialize()
    })

    it('should call verifyCard of threeDSecure', async () => {
      await provider.startThreeDSecureVerification(amount, nonce, options, email)

      expect(threeDSecure.verifyCard).toBeCalledTimes(1)
      expect(threeDSecure.verifyCard).toBeCalledWith({
        amount,
        bin,
        email,
        nonce,
        challengeRequested: true,
        onLookupComplete: expect.any(Function),
      })
    })
  })

  describe('verifyCard', () => {
    let provider: BraintreeProvider

    beforeEach(async () => {
      provider = new BraintreeProvider(paymentService, { organisationId, currencyCode, logger })

      threeDSecure.verifyCard.mockImplementationOnce(a => a)

      await provider.initialize()
    })

    it('should return rejected threeDSecureNotInitialized error', done => {
      new BraintreeProvider(paymentService, { organisationId, currencyCode })
        .verifyCard(amount, nonce, bin, email)
        .catch(error => {
          expect(error.message).toBe(errors.threeDSecureNotInitialized)

          done()
        })
    })

    it('should return rejected threeDSecureOptionNotEnabled error', done => {
      new BraintreeProvider(paymentService, { organisationId, currencyCode, withThreeDSecure: false })
        .verifyCard(amount, nonce, bin, email)
        .catch(error => {
          expect(error.message).toBe(errors.threeDSecureOptionNotEnabled)

          done()
        })
    })
  })
})

describe('toggleClass', () => {
  const fieldName = 'fieldName'
  const className = 'test'

  it('should not emit error if there is no element', () => {
    jest.spyOn(document, 'querySelector').mockImplementationOnce(() => null)

    toogleClass(fieldName, true, className)

    expect(document.querySelector).toBeCalledTimes(1)
    expect(document.querySelector).toBeCalledWith(`#${fieldName}`)
  })

  it('should call remove of classList', () => {
    const classList = {
      remove: jest.fn(),
    }

    jest.spyOn(document, 'querySelector').mockImplementationOnce(
      () =>
        ({
          classList,
        } as any)
    )

    toogleClass(fieldName, true, className)

    expect(classList.remove).toBeCalledTimes(1)
    expect(classList.remove).toBeCalledWith(className)
  })

  it('should call add of classList', () => {
    const classList = {
      add: jest.fn(),
    }

    jest.spyOn(document, 'querySelector').mockImplementationOnce(
      () =>
        ({
          classList,
        } as any)
    )

    toogleClass(fieldName, false, className)

    expect(classList.add).toBeCalledTimes(1)
    expect(classList.add).toBeCalledWith(className)
  })
})
