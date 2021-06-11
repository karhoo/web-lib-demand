import { handleRefusalResponse } from './adyenErrors'

describe('handleRefusalResponse', () => {
  it('should throw new error with refusalReason message', () => {
    const refusalFakePayload = {
      refusalReasonCode: '20',
      resultCode: 'Refused',
    }

    expect(() => {
      handleRefusalResponse(refusalFakePayload)
    }).toThrow('FRAUD')
  })

  it('should not throw new error with refusalReason message', () => {
    const refusalFakePayload = {
      resultCode: 'Authorised',
    }

    expect(() => {
      handleRefusalResponse(refusalFakePayload)
    }).not.toThrow('FRAUD')
  })
})
