import { Observable } from 'rxjs'
import { HttpResponse, QuotesByIdResponse, QuoteResponseStatuses } from '@karhoo/demand-api'

export const POLLING_INTERVALS = [2000, 1000, 2000, 5000]

type QuotesAPIResponse = HttpResponse<QuotesByIdResponse>
type shouldStopPollingFunc = (data: QuotesAPIResponse) => boolean
type PollFunc = () => Promise<QuotesAPIResponse>

const getPollInterval = (index = 0, intervals = POLLING_INTERVALS): number => {
  return intervals[index] || intervals[intervals.length - 1]
}
/**
 * Polls quotes with different time intervals (2sec, 1sec, 2 sec, 5 sec)
 * @param fn function to poll quotes by Id
 */
export function poll(fn: PollFunc): Observable<QuotesAPIResponse> {
  let canceled = false
  let count = 0

  const shouldStopPolling: shouldStopPollingFunc = response =>
    response.ok ? response.body.status === QuoteResponseStatuses.COMPLETED : true

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
            resolve => setTimeout(resolve, getPollInterval(count))
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
