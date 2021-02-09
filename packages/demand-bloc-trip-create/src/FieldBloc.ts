import { BehaviorSubject } from 'rxjs'
import { TripCreateFieldItem } from './types'
import { createStream } from './createStream'

export class FieldBloc implements TripCreateFieldItem {
  private query$ = new BehaviorSubject<string>('')
  private error$ = new BehaviorSubject<string>('')

  get query() {
    return createStream(this.query$)
  }

  get error() {
    return createStream(this.error$)
  }

  onError(error: string) {
    this.error$.next(error)
  }

  onChange(value: string) {
    this.query$.next(value)
  }

  prefill = this.onChange

  dispose() {
    this.query$.complete()
  }
}
