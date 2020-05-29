import {
  Trip,
  TripFollowResponse as OriginalTripFollowResponse,
  HttpResponse,
  Fare,
  FinalFareResponse,
  CancellationParams,
} from '@karhoo/demand-api'
import { Subject, Subscription } from 'rxjs'
import { publishReplay, refCount } from 'rxjs/operators'
import { poll } from './polling'
import { FinalTripStatuses, FinalFareStatuses } from './statuses'
import { tripTransformer, TripFollowResponse } from './tripTransformer'

const POLLING_INTERVAL_TRACK = 5000
const POLLING_FINAL_FARE = 20000

function createStream<T>(stream: Subject<T>) {
  return stream.pipe(publishReplay(1), refCount())
}

export interface Storage {
  setItem: (key: string, value: string) => void
  getItem: (key: string) => string | null
}

export type TripService = Pick<Trip, 'cancelByFollowCode' | 'trackTrip'>
export type FareService = Pick<Fare, 'status'>

export class TripBloc {
  private tripService: TripService
  private fareService: FareService
  private storage: Storage

  private trackSubscription = new Subscription()
  private fareSubscription = new Subscription()

  private trip$ = new Subject<TripFollowResponse>() // TODO change here to type from transformer
  private finalFare$ = new Subject<FinalFareResponse>()
  private pickUpTimeUpdates$ = new Subject()

  /**
   * constructor
   * @param tripService
   * @param fareService
   * @param storage to save pickup time details
   */
  constructor(tripService: TripService, fareService: FareService, storage: Storage = localStorage) {
    this.tripService = tripService
    this.fareService = fareService

    this.storage = storage
  }

  /**
   * Trip data stream
   */
  get trip() {
    return createStream(this.trip$)
  }

  /**
   * Final fare data stream
   */
  get finalFare() {
    return createStream(this.finalFare$)
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
    this.fareSubscription = poll<HttpResponse<FinalFareResponse>>(
      () => this.fareService.status(id),
      d => d.ok && d.body.state === FinalFareStatuses.FINAL,
      [POLLING_FINAL_FARE]
    ).subscribe(response => {
      if (!response.ok) {
        return
      }

      this.finalFare$.next(response.body)
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

    const poller = poll<HttpResponse<OriginalTripFollowResponse>>(
      () => this.tripService.trackTrip(id),
      isFinalStatus,
      [POLLING_INTERVAL_TRACK]
    )

    this.trackSubscription = poller.subscribe(data => {
      if (!data.ok) {
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

      if (isFinalStatus(data) && body.trip_id) {
        this.trackFinalFare(body.trip_id)
      }
    })
  }
}
