export const defaultInvalidFieldClass = 'krhInvalid'

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

export const defaultThreeDSecureFields = {
  iframeContainerId: 'threeDSecureIframeContainer',
  loadingId: 'threeDSecureLoading',
  processingId: 'threeDSecureProcessing',
}

export const errors = {
  authorizationToken: 'Failed to get braintree authorization token',
  hostedFieldsNotInitialized: 'Hosted fields are not initialized',
  threeDSecureNotInitialized: 'ThreeDSecure is not initialized',
  unableToAddPaymentForm: 'Error - Unable to add payment form',
  noIframeContainerElement: 'addFrame: There is no iframe container element',
  noIframe: 'addFrame: iframe is undefined',
}
