import { reducer as apiReducer } from './reducers/api'
import { Actions as ApiActions } from './reducers/api/types'
import { reducer as tripReducer } from './reducers/trip'
import { Actions as TripActions } from './reducers/trip/types'
import { reducer as quotesReducer } from './reducers/quotes'
import { Actions as QuotesActions } from './reducers/quotes/types'
import { APIState, APIActions } from './types'

export const mainReducer = ({ api, trip, quotes }: APIState, action: APIActions) => ({
  api: apiReducer(api, action as ApiActions),
  trip: tripReducer(trip, action as TripActions),
  quotes: quotesReducer(quotes, action as QuotesActions),
})
