import polling from 'rx-polling'
import { QuotesService, QutesSearchParams, QuoteItem } from '@karhoo/demand-api'
import { Subject, from } from 'rxjs'
import { scan, publishReplay, refCount } from 'rxjs/operators'

export class QuoteBloc {
  private quotesService: QuotesService

  private quotes$ = new Subject<QuoteItem[]>()

  constructor(quotesService: QuotesService) {
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

  async loadQuotes(params: QutesSearchParams) {
    const { body } = await this.quotesService.quotesSearch(params)

    if (!body) {
      return
    }

    this.quotes$.next(body.quote_items)

    const subscription = polling(from(this.quotesService.quotesSearchById(body.id)), {
      interval: 1000,
    }).subscribe(data => {
      this.quotes$.next(data.body.quote_items)

      if (data.body.status === 'COMPLETED') {
        subscription.unsubscribe()
      }
    })
  }
}
