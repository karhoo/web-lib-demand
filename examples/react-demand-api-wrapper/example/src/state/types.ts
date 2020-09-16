import {
  State as TripState,
  Actions as TripActions,
  DispatchActions as TripDispatchActions,
} from './reducers/trip/types'

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export interface DataState {
  trip: TripState
}

export interface DataDispatchActions {
  trip: TripDispatchActions
}

export interface DataContext {
  state: DataState
  actions: DataDispatchActions
}

export type DataActions = TripActions

export interface StateProps {}
