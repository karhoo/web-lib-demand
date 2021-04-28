import { makeSearchParams } from './utils'
import { TripStatuses } from './statuses'

describe('makeSearchParams', () => {
  it('should return search params for booking search', () => {
    const statuses = [TripStatuses.COMPLETED, TripStatuses.REQUESTED]
    const paginationOptions = {
      pagination_offset: 3,
      pagination_row_count: 5,
    }

    const result = makeSearchParams(statuses, paginationOptions)

    expect(result).toEqual({
      trip_states: statuses,
      pagination_offset: paginationOptions.pagination_offset,
      pagination_row_count: paginationOptions.pagination_row_count,
      order_by: ['date'],
    })
  })
})
