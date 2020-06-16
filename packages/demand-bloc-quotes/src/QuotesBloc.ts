import { Quotes, QuotesSearchParams, errorCodes, QuotesResponse, HttpResponse } from '@karhoo/demand-api'
import { Subject, Subscription, timer } from 'rxjs'
import { publishReplay, refCount, map } from 'rxjs/operators'
import { poll } from './polling'
import { transformer, QuoteItem } from './transformer'

type QuoteFilters = {
  numOfPassengers: number
  numOfLuggage: number
}

const NO_QUOTES_AVAILABLE = errorCodes.K3002
export const defaultValidity = 600

function createStream<T>(stream: Subject<T>) {
  return stream.pipe(publishReplay(1), refCount())
}

export type QuotesService = Pick<Quotes, 'quotesSearch' | 'quotesSearchById'>

export type QuotesState = {
  items: QuoteItem[]
  validity: number
}

export class QuotesBloc {
  private quotesService: QuotesService
  private _filters: QuoteFilters
  private _searchParams: QuotesSearchParams | null
  private _locale?: string

  private quotes$ = new Subject<QuotesState>()
  private quotesExpired$ = new Subject()
  private noQuotesFound$ = new Subject()
  private quotesLoadingError$ = new Subject()
  private loading$ = new Subject<boolean>()

  private pollingSubscription = new Subscription()
  private timerSubscription = new Subscription()

  constructor(quotesService: QuotesService) {
    this.quotesService = quotesService

    this._filters = {
      numOfLuggage: 0,
      numOfPassengers: 1,
    }

    this._searchParams = null
  }

  /**
   * Returns not-filtered quotes stream. Each iteration it is a quotes array
   */
  get quotes() {
    return createStream(this.quotes$)
  }

  /**
   * Returns matching quotes stream (by number of passengers and number of luggage filters)
   */
  get matchingQuotes() {
    return this.quotes.pipe(map(({ items }) => items.filter(this.isMatchingQuote)))
  }

  /**
   * Returns non-matching quotes stream (by number of passengers and number of luggage filters)
   */
  get otherAvailibleQuotes() {
    return this.quotes.pipe(map(({ items }) => items.filter(q => !this.isMatchingQuote(q))))
  }

  /**
   * Emits value once there are no quotes available for given search params
   */
  get noQuotesFound() {
    return createStream(this.noQuotesFound$)
  }

  /**
   * Emits true/false when all quotes started/finished to load
   */
  get loading() {
    return createStream(this.loading$)
  }

  /**
   * Emits a value once loaded quotes are expired
   */
  get quotesExpired() {
    return createStream(this.quotesExpired$)
  }

  /**
   * Emits a value with an error if loading of quotes failed
   */
  get quotesLoadingErrors() {
    return createStream(this.quotesLoadingError$)
  }

  /**
   * Gets filters value (number of passengers and number of luggage)
   */
  get filters() {
    return this._filters
  }

  /**
   * Sets filters value (number of passengers and number of luggage)
   */
  set filters(params: QuoteFilters) {
    this._filters = params
  }

  /**
   * Gets quote search params
   */
  get searchParams(): QuotesSearchParams | null {
    return this._searchParams
  }

  /**
   * Sets quote search params
   */
  set searchParams(params: QuotesSearchParams | null) {
    this._searchParams = params
  }

  private startLoading() {
    this.loading$.next(true)
  }

  private stopLoading() {
    this.loading$.next(false)
  }

  private isMatchingQuote = (quote: QuoteItem) =>
    quote.vehiclePassengerCapacity >= this._filters.numOfPassengers &&
    quote.vehicleLuggageCapacity >= this._filters.numOfLuggage

  /**
   * Schedules an `quotes expired` event
   * @param expiresAt {number} number of seconds after which `quotes expired` event is emitted
   */
  scheduleExpiredEvent(expiresAt = 0) {
    const ms = expiresAt * 1000

    const expired = timer(ms)

    this.timerSubscription = expired.subscribe(() => {
      this.quotesExpired$.next()
    })
  }

  /**
   * Stops requesting quotes
   */
  stopRequestingQuotes() {
    this.pollingSubscription.unsubscribe()
  }

  /**
   * Requests quotes with previous search params
   */
  refreshQuotes() {
    if (!this._searchParams) {
      throw new Error('searchParams is not defined, try setting it up first')
    }

    this.timerSubscription.unsubscribe()
    this.pollingSubscription.unsubscribe()
    this.requestQuotes(this._searchParams, this._locale)
  }

  /**
   * Requests quotes with given search params
   * @param params {QuotesSearchParams} search params for quotes
   * @param locale {string} user locale in xx-XX format e.g. en-GB or fr-FR
   */
  async requestQuotes(params: QuotesSearchParams, locale?: string) {
    this.searchParams = params
    this._locale = locale

    this.startLoading()

    this.timerSubscription.unsubscribe()
    this.pollingSubscription.unsubscribe()

    const handleQuotesLoaded = (res: HttpResponse<QuotesResponse>) => {
      if (res.ok) {
        const items = res.body?.quote_items || []

        this.quotes$.next({
          items: items.map(quote => transformer(quote)),
          validity: res.body.validity || defaultValidity,
        })
      }
    }

    try {
      const requestQuotesResponse = await this.quotesService.quotesSearch(params)
      if (requestQuotesResponse.ok) {
        const { body } = requestQuotesResponse

        handleQuotesLoaded(requestQuotesResponse)
        this.scheduleExpiredEvent(body.validity)

        const poller = poll(() => this.quotesService.quotesSearchById(body.id, locale))

        this.pollingSubscription = poller.subscribe({
          next: handleQuotesLoaded,
          complete: () => {
            this.stopLoading()
          },
        })

        return
      }

      this.stopLoading()

      if (requestQuotesResponse.error.code === NO_QUOTES_AVAILABLE) {
        this.noQuotesFound$.next()
      } else {
        this.quotesLoadingError$.next(requestQuotesResponse.error)
      }
    } catch (err) {
      this.stopLoading()
      this.quotesLoadingError$.next(err.error)
    }
  }

  dispose() {
    this.quotes$.complete()
    this.noQuotesFound$.complete()
    this.quotesLoadingError$.complete()
    this.loading$.complete()

    this.quotesExpired$.complete()

    this.stopRequestingQuotes()
  }
}
