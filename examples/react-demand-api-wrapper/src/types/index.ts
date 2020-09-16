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
  DispatchActions as ApiDispatchActions,
} from '../reducers/api/types'

import {
  State as TripState,
  Actions as TripActions,
  DispatchActions as TripDispatchActions,
} from '../reducers/trip/types'

import {
  State as QuotesState,
  Actions as QuotesActions,
  DispatchActions as QuotesDispatchActions,
} from '../reducers/quotes/types'

export interface APIState {
  api: ApiState
  trip: TripState
  quotes: QuotesState
}

export interface APIDispatchActions {
  api: ApiDispatchActions
  trip: TripDispatchActions
  quotes: QuotesDispatchActions
}

export interface APIContext {
  state: APIState
  actions: APIDispatchActions
}

export type APIActions = ApiActions | TripActions | QuotesActions

export interface StateProps {
  authorization: string
  referer: string
  endpoint: string
}
