import * as React from 'react'
import { Constants } from './types'

export default (dispatch: React.Dispatch<any>) => ({
  setInstance: (authorization: string, referer: string, endpoint: string) =>
    dispatch({
      type: Constants.SET_INSTANCE,
      payload: { authorization, referer, endpoint }
    })
})
