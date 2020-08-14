import { BehaviorSubject } from 'rxjs'
import { TripCreateField } from './types'
import { createStream } from './createStream'

export class FieldBloc implements TripCreateField {
  private query$ = new BehaviorSubject<string>('')

  get query() {
    return createStream(this.query$)
  }

  onChange(value: string) {
    this.query$.next(value)
  }

  dispose() {
    this.query$.complete()
  }
}