import { FieldBloc } from './FieldBloc'

describe('FieldBloc', () => {
  let bloc: FieldBloc

  beforeEach(() => {
    jest.clearAllMocks()

    bloc = new FieldBloc()
  })

  afterEach(() => {
    bloc.dispose()
  })

  describe('onChange', () => {
    it('should emit query value', () => {
      let actual = ''

      bloc.query.subscribe(data => {
        actual = data
      })

      const expected = 'new value'
      bloc.onChange(expected)

      expect(actual).toEqual(expected)
    })
  })

  describe('prefill', () => {
    it('should emit prefilled query value', () => {
      let actual = ''

      bloc.query.subscribe(data => {
        actual = data
      })

      const expected = 'new value'
      bloc.prefill(expected)

      expect(actual).toStrictEqual(expected)
    })

    it('should emit prefilled query value and changed value after it', () => {
      const actualSeq: string[] = []

      bloc.query.subscribe(data => {
        actualSeq.push(data)
      })

      const expected = 'new value'
      const changedData = 'onChange data'
      bloc.prefill(expected)
      bloc.onChange(changedData)

      expect(actualSeq).toStrictEqual(['', expected, changedData])
    })
  })
})
