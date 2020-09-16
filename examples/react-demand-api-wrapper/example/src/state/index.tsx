import * as React from 'react'
import { mainReducer } from './reducer'
import { DataState, DataDispatchActions, StateProps } from './types'
import actions from './actions'

const initialState = {} as DataState

const DataContext = React.createContext<{
  state: DataState
  actions: DataDispatchActions
}>({ state: initialState, actions: {} as DataDispatchActions })

export const withData = (WrappedComponent: React.ComponentType<StateProps>) => {
  const DataContextProvider = (props: StateProps) => {
    const [state, dispatch] = React.useReducer(mainReducer, initialState)
    const dispatchedActions = actions(dispatch)

    return (
      <DataContext.Provider value={{ state, actions: dispatchedActions }}>
        <WrappedComponent {...props} />
      </DataContext.Provider>
    )
  }
  return DataContextProvider
}

export const useData = () => React.useContext(DataContext)
