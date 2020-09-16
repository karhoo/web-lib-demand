import { reducer as tripReducer } from './reducers/trip'
import { Actions as TripActions } from './reducers/trip/types'
import { DataState, DataActions } from './types'

export const mainReducer = ({ trip }: DataState, action: DataActions) => ({
  trip: tripReducer(trip, action as TripActions)
})
