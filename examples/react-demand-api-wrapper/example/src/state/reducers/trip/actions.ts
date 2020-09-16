import * as React from 'react'
import { Constants, State } from './types'

export default (dispatch: React.Dispatch<any>) => ({
  setInstance: (trip: State) => dispatch({ type: Constants.SET_INSTANCE, payload: { trip } }),
})
