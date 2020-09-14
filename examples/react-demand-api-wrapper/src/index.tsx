import * as React from 'react'
import { mainReducer } from './reducer'
import { APIState, APIDispatchActions, StateProps } from './types'
import actions from './actions'

const initialState = {} as APIState

const APIContext = React.createContext<{
  state: APIState
  actions: APIDispatchActions
}>({ state: initialState, actions: {} as APIDispatchActions })

export const withApi = (WrappedComponent: React.ComponentType<StateProps>) => {
  const TableContextProvider = ({ authorization, referer, endpoint }: StateProps) => {
    const [state, dispatch] = React.useReducer(mainReducer, initialState)
    const [loading, setLoading] = React.useState(true)
    const dispatchedActions = actions(dispatch)

    React.useEffect(() => {
      dispatchedActions.api.setInstance(authorization, referer, endpoint)
      setLoading(false)
    }, [authorization, referer])

    React.useEffect(() => {
      if (!state.api) return
      dispatchedActions.trip.setInstance(state.api.locationService)
    }, [loading])
    
    // create an isLoading=true in state and set to false
    if (!state.trip) {
      return null
    }
    
    return (
      <APIContext.Provider value={{ state, actions: dispatchedActions }}>
        <WrappedComponent authorization={authorization} referer={referer} endpoint={endpoint} />
      </APIContext.Provider>
    )
  }
  return TableContextProvider
}

export const useApi = () => React.useContext(APIContext)
