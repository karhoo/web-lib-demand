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

import {
  State as ApiState,
  Actions as ApiActions,
  DispatchActions as ApiDispatchActions
} from '../reducers/api/types'

import {
  State as TripState,
  Actions as TripActions,
  DispatchActions as TripDispatchActions
} from '../reducers/trip/types'

export interface APIState {
  api: ApiState
  trip: TripState
}

export interface APIDispatchActions {
  api: ApiDispatchActions
  trip: TripDispatchActions
}

export interface APIContext {
  state: APIState
  actions: APIDispatchActions
}

export type APIActions = ApiActions | TripActions

export interface StateProps {
  authorization: string
  referer: string
  endpoint: string
}
