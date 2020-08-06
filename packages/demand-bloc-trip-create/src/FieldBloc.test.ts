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
})
