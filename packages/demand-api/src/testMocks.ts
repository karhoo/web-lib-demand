import {
  getQuotesSearchMock,
  getQuotesV2SearchMock,
  getQuotesSearchByIdMock,
  getQuotesV2SearchByIdMock,
  getQuotesCheckAvailabilityMock,
  getQuotesV2CheckCoverageMock,
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
  getPaymentProviderMock,
  getAdyenOriginKeyMock,
  getAdyenPaymentMethodsMock,
  getCreateAdyenPaymentAuthMock,
  getAdyenPaymentDetailsMock,
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
  const mockLocationGetReverseGeocode = getLocationGetAddressDetailsMock()
  const mockPoiSearch = getPoiSearchMock()
  const mockQuotesCheckAvailability = getQuotesCheckAvailabilityMock()
  const mockQuoteSearch = getQuotesSearchMock()
  const mockQuoteV2Search = getQuotesV2SearchMock()
  const mockQuoteSearchById = getQuotesSearchByIdMock()
  const mockQuoteV2SearchById = getQuotesV2SearchByIdMock()
  const mockQuotesV2Coverage = getQuotesV2CheckCoverageMock()

  const mockAddPaymentCard = getAddPaymentCardMock()
  const mockPaymentCreateClientToken = getPaymentCreateClientTokenMock()
  const mockPaymentGetClientNonce = getPaymentGetClientNonceMock()
  const mockGetPaymentProvider = getPaymentProviderMock()
  const mockGetAdyenOriginKey = getAdyenOriginKeyMock()
  const mockGetAdyenPaymentMethods = getAdyenPaymentMethodsMock()
  const mockCreateAdyenPaymentAuth = getCreateAdyenPaymentAuthMock()
  const mockGetAdyenPaymentDetails = getAdyenPaymentDetailsMock()

  const mockFinalFare = getFinalFareMock()

  return {
    locationService: {
      getAddressDetails: mockLocationGetAddressDetails,
      getReverseGeocode: mockLocationGetReverseGeocode,
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
    quotesV2Service: {
      quotesSearch: mockQuoteV2Search,
      quotesSearchById: mockQuoteV2SearchById,
      checkCoverage: mockQuotesV2Coverage,
    },
    paymentService: {
      createClientToken: mockPaymentCreateClientToken,
      getClientNonce: mockPaymentGetClientNonce,
      addPaymentCard: mockAddPaymentCard,
      createBraintreeClientToken: mockPaymentCreateClientToken,
      getBraintreeClientNonce: mockPaymentGetClientNonce,
      addBraintreePaymentCard: mockAddPaymentCard,
      getPaymentProvider: mockGetPaymentProvider,
      getAdyenOriginKey: mockGetAdyenOriginKey,
      getAdyenPaymentMethods: mockGetAdyenPaymentMethods,
      createAdyenPaymentAuth: mockCreateAdyenPaymentAuth,
      getAdyenPaymentDetails: mockGetAdyenPaymentDetails,
    },
    fareService: {
      status: mockFinalFare,
    },
    mockClear: () => {
      ;[
        mockLocationGetAddressDetails,
        mockLocationGetAddressAutocompleteData,
        mockLocationGetReverseGeocode,
        mockPoiSearch,
        mockQuotesCheckAvailability,
        mockQuoteSearch,
        mockQuoteV2Search,
        mockQuoteSearchById,
        mockQuoteV2SearchById,
        mockQuotesV2Coverage,
        mockAddPaymentCard,
        mockPaymentGetClientNonce,
        mockPaymentCreateClientToken,
        mockFinalFare,
      ].forEach(m => m.mockClear())
    },
  }
}
