import { TripService } from './TripService'
import { TripStatus } from './types'

describe('TripService', () => {
  const http = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const url = 'bookings'

  describe('trackTrip', () => {
    const id = 'id1234'

    it('should call get of http', () => {
      new TripService(http).trackTrip(id)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`${url}/follow/${id}`)
    })
  })

  describe('book', () => {
    const params = {
      quote_id: 'quote_ID',
      passengers: {
        passenger_details: [
          {
            first_name: 'first_name',
            last_name: 'last_name',
            email: 'email',
            phone_number: '12345',
          },
        ],
      },
      payment_nonce: 'payment_nonce',
    }

    it('should call post of http', () => {
      new TripService(http).book(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(`${url}/with-nonce`, params)
    })
  })

  describe('bookWithoutNonce', () => {
    const params = {
      quote_id: 'quote_ID',
      passengers: {
        passenger_details: [
          {
            first_name: 'first_name',
            last_name: 'last_name',
            email: 'email',
            phone_number: '12345',
          },
        ],
      },
    }

    it('should call post of http', () => {
      new TripService(http).bookWithoutNonce(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(`${url}`, params)
    })
  })

  describe('getBookingDetails', () => {
    const id = 'id'

    it('should call get of http', () => {
      new TripService(http).getBookingDetails(id)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`${url}/${id}`)
    })
  })

  describe('getTripStatus', () => {
    const id = 'id'

    it('should call get of http', () => {
      new TripService(http).getTripStatus(id)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`${url}/${id}/status`)
    })
  })

  describe('getTripPosition', () => {
    const id = 'id'

    it('should call get of http', () => {
      new TripService(http).getTripPosition(id)

      expect(http.get).toHaveBeenCalledTimes(1)
      expect(http.get).toHaveBeenCalledWith(`${url}/${id}/track`)
    })
  })

  describe('cancel', () => {
    const id = 'id'
    const params = {
      reason: 'reason',
      explanation: 'explanation',
    }

    it('should call post of http', () => {
      new TripService(http).cancel(id, params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(`${url}/${id}/cancel`, params)
    })
  })

  describe('cancelByFollowCode', () => {
    const code = 'id'
    const params = {
      reason: 'reason',
      explanation: 'explanation',
    }

    it('should call post of http', () => {
      new TripService(http).cancelByFollowCode(code, params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(`${url}/follow/${code}/cancel`, params)
    })
  })

  describe('search', () => {
    const params = {
      trip_states: ['REQUESTED', 'COMPLETED'] as TripStatus[],
    }

    it('should call post of http', () => {
      new TripService(http).search(params)

      expect(http.post).toHaveBeenCalledTimes(1)
      expect(http.post).toHaveBeenCalledWith(`${url}/search`, params)
    })
  })
})
