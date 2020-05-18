import { QuotesService, QutesSearchParams } from '@karhoo/demand-api'
import poll from './poll'
import { Subject } from 'rxjs'
import { scan, publishReplay, refCount } from 'rxjs/operators'

type QuoteItem = {
  quote_id: string
  fleet_id?: string
  fleet_description?: string
  availability_id?: string
  fleet_name: string
  phone_number?: string
  pick_up_type?: 'DEFAULT' | 'STAND_BY' | 'CURB_SIDE' | 'MEET_AND_GREET'
  supplier_logo_url?: string
  vehicle_class?: string
  quote_type: 'FIXED' | 'ESTIMATED' | 'METERED'
  high_price?: number
  low_price?: number
  currency_code?: string
  qta_high_minutes?: number
  qta_low_minutes?: number
  terms_conditions_url?: string
  category_name?: string
  vehicle_attributes?: object
  source?: 'FLEET' | 'MARKET'
  validity?: number
}

export class SampleBloc {
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

    this.quotes$.next(body.quote_items)

    let shouldStopPolling = false

    poll(
      () => {
        this.quotesService.quotesSearchById(body.id).then(data => {
          this.quotes$.next(data.body.quote_items)

          if (data.body.status === 'COMPLETED') {
            shouldStopPolling = true
          }
        })
      },
      1000,
      () => shouldStopPolling
    )
  }
}
