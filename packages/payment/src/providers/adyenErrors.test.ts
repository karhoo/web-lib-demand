import { HttpResponseOk, PaymentAuthResponse } from '@karhoo/demand-api'
import { handleRefusalResponse } from './adyenErrors'

describe('handleRefusalResponse', () => {
  const refusalFakeResponse: HttpResponseOk<PaymentAuthResponse> = {
    ok: true,
    status: 200,
    body: {
      payload: {
        refusalReasonCode: '20',
        resultCode: 'Refused',
      },
      trip_id: 'trip_id',
    },
  }

  it('should throw new error with refusalReason message', () => {
    expect(() => {
      handleRefusalResponse(refusalFakeResponse)
    }).toThrow('FRAUD')
  })
})
