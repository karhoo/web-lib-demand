export const defaultInvalidFieldClass = 'krhInvalid'

export const default3DSecureStatus = true

export const defaultHostedFieldsConfig = {
  number: {
    selector: '#number',
    placeholder: '**** **** **** ****',
  },
  expirationDate: {
    selector: '#expirationDate',
    placeholder: 'MM/YY',
  },
  cvv: {
    selector: '#cvv',
    placeholder: '•••',
    type: 'password',
  },
}

export const defaultHostedFieldsStyles = {
  input: { 'font-size': '16px' },
}

export const errors = {
  authorizationToken: 'Failed to get braintree authorization token',
  hostedFieldsNotInitialized: 'Hosted fields are not initialized',
  threeDSecureOptionNotEnabled: 'withThreeDSecure options is not enabled',
  threeDSecureNotInitialized: 'ThreeDSecure is not initialized',
  unableToAddPaymentForm: 'Error - Unable to add payment form',
}
