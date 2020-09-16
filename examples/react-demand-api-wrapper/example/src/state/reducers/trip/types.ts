import { AutocompleteDetails } from '@karhoo/demand-bloc-trip-create'
import { ActionMap } from '../../types'

// Add your types here

// and create a state
export interface State {
  origin: AutocompleteDetails
  destination: AutocompleteDetails
  date: string
  time: string
  passengers: string
  luggage: string
}

// declare actions
export interface DispatchActions {
  setInstance: (trip: State) => void
}

// define constants
export enum Constants {
  SET_INSTANCE = 'TRIP_SET_INSTANCE',
}

// define payload
type Payload = {
  [Constants.SET_INSTANCE]: { trip: State }
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>]
