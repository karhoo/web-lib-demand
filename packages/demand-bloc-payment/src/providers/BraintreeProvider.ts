import braintree, { Client, ThreeDSecure, HostedFields } from 'braintree-web'

import { Payment } from '@karhoo/demand-api'

import {
  BraintreeProviderOptions,
  FullBraintreeProviderOptions,
  Provider,
  ThreeDSecureOptions,
} from '../types'
import {
  defaultHostedFieldsConfig,
  defaultHostedFieldsStyles,
  defaultInvalidFieldClass,
  default3DSecureStatus,
  errors,
} from './braintreeConstants'
import { getCancellablePromise, CancellablePromise } from '../utils'
import { errors as paymentErrors } from '../constants'
import { ThreeDSecureVerifyOptions } from 'braintree-web/modules/three-d-secure'

type PendingInitialisation =
  | CancellablePromise<string>
  | CancellablePromise<Client>
  | CancellablePromise<ThreeDSecure>
  | CancellablePromise<HostedFields>

export const toogleClass = (fieldName: string, isValid: boolean, className: string) =>
  document.querySelector(`#${fieldName}`)?.classList[isValid ? 'remove' : 'add'](className)

export class BraintreeProvider implements Provider {
  private client?: Client

  private threeDSecure?: ThreeDSecure

  private hostedFields?: HostedFields

  private paymentService: Payment

  private options: FullBraintreeProviderOptions

  private pendingInitialisation?: PendingInitialisation

  private binValue?: string = undefined

  constructor(paymentService: Payment, options: BraintreeProviderOptions) {
    this.paymentService = paymentService
    this.options = {
      hostedFields: {
        hostedFieldsConfig: defaultHostedFieldsConfig,
        hostedFieldsStyles: defaultHostedFieldsStyles,
      },
      invalidFieldClass: defaultInvalidFieldClass,
      withThreeDSecure: default3DSecureStatus,
      ...options,
    }
  }

  private async getAuthorizationToken() {
    const { organisationId, currencyCode } = this.options

    const response = await this.paymentService.createBraintreeClientToken({
      organisation_id: organisationId,
      currency: currencyCode,
    })

    if (!response.ok || !response.body.token) {
      throw new Error(errors.authorizationToken)
    }

    return response.body.token
  }

  async initialize() {
    const {
      hostedFields: { hostedFieldsConfig, hostedFieldsStyles },
      withThreeDSecure,
    } = this.options

    this.binValue = undefined
    this.pendingInitialisation = getCancellablePromise(this.getAuthorizationToken())

    const authorization = await this.pendingInitialisation.promise

    this.pendingInitialisation = getCancellablePromise(
      braintree.client.create({
        authorization,
      })
    )
    this.client = await this.pendingInitialisation.promise

    if (withThreeDSecure) {
      this.pendingInitialisation = getCancellablePromise(
        braintree.threeDSecure.create({
          version: 2, // Will use 3DS2 whenever possible
          client: this.client,
        })
      )
      this.threeDSecure = await this.pendingInitialisation.promise
    }

    this.pendingInitialisation = getCancellablePromise(
      braintree.hostedFields.create({
        client: this.client,
        fields: hostedFieldsConfig,
        styles: hostedFieldsStyles,
      })
    )
    this.hostedFields = await this.pendingInitialisation.promise

    this.hostedFields.on('blur', event => {
      const fieldName = event.emittedBy

      if (fieldName === 'number' && this.hasCardBinAllowlist()) {
        const isValid = event.fields[fieldName].isValid && this.isCardBinAllowed(this.binValue)
        toogleClass(fieldName, isValid, this.options.invalidFieldClass)
      } else {
        toogleClass(fieldName, event.fields[fieldName].isValid, this.options.invalidFieldClass)
      }
    })

    if (this.hasCardBinAllowlist()) {
      this.hostedFields.on('binAvailable', event => {
        this.binValue = event.bin
      })
    }
  }

