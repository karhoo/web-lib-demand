import { HttpResponse, QuotesByIdResponse, QuoteResponseStatuses } from '@karhoo/demand-api'
import {
  getMockedQuotesSerchByIdResponse,
  getMockedErrorQuotesSerchByIdResponse,
} from '@karhoo/demand-api/dist/mocks/testMocks'

import { poll, POLLING_INTERVALS } from './polling'

describe('polling', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('should poll quotes once', done => {
    const responses: HttpResponse<QuotesByIdResponse>[] = []
    const expectedResponses = [getMockedQuotesSerchByIdResponse()]

    const fn = jest.fn(() => Promise.resolve(expectedResponses[0]))

    const observer = poll(fn)

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

  it('should poll quotes once when response is not ok', done => {
    const responses: HttpResponse<QuotesByIdResponse>[] = []
    const expectedResponses = [getMockedErrorQuotesSerchByIdResponse()]

    const fn = jest.fn(() => Promise.resolve(expectedResponses[0]))

    const observer = poll(fn)

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

  it('should poll quotes twice', done => {
    const responses: HttpResponse<QuotesByIdResponse>[] = []
    const expectedResponses = [
      getMockedQuotesSerchByIdResponse({ status: QuoteResponseStatuses.PROGRESSING }),
      getMockedQuotesSerchByIdResponse(),
    ]

    const fn = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(expectedResponses[0]))
      .mockImplementationOnce(() => Promise.resolve(expectedResponses[1]))

    const observer = poll(fn)

    observer.subscribe({
      next: response => {
        responses.push(response)

        Promise.resolve().then(() => jest.runAllTimers())
      },
      complete: () => {
        expect(fn).toHaveBeenCalledTimes(2)
        expect(responses).toEqual(expectedResponses)

        done()
      },
    })
  })

  it('should emit error', done => {
    const error = new Error('error')

    const fn = jest.fn(() => Promise.reject(error))

    const observer = poll(fn)

    observer.subscribe({
      error: err => {
        expect(err).toEqual(error)

        done()
      },
    })
  })

  it('should schedule expected timers', done => {
    const progressingResponse = getMockedQuotesSerchByIdResponse({
      status: QuoteResponseStatuses.PROGRESSING,
    })
    const completedResponse = getMockedQuotesSerchByIdResponse()

    const fn = jest
      .fn(() => Promise.resolve(completedResponse))
      .mockImplementationOnce(() => Promise.resolve(progressingResponse))

    POLLING_INTERVALS.forEach(() => fn.mockImplementationOnce(() => Promise.resolve(progressingResponse)))

    const observer = poll(fn)

    observer.subscribe({
      next: () => {
        Promise.resolve().then(() => jest.runAllTimers())
      },
      complete: () => {
        expect(setTimeout).toHaveBeenCalledTimes(POLLING_INTERVALS.length + 1)

        POLLING_INTERVALS.forEach(time => expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), time))

        done()
      },
    })
  })
})
