import {
  Quotes,
  QuotesSearchParams,
  errorCodes,
  HttpResponseOk,
  QuotesResponse,
  HttpResponse,
} from '@karhoo/demand-api'
import { Subject, Subscription, timer } from 'rxjs'
import { scan, publishReplay, refCount, map } from 'rxjs/operators'
import { poll } from './polling'
import { transformer, QuoteItem } from './transformer'

type QuoteFilters = {
  numOfPassengers: number
  numOfLuggage: number
}

const NO_QUOTES_AVAILABLE = errorCodes.K3002

export const transformQuotesFromResponse = (response: HttpResponseOk<QuotesResponse>): QuoteItem[] => {
  if (response.body?.quote_items) {
    return response.body.quote_items.map(quote => transformer(quote))
  }

  return []
}

export class QuotesBloc {
  private quotesService: Quotes
  private _filters: QuoteFilters
  private _searchParams: QuotesSearchParams | null

  private quotes$ = new Subject<QuoteItem[]>()
  private quotesExpired$ = new Subject()
  private noQuotesFound$ = new Subject()
  private quotesLoadingError$ = new Subject()
  private loading$ = new Subject<boolean>()

  private pollingSubscription = new Subscription()
  private timerSubscription = new Subscription()

  constructor(quotesService: Quotes) {
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
    return this.quotes$.pipe(
      scan((allQuotes, newQuotes = []) => allQuotes.concat(newQuotes)),
      publishReplay(1),
      refCount()
    )
  }

  /**
   * Returns matching quotes stream (by number of passengers and number of luggage filters)
   */
  get matchingQuotes() {
    return this.quotes.pipe(map(quotes => quotes.filter(this.isMatchingQuote)))
  }

  /**
   * Returns non-matching quotes stream (by number of passengers and number of luggage filters)
   */
  get otherAvailibleQuotes() {
    return this.quotes.pipe(map(quotes => quotes.filter(q => !this.isMatchingQuote(q))))
  }

  /**
   * Emits value once there are no quotes available for given search params
   */
  get noQuotesFound() {
    return this.noQuotesFound$
  }

  /**
   * Emits true/false when all quotes started/finished to load
   */
  get loading() {
    return this.loading$
  }

  /**
   * Emits a value once loaded quotes are expired
   */
  get quotesExpired() {
    return this.quotesExpired$
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

  private scheduleExpiredEvent(validity = 0) {
    const ms = validity * 1000

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
    this.requestQuotes(this._searchParams)
  }

  /**
   * Requests quotes with given search params
   * @param params {QuotesSearchParams} search params for quotes
   */
  async requestQuotes(params: QuotesSearchParams) {
    this.searchParams = params

    this.startLoading()

    const handleQuotesLoaded = (res: HttpResponse<QuotesResponse>) => {
      if (res.ok) {
        this.quotes$.next(transformQuotesFromResponse(res))
      }
    }

    try {
      const requestQuotesResponse = await this.quotesService.quotesSearch(params)
      if (requestQuotesResponse.ok) {
        const { body } = requestQuotesResponse

        this.quotes$.next(transformQuotesFromResponse(requestQuotesResponse))
        this.scheduleExpiredEvent(body.validity)

        const poller = poll(() => this.quotesService.quotesSearchById(body.id))

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
