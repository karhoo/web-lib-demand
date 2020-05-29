import { poll } from './polling'

describe('polling', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('should poll once', done => {
    const responses: any[] = []
    const expectedResponses = [{ ok: true, status: 200, body: {} }]

    const fn = jest.fn(() => Promise.resolve(expectedResponses[0]))
    const shouldStopPolling = jest.fn(() => true)

    const observer = poll(fn, shouldStopPolling)

    observer.subscribe({
      next: response => {
        responses.push(response)
      },
      complete: () => {
        expect(fn).toHaveBeenCalledTimes(1)
        expect(responses).toEqual(expectedResponses)

        done()
      },
    })
  })

  it('should poll three times', done => {
    const responses: any[] = []
    const expectedResponses = [
      { ok: true, status: 200, body: { test: 'one' } },
      { ok: true, status: 200, body: { test: 'two' } },
      { ok: true, status: 200, body: { test: 'three' } },
    ]

    const fn = jest
      .fn()
      .mockReturnValueOnce(Promise.resolve(expectedResponses[0]))
      .mockReturnValueOnce(Promise.resolve(expectedResponses[1]))
      .mockReturnValueOnce(Promise.resolve(expectedResponses[2]))

    const shouldStopPolling = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)

    const intervals = [2000]

    const observer = poll(fn, shouldStopPolling, intervals)

    observer.subscribe({
      next: response => {
        responses.push(response)

        Promise.resolve().then(() => jest.runAllTimers())
      },
      complete: () => {
        expect(fn).toHaveBeenCalledTimes(3)
        expect(setTimeout).toBeCalledTimes(2)
        expect(setTimeout).toBeCalledWith(expect.any(Function), intervals[0])
        expect(responses).toEqual(expectedResponses)

        done()
      },
    })
  })

  it('should emit error', done => {
    const error = new Error('error')

    const fn = jest.fn(() => Promise.reject(error))
    const shouldStopPolling = jest.fn(() => true)

    const observer = poll(fn, shouldStopPolling)

    observer.subscribe({
      error: err => {
        expect(err).toEqual(error)

        done()
      },
    })
  })
})
