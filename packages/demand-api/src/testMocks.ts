import {
  getQuotesSearchMock,
  getQuotesSearchByIdMock,
  getQuotesCheckAvailabilityMock,
} from './quotes/testMocks'
import { getPoiSearchMock } from './poi/testMocks'
import {
  getLocationGetAddressDetailsMock,
  getLocationGetAddressAutocompleteDataMock,
} from './location/testMocks'
import {
  getAddPaymentCardMock,
  getPaymentCreateClientTokenMock,
  getPaymentGetClientNonceMock,
} from './payment/testMocks'
import { getFinalFareMock } from './fare/testMocks'

export * from './payment/testMocks'
export * from './quotes/testMocks'
export * from './poi/testMocks'
export * from './location/testMocks'
export * from './trip/testMocks'
export * from './fare/testMocks'

export const mockHttpGet = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { get: true } }))
export const mockHttpPost = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { post: true } }))
export const mockHttpPut = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { put: true } }))
export const mockHttpRemove = jest.fn(() =>
  Promise.resolve({ ok: true, status: 200, body: { remove: true } })
)

export const getApiMock = () => {
  const mockLocationGetAddressDetails = getLocationGetAddressDetailsMock()
  const mockLocationGetAddressAutocompleteData = getLocationGetAddressAutocompleteDataMock()
  const mockPoiSearch = getPoiSearchMock()
  const mockQuotesCheckAvailability = getQuotesCheckAvailabilityMock()
  const mockQuoteSearch = getQuotesSearchMock()
  const mockQuoteSearchById = getQuotesSearchByIdMock()
  const mockAddPaymentCard = getAddPaymentCardMock()
  const mockPaymentCreateClientToken = getPaymentCreateClientTokenMock()
  const mockPaymentGetClientNonce = getPaymentGetClientNonceMock()
  const mockFinalFare = getFinalFareMock()

  return {
    locationService: {
      getAddressDetails: mockLocationGetAddressDetails,
      getAddressAutocompleteData: mockLocationGetAddressAutocompleteData,
    },
    poiService: {
      search: mockPoiSearch,
    },
    quotesService: {
      checkAvailability: mockQuotesCheckAvailability,
      quotesSearch: mockQuoteSearch,
      quotesSearchById: mockQuoteSearchById,
    },
    paymentService: {
      createClientToken: mockPaymentCreateClientToken,
      getClientNonce: mockPaymentGetClientNonce,
      addPaymentCard: mockAddPaymentCard,
    },
    fareService: {
      status: mockFinalFare,
    },
    mockClear: () => {
      ;[
        mockLocationGetAddressDetails,
        mockLocationGetAddressAutocompleteData,
        mockPoiSearch,
        mockQuotesCheckAvailability,
        mockQuoteSearch,
        mockQuoteSearchById,
        mockAddPaymentCard,
        mockPaymentGetClientNonce,
        mockPaymentCreateClientToken,
        mockFinalFare,
      ].forEach(m => m.mockClear())
    },
  }
}
