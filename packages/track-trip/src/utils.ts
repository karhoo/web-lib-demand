import { SearchParams, OrderOptions } from '@karhoo/demand-api'
import { TripStatuses } from './statuses'
import { PaginationOptions } from './types'
import { DEFAULT_PAGINATION_OFFSET } from './constants'

export const makeSearchParams = (
  statuses: TripStatuses[],
  paginationOptions?: PaginationOptions,
  order?: OrderOptions[]
): Partial<SearchParams> => ({
  trip_states: statuses,
  pagination_offset: paginationOptions?.pagination_offset || DEFAULT_PAGINATION_OFFSET,
  pagination_row_count: paginationOptions?.pagination_row_count,
  order_by: order || ['date'],
})
