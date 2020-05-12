const {
  getApi,
  HttpService,
  LocationService,
  PoiService,
  QuotesService,
  errorCodes,
} = require('@karhoo/demand-api')

module.exports.runExample = async function runExample() {
  const httpService = new HttpService(
    'https://public-api.sandbox.karhoo.com/api/v1'
  ).setDefaultRequestOptionsGetter(() => ({
    identifier: process.env.identifier || 'XXXXXXXX-XXX',
    referer: 'https://traveller.sandbox.karhoo.com/trip-details',
  }))

  const response = await httpService.get('location/address-autocomplete')

  console.log(response)
}
