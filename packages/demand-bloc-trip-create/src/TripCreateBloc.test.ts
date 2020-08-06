import { TripCreateBloc } from './TripCreateBloc'
import { TripCreateFieldTypes } from './types'
import { AutocompleteBloc } from './AutocompleteBloc'
import { FieldBloc } from './FieldBloc'

jest.mock('./AutocompleteBloc')
jest.mock('./FieldBloc')

describe('TripCreateBloC', () => {
  const locationServiceMock = {
    getAddressDetails: jest.fn(),
    getAddressAutocompleteData: jest.fn(),
  }

  let tripCreate: TripCreateBloc

  beforeEach(() => {
    jest.clearAllMocks()

    tripCreate = new TripCreateBloc(locationServiceMock)
  })

  afterEach(() => {
    tripCreate.dispose()
  })

  describe('createStream', () => {
    it('should create simple field', async () => {
      const instance = tripCreate.createStream('pickup')
      expect(instance).toBeInstanceOf(FieldBloc)
    })

    it('should create autocomple field', async () => {
      const instance = tripCreate.createStream('pickup', TripCreateFieldTypes.AUTOCOMPLETE)
      expect(instance).toBeInstanceOf(AutocompleteBloc)
    })
  })

  describe('getStream', () => {
    it('should get correct field stream', () => {
      const actual = tripCreate.createStream('pickup')
      expect(tripCreate.getStream('pickup')).toEqual(actual)
    })
  })

  describe('dispose', () => {
    it('should call dispose on all fields', () => {
      const autocompleteMock = jest.fn()
      const fieldMock = jest.fn()

      AutocompleteBloc.prototype.dispose = autocompleteMock
      FieldBloc.prototype.dispose = fieldMock

      tripCreate.createStream('pickup', TripCreateFieldTypes.AUTOCOMPLETE)
      tripCreate.createStream('dropOff')

      tripCreate.dispose()

      expect(autocompleteMock).toBeCalledTimes(1)
      expect(fieldMock).toBeCalledTimes(1)
    })
  })
})
