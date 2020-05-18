import { QuotesService, QutesSearchParams } from '@karhoo/demand-api'
import { Subject, Observable, interval, MonoTypeOperatorFunction, merge } from 'rxjs'
import { scan, publishReplay, refCount, take, filter, switchMap, map, mergeMap } from 'rxjs/operators'

// Action Names
enum types {
  GET_QUOTES_REQUESTED = 'QUOTES_BLOC.GET_QUOTES_BY_REQUESTED',
  GET_QUOTES_BY_ID_REQUESTED = 'QUOTES_BLOC.GET_QUOTES_BY_ID_REQUESTED',
  GET_QUOTES_BY_ID_SUCCEEDED = 'QUOTES_BLOC.GET_QUOTES_BY_ID_SUCCEEDED',
  GET_QUOTES_BY_ID_COMPLETED = 'QUOTES_BLOC.GET_QUOTES_BY_ID_COMPLETED',
}

interface QuotesState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quote_items: any // TODO: export QuoteItem from '@karhoo/demand-api'
  loading: boolean
}

const initialState: QuotesState = {
  quote_items: [],
  loading: false,
}

type idPayload = {
  id: string
}

type quoteItemsPayload = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  quote_items: any // TODO: export QuoteItem from '@karhoo/demand-api'
}

interface Action {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

function ofType<T extends Action>(type: string): MonoTypeOperatorFunction<T> {
  return filter(_ => type === _.type)
}

const stateReducer = (state: QuotesState, action: Action): QuotesState => {
  switch (action.type) {
    case types.GET_QUOTES_REQUESTED:
      return { ...state, loading: true }
    case types.GET_QUOTES_BY_ID_REQUESTED:
      return {
        ...state,
        quote_items: state.quote_items.concat(action.payload.quote_items),
      }
    case types.GET_QUOTES_BY_ID_SUCCEEDED:
      return {
        ...state,
        quote_items: state.quote_items.concat(action.payload.quote_items),
        loading: false,
      }
    default:
      return state
  }
}

export class QuotesBloc {
  private quotesService: QuotesService

  private actions$: Subject<Action> = new Subject<Action>()

  private requestQuotes$: Observable<Action> = this.actions$.pipe(
    ofType(types.GET_QUOTES_REQUESTED),
    switchMap(data => this.quotesService.quotesSearch(data.payload as QutesSearchParams)),
    map(data => data.body),
    map(data => ({
      type: types.GET_QUOTES_BY_ID_REQUESTED,
      payload: {
        id: data.id,
        quote_items: data.quote_items,
      },
    }))
  )

  private dispatcher$: Observable<Action> = merge(this.actions$, this.requestQuotes$)

  private pollQuotes$: Observable<Action> = this.dispatcher$.pipe(
    ofType(types.GET_QUOTES_BY_ID_REQUESTED),
    mergeMap(data =>
      interval(2000).pipe(
        switchMap(() => this.quotesService.quotesSearchById(data.payload.id)),
        map(data => data.body),
        filter(data => data.status === 'COMPLETED'),
        take(1),
        map(data => ({
          type: types.GET_QUOTES_BY_ID_SUCCEEDED,
          payload: {
            quote_items: data.quote_items,
          },
        }))
      )
    )
  )

  private state$: Observable<QuotesState> = merge(this.dispatcher$, this.pollQuotes$).pipe(
    scan(stateReducer, initialState),
    publishReplay(1),
    refCount()
  )

  constructor(quotesService: QuotesService) {
    this.quotesService = quotesService
  }

  get state() {
    return this.state$
  }

  private dispatch(action: Action) {
    this.actions$.next(action)
  }

  loadQuotes(params: QutesSearchParams) {
    this.dispatch({
      type: types.GET_QUOTES_REQUESTED,
      payload: params,
    })
  }
}
