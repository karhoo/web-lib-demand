import { Observable } from 'rxjs'

const POLLING_INTERVALS = [2000, 1000, 2000, 5000]

const getPollInterval = (index: number, intervals: number[]): number => {
  return intervals[index] || intervals[intervals.length - 1]
}

/**
 * Polls quotes with different time intervals (2sec, 1sec, 2 sec, 5 sec)
 * @param fn function to poll quotes by Id
 */
export function poll<T>(
  fn: () => Promise<T> | T,
  shouldStopPolling: (response: T) => boolean,
  intervals = POLLING_INTERVALS
): Observable<T> {
  let canceled = false
  let count = 0

  return new Observable(observer => {
    async function init() {
      do {
        try {
          const response = await fn()

          observer.next(response)
          count += 1

          if (shouldStopPolling(response)) {
            observer.complete()
            canceled = true
            break
          }

          await new Promise(
            // eslint-disable-next-line no-loop-func
            resolve => setTimeout(resolve, getPollInterval(count, intervals))
          )
        } catch (err) {
          observer.error(err)
        }
      } while (!canceled)
    }

    init()

    return () => (canceled = true)
  })
}
