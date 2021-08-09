import {
  TripFollowResponse as OriginalTripFollowResponse,
  HttpResponse,
  FinalFareResponse,
  CancellationParams,
  BookATripResponse,
  SearchParams,
} from '@karhoo/demand-api'
import { Subject, Subscription } from 'rxjs'
import polling from './polling'

import { publishReplay, refCount } from 'rxjs/operators'
import { FinalTripStatuses, FinalFareStatuses, TripStatuses } from './statuses'
import { tripTransformer, TripFollowResponse } from './tripTransformer'
import { makeSearchParams } from './utils'
import { Storage, TripService, FareService, TripsOffset, TripsSearchParams, CustomOptions } from './types'

import { POLLING_INTERVAL_TRACK, POLLING_FINAL_FARE, DEFAULT_ROW_COUNT_PER_REQUEST } from './constants'

function createStream<T>(stream: Subject<T>) {
  return stream.pipe(publishReplay(1), refCount())
}
export class TripBloc {
  private tripService: TripService
  private fareService: FareService
  private storage: Storage
  private tripsOffset: TripsOffset
  private options: CustomOptions

  private trackSubscription = new Subscription()
  private fareSubscription = new Subscription()

  private trip$ = new Subject<TripFollowResponse>() // TODO change here to type from transformer
  private finalFare$ = new Subject<FinalFareResponse>()
  private pickUpTimeUpdates$ = new Subject()
  private error$ = new Subject()
  private upcomingTrips$ = new Subject<BookATripResponse[]>()
  private pastTrips$ = new Subject<BookATripResponse[]>()

  /**
   * constructor
   * @param tripService
   * @param fareService
   * @param storage to save pickup time details
   */
  constructor(
    tripService: TripService,
    fareService: FareService,
    storage: Storage = localStorage,
    options?: CustomOptions
  ) {
    this.tripService = tripService
    this.fareService = fareService

    this.storage = storage
    this.tripsOffset = {
      upcomingTripsOffset: 0,
      pastTripsOffset: 0,
    }

    this.options = options || {
      paginationRowCount: DEFAULT_ROW_COUNT_PER_REQUEST,
    }
  }

  /**
   * Trip data stream
   */
  get trip() {
    return createStream(this.trip$)
  }

  get error() {
    return createStream(this.error$)
  }

  /**
   * Final fare data stream
   */
  get finalFare() {
    return createStream(this.finalFare$)
  }

  /**
   * Booking upcoming trips history data stream.
   */
  get upcomingTrips() {
    return createStream(this.upcomingTrips$)
  }

  /**
   * Booking past trips history data stream.
   */
  get pastTrips() {
    return createStream(this.pastTrips$)
  }

  /**
   * Pick up time updates event.
   *
   * E.g. if train is delayed, driver will update pick up time and user will get notified via this event
   */
  get pickUpTimeUpdates() {
    return createStream(this.pickUpTimeUpdates$)
  }

  /**
   * Cancels all subscribtions
   */
  dispose() {
    this.trackSubscription.unsubscribe()
    this.fareSubscription.unsubscribe()

    this.trip$.complete()
    this.finalFare$.complete()
    this.pickUpTimeUpdates$.complete()
    this.upcomingTrips$.complete()
    this.pastTrips$.complete()
  }

  /**
   * Cancels a trip
   * @param code trip follow code
   * @param params CancellationParams
   */
  cancelByFollowCode(code: string, params: CancellationParams) {
    return this.tripService.cancelByFollowCode(code, params)
  }

  /**
   * Tracks final fare
   * @param id trip follow code
   */
  private trackFinalFare(id: string) {
    this.fareSubscription = polling<HttpResponse<FinalFareResponse>>(() => this.fareService.status(id), {
      interval: POLLING_FINAL_FARE,
    }).subscribe(response => {
      if (!response.ok) {
        return
      }

      this.finalFare$.next(response.body)

      if (
        response.body.state === FinalFareStatuses.FINAL ||
        response.body.state === FinalFareStatuses.CANCELLED
      ) {
        this.fareSubscription.unsubscribe()
      }
    })
  }

