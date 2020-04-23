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

This library provides the ability to contact Karhoo's public API and allows you to send and receive network calls and responses. The **Demand API Library** is designed to enable its consumers to integrate faster because they don't need to create their own complete network stack.
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

You can use each service separately or you can use `getApi` method which returns all available services

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

Please note that by default `fetch` will be called with following options

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

[BSD-2-Clause](../LICENSE)

## Index

### References

- [Api](_karhoo_demand_api.md#api)
- [ApiError](_karhoo_demand_api.md#apierror)
- [ApiOptions](_karhoo_demand_api.md#apioptions)
- [DefaultRequestOptions](_karhoo_demand_api.md#defaultrequestoptions)
- [DefaultRequestOptionsGetter](_karhoo_demand_api.md#defaultrequestoptionsgetter)
- [Http](_karhoo_demand_api.md#http)
- [HttpResponse](_karhoo_demand_api.md#httpresponse)
- [HttpResponseError](_karhoo_demand_api.md#httpresponseerror)
- [HttpResponseMiddleware](_karhoo_demand_api.md#httpresponsemiddleware)
- [HttpResponseOk](_karhoo_demand_api.md#httpresponseok)
- [HttpService](_karhoo_demand_api.md#httpservice)
- [LocationAddressAutocompleteParams](_karhoo_demand_api.md#locationaddressautocompleteparams)
- [LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)
- [LocationAddressAutocompleteResponseItem](_karhoo_demand_api.md#locationaddressautocompleteresponseitem)
- [LocationAddressDetailsParameters](_karhoo_demand_api.md#locationaddressdetailsparameters)
- [LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)
- [LocationService](_karhoo_demand_api.md#locationservice)
- [MethodRequestOptions](_karhoo_demand_api.md#methodrequestoptions)
- [PoiResponse](_karhoo_demand_api.md#poiresponse)
- [PoiSearchParams](_karhoo_demand_api.md#poisearchparams)
- [PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)
- [PoiService](_karhoo_demand_api.md#poiservice)
- [Query](_karhoo_demand_api.md#query)
- [QuotesAvailabilityParams](_karhoo_demand_api.md#quotesavailabilityparams)
- [QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)
- [QuotesService](_karhoo_demand_api.md#quotesservice)
- [RequestOptions](_karhoo_demand_api.md#requestoptions)
- [errorCodes](_karhoo_demand_api.md#errorcodes)
- [getApi](_karhoo_demand_api.md#getapi)

### Classes

- [HttpService](../classes/_karhoo_demand_api.httpservice.md)
- [LocationService](../classes/_karhoo_demand_api.locationservice.md)
- [PoiService](../classes/_karhoo_demand_api.poiservice.md)
- [QuotesService](../classes/_karhoo_demand_api.quotesservice.md)

### Interfaces

- [Http](../interfaces/_karhoo_demand_api.http.md)

### Type aliases

- [Api](_karhoo_demand_api.md#api)
- [ApiError](_karhoo_demand_api.md#apierror)
- [ApiOptions](_karhoo_demand_api.md#apioptions)
- [CommonDetailsType](_karhoo_demand_api.md#commondetailstype)
- [CommonPoiType](_karhoo_demand_api.md#commonpoitype)
- [DefaultRequestOptions](_karhoo_demand_api.md#defaultrequestoptions)
- [DefaultRequestOptionsGetter](_karhoo_demand_api.md#defaultrequestoptionsgetter)
- [HttpResponse](_karhoo_demand_api.md#httpresponse)
- [HttpResponseError](_karhoo_demand_api.md#httpresponseerror)
- [HttpResponseMiddleware](_karhoo_demand_api.md#httpresponsemiddleware)
- [HttpResponseOk](_karhoo_demand_api.md#httpresponseok)
- [HttpResponsePayload](_karhoo_demand_api.md#httpresponsepayload)
- [LatLng](_karhoo_demand_api.md#latlng)
- [LocationAddressAutocompleteParams](_karhoo_demand_api.md#locationaddressautocompleteparams)
- [LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)
- [LocationAddressAutocompleteResponseItem](_karhoo_demand_api.md#locationaddressautocompleteresponseitem)
- [LocationAddressDetailsParameters](_karhoo_demand_api.md#locationaddressdetailsparameters)
- [LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)
- [LocationDetailsType](_karhoo_demand_api.md#locationdetailstype)
- [LocationPoiType](_karhoo_demand_api.md#locationpoitype)
- [MeetingPointType](_karhoo_demand_api.md#meetingpointtype)
- [MethodRequestOptions](_karhoo_demand_api.md#methodrequestoptions)
- [POIDetailsType](_karhoo_demand_api.md#poidetailstype)
- [POIType](_karhoo_demand_api.md#poitype)
- [PoiResponse](_karhoo_demand_api.md#poiresponse)
- [PoiSearchParams](_karhoo_demand_api.md#poisearchparams)
- [PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)
- [Query](_karhoo_demand_api.md#query)
- [QuotesAvailabilityParams](_karhoo_demand_api.md#quotesavailabilityparams)
- [QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)
- [RequestOptions](_karhoo_demand_api.md#requestoptions)

### Variables

- [apiV1](_karhoo_demand_api.md#const-apiv1)
- [defaultUrl](_karhoo_demand_api.md#const-defaulturl)
- [mockHttpGet](_karhoo_demand_api.md#const-mockhttpget)
- [mockHttpPost](_karhoo_demand_api.md#const-mockhttppost)
- [mockHttpPut](_karhoo_demand_api.md#const-mockhttpput)
- [mockHttpRemove](_karhoo_demand_api.md#const-mockhttpremove)

### Functions

- [getApi](_karhoo_demand_api.md#getapi)
- [getApiMock](_karhoo_demand_api.md#const-getapimock)
- [getLocationGetAddressAutocompleteDataMock](_karhoo_demand_api.md#const-getlocationgetaddressautocompletedatamock)
- [getLocationGetAddressDetailsMock](_karhoo_demand_api.md#const-getlocationgetaddressdetailsmock)
- [getMockedErrorLocationAddressAutocompleteResponse](_karhoo_demand_api.md#const-getmockederrorlocationaddressautocompleteresponse)
- [getMockedErrorLocationAddressDetailsResponse](_karhoo_demand_api.md#const-getmockederrorlocationaddressdetailsresponse)
- [getMockedErrorPoiSearchResponse](_karhoo_demand_api.md#const-getmockederrorpoisearchresponse)
- [getMockedErrorQuotesAvailabilityResponse](_karhoo_demand_api.md#const-getmockederrorquotesavailabilityresponse)
- [getMockedLocationAddressAutocompleteResponse](_karhoo_demand_api.md#const-getmockedlocationaddressautocompleteresponse)
- [getMockedLocationAddressDetailsResponse](_karhoo_demand_api.md#const-getmockedlocationaddressdetailsresponse)
- [getMockedPoiSearchResponse](_karhoo_demand_api.md#const-getmockedpoisearchresponse)
- [getMockedQuotesAvailabilityResponse](_karhoo_demand_api.md#const-getmockedquotesavailabilityresponse)
- [getPoiSearchMock](_karhoo_demand_api.md#const-getpoisearchmock)
- [getQuotesCheckAvailabilityMock](_karhoo_demand_api.md#const-getquotescheckavailabilitymock)
- [isOffline](_karhoo_demand_api.md#const-isoffline)
- [request](_karhoo_demand_api.md#request)
- [toJsonBody](_karhoo_demand_api.md#tojsonbody)
- [toSnakeCase](_karhoo_demand_api.md#const-tosnakecase)

### Object literals

- [errorCodes](_karhoo_demand_api.md#const-errorcodes)

## References

### Api

• **Api**:

---

### ApiError

• **ApiError**:

---

### ApiOptions

• **ApiOptions**:

---

### DefaultRequestOptions

• **DefaultRequestOptions**:

---

### DefaultRequestOptionsGetter

• **DefaultRequestOptionsGetter**:

---

### Http

• **Http**:

---

### HttpResponse

• **HttpResponse**:

---

### HttpResponseError

• **HttpResponseError**:

---

### HttpResponseMiddleware

• **HttpResponseMiddleware**:

---

### HttpResponseOk

• **HttpResponseOk**:

---

### HttpService

• **HttpService**:

---

### LocationAddressAutocompleteParams

• **LocationAddressAutocompleteParams**:

---

### LocationAddressAutocompleteResponse

• **LocationAddressAutocompleteResponse**:

---

### LocationAddressAutocompleteResponseItem

• **LocationAddressAutocompleteResponseItem**:

---

### LocationAddressDetailsParameters

• **LocationAddressDetailsParameters**:

---

### LocationAddressDetailsResponse

• **LocationAddressDetailsResponse**:

---

### LocationService

• **LocationService**:

---

### MethodRequestOptions

• **MethodRequestOptions**:

---

### PoiResponse

• **PoiResponse**:

---

### PoiSearchParams

• **PoiSearchParams**:

---

### PoiSearchResponse

• **PoiSearchResponse**:

---

### PoiService

• **PoiService**:

---

### Query

• **Query**:

---

### QuotesAvailabilityParams

• **QuotesAvailabilityParams**:

---

### QuotesAvailabilityResponse

• **QuotesAvailabilityResponse**:

---

### QuotesService

• **QuotesService**:

---

### RequestOptions

• **RequestOptions**:

---

### errorCodes

• **errorCodes**:

---

### getApi

• **getApi**:

## Type aliases

### Api

Ƭ **Api**: _object_

_Defined in [demand-api/src/api/types.ts:13](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/api/types.ts#L13)_

#### Type declaration:

- **locationService**: _[LocationService](../classes/_karhoo_demand_api.locationservice.md)_

- **poiService**: _[PoiService](../classes/_karhoo_demand_api.poiservice.md)_

- **quotesService**: _[QuotesService](../classes/_karhoo_demand_api.quotesservice.md)_

---

### ApiError

Ƭ **ApiError**: _object_

_Defined in [demand-api/src/http/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L1)_

#### Type declaration:

- **code**? : _undefined | string_

- **message**: _string_

---

### ApiOptions

Ƭ **ApiOptions**: _Partial‹object›_

_Defined in [demand-api/src/api/types.ts:6](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/api/types.ts#L6)_

---

### CommonDetailsType

Ƭ **CommonDetailsType**: _"AIRPORT" | "TRAIN_STATION" | "METRO_STATION" | "PORT" | "HOTEL" | "OTHER"_

_Defined in [demand-api/src/sharedTypes.ts:14](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/sharedTypes.ts#L14)_

---

### CommonPoiType

Ƭ **CommonPoiType**: _"ENRICHED" | "REGULATED" | "NEAREST"_

_Defined in [demand-api/src/sharedTypes.ts:16](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/sharedTypes.ts#L16)_

---

### DefaultRequestOptions

Ƭ **DefaultRequestOptions**: _Omit‹[RequestOptions](_karhoo_demand_api.md#requestoptions), "body" | "method" | "signal"›_

_Defined in [demand-api/src/http/types.ts:35](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L35)_

---

### DefaultRequestOptionsGetter

Ƭ **DefaultRequestOptionsGetter**: _function_

_Defined in [demand-api/src/http/types.ts:37](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L37)_

#### Type declaration:

▸ (): _[DefaultRequestOptions](_karhoo_demand_api.md#defaultrequestoptions) | Promise‹[DefaultRequestOptions](_karhoo_demand_api.md#defaultrequestoptions)›_

---

### HttpResponse

Ƭ **HttpResponse**: _[HttpResponseOk](_karhoo_demand_api.md#httpresponseok)‹T› | [HttpResponseError](_karhoo_demand_api.md#httpresponseerror)‹TError›_

_Defined in [demand-api/src/http/types.ts:20](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L20)_

---

### HttpResponseError

Ƭ **HttpResponseError**: _[HttpResponsePayload](_karhoo_demand_api.md#httpresponsepayload) & object_

_Defined in [demand-api/src/http/types.ts:15](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L15)_

---

### HttpResponseMiddleware

Ƭ **HttpResponseMiddleware**: _function_

_Defined in [demand-api/src/http/types.ts:24](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L24)_

#### Type declaration:

▸ <**T**>(`response`: [HttpResponse](_karhoo_demand_api.md#httpresponse)‹T›): _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹T› | Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹T››_

**Type parameters:**

▪ **T**

**Parameters:**

| Name       | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `response` | [HttpResponse](_karhoo_demand_api.md#httpresponse)‹T› |

---

### HttpResponseOk

Ƭ **HttpResponseOk**: _[HttpResponsePayload](_karhoo_demand_api.md#httpresponsepayload) & object_

_Defined in [demand-api/src/http/types.ts:10](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L10)_

---

### HttpResponsePayload

Ƭ **HttpResponsePayload**: _object_

_Defined in [demand-api/src/http/types.ts:6](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L6)_

#### Type declaration:

- **status**: _number_

---

### LatLng

Ƭ **LatLng**: _object_

_Defined in [demand-api/src/sharedTypes.ts:1](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/sharedTypes.ts#L1)_

#### Type declaration:

- **latitude**: _number_

- **longitude**: _number_

---

### LocationAddressAutocompleteParams

Ƭ **LocationAddressAutocompleteParams**: _object_

_Defined in [demand-api/src/location/types.ts:8](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/location/types.ts#L8)_

#### Type declaration:

- **position**? : _undefined | object_

- **query**: _string_

- **radius**? : _undefined | number_

- **sessionToken**? : _undefined | string_

---

### LocationAddressAutocompleteResponse

Ƭ **LocationAddressAutocompleteResponse**: _object_

_Defined in [demand-api/src/location/types.ts:57](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/location/types.ts#L57)_

#### Type declaration:

- **locations**: _[LocationAddressAutocompleteResponseItem](_karhoo_demand_api.md#locationaddressautocompleteresponseitem)[]_

---

### LocationAddressAutocompleteResponseItem

Ƭ **LocationAddressAutocompleteResponseItem**: _object_

_Defined in [demand-api/src/location/types.ts:51](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/location/types.ts#L51)_

#### Type declaration:

- **display_address**: _string_

- **place_id**: _string_

- **type**? : _[LocationDetailsType](_karhoo_demand_api.md#locationdetailstype)_

---

### LocationAddressDetailsParameters

Ƭ **LocationAddressDetailsParameters**: _object_

_Defined in [demand-api/src/location/types.ts:3](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/location/types.ts#L3)_

#### Type declaration:

- **placeId**: _string_

- **sessionToken**? : _undefined | string_

---

### LocationAddressDetailsResponse

Ƭ **LocationAddressDetailsResponse**: _object_

_Defined in [demand-api/src/location/types.ts:21](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/location/types.ts#L21)_

#### Type declaration:

- **address**? : _undefined | object_

- **current_local_time**? : _undefined | string_

- **details**? : _undefined | object_

- **meeting_point**? : _undefined | object_

- **place_id**: _string_

- **poi_type**? : _[LocationPoiType](_karhoo_demand_api.md#locationpoitype)_

- **position**? : _[LatLng](_karhoo_demand_api.md#latlng)_

- **time_zone**? : _undefined | string_

---

### LocationDetailsType

Ƭ **LocationDetailsType**: _"NOT_SET_DETAILS_TYPE" | [CommonDetailsType](_karhoo_demand_api.md#commondetailstype)_

_Defined in [demand-api/src/location/types.ts:19](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/location/types.ts#L19)_

---

### LocationPoiType

Ƭ **LocationPoiType**: _"NOT_SET_POI_TYPE" | [CommonPoiType](_karhoo_demand_api.md#commonpoitype)_

_Defined in [demand-api/src/location/types.ts:18](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/location/types.ts#L18)_

---

### MeetingPointType

Ƭ **MeetingPointType**: _"DEFAULT" | "PICK_UP" | "DROP_OFF" | "MEET_AND_GREET" | "CURB_SIDE" | "STAND_BY"_

_Defined in [demand-api/src/sharedTypes.ts:6](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/sharedTypes.ts#L6)_

---

### MethodRequestOptions

Ƭ **MethodRequestOptions**: _Omit‹[RequestOptions](_karhoo_demand_api.md#requestoptions), "body" | "method"›_

_Defined in [demand-api/src/http/types.ts:33](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L33)_

---

### POIDetailsType

Ƭ **POIDetailsType**: _"UNSPECIFIED" | [CommonDetailsType](_karhoo_demand_api.md#commondetailstype)_

_Defined in [demand-api/src/poi/types.ts:11](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/poi/types.ts#L11)_

---

### POIType

Ƭ **POIType**: _"UNSET" | [CommonPoiType](_karhoo_demand_api.md#commonpoitype)_

_Defined in [demand-api/src/poi/types.ts:10](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/poi/types.ts#L10)_

---

### PoiResponse

Ƭ **PoiResponse**: _object_

_Defined in [demand-api/src/poi/types.ts:13](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/poi/types.ts#L13)_

#### Type declaration:

- **address**(): _object_

  - **building_number**? : _undefined | string_

  - **city**? : _undefined | string_

  - **country_code**? : _undefined | string_

  - **display_address**: _string_

  - **line_1**? : _undefined | string_

  - **line_2**? : _undefined | string_

  - **postal_code**? : _undefined | string_

  - **postal_code_ext**? : _undefined | string_

  - **region**? : _undefined | string_

  - **street_name**? : _undefined | string_

- **description**? : _undefined | string_

- **details**(): _object_

  - **dispatch_id**? : _undefined | string_

  - **external_id**? : _undefined | string_

  - **fleet_id**? : _undefined | string_

  - **iata**? : _undefined | string_

  - **terminal**? : _undefined | string_

  - **type**? : _[POIDetailsType](_karhoo_demand_api.md#poidetailstype)_

- **geojson**: _string_

- **id**? : _undefined | string_

- **is_valid**? : _undefined | false | true_

- **meeting_points**: _object[]_

- **name**: _string_

- **position**: _[LatLng](_karhoo_demand_api.md#latlng)_

- **search_keys**? : _string[]_

- **type**? : _[POIType](_karhoo_demand_api.md#poitype)_

---

### PoiSearchParams

Ƭ **PoiSearchParams**: _object_

_Defined in [demand-api/src/poi/types.ts:3](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/poi/types.ts#L3)_

#### Type declaration:

- **paginationOffset**: _number_

- **paginationRowCount**: _number_

- **searchKey**? : _undefined | string_

- **searchTerm**? : _undefined | string_

---

### PoiSearchResponse

Ƭ **PoiSearchResponse**: _object_

_Defined in [demand-api/src/poi/types.ts:50](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/poi/types.ts#L50)_

#### Type declaration:

- **pois**? : _[PoiResponse](_karhoo_demand_api.md#poiresponse)[]_

---

### Query

Ƭ **Query**: _Record‹string, string | number›_

_Defined in [demand-api/src/http/types.ts:22](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L22)_

---

### QuotesAvailabilityParams

Ƭ **QuotesAvailabilityParams**: _object_

_Defined in [demand-api/src/quotes/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/quotes/types.ts#L1)_

#### Type declaration:

- **dateRequired**? : _undefined | string_

- **destinationPlaceId**? : _undefined | string_

- **originPlaceId**: _string_

---

### QuotesAvailabilityResponse

Ƭ **QuotesAvailabilityResponse**: _object_

_Defined in [demand-api/src/quotes/types.ts:7](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/quotes/types.ts#L7)_

#### Type declaration:

- **availabilities**? : _object[]_

- **categories**? : _string[]_

---

### RequestOptions

Ƭ **RequestOptions**: _Omit‹RequestInit, "window" | "headers"› & object_

_Defined in [demand-api/src/http/types.ts:28](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L28)_

## Variables

### `Const` apiV1

• **apiV1**: _"api/v1"_ = "api/v1"

_Defined in [demand-api/src/api/constants.ts:3](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/api/constants.ts#L3)_

---

### `Const` defaultUrl

• **defaultUrl**: _"https://public-api.karhoo.com" | "public-api.sandbox.karhoo.com"_ = process.env.NODE_ENV === 'production' ? 'https://public-api.karhoo.com' : 'public-api.sandbox.karhoo.com'

_Defined in [demand-api/src/api/constants.ts:1](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/api/constants.ts#L1)_

---

### `Const` mockHttpGet

• **mockHttpGet**: _Mock‹Promise‹object›, []›_ = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { get: true } }))

_Defined in [demand-api/src/testMocks.ts:116](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L116)_

---

### `Const` mockHttpPost

• **mockHttpPost**: _Mock‹Promise‹object›, []›_ = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { post: true } }))

_Defined in [demand-api/src/testMocks.ts:117](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L117)_

---

### `Const` mockHttpPut

• **mockHttpPut**: _Mock‹Promise‹object›, []›_ = jest.fn(() => Promise.resolve({ ok: true, status: 200, body: { put: true } }))

_Defined in [demand-api/src/testMocks.ts:118](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L118)_

---

### `Const` mockHttpRemove

• **mockHttpRemove**: _Mock‹Promise‹object›, []›_ = jest.fn(() =>
Promise.resolve({ ok: true, status: 200, body: { remove: true } })
)

_Defined in [demand-api/src/testMocks.ts:119](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L119)_

## Functions

### getApi

▸ **getApi**(`apiOptions`: [ApiOptions](_karhoo_demand_api.md#apioptions)): _[Api](_karhoo_demand_api.md#api)_

_Defined in [demand-api/src/api/index.ts:9](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/api/index.ts#L9)_

**Parameters:**

| Name         | Type                                           | Default |
| ------------ | ---------------------------------------------- | ------- |
| `apiOptions` | [ApiOptions](_karhoo_demand_api.md#apioptions) | {}      |

**Returns:** _[Api](_karhoo_demand_api.md#api)_

---

### `Const` getApiMock

▸ **getApiMock**(): _object_

_Defined in [demand-api/src/testMocks.ts:141](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L141)_

**Returns:** _object_

- **mockClear**(): _void_

- ### **locationService**: _object_

  - **getAddressAutocompleteData**: _Mock‹Promise‹object & object | object & object›, [any]›_ = mockLocationGetAddressAutocompleteData

  - **getAddressDetails**: _Mock‹Promise‹object & object | object & object›, [any]›_ = mockLocationGetAddressDetails

- ### **poiService**: _object_

  - **search**: _Mock‹Promise‹object & object | object & object›, [any]›_ = mockPoiSearch

- ### **quotesService**: _object_

  - **checkAvailability**: _Mock‹Promise‹object & object | object & object›, []›_ = mockQuotesCheckAvailability

---

### `Const` getLocationGetAddressAutocompleteDataMock

▸ **getLocationGetAddressAutocompleteDataMock**(): _Mock‹Promise‹object & object | object & object›, [any]›_

_Defined in [demand-api/src/testMocks.ts:128](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L128)_

**Returns:** _Mock‹Promise‹object & object | object & object›, [any]›_

---

### `Const` getLocationGetAddressDetailsMock

▸ **getLocationGetAddressDetailsMock**(): _Mock‹Promise‹object & object | object & object›, [any]›_

_Defined in [demand-api/src/testMocks.ts:123](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L123)_

**Returns:** _Mock‹Promise‹object & object | object & object›, [any]›_

---

### `Const` getMockedErrorLocationAddressAutocompleteResponse

▸ **getMockedErrorLocationAddressAutocompleteResponse**(): _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›_

_Defined in [demand-api/src/testMocks.ts:107](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L107)_

**Returns:** _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›_

---

### `Const` getMockedErrorLocationAddressDetailsResponse

▸ **getMockedErrorLocationAddressDetailsResponse**(): _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›_

_Defined in [demand-api/src/testMocks.ts:82](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L82)_

**Returns:** _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›_

---

### `Const` getMockedErrorPoiSearchResponse

▸ **getMockedErrorPoiSearchResponse**(): _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›_

_Defined in [demand-api/src/testMocks.ts:40](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L40)_

**Returns:** _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›_

---

### `Const` getMockedErrorQuotesAvailabilityResponse

▸ **getMockedErrorQuotesAvailabilityResponse**(): _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›_

_Defined in [demand-api/src/testMocks.ts:58](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L58)_

**Returns:** _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›_

---

### `Const` getMockedLocationAddressAutocompleteResponse

▸ **getMockedLocationAddressAutocompleteResponse**(`data`: any): _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›_

_Defined in [demand-api/src/testMocks.ts:91](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L91)_

**Parameters:**

| Name   | Type |
| ------ | ---- |
| `data` | any  |

**Returns:** _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)›_

---

### `Const` getMockedLocationAddressDetailsResponse

▸ **getMockedLocationAddressDetailsResponse**(`data`: any): _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›_

_Defined in [demand-api/src/testMocks.ts:67](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L67)_

**Parameters:**

| Name   | Type |
| ------ | ---- |
| `data` | any  |

**Returns:** _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)›_

---

### `Const` getMockedPoiSearchResponse

▸ **getMockedPoiSearchResponse**(`data`: any): _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›_

_Defined in [demand-api/src/testMocks.ts:7](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L7)_

**Parameters:**

| Name   | Type |
| ------ | ---- |
| `data` | any  |

**Returns:** _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)›_

---

### `Const` getMockedQuotesAvailabilityResponse

▸ **getMockedQuotesAvailabilityResponse**(): _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›_

_Defined in [demand-api/src/testMocks.ts:49](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L49)_

**Returns:** _[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)›_

---

### `Const` getPoiSearchMock

▸ **getPoiSearchMock**(): _Mock‹Promise‹object & object | object & object›, [any]›_

_Defined in [demand-api/src/testMocks.ts:133](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L133)_

**Returns:** _Mock‹Promise‹object & object | object & object›, [any]›_

---

### `Const` getQuotesCheckAvailabilityMock

▸ **getQuotesCheckAvailabilityMock**(): _Mock‹Promise‹object & object | object & object›, []›_

_Defined in [demand-api/src/testMocks.ts:138](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/testMocks.ts#L138)_

**Returns:** _Mock‹Promise‹object & object | object & object›, []›_

---

### `Const` isOffline

▸ **isOffline**(`message`: string): _boolean_

_Defined in [demand-api/src/http/HttpService.ts:13](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L13)_

**Parameters:**

| Name      | Type   |
| --------- | ------ |
| `message` | string |

**Returns:** _boolean_

---

### request

▸ **request**<**T**>(`url`: string, `options`: RequestInit): _Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹T››_

_Defined in [demand-api/src/http/HttpService.ts:15](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L15)_

**Type parameters:**

▪ **T**

**Parameters:**

| Name      | Type        |
| --------- | ----------- |
| `url`     | string      |
| `options` | RequestInit |

**Returns:** _Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹T››_

---

### toJsonBody

▸ **toJsonBody**(`body`: object, `headers`: Record‹string, string›): _object_

_Defined in [demand-api/src/http/HttpService.ts:39](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L39)_

**Parameters:**

| Name      | Type                   | Default |
| --------- | ---------------------- | ------- |
| `body`    | object                 | -       |
| `headers` | Record‹string, string› | {}      |

**Returns:** _object_

- **body**: _string_ = JSON.stringify(body)

- ### **headers**: _object_

  - **content-type**: _string_ = "application/json"

---

### `Const` toSnakeCase

▸ **toSnakeCase**<**T**, **Y**>(`data`: T): _Y_

_Defined in [demand-api/src/utils.ts:4](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/utils.ts#L4)_

**Type parameters:**

▪ **T**: _object_

▪ **Y**: _object_

**Parameters:**

| Name   | Type |
| ------ | ---- |
| `data` | T    |

**Returns:** _Y_

## Object literals

### `Const` errorCodes

### ▪ **errorCodes**: _object_

_Defined in [demand-api/src/responseCodes.ts:1](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L1)_

### ERR_OFFLINE

• **ERR_OFFLINE**: _string_ = "ERR_OFFLINE"

_Defined in [demand-api/src/responseCodes.ts:3](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L3)_

### ERR_UNKNOWN

• **ERR_UNKNOWN**: _string_ = "ERR_UNKNOWN"

_Defined in [demand-api/src/responseCodes.ts:2](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L2)_

### K0001

• **K0001**: _string_ = "K0001"

_Defined in [demand-api/src/responseCodes.ts:4](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L4)_

### K0002

• **K0002**: _string_ = "K0002"

_Defined in [demand-api/src/responseCodes.ts:5](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L5)_

### K0003

• **K0003**: _string_ = "K0003"

_Defined in [demand-api/src/responseCodes.ts:6](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L6)_

### K0004

• **K0004**: _string_ = "K0004"

_Defined in [demand-api/src/responseCodes.ts:7](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L7)_

### K0005

• **K0005**: _string_ = "K0005"

_Defined in [demand-api/src/responseCodes.ts:8](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L8)_

### K0006

• **K0006**: _string_ = "K0006"

_Defined in [demand-api/src/responseCodes.ts:9](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L9)_

### K0007

• **K0007**: _string_ = "K0007"

_Defined in [demand-api/src/responseCodes.ts:10](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L10)_

### K1001

• **K1001**: _string_ = "K1001"

_Defined in [demand-api/src/responseCodes.ts:11](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L11)_

### K1002

• **K1002**: _string_ = "K1002"

_Defined in [demand-api/src/responseCodes.ts:12](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L12)_

### K1003

• **K1003**: _string_ = "K1003"

_Defined in [demand-api/src/responseCodes.ts:13](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L13)_

### K1004

• **K1004**: _string_ = "K1004"

_Defined in [demand-api/src/responseCodes.ts:14](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L14)_

### K1005

• **K1005**: _string_ = "K1005"

_Defined in [demand-api/src/responseCodes.ts:15](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L15)_

### K1006

• **K1006**: _string_ = "K1006"

_Defined in [demand-api/src/responseCodes.ts:16](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L16)_

### K2001

• **K2001**: _string_ = "K2001"

_Defined in [demand-api/src/responseCodes.ts:17](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L17)_

### K3001

• **K3001**: _string_ = "K3001"

_Defined in [demand-api/src/responseCodes.ts:18](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L18)_

### K3002

• **K3002**: _string_ = "K3002"

_Defined in [demand-api/src/responseCodes.ts:19](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L19)_

### K3003

• **K3003**: _string_ = "K3003"

_Defined in [demand-api/src/responseCodes.ts:20](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L20)_

### K4001

• **K4001**: _string_ = "K4001"

_Defined in [demand-api/src/responseCodes.ts:21](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L21)_

### K4002

• **K4002**: _string_ = "K4002"

_Defined in [demand-api/src/responseCodes.ts:22](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L22)_

### K4003

• **K4003**: _string_ = "K4003"

_Defined in [demand-api/src/responseCodes.ts:23](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L23)_

### K4004

• **K4004**: _string_ = "K4004"

_Defined in [demand-api/src/responseCodes.ts:24](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L24)_

### K4005

• **K4005**: _string_ = "K4005"

_Defined in [demand-api/src/responseCodes.ts:25](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L25)_

### K4006

• **K4006**: _string_ = "K4006"

_Defined in [demand-api/src/responseCodes.ts:26](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L26)_

### K4007

• **K4007**: _string_ = "K4007"

_Defined in [demand-api/src/responseCodes.ts:27](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L27)_

### K4008

• **K4008**: _string_ = "K4008"

_Defined in [demand-api/src/responseCodes.ts:28](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L28)_

### K4009

• **K4009**: _string_ = "K4009"

_Defined in [demand-api/src/responseCodes.ts:29](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L29)_

### K4010

• **K4010**: _string_ = "K4010"

_Defined in [demand-api/src/responseCodes.ts:30](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L30)_

### K4011

• **K4011**: _string_ = "K4011"

_Defined in [demand-api/src/responseCodes.ts:31](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L31)_

### K4012

• **K4012**: _string_ = "K4012"

_Defined in [demand-api/src/responseCodes.ts:32](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L32)_

### K4013

• **K4013**: _string_ = "K4013"

_Defined in [demand-api/src/responseCodes.ts:33](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L33)_

### K4020

• **K4020**: _string_ = "K4020"

_Defined in [demand-api/src/responseCodes.ts:34](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L34)_

### K5001

• **K5001**: _string_ = "K5001"

_Defined in [demand-api/src/responseCodes.ts:35](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L35)_

### K5002

• **K5002**: _string_ = "K5002"

_Defined in [demand-api/src/responseCodes.ts:36](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L36)_

### K5003

• **K5003**: _string_ = "K5003"

_Defined in [demand-api/src/responseCodes.ts:37](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L37)_

### K6001

• **K6001**: _string_ = "K6001"

_Defined in [demand-api/src/responseCodes.ts:38](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L38)_

### K7001

• **K7001**: _string_ = "K7001"

_Defined in [demand-api/src/responseCodes.ts:39](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L39)_

### K7002

• **K7002**: _string_ = "K7002"

_Defined in [demand-api/src/responseCodes.ts:40](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L40)_

### K7003

• **K7003**: _string_ = "K7003"

_Defined in [demand-api/src/responseCodes.ts:41](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L41)_

### K7004

• **K7004**: _string_ = "K7004"

_Defined in [demand-api/src/responseCodes.ts:42](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L42)_

### K7005

• **K7005**: _string_ = "K7005"

_Defined in [demand-api/src/responseCodes.ts:43](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/responseCodes.ts#L43)_
