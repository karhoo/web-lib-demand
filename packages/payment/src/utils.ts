import { errors } from './constants'

export type CancellablePromise<T> = {
  promise: Promise<T>
  cancel: () => void
}

export function getCancellablePromise<T>(promise: Promise<T>): CancellablePromise<T> {
  let cancel: ((error: Error) => void) | null = null

  const cancelPromise: Promise<void> = new Promise((_, reject) => {
    cancel = reject
  })

  return {
    promise: Promise.race([promise, cancelPromise]).then(data => data as T),
    cancel() {
      cancel?.(new Error(errors.operationCancelled))
    },
  }
}
