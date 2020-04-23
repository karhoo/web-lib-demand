[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](_karhoo_demand_api.md)

# Module: @karhoo/demand-api

<div align="center">
<a href="https://karhoo.com">
  <img
    alt="Karhoo logo"
    width="250px"
    src="https://cdn.karhoo.com/s/images/logos/karhoo_logo.png"
  />
</a>

<h1>Karhoo Demand API</h1>

This library provides the ability to contact Karhoo's public API and allows you to send and receive network calls and responses. The **Demand API** is designed to enable it's consumers to integrate faster because they do not need to create their own complete network stack.
<br />

[**Read The Docs**](https://developer.karhoo.com/reference#karhoo-api-explorer)
<hr />

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

> <img src="https://d3qhp42p4neron.cloudfront.net/5.5/png/unicode/512/26a0.png?Expires=1586881180&Signature=UfYXLEl9gffLbFSMDpBcfwrMZev7EexJ3Szsw461t7uBvn0D3M5DUZnbI36uVUDaoCnYo6y6NK-N8j7rWSfUPDwI0g-vsvaERzl3naB5a5G3OZRPI5854zGl66ezLjVWwhBX08d6m-MQAjrDd0AImTJsaGlxRH4vByD9-XnNbnLF28Ve41SnTQuaIKN2uscMLvXzP1LAu62GML5PLVOoBs5JeGMhPJnd0Ag2qjGXgppMq~jGqPHC~Fn7GKfeacP-PySJ2h7kNMXU1RK0VydODmHvLTguFilk3OkQcx31kNGxz6dYhfDRcKNbsQzMkEGw6LVoshhXeFu5X373WYjWDA__&Key-Pair-Id=APKAIRGCVGOY7DOKYTJA" width="15px" /> This package is work in progress and can not be used as an independent package.

## Installation

```sh
npm i @karhoo/demand-api
```

## Warnings

This library uses `Promise` and `fetch`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise` and [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) to polyfill `fetch`

## Usage

You can use each service separately, or you can use `getApi` method which returns all available services

```
import { getApi, HttpService, LocationService, PoiService, QuotesService, errorCodes } from '@karhoo/demand-api'

const url = 'https://public-api.karhoo.com' // please note that there should not be a slash at the end of the url

const correlationIdPrefix = 'prefix'

const requestOptionsGetter = () => ({
  headers: {
    'custom-header': 'Custom header'
  }
})

const middleware = <T>(response: HttpResponse<T>): HttpResponse<T> => {
  console.log(response.status)

  return response
}

```

Please note that by default `fetch` will be called with following config

```
{
  credentials: 'include',
  mode: 'cors',
}
```

You can override this default settings using `defaultRequestOptionsGetter`

getApi usage:

All config fields are optional, default value for `url` - `https://public-api.karhoo.com`, default value for `correlationIdPrefix` - `''`

```
const options = {
  url,
  defaultRequestOptionsGetter: requestOptionsGetter,
  responseMiddleware: middleware,
  correlationIdPrefix,
}

const api = getApi(options)

```

Http service usage:

```
const apiV1 = 'https://public-api.karhoo.com/api/v1' // please note that version should be specified

const httpService = new HttpService(url)
  .setCorrelationIdPrefix(correlationIdPrefix)
  .setDefaultRequestOptionsGetter(requestOptionsGetter)
  .setResponseMiddleware(middleware)

const response = await httpService.get('location/address-autocomplete')
```

Location service usage:

```
const locationService = new LocationService(httpService)
```

Poi service:

```
const poiService = new PoiService(httpService)
```

Quotes service:

```
const quotesService = new QuotesService(httpService)
```

Trip service:

```
const tripService = new TripService(httpService)
```

Fare service:

```
const fareService = new FareService(httpService)

Payment service:

```

const paymentService = new PaymentService(httpService)

````

## Issues

_Looking to contribute?_

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior with a label `API`

### 💡 Feature Requests

Please file an issue to suggest new features with a label `API`. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

### ❓ Questions

For questions related to using the library, please re-visit a documentation first. If there are no answer, please create an issue with a label `help needed` and `API`.

## Contributing

### License

[BSD-2-Clause](../LICENSE)```
````

## Index

### References

* [Api](_karhoo_demand_api.md#api)
* [ApiError](_karhoo_demand_api.md#apierror)
* [ApiOptions](_karhoo_demand_api.md#apioptions)
* [DefaultRequestOptions](_karhoo_demand_api.md#defaultrequestoptions)
* [DefaultRequestOptionsGetter](_karhoo_demand_api.md#defaultrequestoptionsgetter)
* [Http](_karhoo_demand_api.md#http)
* [HttpResponse](_karhoo_demand_api.md#httpresponse)
* [HttpResponseError](_karhoo_demand_api.md#httpresponseerror)
* [HttpResponseMiddleware](_karhoo_demand_api.md#httpresponsemiddleware)
* [HttpResponseOk](_karhoo_demand_api.md#httpresponseok)
* [HttpService](_karhoo_demand_api.md#httpservice)
* [LocationAddressAutocompleteParams](_karhoo_demand_api.md#locationaddressautocompleteparams)
* [LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)
* [LocationAddressAutocompleteResponseItem](_karhoo_demand_api.md#locationaddressautocompleteresponseitem)
* [LocationAddressDetailsParameters](_karhoo_demand_api.md#locationaddressdetailsparameters)
* [LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)
* [LocationService](_karhoo_demand_api.md#locationservice)
* [MethodRequestOptions](_karhoo_demand_api.md#methodrequestoptions)
* [PoiResponse](_karhoo_demand_api.md#poiresponse)
* [PoiSearchParams](_karhoo_demand_api.md#poisearchparams)
* [PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)
* [PoiService](_karhoo_demand_api.md#poiservice)
* [Query](_karhoo_demand_api.md#query)
* [Quote](_karhoo_demand_api.md#quote)
* [QuotesAvailabilityParams](_karhoo_demand_api.md#quotesavailabilityparams)
* [QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)
* [QuotesByIdResponse](_karhoo_demand_api.md#quotesbyidresponse)
* [QuotesResponse](_karhoo_demand_api.md#quotesresponse)
* [QuotesService](_karhoo_demand_api.md#quotesservice)
* [QutesSearchParams](_karhoo_demand_api.md#qutessearchparams)
* [RequestOptions](_karhoo_demand_api.md#requestoptions)
* [errorCodes](_karhoo_demand_api.md#errorcodes)
* [getApi](_karhoo_demand_api.md#getapi)

### Classes

* [FareService](../classes/_karhoo_demand_api.fareservice.md)
* [HttpService](../classes/_karhoo_demand_api.httpservice.md)
* [LocationService](../classes/_karhoo_demand_api.locationservice.md)
* [PaymentService](../classes/_karhoo_demand_api.paymentservice.md)
* [PoiService](../classes/_karhoo_demand_api.poiservice.md)
* [QuotesService](../classes/_karhoo_demand_api.quotesservice.md)
* [TripService](../classes/_karhoo_demand_api.tripservice.md)

### Interfaces

* [AddPaymentCardParams](../interfaces/_karhoo_demand_api.addpaymentcardparams.md)
* [BookATripResponse](../interfaces/_karhoo_demand_api.bookatripresponse.md)
* [Http](../interfaces/_karhoo_demand_api.http.md)
* [QuotesByIdResponse](../interfaces/_karhoo_demand_api.quotesbyidresponse.md)

### Type aliases

* [Address](_karhoo_demand_api.md#address)
* [Api](_karhoo_demand_api.md#api)
* [ApiError](_karhoo_demand_api.md#apierror)
* [ApiOptions](_karhoo_demand_api.md#apioptions)
* [BookATripParams](_karhoo_demand_api.md#bookatripparams)
* [BreakdownItem](_karhoo_demand_api.md#breakdownitem)
* [CancellationParams](_karhoo_demand_api.md#cancellationparams)
* [ClientNonceParams](_karhoo_demand_api.md#clientnonceparams)
* [ClientNonceResponse](_karhoo_demand_api.md#clientnonceresponse)
* [CommonDetailsType](_karhoo_demand_api.md#commondetailstype)
* [CommonPoiType](_karhoo_demand_api.md#commonpoitype)
* [CreateTokenParams](_karhoo_demand_api.md#createtokenparams)
* [CreateTokenResponse](_karhoo_demand_api.md#createtokenresponse)
* [DefaultRequestOptions](_karhoo_demand_api.md#defaultrequestoptions)
* [DefaultRequestOptionsGetter](_karhoo_demand_api.md#defaultrequestoptionsgetter)
* [FinalFareResponse](_karhoo_demand_api.md#finalfareresponse)
* [HttpResponse](_karhoo_demand_api.md#httpresponse)
* [HttpResponseError](_karhoo_demand_api.md#httpresponseerror)
* [HttpResponseMiddleware](_karhoo_demand_api.md#httpresponsemiddleware)
* [HttpResponseOk](_karhoo_demand_api.md#httpresponseok)
* [HttpResponsePayload](_karhoo_demand_api.md#httpresponsepayload)
* [LatLng](_karhoo_demand_api.md#latlng)
* [LocationAddressAutocompleteParams](_karhoo_demand_api.md#locationaddressautocompleteparams)
* [LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)
* [LocationAddressAutocompleteResponseItem](_karhoo_demand_api.md#locationaddressautocompleteresponseitem)
* [LocationAddressDetailsParameters](_karhoo_demand_api.md#locationaddressdetailsparameters)
* [LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)
* [LocationDetailsType](_karhoo_demand_api.md#locationdetailstype)
* [LocationPoiType](_karhoo_demand_api.md#locationpoitype)
* [MeetingPointType](_karhoo_demand_api.md#meetingpointtype)
* [MethodRequestOptions](_karhoo_demand_api.md#methodrequestoptions)
* [POIDetailsType](_karhoo_demand_api.md#poidetailstype)
* [POIType](_karhoo_demand_api.md#poitype)
* [PassengerDetails](_karhoo_demand_api.md#passengerdetails)
* [Passengers](_karhoo_demand_api.md#passengers)
* [PoiResponse](_karhoo_demand_api.md#poiresponse)
* [PoiSearchParams](_karhoo_demand_api.md#poisearchparams)
* [PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)
* [Query](_karhoo_demand_api.md#query)
* [Quote](_karhoo_demand_api.md#quote)
* [QuoteItem](_karhoo_demand_api.md#quoteitem)
* [QuotesAvailabilityParams](_karhoo_demand_api.md#quotesavailabilityparams)
* [QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)
* [QuotesResponse](_karhoo_demand_api.md#quotesresponse)
* [QutesSearchParams](_karhoo_demand_api.md#qutessearchparams)
* [RequestOptions](_karhoo_demand_api.md#requestoptions)
* [SearchParams](_karhoo_demand_api.md#searchparams)
* [SearchResponse](_karhoo_demand_api.md#searchresponse)
* [TripFollowResponse](_karhoo_demand_api.md#tripfollowresponse)
* [TripStatus](_karhoo_demand_api.md#tripstatus)
* [VehicleAttributes](_karhoo_demand_api.md#vehicleattributes)

### Variables

* [apiV1](_karhoo_demand_api.md#const-apiv1)
* [apiV2](_karhoo_demand_api.md#const-apiv2)
* [defaultUrl](_karhoo_demand_api.md#const-defaulturl)
* [mockHttpGet](_karhoo_demand_api.md#const-mockhttpget)
* [mockHttpPost](_karhoo_demand_api.md#const-mockhttppost)
* [mockHttpPut](_karhoo_demand_api.md#const-mockhttpput)
* [mockHttpRemove](_karhoo_demand_api.md#const-mockhttpremove)

### Functions

* [getApi](_karhoo_demand_api.md#getapi)
* [getApiMock](_karhoo_demand_api.md#const-getapimock)
* [getLocationGetAddressAutocompleteDataMock](_karhoo_demand_api.md#const-getlocationgetaddressautocompletedatamock)
* [getLocationGetAddressDetailsMock](_karhoo_demand_api.md#const-getlocationgetaddressdetailsmock)
* [getMockedErrorLocationAddressAutocompleteResponse](_karhoo_demand_api.md#const-getmockederrorlocationaddressautocompleteresponse)
* [getMockedErrorLocationAddressDetailsResponse](_karhoo_demand_api.md#const-getmockederrorlocationaddressdetailsresponse)
* [getMockedErrorPoiSearchResponse](_karhoo_demand_api.md#const-getmockederrorpoisearchresponse)
* [getMockedErrorQuotesAvailabilityResponse](_karhoo_demand_api.md#const-getmockederrorquotesavailabilityresponse)
* [getMockedLocationAddressAutocompleteResponse](_karhoo_demand_api.md#const-getmockedlocationaddressautocompleteresponse)
* [getMockedLocationAddressDetailsResponse](_karhoo_demand_api.md#const-getmockedlocationaddressdetailsresponse)
* [getMockedPoiSearchResponse](_karhoo_demand_api.md#const-getmockedpoisearchresponse)
* [getMockedQuotesAvailabilityResponse](_karhoo_demand_api.md#const-getmockedquotesavailabilityresponse)
* [getPoiSearchMock](_karhoo_demand_api.md#const-getpoisearchmock)
* [getQuotesCheckAvailabilityMock](_karhoo_demand_api.md#const-getquotescheckavailabilitymock)
* [isOffline](_karhoo_demand_api.md#const-isoffline)
* [request](_karhoo_demand_api.md#request)
* [toJsonBody](_karhoo_demand_api.md#tojsonbody)
* [toSnakeCase](_karhoo_demand_api.md#const-tosnakecase)

### Object literals

* [errorCodes](_karhoo_demand_api.md#const-errorcodes)

## References

###  Api

• **Api**:

___

###  ApiError

• **ApiError**:

___

###  ApiOptions

• **ApiOptions**:

___

###  DefaultRequestOptions

• **DefaultRequestOptions**:

___

###  DefaultRequestOptionsGetter

• **DefaultRequestOptionsGetter**:

___

###  Http

• **Http**:

___

###  HttpResponse

• **HttpResponse**:

___

###  HttpResponseError

• **HttpResponseError**:

___

###  HttpResponseMiddleware

• **HttpResponseMiddleware**:

___

###  HttpResponseOk

• **HttpResponseOk**:

___

###  HttpService

• **HttpService**:

___

###  LocationAddressAutocompleteParams

• **LocationAddressAutocompleteParams**:

___

###  LocationAddressAutocompleteResponse

• **LocationAddressAutocompleteResponse**:

___

###  LocationAddressAutocompleteResponseItem

• **LocationAddressAutocompleteResponseItem**:

___

###  LocationAddressDetailsParameters

• **LocationAddressDetailsParameters**:

___

###  LocationAddressDetailsResponse

• **LocationAddressDetailsResponse**:

___

###  LocationService

• **LocationService**:

___

###  MethodRequestOptions

• **MethodRequestOptions**:

___

###  PoiResponse

• **PoiResponse**:

___

###  PoiSearchParams

• **PoiSearchParams**:

___

###  PoiSearchResponse

• **PoiSearchResponse**:

___

###  PoiService

• **PoiService**:

___

###  Query

• **Query**:

___

###  Quote

• **Quote**:

___

###  QuotesAvailabilityParams

• **QuotesAvailabilityParams**:

___

###  QuotesAvailabilityResponse

• **QuotesAvailabilityResponse**:

___

###  QuotesByIdResponse

• **QuotesByIdResponse**:

___

###  QuotesResponse

• **QuotesResponse**:

___

###  QuotesService

• **QuotesService**:

___

###  QutesSearchParams

• **QutesSearchParams**:

___

###  RequestOptions

• **RequestOptions**:

___

###  errorCodes

• **errorCodes**:

___

###  getApi

• **getApi**:

## Type aliases

###  Address

Ƭ **Address**: *object*

*Defined in [demand-api/src/trip/types.ts:21](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/types.ts#L21)*

#### Type declaration:

* **display_address**: *string*

* **place_id**: *string*

* **poi_type**? : *"NOT_SET_POI_TYPE" | [CommonPoiType](_karhoo_demand_api.md#commonpoitype)*

* **position**? : *[LatLng](_karhoo_demand_api.md#latlng)*

* **timezone**? : *undefined | string*

___

###  Api

Ƭ **Api**: *object*

*Defined in [demand-api/src/api/types.ts:16](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/api/types.ts#L16)*

#### Type declaration:

* **fareService**: *[FareService](../classes/_karhoo_demand_api.fareservice.md)*

* **locationService**: *[LocationService](../classes/_karhoo_demand_api.locationservice.md)*

* **paymentService**: *[PaymentService](../classes/_karhoo_demand_api.paymentservice.md)*

* **poiService**: *[PoiService](../classes/_karhoo_demand_api.poiservice.md)*

* **quotesService**: *[QuotesService](../classes/_karhoo_demand_api.quotesservice.md)*

* **tripService**: *[TripService](../classes/_karhoo_demand_api.tripservice.md)*

___

###  ApiError

Ƭ **ApiError**: *object*

*Defined in [demand-api/src/http/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L1)*

#### Type declaration:

* **code**? : *undefined | string*

* **message**: *string*

___

###  ApiOptions

Ƭ **ApiOptions**: *Partial‹object›*

*Defined in [demand-api/src/api/types.ts:9](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/api/types.ts#L9)*

___

###  BookATripParams

Ƭ **BookATripParams**: *object*

*Defined in [demand-api/src/trip/types.ts:97](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/types.ts#L97)*

#### Type declaration:

* **cost_center_reference**? : *undefined | string*

* **flight_number**? : *undefined | string*

* **loyalty_points**? : *undefined | number*

* **loyalty_programme**? : *undefined | string*

* **meta**? : *undefined | object*

* **partner_trip_id**? : *undefined | string*

* **passengers**: *[Passengers](_karhoo_demand_api.md#passengers)*

* **payment_nonce**: *string*

* **quote_id**: *string*

* **train_number**? : *undefined | string*

* **train_time**? : *undefined | string*

___

###  BreakdownItem

Ƭ **BreakdownItem**: *Partial‹object›*

*Defined in [demand-api/src/fare/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/fare/types.ts#L1)*

___

###  CancellationParams

Ƭ **CancellationParams**: *object*

*Defined in [demand-api/src/trip/types.ts:147](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/types.ts#L147)*

#### Type declaration:

* **explanation**? : *undefined | string*

* **reason**: *string*

___

###  ClientNonceParams

Ƭ **ClientNonceParams**: *object*

*Defined in [demand-api/src/payment/types.ts:10](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/payment/types.ts#L10)*

#### Type declaration:

* **organisation_id**: *string*

* **payer**(): *object*

  * **email**: *string*

  * **first_name**: *string*

  * **id**: *string*

  * **last_name**: *string*

___

###  ClientNonceResponse

Ƭ **ClientNonceResponse**: *object*

*Defined in [demand-api/src/payment/types.ts:20](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/payment/types.ts#L20)*

#### Type declaration:

* **card_type**? : *undefined | string*

* **last_four**? : *undefined | string*

* **nonce**? : *undefined | string*

___

###  CommonDetailsType

Ƭ **CommonDetailsType**: *"AIRPORT" | "TRAIN_STATION" | "METRO_STATION" | "PORT" | "HOTEL" | "OTHER"*

*Defined in [demand-api/src/sharedTypes.ts:14](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/sharedTypes.ts#L14)*

___

###  CommonPoiType

Ƭ **CommonPoiType**: *"ENRICHED" | "REGULATED" | "NEAREST"*

*Defined in [demand-api/src/sharedTypes.ts:16](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/sharedTypes.ts#L16)*

___

###  CreateTokenParams

Ƭ **CreateTokenParams**: *object*

*Defined in [demand-api/src/payment/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/payment/types.ts#L1)*

#### Type declaration:

* **currency**: *string*

* **organisation_id**: *string*

___

###  CreateTokenResponse

Ƭ **CreateTokenResponse**: *object*

*Defined in [demand-api/src/payment/types.ts:6](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/payment/types.ts#L6)*

#### Type declaration:

* **token**? : *undefined | string*

___

###  DefaultRequestOptions

Ƭ **DefaultRequestOptions**: *Omit‹[RequestOptions](_karhoo_demand_api.md#requestoptions), "body" | "method" | "signal"›*

*Defined in [demand-api/src/http/types.ts:35](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L35)*

___

###  DefaultRequestOptionsGetter

Ƭ **DefaultRequestOptionsGetter**: *function*

*Defined in [demand-api/src/http/types.ts:37](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L37)*

#### Type declaration:

▸ (): *[DefaultRequestOptions](_karhoo_demand_api.md#defaultrequestoptions) | Promise‹[DefaultRequestOptions](_karhoo_demand_api.md#defaultrequestoptions)›*

___

###  FinalFareResponse

Ƭ **FinalFareResponse**: *object*

*Defined in [demand-api/src/fare/types.ts:10](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/fare/types.ts#L10)*

#### Type declaration:

* **breakdown**? : *Partial‹object›*

* **expected_final_time**? : *undefined | string*

* **expected_in**? : *undefined | number*

* **state**: *"PENDING" | "FINAL" | "CANCELLED" | "FAILED"*

___

###  HttpResponse

Ƭ **HttpResponse**: *[HttpResponseOk](_karhoo_demand_api.md#httpresponseok)‹T› | [HttpResponseError](_karhoo_demand_api.md#httpresponseerror)‹TError›*

*Defined in [demand-api/src/http/types.ts:20](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L20)*

___

###  HttpResponseError

Ƭ **HttpResponseError**: *[HttpResponsePayload](_karhoo_demand_api.md#httpresponsepayload) & object*

*Defined in [demand-api/src/http/types.ts:15](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L15)*

___

###  HttpResponseMiddleware

Ƭ **HttpResponseMiddleware**: *function*

*Defined in [demand-api/src/http/types.ts:24](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L24)*

#### Type declaration:

▸ <**T**>(`response`: [HttpResponse](_karhoo_demand_api.md#httpresponse)‹T›): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹T› | Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹T››*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`response` | [HttpResponse](_karhoo_demand_api.md#httpresponse)‹T› |

___

###  HttpResponseOk

Ƭ **HttpResponseOk**: *[HttpResponsePayload](_karhoo_demand_api.md#httpresponsepayload) & object*

*Defined in [demand-api/src/http/types.ts:10](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L10)*

___

###  HttpResponsePayload

Ƭ **HttpResponsePayload**: *object*

*Defined in [demand-api/src/http/types.ts:6](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L6)*

#### Type declaration:

* **status**: *number*

___

###  LatLng

Ƭ **LatLng**: *object*

*Defined in [demand-api/src/sharedTypes.ts:1](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/sharedTypes.ts#L1)*

#### Type declaration:

* **latitude**: *number*

* **longitude**: *number*

___

###  LocationAddressAutocompleteParams

Ƭ **LocationAddressAutocompleteParams**: *object*

*Defined in [demand-api/src/location/types.ts:8](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/location/types.ts#L8)*

#### Type declaration:

* **position**? : *undefined | object*

* **query**: *string*

* **radius**? : *undefined | number*

* **sessionToken**? : *undefined | string*

___

###  LocationAddressAutocompleteResponse

Ƭ **LocationAddressAutocompleteResponse**: *object*

*Defined in [demand-api/src/location/types.ts:57](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/location/types.ts#L57)*

#### Type declaration:

* **locations**: *[LocationAddressAutocompleteResponseItem](_karhoo_demand_api.md#locationaddressautocompleteresponseitem)[]*

___

###  LocationAddressAutocompleteResponseItem

Ƭ **LocationAddressAutocompleteResponseItem**: *object*

*Defined in [demand-api/src/location/types.ts:51](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/location/types.ts#L51)*

#### Type declaration:

* **display_address**: *string*

* **place_id**: *string*

* **type**? : *[LocationDetailsType](_karhoo_demand_api.md#locationdetailstype)*

___

###  LocationAddressDetailsParameters

Ƭ **LocationAddressDetailsParameters**: *object*

*Defined in [demand-api/src/location/types.ts:3](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/location/types.ts#L3)*

#### Type declaration:

* **placeId**: *string*

* **sessionToken**? : *undefined | string*

___

###  LocationAddressDetailsResponse

Ƭ **LocationAddressDetailsResponse**: *object*

*Defined in [demand-api/src/location/types.ts:21](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/location/types.ts#L21)*

#### Type declaration:

* **address**? : *undefined | object*

* **current_local_time**? : *undefined | string*

* **details**? : *undefined | object*

* **meeting_point**? : *undefined | object*

* **place_id**: *string*

* **poi_type**? : *[LocationPoiType](_karhoo_demand_api.md#locationpoitype)*

* **position**? : *[LatLng](_karhoo_demand_api.md#latlng)*

* **time_zone**? : *undefined | string*

___

###  LocationDetailsType

Ƭ **LocationDetailsType**: *"NOT_SET_DETAILS_TYPE" | [CommonDetailsType](_karhoo_demand_api.md#commondetailstype)*

*Defined in [demand-api/src/location/types.ts:19](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/location/types.ts#L19)*

___

###  LocationPoiType

Ƭ **LocationPoiType**: *"NOT_SET_POI_TYPE" | [CommonPoiType](_karhoo_demand_api.md#commonpoitype)*

*Defined in [demand-api/src/location/types.ts:18](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/location/types.ts#L18)*

___

###  MeetingPointType

Ƭ **MeetingPointType**: *"DEFAULT" | "PICK_UP" | "DROP_OFF" | "MEET_AND_GREET" | "CURB_SIDE" | "STAND_BY"*

*Defined in [demand-api/src/sharedTypes.ts:6](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/sharedTypes.ts#L6)*

___

###  MethodRequestOptions

Ƭ **MethodRequestOptions**: *Omit‹[RequestOptions](_karhoo_demand_api.md#requestoptions), "body" | "method"›*

*Defined in [demand-api/src/http/types.ts:33](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L33)*

___

###  POIDetailsType

Ƭ **POIDetailsType**: *"UNSPECIFIED" | [CommonDetailsType](_karhoo_demand_api.md#commondetailstype)*

*Defined in [demand-api/src/poi/types.ts:11](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/poi/types.ts#L11)*

___

###  POIType

Ƭ **POIType**: *"UNSET" | [CommonPoiType](_karhoo_demand_api.md#commonpoitype)*

*Defined in [demand-api/src/poi/types.ts:10](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/poi/types.ts#L10)*

___

###  PassengerDetails

Ƭ **PassengerDetails**: *object*

*Defined in [demand-api/src/trip/types.ts:5](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/types.ts#L5)*

#### Type declaration:

* **email**? : *undefined | string*

* **first_name**? : *undefined | string*

* **last_name**: *string*

* **locale**? : *undefined | string*

* **phone_number**: *string*

___

###  Passengers

Ƭ **Passengers**: *object*

*Defined in [demand-api/src/trip/types.ts:13](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/types.ts#L13)*

#### Type declaration:

* **additional_passengers**? : *undefined | number*

* **luggage**? : *undefined | object*

* **passenger_details**: *[PassengerDetails](_karhoo_demand_api.md#passengerdetails)[]*

___

###  PoiResponse

Ƭ **PoiResponse**: *object*

*Defined in [demand-api/src/poi/types.ts:13](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/poi/types.ts#L13)*

#### Type declaration:

* **address**(): *object*

  * **building_number**? : *undefined | string*

  * **city**? : *undefined | string*

  * **country_code**? : *undefined | string*

  * **display_address**: *string*

  * **line_1**? : *undefined | string*

  * **line_2**? : *undefined | string*

  * **postal_code**? : *undefined | string*

  * **postal_code_ext**? : *undefined | string*

  * **region**? : *undefined | string*

  * **street_name**? : *undefined | string*

* **description**? : *undefined | string*

* **details**(): *object*

  * **dispatch_id**? : *undefined | string*

  * **external_id**? : *undefined | string*

  * **fleet_id**? : *undefined | string*

  * **iata**? : *undefined | string*

  * **terminal**? : *undefined | string*

  * **type**? : *[POIDetailsType](_karhoo_demand_api.md#poidetailstype)*

* **geojson**: *string*

* **id**? : *undefined | string*

* **is_valid**? : *undefined | false | true*

* **meeting_points**: *object[]*

* **name**: *string*

* **position**: *[LatLng](_karhoo_demand_api.md#latlng)*

* **search_keys**? : *string[]*

* **type**? : *[POIType](_karhoo_demand_api.md#poitype)*

___

###  PoiSearchParams

Ƭ **PoiSearchParams**: *object*

*Defined in [demand-api/src/poi/types.ts:3](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/poi/types.ts#L3)*

#### Type declaration:

* **paginationOffset**: *number*

* **paginationRowCount**: *number*

* **searchKey**? : *undefined | string*

* **searchTerm**? : *undefined | string*

___

###  PoiSearchResponse

Ƭ **PoiSearchResponse**: *object*

*Defined in [demand-api/src/poi/types.ts:50](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/poi/types.ts#L50)*

#### Type declaration:

* **pois**? : *[PoiResponse](_karhoo_demand_api.md#poiresponse)[]*

___

###  Query

Ƭ **Query**: *Record‹string, string | number›*

*Defined in [demand-api/src/http/types.ts:22](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L22)*

___

###  Quote

Ƭ **Quote**: *object*

*Defined in [demand-api/src/quotes/types.ts:66](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/quotes/types.ts#L66)*

#### Type declaration:

* **breakdown**? : *object[]*

* **currency**: *string*

* **gratuity_percent**? : *undefined | number*

* **high_price**? : *undefined | number*

* **low_price**? : *undefined | number*

* **qta_high_minutes**? : *undefined | number*

* **qta_low_minutes**? : *undefined | number*

* **source**? : *undefined | string*

* **total**: *number*

* **type**? : *undefined | string*

* **vehicle_attributes**? : *[VehicleAttributes](_karhoo_demand_api.md#vehicleattributes)*

* **vehicle_class**? : *undefined | string*

___

###  QuoteItem

Ƭ **QuoteItem**: *object*

*Defined in [demand-api/src/quotes/types.ts:32](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/quotes/types.ts#L32)*

#### Type declaration:

* **availability_id**? : *undefined | string*

* **category_name**? : *undefined | string*

* **currency_code**? : *undefined | string*

* **fleet_description**? : *undefined | string*

* **fleet_id**? : *undefined | string*

* **fleet_name**: *string*

* **high_price**? : *undefined | number*

* **low_price**? : *undefined | number*

* **phone_number**? : *undefined | string*

* **pick_up_type**? : *"DEFAULT" | "STAND_BY" | "CURB_SIDE" | "MEET_AND_GREET"*

* **qta_high_minutes**? : *undefined | number*

* **qta_low_minutes**? : *undefined | number*

* **quote_id**: *string*

* **quote_type**: *"FIXED" | "ESTIMATED" | "METERED"*

* **source**? : *"FLEET" | "MARKET"*

* **supplier_logo_url**? : *undefined | string*

* **terms_conditions_url**? : *undefined | string*

* **validity**? : *undefined | number*

* **vehicle_attributes**? : *[VehicleAttributes](_karhoo_demand_api.md#vehicleattributes)*

* **vehicle_class**? : *undefined | string*

___

###  QuotesAvailabilityParams

Ƭ **QuotesAvailabilityParams**: *object*

*Defined in [demand-api/src/quotes/types.ts:3](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/quotes/types.ts#L3)*

#### Type declaration:

* **dateRequired**? : *undefined | string*

* **destinationPlaceId**? : *undefined | string*

* **originPlaceId**: *string*

___

###  QuotesAvailabilityResponse

Ƭ **QuotesAvailabilityResponse**: *object*

*Defined in [demand-api/src/quotes/types.ts:9](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/quotes/types.ts#L9)*

#### Type declaration:

* **availabilities**? : *object[]*

* **categories**? : *string[]*

___

###  QuotesResponse

Ƭ **QuotesResponse**: *object*

*Defined in [demand-api/src/quotes/types.ts:55](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/quotes/types.ts#L55)*

#### Type declaration:

* **id**: *string*

* **quote_items**? : *[QuoteItem](_karhoo_demand_api.md#quoteitem)[]*

* **status**: *string*

* **validity**? : *undefined | number*

___

###  QutesSearchParams

Ƭ **QutesSearchParams**: *object*

*Defined in [demand-api/src/quotes/types.ts:26](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/quotes/types.ts#L26)*

#### Type declaration:

* **destination_place_id**: *string*

* **local_time_of_pickup**? : *undefined | string*

* **origin_place_id**: *string*

___

###  RequestOptions

Ƭ **RequestOptions**: *Omit‹RequestInit, "window" | "headers"› & object*

*Defined in [demand-api/src/http/types.ts:28](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/types.ts#L28)*

___

###  SearchParams

Ƭ **SearchParams**: *object*

*Defined in [demand-api/src/trip/types.ts:152](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/types.ts#L152)*

#### Type declaration:

* **created_after**? : *undefined | string*

* **display_trip_id**? : *undefined | string*

* **email**? : *undefined | string*

* **external_trip_id**? : *undefined | string*

* **fleet_id**? : *undefined | string*

* **forename**? : *undefined | string*

* **lastname**? : *undefined | string*

* **only_without_final_price**? : *undefined | false | true*

* **order_by**? : *string[]*

* **pagination_offset**? : *undefined | number*

* **pagination_row_count**? : *undefined | number*

* **partner_trip_id**? : *undefined | string*

* **prebook_time_after**? : *undefined | string*

* **prebook_time_before**? : *undefined | string*

* **traveller_id**? : *undefined | string*

* **trip_states**? : *[TripStatus](_karhoo_demand_api.md#tripstatus)[]*

* **trip_time_after**? : *undefined | string*

* **trip_time_before**? : *undefined | string*

* **trip_type**? : *"BOTH" | "PREBOOK" | "ASAP"*

___

###  SearchResponse

Ƭ **SearchResponse**: *object*

*Defined in [demand-api/src/trip/types.ts:174](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/types.ts#L174)*

#### Type declaration:

* **bookings**? : *[BookATripResponse](../interfaces/_karhoo_demand_api.bookatripresponse.md)[]*

___

###  TripFollowResponse

Ƭ **TripFollowResponse**: *object*

*Defined in [demand-api/src/trip/types.ts:44](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/types.ts#L44)*

#### Type declaration:

* **date_booked**? : *undefined | string*

* **date_scheduled**? : *undefined | string*

* **destination**? : *[Address](_karhoo_demand_api.md#address)*

* **display_trip_id**? : *undefined | string*

* **fleet_info**? : *undefined | object*

* **meeting_point**? : *undefined | object*

* **meta**? : *undefined | object*

* **origin**? : *[Address](_karhoo_demand_api.md#address)*

* **passengers**? : *[Passengers](_karhoo_demand_api.md#passengers)*

* **quote**? : *[Quote](_karhoo_demand_api.md#quote)*

* **state_details**? : *undefined | string*

* **status**: *[TripStatus](_karhoo_demand_api.md#tripstatus)*

* **tracking**? : *undefined | object*

* **train_number**? : *undefined | string*

* **train_time**? : *undefined | string*

* **trip_id**? : *undefined | string*

* **vehicle**? : *undefined | object*

___

###  TripStatus

Ƭ **TripStatus**: *"REQUESTED" | "COMPLETED" | "DRIVER_EN_ROUTE" | "CONFIRMED" | "ARRIVED" | "POB" | "DRIVER_CANCELLED" | "BOOKER_CANCELLED" | "NO_DRIVERS_AVAILABLE" | "KARHOO_CANCELLED" | "FAILED" | "PREAUTH_DECLINED" | "INCOMPLETE"*

*Defined in [demand-api/src/trip/types.ts:29](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/types.ts#L29)*

___

###  VehicleAttributes

Ƭ **VehicleAttributes**: *Partial‹object›*

*Defined in [demand-api/src/sharedTypes.ts:18](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/sharedTypes.ts#L18)*

## Variables

### `Const` apiV1

• **apiV1**: *"api/v1"* = "api/v1"

*Defined in [demand-api/src/api/constants.ts:3](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/api/constants.ts#L3)*

___

### `Const` apiV2

• **apiV2**: *"api/v2"* = "api/v2"

*Defined in [demand-api/src/api/constants.ts:4](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/api/constants.ts#L4)*

___

### `Const` defaultUrl

• **defaultUrl**: *"https://public-api.karhoo.com" | "public-api.sandbox.karhoo.com"* = process.env.NODE_ENV === 'production' ? 'https://public-api.karhoo.com' : 'public-api.sandbox.karhoo.com'

*Defined in [demand-api/src/api/constants.ts:1](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/api/constants.ts#L1)*

___

### `Const` mockHttpGet

• **mockHttpGet**: *Mock‹Promise‹object›, []›* = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { get: true } }))

*Defined in [demand-api/src/testMocks.ts:116](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L116)*

___

### `Const` mockHttpPost

• **mockHttpPost**: *Mock‹Promise‹object›, []›* = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { post: true } }))

*Defined in [demand-api/src/testMocks.ts:117](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L117)*

___

### `Const` mockHttpPut

• **mockHttpPut**: *Mock‹Promise‹object›, []›* = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { put: true } }))

*Defined in [demand-api/src/testMocks.ts:118](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L118)*

___

### `Const` mockHttpRemove

• **mockHttpRemove**: *Mock‹Promise‹object›, []›* = jest.fn(() =>
  Promise.resolve({ ok: true, status: 200, body: { remove: true } })
)

*Defined in [demand-api/src/testMocks.ts:119](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L119)*

## Functions

###  getApi

▸ **getApi**(`apiOptions`: [ApiOptions](_karhoo_demand_api.md#apioptions)): *[Api](_karhoo_demand_api.md#api)*

*Defined in [demand-api/src/api/index.ts:12](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/api/index.ts#L12)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`apiOptions` | [ApiOptions](_karhoo_demand_api.md#apioptions) | {} |

**Returns:** *[Api](_karhoo_demand_api.md#api)*

___

### `Const` getApiMock

▸ **getApiMock**(): *object*

*Defined in [demand-api/src/testMocks.ts:141](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L141)*

**Returns:** *object*

* **mockClear**(): *void*

* ### **locationService**: *object*

  * **getAddressAutocompleteData**: *Mock‹Promise‹object & object | object & object›, [any]›* = mockLocationGetAddressAutocompleteData

  * **getAddressDetails**: *Mock‹Promise‹object & object | object & object›, [any]›* = mockLocationGetAddressDetails

* ### **poiService**: *object*

  * **search**: *Mock‹Promise‹object & object | object & object›, [any]›* = mockPoiSearch

* ### **quotesService**: *object*

  * **checkAvailability**: *Mock‹Promise‹object & object | object & object›, []›* = mockQuotesCheckAvailability

___

### `Const` getLocationGetAddressAutocompleteDataMock

▸ **getLocationGetAddressAutocompleteDataMock**(): *Mock‹Promise‹object & object | object & object›, [any]›*

*Defined in [demand-api/src/testMocks.ts:128](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L128)*

**Returns:** *Mock‹Promise‹object & object | object & object›, [any]›*

___

### `Const` getLocationGetAddressDetailsMock

▸ **getLocationGetAddressDetailsMock**(): *Mock‹Promise‹object & object | object & object›, [any]›*

*Defined in [demand-api/src/testMocks.ts:123](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L123)*

**Returns:** *Mock‹Promise‹object & object | object & object›, [any]›*

___

### `Const` getMockedErrorLocationAddressAutocompleteResponse

▸ **getMockedErrorLocationAddressAutocompleteResponse**(): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›*

*Defined in [demand-api/src/testMocks.ts:107](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L107)*

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›*

___

### `Const` getMockedErrorLocationAddressDetailsResponse

▸ **getMockedErrorLocationAddressDetailsResponse**(): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›*

*Defined in [demand-api/src/testMocks.ts:82](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L82)*

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›*

___

### `Const` getMockedErrorPoiSearchResponse

▸ **getMockedErrorPoiSearchResponse**(): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›*

*Defined in [demand-api/src/testMocks.ts:40](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L40)*

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›*

___

### `Const` getMockedErrorQuotesAvailabilityResponse

▸ **getMockedErrorQuotesAvailabilityResponse**(): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›*

*Defined in [demand-api/src/testMocks.ts:58](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L58)*

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›*

___

### `Const` getMockedLocationAddressAutocompleteResponse

▸ **getMockedLocationAddressAutocompleteResponse**(`data`: any): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›*

*Defined in [demand-api/src/testMocks.ts:91](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›*

___

### `Const` getMockedLocationAddressDetailsResponse

▸ **getMockedLocationAddressDetailsResponse**(`data`: any): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›*

*Defined in [demand-api/src/testMocks.ts:67](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›*

___

### `Const` getMockedPoiSearchResponse

▸ **getMockedPoiSearchResponse**(`data`: any): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›*

*Defined in [demand-api/src/testMocks.ts:7](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›*

___

### `Const` getMockedQuotesAvailabilityResponse

▸ **getMockedQuotesAvailabilityResponse**(): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›*

*Defined in [demand-api/src/testMocks.ts:49](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L49)*

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›*

___

### `Const` getPoiSearchMock

▸ **getPoiSearchMock**(): *Mock‹Promise‹object & object | object & object›, [any]›*

*Defined in [demand-api/src/testMocks.ts:133](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L133)*

**Returns:** *Mock‹Promise‹object & object | object & object›, [any]›*

___

### `Const` getQuotesCheckAvailabilityMock

▸ **getQuotesCheckAvailabilityMock**(): *Mock‹Promise‹object & object | object & object›, []›*

*Defined in [demand-api/src/testMocks.ts:138](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/testMocks.ts#L138)*

**Returns:** *Mock‹Promise‹object & object | object & object›, []›*

___

### `Const` isOffline

▸ **isOffline**(`message`: string): *boolean*

*Defined in [demand-api/src/http/HttpService.ts:14](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/HttpService.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *boolean*

___

###  request

▸ **request**<**T**>(`url`: string, `options`: RequestInit): *Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹T››*

*Defined in [demand-api/src/http/HttpService.ts:16](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/HttpService.ts#L16)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`options` | RequestInit |

**Returns:** *Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹T››*

___

###  toJsonBody

▸ **toJsonBody**(`body`: object, `headers`: Record‹string, string›): *object*

*Defined in [demand-api/src/http/HttpService.ts:40](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/http/HttpService.ts#L40)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`body` | object | - |
`headers` | Record‹string, string› | {} |

**Returns:** *object*

* **body**: *string* = JSON.stringify(body)

* ### **headers**: *object*

  * **content-type**: *string* = "application/json"

___

### `Const` toSnakeCase

▸ **toSnakeCase**<**T**, **Y**>(`data`: T): *Y*

*Defined in [demand-api/src/utils.ts:4](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/utils.ts#L4)*

**Type parameters:**

▪ **T**: *object*

▪ **Y**: *object*

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |

**Returns:** *Y*

## Object literals

### `Const` errorCodes

### ▪ **errorCodes**: *object*

*Defined in [demand-api/src/responseCodes.ts:1](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L1)*

###  ERR_OFFLINE

• **ERR_OFFLINE**: *string* = "ERR_OFFLINE"

*Defined in [demand-api/src/responseCodes.ts:3](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L3)*

###  ERR_UNKNOWN

• **ERR_UNKNOWN**: *string* = "ERR_UNKNOWN"

*Defined in [demand-api/src/responseCodes.ts:2](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L2)*

###  K0001

• **K0001**: *string* = "K0001"

*Defined in [demand-api/src/responseCodes.ts:4](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L4)*

###  K0002

• **K0002**: *string* = "K0002"

*Defined in [demand-api/src/responseCodes.ts:5](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L5)*

###  K0003

• **K0003**: *string* = "K0003"

*Defined in [demand-api/src/responseCodes.ts:6](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L6)*

###  K0004

• **K0004**: *string* = "K0004"

*Defined in [demand-api/src/responseCodes.ts:7](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L7)*

###  K0005

• **K0005**: *string* = "K0005"

*Defined in [demand-api/src/responseCodes.ts:8](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L8)*

###  K0006

• **K0006**: *string* = "K0006"

*Defined in [demand-api/src/responseCodes.ts:9](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L9)*

###  K0007

• **K0007**: *string* = "K0007"

*Defined in [demand-api/src/responseCodes.ts:10](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L10)*

###  K1001

• **K1001**: *string* = "K1001"

*Defined in [demand-api/src/responseCodes.ts:11](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L11)*

###  K1002

• **K1002**: *string* = "K1002"

*Defined in [demand-api/src/responseCodes.ts:12](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L12)*

###  K1003

• **K1003**: *string* = "K1003"

*Defined in [demand-api/src/responseCodes.ts:13](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L13)*

###  K1004

• **K1004**: *string* = "K1004"

*Defined in [demand-api/src/responseCodes.ts:14](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L14)*

###  K1005

• **K1005**: *string* = "K1005"

*Defined in [demand-api/src/responseCodes.ts:15](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L15)*

###  K1006

• **K1006**: *string* = "K1006"

*Defined in [demand-api/src/responseCodes.ts:16](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L16)*

###  K2001

• **K2001**: *string* = "K2001"

*Defined in [demand-api/src/responseCodes.ts:17](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L17)*

###  K3001

• **K3001**: *string* = "K3001"

*Defined in [demand-api/src/responseCodes.ts:18](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L18)*

###  K3002

• **K3002**: *string* = "K3002"

*Defined in [demand-api/src/responseCodes.ts:19](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L19)*

###  K3003

• **K3003**: *string* = "K3003"

*Defined in [demand-api/src/responseCodes.ts:20](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L20)*

###  K4001

• **K4001**: *string* = "K4001"

*Defined in [demand-api/src/responseCodes.ts:21](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L21)*

###  K4002

• **K4002**: *string* = "K4002"

*Defined in [demand-api/src/responseCodes.ts:22](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L22)*

###  K4003

• **K4003**: *string* = "K4003"

*Defined in [demand-api/src/responseCodes.ts:23](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L23)*

###  K4004

• **K4004**: *string* = "K4004"

*Defined in [demand-api/src/responseCodes.ts:24](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L24)*

###  K4005

• **K4005**: *string* = "K4005"

*Defined in [demand-api/src/responseCodes.ts:25](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L25)*

###  K4006

• **K4006**: *string* = "K4006"

*Defined in [demand-api/src/responseCodes.ts:26](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L26)*

###  K4007

• **K4007**: *string* = "K4007"

*Defined in [demand-api/src/responseCodes.ts:27](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L27)*

###  K4008

• **K4008**: *string* = "K4008"

*Defined in [demand-api/src/responseCodes.ts:28](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L28)*

###  K4009

• **K4009**: *string* = "K4009"

*Defined in [demand-api/src/responseCodes.ts:29](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L29)*

###  K4010

• **K4010**: *string* = "K4010"

*Defined in [demand-api/src/responseCodes.ts:30](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L30)*

###  K4011

• **K4011**: *string* = "K4011"

*Defined in [demand-api/src/responseCodes.ts:31](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L31)*

###  K4012

• **K4012**: *string* = "K4012"

*Defined in [demand-api/src/responseCodes.ts:32](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L32)*

###  K4013

• **K4013**: *string* = "K4013"

*Defined in [demand-api/src/responseCodes.ts:33](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L33)*

###  K4020

• **K4020**: *string* = "K4020"

*Defined in [demand-api/src/responseCodes.ts:34](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L34)*

###  K5001

• **K5001**: *string* = "K5001"

*Defined in [demand-api/src/responseCodes.ts:35](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L35)*

###  K5002

• **K5002**: *string* = "K5002"

*Defined in [demand-api/src/responseCodes.ts:36](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L36)*

###  K5003

• **K5003**: *string* = "K5003"

*Defined in [demand-api/src/responseCodes.ts:37](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L37)*

###  K6001

• **K6001**: *string* = "K6001"

*Defined in [demand-api/src/responseCodes.ts:38](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L38)*

###  K7001

• **K7001**: *string* = "K7001"

*Defined in [demand-api/src/responseCodes.ts:39](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L39)*

###  K7002

• **K7002**: *string* = "K7002"

*Defined in [demand-api/src/responseCodes.ts:40](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L40)*

###  K7003

• **K7003**: *string* = "K7003"

*Defined in [demand-api/src/responseCodes.ts:41](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L41)*

###  K7004

• **K7004**: *string* = "K7004"

*Defined in [demand-api/src/responseCodes.ts:42](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L42)*

###  K7005

• **K7005**: *string* = "K7005"

*Defined in [demand-api/src/responseCodes.ts:43](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/responseCodes.ts#L43)*
