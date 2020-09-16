import * as React from 'react'
import { mainReducer } from './reducer'
import { APIState, APIDispatchActions, StateProps } from './types'
import actions from './actions'

const initialState = {} as APIState

const APIContext = React.createContext<{
  api: APIState
  actions: APIDispatchActions
}>({ api: initialState, actions: {} as APIDispatchActions })

export const withApi = (WrappedComponent: React.ComponentType<StateProps>) => {
  const DemandApiContextProvider = ({ authorization, referer, endpoint }: StateProps) => {
    const [state, dispatch] = React.useReducer(mainReducer, initialState)
    const [loading, setLoading] = React.useState(true)
    const dispatchedActions = actions(dispatch)

    React.useEffect(() => {
      dispatchedActions.api.setInstance(authorization, referer, endpoint)
      setLoading(false)
    }, [authorization, referer, endpoint])

    React.useEffect(() => {
      if (!state.api || loading) return
      dispatchedActions.trip.setInstance(state.api.locationService)
      dispatchedActions.quotes.setInstance(state.api.quotesV2Service)
    }, [loading])
    
    // create an isLoading=true in state and set to false
    if (!state.trip) {
      return null
    }
    
    return (
      <APIContext.Provider value={{ api: state, actions: dispatchedActions }}>
        <WrappedComponent authorization={authorization} referer={referer} endpoint={endpoint} />
      </APIContext.Provider>
    )
  }
  return DemandApiContextProvider
}

export const useApi = () => React.useContext(APIContext)
