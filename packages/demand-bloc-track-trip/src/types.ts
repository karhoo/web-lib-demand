import { Trip, Fare, SearchParams } from '@karhoo/demand-api'

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
}

export type PaginationOptions = Pick<SearchParams, 'pagination_offset' | 'pagination_row_count'>
