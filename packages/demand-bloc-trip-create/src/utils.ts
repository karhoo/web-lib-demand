import { BehaviorSubject, Subject } from 'rxjs'
import { publishReplay, refCount } from 'rxjs/operators'

type DeepMapObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

export function snakeToCamel(key: string) {
  return key.replace(/_(\w)/g, (_, char) => char.toUpperCase())
}

export function deepMapKeys(obj: DeepMapObject, mapper: (key: string) => string) {
  return Object.keys(obj).reduce((acc: DeepMapObject, current: string) => {
    const value = obj[current]
    acc[mapper(current)] = value !== null && typeof value === 'object' ? deepMapKeys(value, mapper) : value
    return acc
  }, {})
}

export function camelcaseKeys(obj: DeepMapObject) {
  return deepMapKeys(obj, snakeToCamel)
}

export function createStream<T>(stream: BehaviorSubject<T> | Subject<T>) {
  return stream.pipe(publishReplay(1), refCount())
}
