import { HttpResponseOk, PaymentAuthResponse } from '@karhoo/demand-api'

export const refusalResultCodes = ['Refused', 'Error', 'Cancelled']

export const refusalReasons: Record<string, string> = {
  '2': 'Refused',
  '3': 'Referral',
  '4': 'Acquirer Error',
  '5': 'Blocked Card',
  '6': 'Expired Card',
  '7': 'Invalid Amount',
  '8': 'Invalid Card Number',
  '9': 'Issuer Unavailable',
  '10': 'Not supported',
  '11': '3D Not Authenticated',
  '12': 'Not enough balance',
  '14': 'Acquirer Fraud',
  '15': 'Cancelled',
  '16': 'Shopper Cancelled',
  '17': 'Invalid Pin',
  '18': 'Pin tries exceeded',
  '19': 'Pin validation not possible',
  '20': 'FRAUD',
  '21': 'Not Submitted',
  '22': 'FRAUD-CANCELLED',
  '23': 'Transaction Not Permitted',
  '24': 'CVC Declined',
  '25': 'Restricted Card',
  '26': 'Revocation Of Auth',
  '27': 'Declined Non Generic',
  '28': 'Withdrawal amount exceeded',
  '29': 'Withdrawal count exceeded',
  '31': 'Issuer Suspected Fraud',
  '32': 'AVS Declined',
  '33': 'Card requires online pin',
  '34': 'No checking account available on Card',
  '35': 'No savings account available on Card',
  '36': 'Mobile pin required',
  '37': 'Contactless fallback',
  '38': 'Authentication required',
  '39': 'RReq not received from DS',
}

export const handleRefusalResponse = (result: HttpResponseOk<PaymentAuthResponse>) => {
  if (result.ok && refusalResultCodes.includes(result.body.payload.resultCode as string)) {
    const refusalReasonCode = result.body.payload.refusalReasonCode as string
    const errorMessage = refusalReasons[refusalReasonCode]
    throw new Error(errorMessage)
  }
  return
}

export const errors = {
  noPaymentsMethods: 'No payment methods received',
  noClientKey: 'No client key received',
  failedPaymentCreate: 'Failed to create a payment',
  missingRequiredParamsFor3dSecure: 'Missing required params to complete 3d secure',
}
