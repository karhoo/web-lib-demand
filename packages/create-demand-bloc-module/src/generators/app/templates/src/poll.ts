/**
 * Calls a given function and keeps calling it after the specified delay has passed.
 *
 * @param {() => any} fn The function to call.
 * @param {number} delay The delay (in milliseconds) to wait before calling the function again.
 * @param {() => boolean} shouldStopPolling A callback function indicating whether to stop polling.
 */
async function poll(fn: () => void, delay: number, shouldStopPolling: () => boolean = () => false) {
  if (typeof delay !== 'number') {
    throw new TypeError(`Expected “delay” to be of type number, but it was of type ${typeof delay}.`)
  }

  delay = Math.max(0, delay)

  do {
    await fn()

    if (shouldStopPolling()) {
      break
    }

    await new Promise(resolve => setTimeout(resolve, delay))
  } while (!shouldStopPolling())
}

export default poll
