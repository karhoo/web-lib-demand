const { HttpService, LocationService, QuotesService } = require('@karhoo/demand-api')

const getHttpClient = identifier => {
  return new HttpService('https://public-api.sandbox.karhoo.com/v1').setDefaultRequestOptionsGetter(() => ({
    headers: {
      identifier,
      referer: 'https://traveller.sandbox.karhoo.com/trip-details',
    },
  }))
}

const testHttpClient = httpService => {
  return httpService.post('locations/address-autocomplete', { query: 'lond' })
}

const getAddressSuggestions = (httpService, address) => {
  const locationService = new LocationService(httpService)

  return locationService.getAddressAutocompleteData({
    query: address,
  })
}

const getPlaceDetails = (httpService, placeId) => {
  const locationService = new LocationService(httpService)

  return locationService.getAddressDetails({ placeId })
}

const checkAvailability = (httpService, placeId) => {
  const quotesService = new QuotesService(httpService)

  return quotesService.checkAvailability({
    origin_place_id: placeId,
  })
}

module.exports = {
  getHttpClient,
  testHttpClient,
  getAddressSuggestions,
  getPlaceDetails,
  checkAvailability,
}
