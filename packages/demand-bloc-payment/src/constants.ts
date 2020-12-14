export const creditCardType = 'CreditCard'

export const defaultPaymentOptions = {
  paymentCardsEnabled: false,
}

export const defaultAdyenOptions = {
  withThreeDSecure: true,
}

export const errors = {
  verifyCardError: 'Verify card response does not meet requirements',
  noCardsInfo: 'paymentCardsEnabled is true but no cardsInfo provided',
  operationCancelled: 'Operations has been cancelled',
}