  async tokenizeHostedFields() {
    if (!this.hostedFields) {
      return Promise.reject(new Error(errors.hostedFieldsNotInitialized))
    }

    const { nonce, details = { bin: undefined } } = await this.hostedFields.tokenize()

    if (!this.isCardBinAllowed(details.bin)) {
      return Promise.reject(new Error(errors.unsupportedCardBin))
    }

    return {
      nonce,
      options: {
        bin: details.bin,
      },
    }
  }

  private hasCardBinAllowlist(): boolean {
    return Array.isArray(this.options.allowedBinValues) && this.options.allowedBinValues.length > 0
  }

  private isCardBinAllowed(bin: string | undefined): boolean {
    return this.hasCardBinAllowlist() ? !!bin && !!this.options.allowedBinValues?.includes(bin) : true
  }

  private async teardownBraintreeInstance(instance?: Client | HostedFields | ThreeDSecure) {
    try {
      await instance?.teardown?.()
    } catch (error) {
      this.options.logger?.error(error as Error)
    }
  }

  clearPaymentNonce() {
    return null
  }

  async dispose() {
    this.pendingInitialisation?.cancel()
    this.pendingInitialisation = undefined

    await Promise.all([
      this.teardownBraintreeInstance(this.hostedFields),
      this.teardownBraintreeInstance(this.threeDSecure),
      this.teardownBraintreeInstance(this.client),
    ])

    this.hostedFields = undefined
    this.threeDSecure = undefined
    this.client = undefined
  }

  validatePaymentForm() {
    const {
      hostedFields,
      options: { invalidFieldClass },
    } = this

    if (!hostedFields) {
      throw new Error(errors.hostedFieldsNotInitialized)
    }

    const { fields } = hostedFields.getState()

    let result = true

    Object.keys(fields).forEach(fieldName => {
      const isValid =
        fieldName === 'number' && this.hasCardBinAllowlist()
          ? fields[fieldName].isValid && this.isCardBinAllowed(this.binValue)
          : // @ts-ignore
            fields[fieldName].isValid

      if (!isValid) {
        result = false
      }

      toogleClass(fieldName, isValid, invalidFieldClass)
    })

    return result
  }

  verifyCard(amount: number, nonce: string, bin: string, email?: string) {
    const {
      threeDSecure,
      options: { withThreeDSecure },
    } = this

    if (!threeDSecure || !withThreeDSecure) {
      return Promise.reject(
        new Error(withThreeDSecure ? errors.threeDSecureNotInitialized : errors.threeDSecureOptionNotEnabled)
      )
    }

    // as ThreeDSecureVerifyOptions because onLookupComplete method is not present in ThreeDSecureVerifyOptions interface
    return threeDSecure.verifyCard({
      amount,
      nonce,
      bin,
      email,
      challengeRequested: true,
      onLookupComplete(data: object, next: () => void) {
        // use `data` here, then call `next()`
        next()
      },
    } as ThreeDSecureVerifyOptions)
  }

  async startThreeDSecureVerification(
    amount: number,
    nonce: string,
    options?: ThreeDSecureOptions,
    email?: string
  ): Promise<string | Error> {
    const bin = (options && options.bin) as string
    const verifyPromise = this.verifyCard(amount, nonce, bin, email)

    return new Promise((resolve, reject) => {
      verifyPromise.then(response => {
        if (response.liabilityShifted) {
          resolve(response.nonce)
        } else {
          reject(new Error(paymentErrors.verifyCardError))
        }
      })
    })
  }

  async saveCard(nonce: string) {
    const response = await this.paymentService.addBraintreePaymentCard({
      organisation_id: this.options.organisationId,
      nonce,
    })

    return response
  }

  async getSavedCards() {
    const response = await this.paymentService.getBraintreeClientNonce({
      organisation_id: this.options.organisationId,
    })

    // status 500 returned when no cards saved
    if (!response.ok) {
      return []
    }

    const { card_type, last_four, nonce } = response.body

    return [
      {
        id: last_four, // for now we don't have card id and we only support single card
        type: card_type,
        lastFour: last_four,
        nonce,
      },
    ]
  }

  getPaymentProviderProps() {
    return {
      class: 'braintreePsp',
    }
  }

  isGooglePay() {
    return false
  }

  forceGooglePayPopup() {
    return null
  }
}