  /**
   * Tracks all updates of a trip by follow code
   * Handles requesting final fare if trip status is final
   * Handles pick up time updates
   *
   * @param id follow code
   */
  track(id: string) {
    const isFinalStatus = (response: HttpResponse<OriginalTripFollowResponse>) =>
      response.ok && FinalTripStatuses.includes(response.body.status)

    const poller = polling<HttpResponse<OriginalTripFollowResponse>>(() => this.tripService.trackTrip(id), {
      interval: POLLING_INTERVAL_TRACK,
    })

    this.trackSubscription = poller.subscribe(data => {
      if (!data.ok) {
        this.error$.next(true)
        this.trackSubscription.unsubscribe()
        return
      }

      const { body } = data

      this.trip$.next(tripTransformer(body))

      const pickUpKey = `${id}_pickUpTime`

      if (body.date_scheduled && !this.storage.getItem(pickUpKey)) {
        this.storage.setItem(pickUpKey, body.date_scheduled)
      }

      if (body.date_scheduled && this.storage.getItem(pickUpKey) !== body.date_scheduled) {
        this.storage.setItem(pickUpKey, body.date_scheduled)
        this.pickUpTimeUpdates$.next()
      }

      const isFinal = isFinalStatus(data)

      if (isFinalStatus(data) && body.trip_id) {
        this.trackFinalFare(body.trip_id)
      }

      if (isFinal) {
        this.trackSubscription.unsubscribe()
      }
    })
  }

  cancelPolling() {
    this.trackSubscription.unsubscribe()
    this.fareSubscription.unsubscribe()
  }

  /**
   * Requests trips list
   * @param statuses means trips with specified statuses
   * @param paginationOptions for handle pagination
   */
  private async searchTrips(
    statuses: TripStatuses[] = [],
    paginationOptions?: Pick<SearchParams, 'pagination_offset' | 'pagination_row_count'>
  ): Promise<BookATripResponse[]> {
    const params = makeSearchParams(statuses, paginationOptions)

    const response = await this.tripService.search(params)

    if (!response.ok) return []

    return response.body?.bookings || []
  }

  /**
   * Push retrieved trips to stream
   * @param stream means observable which pipe trips to subscribers
   * @param tripsPagination for retrieving next bunch of trips according to the config
   */
  async getTrips(
    stream: Subject<BookATripResponse[]>,
    statuses: TripStatuses[] = [],
    tripsPagination: keyof TripsOffset,
    paginationOffset: number,
    paginationRowCount: number
  ) {
    if (paginationOffset === 0) {
      this.tripsOffset[tripsPagination] = 0
    }

    const trips = await this.searchTrips(statuses, {
      pagination_offset: paginationOffset,
      pagination_row_count: paginationRowCount || this.options.paginationRowCount,
    })

    this.tripsOffset[tripsPagination] += trips?.length || 0
    stream.next(trips)
  }

  /**
   * Get upcoming trips list
   * @param statuses means trips with specified statuses
   * @param paginationOffset means start record in data base from which trips are been requiesting
   * @param paginationRowCount means how many trips get per one request
   */
  getUpcomingTrips(searchParams: TripsSearchParams = {}) {
    const {
      paginationOffset = 0,
      statuses = [
        TripStatuses.ARRIVED,
        TripStatuses.CONFIRMED,
        TripStatuses.DRIVER_EN_ROUTE,
        TripStatuses.POB,
        TripStatuses.REQUESTED,
      ],
      paginationRowCount = this.options.paginationRowCount,
    } = searchParams

    return this.getTrips(
      this.upcomingTrips$,
      statuses,
      'upcomingTripsOffset',
      paginationOffset,
      paginationRowCount
    )
  }

  /**
   * Handle pagination in trips request
   */
  getNextUpcomingTrips() {
    return this.getUpcomingTrips({ paginationOffset: this.tripsOffset.upcomingTripsOffset })
  }

  /**
   * The same method as getUpcomingTrips but for past trips list
   */
  async getPastTrips(searchParams: TripsSearchParams = {}) {
    const {
      paginationOffset = 0,
      statuses = [
        TripStatuses.COMPLETED,
        TripStatuses.BOOKER_CANCELLED,
        TripStatuses.DRIVER_CANCELLED,
        TripStatuses.NO_DRIVERS_AVAILABLE,
      ],
      paginationRowCount = this.options.paginationRowCount,
    } = searchParams

    return this.getTrips(this.pastTrips$, statuses, 'pastTripsOffset', paginationOffset, paginationRowCount)
  }

  /**
   * The same method as getNextUpcomingTrips but for past trips list
   */
  getNextPastTrips() {
    return this.getPastTrips({ paginationOffset: this.tripsOffset.pastTripsOffset })
  }

  /**
   * Cancels a trip by id
   * @param id trip id
   * @param params CancellationParams
   */
  async cancel(id: string, cancellationParams: CancellationParams): Promise<HttpResponse<object>> {
    const response = await this.tripService.cancel(id, cancellationParams)

    return response
  }

  /**
   * Cancels a trip by id and then fetches upcoming trips
   * @param id trip id
   * @param cancellationParams CancellationParams
   * @param searchParams TripsSearchParams
   */
  async cancelWithTripsFetching(
    id: string,
    cancellationParams: CancellationParams,
    searchParams?: TripsSearchParams
  ) {
    const response = await this.cancel(id, cancellationParams)
    if (response.status === 204) {
      return this.getUpcomingTrips(searchParams)
    }
  }
}
