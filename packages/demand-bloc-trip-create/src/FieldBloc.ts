import { BehaviorSubject } from 'rxjs'
import { TripCreateFieldItem } from './types'
import { createStream } from './createStream'

export class FieldBloc implements TripCreateFieldItem {
  private query$ = new BehaviorSubject<string>('')

  get query() {
    return createStream(this.query$)
  }

  onChange(value: string) {
    this.query$.next(value)
  }

  prefill = this.onChange

  dispose() {
    this.query$.complete()
  }
}
