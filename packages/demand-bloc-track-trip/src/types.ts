import { Trip, Fare, SearchParams, OrderOptions } from '@karhoo/demand-api'
import { TripStatuses } from './statuses'

export interface Storage {
  setItem: (key: string, value: string) => void
  getItem: (key: string) => string | null
}

export type TripService = Pick<Trip, 'cancelByFollowCode' | 'trackTrip' | 'search' | 'cancel'>

export type FareService = Pick<Fare, 'status'>

export type TripsOffset = {
  upcomingTripsOffset: number
  pastTripsOffset: number
}

export type CustomOptions = {
  paginationRowCount: number
}

export type TripsSearchParams = {
  statuses?: TripStatuses[]
  paginationOffset?: number
  paginationRowCount?: number
  order_by?: OrderOptions[]
}

export type PaginationOptions = Pick<SearchParams, 'pagination_offset' | 'pagination_row_count' | 'order_by'>
