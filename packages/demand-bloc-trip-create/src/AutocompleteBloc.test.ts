import camelcaseKeys from 'camelcase-keys'
import { fakeSchedulers } from 'rxjs-marbles/jest'
import { AutocompleteBloc } from './AutocompleteBloc'

const debounceTime = 400

const options = {
  minLengthToSearch: 1,
  autocompleteDebounceTime: debounceTime,
  maxLengthForFlightAndTrainNumber: 6,
  autocompleteLocationRadius: 10,
}

const locationsData = [
  {
    type: 'TEST_TYPE',
    place_id: 'easrewd5',
    display_address: 'Paddington',
  },
  {
    type: 'TEST_TYPE_2',
    place_id: 'sfadehhd6',
    display_address: 'Hogwarts',
  },
]

const addressDetailsData = {
  place_id: 'tests place id',
}

const sessionToken = 'sessionToken'

jest.mock('uuid', () => ({
  v4: () => sessionToken,
}))

describe('AutocompleteBloc', () => {
  const getAddressAutocompleteDataMock = jest.fn()
  const getAddressDetailsMock = jest.fn()
  const getReverseGeocodeMock = jest.fn()

  const locationServiceMock = {
    getAddressDetails: getAddressDetailsMock,
    getAddressAutocompleteData: getAddressAutocompleteDataMock,
    getReverseGeocode: getReverseGeocodeMock,
  }

  let bloc: AutocompleteBloc

  beforeEach(() => {
    getAddressAutocompleteDataMock.mockClear()

    locationServiceMock.getAddressAutocompleteData.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        body: {
          locations: locationsData,
        },
      })
    )

    locationServiceMock.getAddressDetails.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        body: addressDetailsData,
      })
    )

    bloc = new AutocompleteBloc(locationServiceMock, options)
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

  describe('results', () => {
    beforeEach(() => jest.useFakeTimers())

    it(
      'should emit empty data if length a query is too short',
      fakeSchedulers(advance => {
        const spy = jest.fn()
        bloc.results.subscribe(spy)

        bloc.onChange('ts')

        advance(debounceTime)

        expect(spy).toBeCalledTimes(0)
      })
    )

    it(
      'should not emit new value if query not changed',
      fakeSchedulers(advance => {
        const spy = jest.fn()
        bloc.results.subscribe(spy)

        bloc.onChange('search value')
        bloc.onChange('search value')

        advance(debounceTime)

        expect(getAddressAutocompleteDataMock).toBeCalledTimes(1)
      })
    )

    it(
      'should call getAddressAutocompleteData from locationService',
      fakeSchedulers(advance => {
        const spy = jest.fn()
        bloc.results.subscribe(spy)

        bloc.onChange('search value')

        advance(debounceTime)

        expect(getAddressAutocompleteDataMock).toBeCalledTimes(1)
        expect(getAddressAutocompleteDataMock).toBeCalledWith({
          query: 'search value',
          sessionToken: expect.anything(),
          radius: options.autocompleteLocationRadius,
        })
      })
    )
  })

  describe('onSelect', () => {
    it('should emit address details of selected item', async () => {
      const spy = jest.fn()
      bloc.selectedAddress.subscribe(spy)

      await bloc.onSelect(locationsData[0].place_id)

      expect(spy).toBeCalledWith(camelcaseKeys(addressDetailsData))
    })
  })

  describe('sessionToken', () => {
    it(
      'should call getAddressAutocompleteData and getAddressDetails with same session token',
      fakeSchedulers(advance => {
        const spy = jest.fn()
        bloc.results.subscribe(spy)

        bloc.onChange('search value')

        advance(debounceTime)

        expect(getAddressAutocompleteDataMock).toBeCalledWith(
          expect.objectContaining({
            sessionToken,
          })
        )

        bloc.onSelect(locationsData[0].place_id)

        expect(getAddressDetailsMock).toBeCalledWith(
          expect.objectContaining({
            sessionToken,
          })
        )
      })
    )
  })
})
