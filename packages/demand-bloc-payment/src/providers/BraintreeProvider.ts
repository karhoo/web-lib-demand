import braintree, { Client, ThreeDSecure, HostedFields } from 'braintree-web'
import { Payment } from '@karhoo/demand-api'

import { BraintreeProviderOptions, FullBraintreeProviderOptions, Provider, Payer } from '../types'
import {
  defaultHostedFieldsConfig,
  defaultHostedFieldsStyles,
  defaultThreeDSecureFields,
  defaultInvalidFieldClass,
  default3DSecureStatus,
  errors,
} from './braintreeConstants'

export const toogleClass = (fieldName: string, isValid: boolean, className: string) =>
  document.querySelector(`#${fieldName}`)?.classList[isValid ? 'remove' : 'add'](className)

export class BraintreeProvider implements Provider {
  private client?: Client

  private threeDSecure?: ThreeDSecure

  private hostedFields?: HostedFields

  private paymentService: Payment

  private options: FullBraintreeProviderOptions

  constructor(paymentService: Payment, options: BraintreeProviderOptions) {
    this.paymentService = paymentService
    this.options = {
      hostedFields: {
        hostedFieldsConfig: defaultHostedFieldsConfig,
        hostedFieldsStyles: defaultHostedFieldsStyles,
      },
      threeDSecureFields: defaultThreeDSecureFields,
      invalidFieldClass: defaultInvalidFieldClass,
      withThreeDSecure: default3DSecureStatus,
      ...options,
    }
  }

  private async getAuthorizationToken() {
    const { organisationId, currencyCode } = this.options

    const response = await this.paymentService.createClientToken({
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

    const authorization = await this.getAuthorizationToken()

    this.client = await braintree.client.create({
      authorization,
    })

    if (withThreeDSecure) {
      this.threeDSecure = await braintree.threeDSecure.create({
        client: this.client,
      })
    }

    this.hostedFields = await braintree.hostedFields.create({
      client: this.client,
      fields: hostedFieldsConfig,
      styles: hostedFieldsStyles,
    })

    this.hostedFields.on('blur', event => {
      const fieldName = event.emittedBy

      toogleClass(fieldName, event.fields[fieldName].isValid, this.options.invalidFieldClass)
    })
  }

  tokenizeHostedFields() {
    return this.hostedFields
      ? this.hostedFields.tokenize()
      : Promise.reject(new Error(errors.hostedFieldsNotInitialized))
  }

  private async teardownBraintreeInstance(instance?: Client | HostedFields | ThreeDSecure) {
    try {
      await instance?.teardown?.()
    } catch (error) {
      this.options.logger?.error(error)
    }
  }

  async dispose() {
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

    Object.keys(fields).forEach(fieldName => {
      const isValid = fields[fieldName].isValid

      toogleClass(fieldName, isValid, invalidFieldClass)
    })

    return Object.keys(fields).every(fieldName => fields[fieldName].isValid)
  }

  verifyWithThreeDSecure(amount: number, nonce: string) {
    const {
      threeDSecure,
      options: { withThreeDSecure, threeDSecureFields, logger },
    } = this

    if (!threeDSecure || !withThreeDSecure) {
      return Promise.reject(
        new Error(withThreeDSecure ? errors.threeDSecureNotInitialized : errors.threeDSecureOptionNotEnabled)
      )
    }

    const { iframeContainerId, loadingId, processingId } = threeDSecureFields

    return threeDSecure.verifyCard({
      amount,
      nonce,
      addFrame(err, iframe) {
        const iframeContainerElement = document.getElementById(iframeContainerId)

        if (err || !iframeContainerElement || !iframe) {
          const error =
            err || new Error(iframeContainerElement ? errors.noIframe : errors.noIframeContainerElement)

          logger?.error(error, { description: errors.unableToAddPaymentForm })

          return
        }

        const loadingElement = loadingId ? document.getElementById(loadingId) : null

        if (loadingElement) {
          loadingElement.style.display = 'none'
        }

        iframeContainerElement.appendChild(iframe)
        iframeContainerElement.style.display = 'block'
      },
      removeFrame() {
        const iframeContainerElement = document.getElementById(iframeContainerId)
        const processingElement = processingId ? document.getElementById(processingId) : null

        if (iframeContainerElement) {
          iframeContainerElement.firstChild &&
            iframeContainerElement.removeChild(iframeContainerElement.firstChild)

          iframeContainerElement.style.display = 'none'
        }

        if (processingElement) {
          processingElement.style.display = 'block'
        }
      },
    })
  }

  async saveCard(nonce: string, payer: Payer) {
    const response = await this.paymentService.addPaymentCard({
      organisation_id: this.options.organisationId,
      nonce,
      payer,
    })

    return response
  }

  async getSavedCards(payer: Payer) {
    const response = await this.paymentService.getClientNonce({
      organisation_id: this.options.organisationId,
      payer,
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
}
