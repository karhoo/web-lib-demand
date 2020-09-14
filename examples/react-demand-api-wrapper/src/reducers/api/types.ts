import { Api } from '@karhoo/demand-api'
import { ActionMap } from '../../types'

// Add your types here

// and create a state
export interface State extends Api {}

// declare actions
export interface DispatchActions {
  setInstance: (
    authorization: string,
    referer: string,
    endpoint: string
  ) => void
}

// define constants
export enum Constants {
  SET_INSTANCE = 'TYPES_SET_INSTANCE'
}

// define payload
type Payload = {
  [Constants.SET_INSTANCE]: {
    authorization: string
    referer: string
    endpoint: string
  }
}

export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>]
