import { State, Actions, Constants } from './types'
import { getApi } from '@karhoo/demand-api'

export const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case Constants.SET_INSTANCE:
      return getApi({
        url: action.payload.endpoint,
        defaultRequestOptionsGetter: () => ({
          headers: {
            identifier: action.payload.authorization,
            referer: action.payload.referer,
          }
        })
      })
    default:
      return state
  }
}
