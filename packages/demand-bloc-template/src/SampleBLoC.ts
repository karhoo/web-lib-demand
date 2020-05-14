import { Subject } from 'rxjs'
import { scan } from 'rxjs/operators'

export class SampleBLoC {
  private _subject = new Subject<number>()

  get counter() {
    return this._subject.pipe(scan((count, v) => count + v, 0))
  }

  increment() {
    this._subject.next(1)
  }

  decrement() {
    this._subject.next(-1)
  }

  dispose() {
    this._subject.complete()
  }
}
