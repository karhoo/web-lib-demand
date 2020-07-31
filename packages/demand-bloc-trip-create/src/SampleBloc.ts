import polling from 'rx-polling'
import {
  Quotes,
  QuotesSearchParams,
  QuoteItem,
  QuotesByIdResponse,
  ApiError,
  HttpResponse,
} from '@karhoo/demand-api'
import { Subject, from } from 'rxjs'
import { scan, publishReplay, refCount } from 'rxjs/operators'

export class TripCreate {
  private quotesService: Quotes

  private quotes$ = new Subject<QuoteItem[]>()

  constructor(quotesService: Quotes) {
    this.quotesService = quotesService
  }

  get quotes() {
    return this.quotes$.pipe(
      scan((allQuotes, newQuotes = []) => allQuotes.concat(newQuotes)),
      publishReplay(1),
      refCount()
    )
  }

  despose() {
    this.quotes$.complete()
  }

  async loadQuotes(params: QuotesSearchParams) {
    const data = await this.quotesService.quotesSearch(params)

    if (!data.ok) {
      return
    }

    this.quotes$.next(data.body.quote_items)

    const subscription = polling<HttpResponse<QuotesByIdResponse, ApiError>>(
      from(this.quotesService.quotesSearchById(data.body.id)),
      { interval: 1000 }
    ).subscribe(data => {
      if (!data.ok) {
        return
      }

      this.quotes$.next(data.body.quote_items)

      if (data.body.status === 'COMPLETED') {
        subscription.unsubscribe()
      }
    })
  }
}
