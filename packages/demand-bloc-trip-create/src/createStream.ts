import { BehaviorSubject, Subject } from 'rxjs'
import { publishReplay, refCount } from 'rxjs/operators'

export function createStream<T>(stream: BehaviorSubject<T> | Subject<T>) {
  return stream.pipe(publishReplay(1), refCount())
}
