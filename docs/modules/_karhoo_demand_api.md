[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](_karhoo_demand_api.md)

# Module: @karhoo/demand-api

# `Demand API`

The **Demand API** provides the ability to contact Karhoo's public API and allows you to send and receive network calls and responses. ([https://developer.karhoo.com/reference#karhoo-api-explorer](https://developer.karhoo.com/reference#karhoo-api-explorer)).

The **Demand API** is designed to enable it's consumers to integrate faster because they do not need to create their own complete network stack.

## Warnings

This library uses `Promise` and `fetch`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise` and [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) to polyfill `fetch`

## Installation

### NPM

```sh
npm install --save @karhoo/demand-api
```

## Usage

```
import { HttpService, LocationService, PoiService, QuotesService, errorCodes } from 'demand-api';
```

Http service usage:

```
const url = 'https://public-api.karhoo.com/api/v1' // please note that there should not be a slash at the end of the url

const correlationIdPrefix = 'prefix'

const requestOptionsGetter = () => ({
  headers: {
    'custom-header': 'Custom header'
  }
})

const middleware = <T>(response: HttpResponse<T>) => {
  console.log(response.status)

  return response
}

const httpService = new HttpService(url)
  .setCorrelationIdPrefix('prefix')
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

## Index

### References

* [ApiError](_karhoo_demand_api.md#apierror)
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
* [QuotesAvailabilityParams](_karhoo_demand_api.md#quotesavailabilityparams)
* [QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)
* [QuotesService](_karhoo_demand_api.md#quotesservice)
* [RequestOptions](_karhoo_demand_api.md#requestoptions)
* [errorCodes](_karhoo_demand_api.md#errorcodes)

### Classes

* [HttpService](../classes/_karhoo_demand_api.httpservice.md)
* [LocationService](../classes/_karhoo_demand_api.locationservice.md)
* [PoiService](../classes/_karhoo_demand_api.poiservice.md)
* [QuotesService](../classes/_karhoo_demand_api.quotesservice.md)

### Interfaces

* [Http](../interfaces/_karhoo_demand_api.http.md)

### Type aliases

* [ApiError](_karhoo_demand_api.md#apierror)
* [CommonDetailsType](_karhoo_demand_api.md#commondetailstype)
* [CommonPoiType](_karhoo_demand_api.md#commonpoitype)
* [DefaultRequestOptions](_karhoo_demand_api.md#defaultrequestoptions)
* [DefaultRequestOptionsGetter](_karhoo_demand_api.md#defaultrequestoptionsgetter)
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
* [PoiResponse](_karhoo_demand_api.md#poiresponse)
* [PoiSearchParams](_karhoo_demand_api.md#poisearchparams)
* [PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)
* [Query](_karhoo_demand_api.md#query)
* [QuotesAvailabilityParams](_karhoo_demand_api.md#quotesavailabilityparams)
* [QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)
* [RequestOptions](_karhoo_demand_api.md#requestoptions)

### Variables

* [mockHttpGet](_karhoo_demand_api.md#const-mockhttpget)
* [mockHttpPost](_karhoo_demand_api.md#const-mockhttppost)
* [mockHttpPut](_karhoo_demand_api.md#const-mockhttpput)
* [mockHttpRemove](_karhoo_demand_api.md#const-mockhttpremove)
* [mockLocationGetAddressAutocompleteData](_karhoo_demand_api.md#const-mocklocationgetaddressautocompletedata)
* [mockLocationGetAddressDetails](_karhoo_demand_api.md#const-mocklocationgetaddressdetails)
* [mockPoiSearch](_karhoo_demand_api.md#const-mockpoisearch)
* [mockQuotesCheckAvailability](_karhoo_demand_api.md#const-mockquotescheckavailability)

### Functions

* [getMockedErrorLocationAddressAutocompleteResponse](_karhoo_demand_api.md#const-getmockederrorlocationaddressautocompleteresponse)
* [getMockedErrorLocationAddressDetailsResponse](_karhoo_demand_api.md#const-getmockederrorlocationaddressdetailsresponse)
* [getMockedErrorPoiSearchResponse](_karhoo_demand_api.md#const-getmockederrorpoisearchresponse)
* [getMockedErrorQuotesAvailabilityResponse](_karhoo_demand_api.md#const-getmockederrorquotesavailabilityresponse)
* [getMockedLocationAddressAutocompleteResponse](_karhoo_demand_api.md#const-getmockedlocationaddressautocompleteresponse)
* [getMockedLocationAddressDetailsResponse](_karhoo_demand_api.md#const-getmockedlocationaddressdetailsresponse)
* [getMockedPoiSearchResponse](_karhoo_demand_api.md#const-getmockedpoisearchresponse)
* [getMockedQuotesAvailabilityResponse](_karhoo_demand_api.md#const-getmockedquotesavailabilityresponse)
* [isOffline](_karhoo_demand_api.md#const-isoffline)
* [request](_karhoo_demand_api.md#request)
* [toJsonBody](_karhoo_demand_api.md#tojsonbody)
* [toSnakeCase](_karhoo_demand_api.md#const-tosnakecase)

### Object literals

* [errorCodes](_karhoo_demand_api.md#const-errorcodes)

## References

###  ApiError

• **ApiError**:

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

###  QuotesAvailabilityParams

• **QuotesAvailabilityParams**:

___

###  QuotesAvailabilityResponse

• **QuotesAvailabilityResponse**:

___

###  QuotesService

• **QuotesService**:

___

###  RequestOptions

• **RequestOptions**:

___

###  errorCodes

• **errorCodes**:

## Type aliases

###  ApiError

Ƭ **ApiError**: *object*

*Defined in [demand-api/src/http/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L1)*

#### Type declaration:

* **code**? : *undefined | string*

* **message**: *string*

___

###  CommonDetailsType

Ƭ **CommonDetailsType**: *"AIRPORT" | "TRAIN_STATION" | "METRO_STATION" | "PORT" | "HOTEL" | "OTHER"*

*Defined in [demand-api/src/sharedTypes.ts:14](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/sharedTypes.ts#L14)*

___

###  CommonPoiType

Ƭ **CommonPoiType**: *"ENRICHED" | "REGULATED" | "NEAREST"*

*Defined in [demand-api/src/sharedTypes.ts:16](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/sharedTypes.ts#L16)*

___

###  DefaultRequestOptions

Ƭ **DefaultRequestOptions**: *Omit‹[RequestOptions](_karhoo_demand_api.md#requestoptions), "body" | "method" | "signal"›*

*Defined in [demand-api/src/http/types.ts:33](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L33)*

___

###  DefaultRequestOptionsGetter

Ƭ **DefaultRequestOptionsGetter**: *function*

*Defined in [demand-api/src/http/types.ts:35](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L35)*

#### Type declaration:

▸ (): *[DefaultRequestOptions](_karhoo_demand_api.md#defaultrequestoptions)*

___

###  HttpResponse

Ƭ **HttpResponse**: *[HttpResponseOk](_karhoo_demand_api.md#httpresponseok)‹T› | [HttpResponseError](_karhoo_demand_api.md#httpresponseerror)‹TError›*

*Defined in [demand-api/src/http/types.ts:20](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L20)*

___

###  HttpResponseError

Ƭ **HttpResponseError**: *[HttpResponsePayload](_karhoo_demand_api.md#httpresponsepayload) & object*

*Defined in [demand-api/src/http/types.ts:15](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L15)*

___

###  HttpResponseMiddleware

Ƭ **HttpResponseMiddleware**: *function*

*Defined in [demand-api/src/http/types.ts:24](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L24)*

#### Type declaration:

▸ <**T**>(`response`: [HttpResponse](_karhoo_demand_api.md#httpresponse)‹T›): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹T›*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`response` | [HttpResponse](_karhoo_demand_api.md#httpresponse)‹T› |

___

###  HttpResponseOk

Ƭ **HttpResponseOk**: *[HttpResponsePayload](_karhoo_demand_api.md#httpresponsepayload) & object*

*Defined in [demand-api/src/http/types.ts:10](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L10)*

___

###  HttpResponsePayload

Ƭ **HttpResponsePayload**: *object*

*Defined in [demand-api/src/http/types.ts:6](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L6)*

#### Type declaration:

* **status**: *number*

___

###  LatLng

Ƭ **LatLng**: *object*

*Defined in [demand-api/src/sharedTypes.ts:1](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/sharedTypes.ts#L1)*

#### Type declaration:

* **latitude**: *number*

* **longitude**: *number*

___

###  LocationAddressAutocompleteParams

Ƭ **LocationAddressAutocompleteParams**: *object*

*Defined in [demand-api/src/location/types.ts:8](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/location/types.ts#L8)*

#### Type declaration:

* **position**? : *undefined | object*

* **query**: *string*

* **radius**? : *undefined | number*

* **sessionToken**? : *undefined | string*

___

###  LocationAddressAutocompleteResponse

Ƭ **LocationAddressAutocompleteResponse**: *object*

*Defined in [demand-api/src/location/types.ts:57](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/location/types.ts#L57)*

#### Type declaration:

* **locations**: *[LocationAddressAutocompleteResponseItem](_karhoo_demand_api.md#locationaddressautocompleteresponseitem)[]*

___

###  LocationAddressAutocompleteResponseItem

Ƭ **LocationAddressAutocompleteResponseItem**: *object*

*Defined in [demand-api/src/location/types.ts:51](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/location/types.ts#L51)*

#### Type declaration:

* **display_address**: *string*

* **place_id**: *string*

* **type**? : *[LocationDetailsType](_karhoo_demand_api.md#locationdetailstype)*

___

###  LocationAddressDetailsParameters

Ƭ **LocationAddressDetailsParameters**: *object*

*Defined in [demand-api/src/location/types.ts:3](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/location/types.ts#L3)*

#### Type declaration:

* **placeId**: *string*

* **sessionToken**? : *undefined | string*

___

###  LocationAddressDetailsResponse

Ƭ **LocationAddressDetailsResponse**: *object*

*Defined in [demand-api/src/location/types.ts:21](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/location/types.ts#L21)*

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

*Defined in [demand-api/src/location/types.ts:19](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/location/types.ts#L19)*

___

###  LocationPoiType

Ƭ **LocationPoiType**: *"NOT_SET_POI_TYPE" | [CommonPoiType](_karhoo_demand_api.md#commonpoitype)*

*Defined in [demand-api/src/location/types.ts:18](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/location/types.ts#L18)*

___

###  MeetingPointType

Ƭ **MeetingPointType**: *"DEFAULT" | "PICK_UP" | "DROP_OFF" | "MEET_AND_GREET" | "CURB_SIDE" | "STAND_BY"*

*Defined in [demand-api/src/sharedTypes.ts:6](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/sharedTypes.ts#L6)*

___

###  MethodRequestOptions

Ƭ **MethodRequestOptions**: *Omit‹[RequestOptions](_karhoo_demand_api.md#requestoptions), "body" | "method"›*

*Defined in [demand-api/src/http/types.ts:31](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L31)*

___

###  POIDetailsType

Ƭ **POIDetailsType**: *"UNSPECIFIED" | [CommonDetailsType](_karhoo_demand_api.md#commondetailstype)*

*Defined in [demand-api/src/poi/types.ts:11](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/poi/types.ts#L11)*

___

###  POIType

Ƭ **POIType**: *"UNSET" | [CommonPoiType](_karhoo_demand_api.md#commonpoitype)*

*Defined in [demand-api/src/poi/types.ts:10](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/poi/types.ts#L10)*

___

###  PoiResponse

Ƭ **PoiResponse**: *object*

*Defined in [demand-api/src/poi/types.ts:13](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/poi/types.ts#L13)*

#### Type declaration:

* **address**(): *object*

  * **building_number**? : *undefined | string*

  * **city**? : *undefined | string*

  * **country_code**? : *undefined | string*

  * **display_address**? : *undefined | string*

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

*Defined in [demand-api/src/poi/types.ts:3](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/poi/types.ts#L3)*

#### Type declaration:

* **paginationOffset**: *number*

* **paginationRowCount**: *number*

* **searchKey**? : *undefined | string*

* **searchTerm**? : *undefined | string*

___

###  PoiSearchResponse

Ƭ **PoiSearchResponse**: *object*

*Defined in [demand-api/src/poi/types.ts:50](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/poi/types.ts#L50)*

#### Type declaration:

* **pois**? : *[PoiResponse](_karhoo_demand_api.md#poiresponse)[]*

___

###  Query

Ƭ **Query**: *Record‹string, string | number›*

*Defined in [demand-api/src/http/types.ts:22](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L22)*

___

###  QuotesAvailabilityParams

Ƭ **QuotesAvailabilityParams**: *object*

*Defined in [demand-api/src/quotes/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/quotes/types.ts#L1)*

#### Type declaration:

* **dateRequired**? : *undefined | string*

* **destinationPlaceId**? : *undefined | string*

* **originPlaceId**: *string*

___

###  QuotesAvailabilityResponse

Ƭ **QuotesAvailabilityResponse**: *object*

*Defined in [demand-api/src/quotes/types.ts:7](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/quotes/types.ts#L7)*

#### Type declaration:

* **availabilities**? : *object[]*

* **categories**? : *string[]*

___

###  RequestOptions

Ƭ **RequestOptions**: *Omit‹RequestInit, "window" | "headers"› & object*

*Defined in [demand-api/src/http/types.ts:26](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L26)*

## Variables

### `Const` mockHttpGet

• **mockHttpGet**: *Mock‹Promise‹object›, []›* = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { get: true } }))

*Defined in [demand-api/src/testMocks.ts:132](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L132)*

___

### `Const` mockHttpPost

• **mockHttpPost**: *Mock‹Promise‹object›, []›* = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { post: true } }))

*Defined in [demand-api/src/testMocks.ts:133](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L133)*

___

### `Const` mockHttpPut

• **mockHttpPut**: *Mock‹Promise‹object›, []›* = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { put: true } }))

*Defined in [demand-api/src/testMocks.ts:134](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L134)*

___

### `Const` mockHttpRemove

• **mockHttpRemove**: *Mock‹Promise‹object›, []›* = jest.fn(() =>
  Promise.resolve({ ok: true, status: 200, body: { remove: true } })
)

*Defined in [demand-api/src/testMocks.ts:135](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L135)*

___

### `Const` mockLocationGetAddressAutocompleteData

• **mockLocationGetAddressAutocompleteData**: *Mock‹Promise‹object & object | object & object›, [any]›* = jest.fn((data: any) => {
  return Promise.resolve(getMockedLocationAddressAutocompleteResponse(data))
})

*Defined in [demand-api/src/testMocks.ts:120](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L120)*

___

### `Const` mockLocationGetAddressDetails

• **mockLocationGetAddressDetails**: *Mock‹Promise‹object & object | object & object›, [any]›* = jest.fn((data: any) => {
  return Promise.resolve(getMockedLocationAddressDetailsResponse(data))
})

*Defined in [demand-api/src/testMocks.ts:116](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L116)*

___

### `Const` mockPoiSearch

• **mockPoiSearch**: *Mock‹Promise‹object & object | object & object›, [any]›* = jest.fn((data: any) => {
  return Promise.resolve(getMockedPoiSearchResponse(data))
})

*Defined in [demand-api/src/testMocks.ts:124](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L124)*

___

### `Const` mockQuotesCheckAvailability

• **mockQuotesCheckAvailability**: *Mock‹Promise‹object & object | object & object›, []›* = jest.fn(() =>
  Promise.resolve(getMockedQuotesAvailabilityResponse())
)

*Defined in [demand-api/src/testMocks.ts:128](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L128)*

## Functions

### `Const` getMockedErrorLocationAddressAutocompleteResponse

▸ **getMockedErrorLocationAddressAutocompleteResponse**(): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›*

*Defined in [demand-api/src/testMocks.ts:107](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L107)*

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›*

___

### `Const` getMockedErrorLocationAddressDetailsResponse

▸ **getMockedErrorLocationAddressDetailsResponse**(): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›*

*Defined in [demand-api/src/testMocks.ts:82](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L82)*

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›*

___

### `Const` getMockedErrorPoiSearchResponse

▸ **getMockedErrorPoiSearchResponse**(): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›*

*Defined in [demand-api/src/testMocks.ts:40](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L40)*

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›*

___

### `Const` getMockedErrorQuotesAvailabilityResponse

▸ **getMockedErrorQuotesAvailabilityResponse**(): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›*

*Defined in [demand-api/src/testMocks.ts:58](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L58)*

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›*

___

### `Const` getMockedLocationAddressAutocompleteResponse

▸ **getMockedLocationAddressAutocompleteResponse**(`data`: any): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›*

*Defined in [demand-api/src/testMocks.ts:91](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›*

___

### `Const` getMockedLocationAddressDetailsResponse

▸ **getMockedLocationAddressDetailsResponse**(`data`: any): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›*

*Defined in [demand-api/src/testMocks.ts:67](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›*

___

### `Const` getMockedPoiSearchResponse

▸ **getMockedPoiSearchResponse**(`data`: any): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›*

*Defined in [demand-api/src/testMocks.ts:7](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›*

___

### `Const` getMockedQuotesAvailabilityResponse

▸ **getMockedQuotesAvailabilityResponse**(): *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›*

*Defined in [demand-api/src/testMocks.ts:49](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/testMocks.ts#L49)*

**Returns:** *[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›*

___

### `Const` isOffline

▸ **isOffline**(`message`: string): *boolean*

*Defined in [demand-api/src/http/HttpService.ts:13](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/HttpService.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *boolean*

___

###  request

▸ **request**<**T**>(`url`: string, `options`: RequestInit): *Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹T››*

*Defined in [demand-api/src/http/HttpService.ts:15](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/HttpService.ts#L15)*

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

*Defined in [demand-api/src/http/HttpService.ts:39](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/HttpService.ts#L39)*

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

*Defined in [demand-api/src/utils.ts:4](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/utils.ts#L4)*

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

*Defined in [demand-api/src/responseCodes.ts:1](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L1)*

###  ERR_OFFLINE

• **ERR_OFFLINE**: *string* = "ERR_OFFLINE"

*Defined in [demand-api/src/responseCodes.ts:3](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L3)*

###  ERR_UNKNOWN

• **ERR_UNKNOWN**: *string* = "ERR_UNKNOWN"

*Defined in [demand-api/src/responseCodes.ts:2](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L2)*

###  K0001

• **K0001**: *string* = "K0001"

*Defined in [demand-api/src/responseCodes.ts:4](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L4)*

###  K0002

• **K0002**: *string* = "K0002"

*Defined in [demand-api/src/responseCodes.ts:5](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L5)*

###  K0003

• **K0003**: *string* = "K0003"

*Defined in [demand-api/src/responseCodes.ts:6](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L6)*

###  K0004

• **K0004**: *string* = "K0004"

*Defined in [demand-api/src/responseCodes.ts:7](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L7)*

###  K0005

• **K0005**: *string* = "K0005"

*Defined in [demand-api/src/responseCodes.ts:8](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L8)*

###  K0006

• **K0006**: *string* = "K0006"

*Defined in [demand-api/src/responseCodes.ts:9](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L9)*

###  K0007

• **K0007**: *string* = "K0007"

*Defined in [demand-api/src/responseCodes.ts:10](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L10)*

###  K1001

• **K1001**: *string* = "K1001"

*Defined in [demand-api/src/responseCodes.ts:11](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L11)*

###  K1002

• **K1002**: *string* = "K1002"

*Defined in [demand-api/src/responseCodes.ts:12](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L12)*

###  K1003

• **K1003**: *string* = "K1003"

*Defined in [demand-api/src/responseCodes.ts:13](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L13)*

###  K1004

• **K1004**: *string* = "K1004"

*Defined in [demand-api/src/responseCodes.ts:14](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L14)*

###  K1005

• **K1005**: *string* = "K1005"

*Defined in [demand-api/src/responseCodes.ts:15](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L15)*

###  K1006

• **K1006**: *string* = "K1006"

*Defined in [demand-api/src/responseCodes.ts:16](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L16)*

###  K2001

• **K2001**: *string* = "K2001"

*Defined in [demand-api/src/responseCodes.ts:17](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L17)*

###  K3001

• **K3001**: *string* = "K3001"

*Defined in [demand-api/src/responseCodes.ts:18](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L18)*

###  K3002

• **K3002**: *string* = "K3002"

*Defined in [demand-api/src/responseCodes.ts:19](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L19)*

###  K3003

• **K3003**: *string* = "K3003"

*Defined in [demand-api/src/responseCodes.ts:20](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L20)*

###  K4001

• **K4001**: *string* = "K4001"

*Defined in [demand-api/src/responseCodes.ts:21](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L21)*

###  K4002

• **K4002**: *string* = "K4002"

*Defined in [demand-api/src/responseCodes.ts:22](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L22)*

###  K4003

• **K4003**: *string* = "K4003"

*Defined in [demand-api/src/responseCodes.ts:23](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L23)*

###  K4004

• **K4004**: *string* = "K4004"

*Defined in [demand-api/src/responseCodes.ts:24](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L24)*

###  K4005

• **K4005**: *string* = "K4005"

*Defined in [demand-api/src/responseCodes.ts:25](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L25)*

###  K4006

• **K4006**: *string* = "K4006"

*Defined in [demand-api/src/responseCodes.ts:26](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L26)*

###  K4007

• **K4007**: *string* = "K4007"

*Defined in [demand-api/src/responseCodes.ts:27](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L27)*

###  K4008

• **K4008**: *string* = "K4008"

*Defined in [demand-api/src/responseCodes.ts:28](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L28)*

###  K4009

• **K4009**: *string* = "K4009"

*Defined in [demand-api/src/responseCodes.ts:29](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L29)*

###  K4010

• **K4010**: *string* = "K4010"

*Defined in [demand-api/src/responseCodes.ts:30](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L30)*

###  K4011

• **K4011**: *string* = "K4011"

*Defined in [demand-api/src/responseCodes.ts:31](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L31)*

###  K4012

• **K4012**: *string* = "K4012"

*Defined in [demand-api/src/responseCodes.ts:32](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L32)*

###  K4013

• **K4013**: *string* = "K4013"

*Defined in [demand-api/src/responseCodes.ts:33](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L33)*

###  K4020

• **K4020**: *string* = "K4020"

*Defined in [demand-api/src/responseCodes.ts:34](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L34)*

###  K5001

• **K5001**: *string* = "K5001"

*Defined in [demand-api/src/responseCodes.ts:35](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L35)*

###  K5002

• **K5002**: *string* = "K5002"

*Defined in [demand-api/src/responseCodes.ts:36](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L36)*

###  K5003

• **K5003**: *string* = "K5003"

*Defined in [demand-api/src/responseCodes.ts:37](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L37)*

###  K6001

• **K6001**: *string* = "K6001"

*Defined in [demand-api/src/responseCodes.ts:38](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L38)*

###  K7001

• **K7001**: *string* = "K7001"

*Defined in [demand-api/src/responseCodes.ts:39](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L39)*

###  K7002

• **K7002**: *string* = "K7002"

*Defined in [demand-api/src/responseCodes.ts:40](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L40)*

###  K7003

• **K7003**: *string* = "K7003"

*Defined in [demand-api/src/responseCodes.ts:41](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L41)*

###  K7004

• **K7004**: *string* = "K7004"

*Defined in [demand-api/src/responseCodes.ts:42](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L42)*

###  K7005

• **K7005**: *string* = "K7005"

*Defined in [demand-api/src/responseCodes.ts:43](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/responseCodes.ts#L43)*
