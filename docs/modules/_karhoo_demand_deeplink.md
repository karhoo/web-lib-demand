[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-deeplink](_karhoo_demand_deeplink.md)

# Module: @karhoo/demand-deeplink

# `Demand Deeplink`

The **Demand Deeplink** is intended to be the standard way of working with deeplink ([https://developer.karhoo.com/docs/deeplink-integration](https://developer.karhoo.com/docs/deeplink-integration))

## Warnings

This library uses `URLSearchParams`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use either `js-core@3` or [`url-search-params-polyfill`](https://www.npmjs.com/package/url-search-params-polyfill)

This library uses `Promise` and `fetch`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise` and [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) to polyfill `fetch`

## Installation

### NPM

```sh
npm install --save @karhoo/demand-deeplink
```

## Usage

```
import { parse, validate, generate, Deeplink } from 'demand-deeplink';
```

Parse deeplink:

```
const deeplinkData = parse(window.location.search)
```

Validate deeplink:

```
const { ok, errors } = validate(deeplinkData)
```

Generate deeplink:

```
const queryString = generate(deeplinkData)
```

Deeplink usage:

```
const deeplink = new Deeplink(window.location.search, options)

deeplink.resolve(subscriber)
```

## Index

### References

* [Deeplink](_karhoo_demand_deeplink.md#deeplink)
* [HttpService](_karhoo_demand_deeplink.md#httpservice)
* [LocationService](_karhoo_demand_deeplink.md#locationservice)
* [PoiService](_karhoo_demand_deeplink.md#poiservice)
* [QuotesService](_karhoo_demand_deeplink.md#quotesservice)
* [errorCodes](_karhoo_demand_deeplink.md#errorcodes)
* [errorMessageByCode](_karhoo_demand_deeplink.md#errormessagebycode)
* [generate](_karhoo_demand_deeplink.md#generate)
* [parse](_karhoo_demand_deeplink.md#parse)
* [validate](_karhoo_demand_deeplink.md#validate)

### Classes

* [Deeplink](../classes/_karhoo_demand_deeplink.deeplink.md)
* [HttpService](../classes/_karhoo_demand_deeplink.httpservice.md)
* [LocationService](../classes/_karhoo_demand_deeplink.locationservice.md)
* [PoiService](../classes/_karhoo_demand_deeplink.poiservice.md)
* [QuotesService](../classes/_karhoo_demand_deeplink.quotesservice.md)

### Interfaces

* [Http](../interfaces/_karhoo_demand_deeplink.http.md)

### Type aliases

* [ApiError](_karhoo_demand_deeplink.md#apierror)
* [AvailabilityPromisesList](_karhoo_demand_deeplink.md#availabilitypromiseslist)
* [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)
* [DeeplinkOptions](_karhoo_demand_deeplink.md#deeplinkoptions)
* [DefaultRequestOptions](_karhoo_demand_deeplink.md#defaultrequestoptions)
* [Dictionary](_karhoo_demand_deeplink.md#dictionary)
* [HttpResponse](_karhoo_demand_deeplink.md#httpresponse)
* [HttpResponseError](_karhoo_demand_deeplink.md#httpresponseerror)
* [HttpResponseOk](_karhoo_demand_deeplink.md#httpresponseok)
* [HttpResponsePayload](_karhoo_demand_deeplink.md#httpresponsepayload)
* [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)
* [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)
* [LocationAddressAutocompleteParams](_karhoo_demand_deeplink.md#locationaddressautocompleteparams)
* [LocationAddressAutocompleteResponse](_karhoo_demand_deeplink.md#locationaddressautocompleteresponse)
* [LocationAddressAutocompleteResponseItem](_karhoo_demand_deeplink.md#locationaddressautocompleteresponseitem)
* [LocationAddressDetailsParameters](_karhoo_demand_deeplink.md#locationaddressdetailsparameters)
* [LocationAddressDetailsResponse](_karhoo_demand_deeplink.md#locationaddressdetailsresponse)
* [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)
* [PlaceField](_karhoo_demand_deeplink.md#placefield)
* [PlacePromisesList](_karhoo_demand_deeplink.md#placepromiseslist)
* [PoiResponse](_karhoo_demand_deeplink.md#poiresponse)
* [PoiSearchParams](_karhoo_demand_deeplink.md#poisearchparams)
* [PoiSearchResponse](_karhoo_demand_deeplink.md#poisearchresponse)
* [Query](_karhoo_demand_deeplink.md#query)
* [QuotesAvailabilityParams](_karhoo_demand_deeplink.md#quotesavailabilityparams)
* [QuotesAvailabilityResponse](_karhoo_demand_deeplink.md#quotesavailabilityresponse)
* [RequestOptions](_karhoo_demand_deeplink.md#requestoptions)
* [ResolveAvailability](_karhoo_demand_deeplink.md#resolveavailability)
* [ResolveAvailabilityError](_karhoo_demand_deeplink.md#resolveavailabilityerror)
* [ResolveAvailabilityParams](_karhoo_demand_deeplink.md#resolveavailabilityparams)
* [ResolveAvailabilityResult](_karhoo_demand_deeplink.md#resolveavailabilityresult)
* [ResolveError](_karhoo_demand_deeplink.md#resolveerror)
* [ResolvePlace](_karhoo_demand_deeplink.md#resolveplace)
* [ResolvePlaceResult](_karhoo_demand_deeplink.md#resolveplaceresult)
* [ResolvePlaceValue](_karhoo_demand_deeplink.md#resolveplacevalue)
* [ResolveResponse](_karhoo_demand_deeplink.md#resolveresponse)
* [SearchPlaceData](_karhoo_demand_deeplink.md#searchplacedata)
* [ValidationError](_karhoo_demand_deeplink.md#validationerror)
* [ValidationResponse](_karhoo_demand_deeplink.md#validationresponse)

### Variables

* [deepLinkMetaPrefix](_karhoo_demand_deeplink.md#const-deeplinkmetaprefix)
* [dropoffKpoiParameter](_karhoo_demand_deeplink.md#const-dropoffkpoiparameter)
* [dropoffParameter](_karhoo_demand_deeplink.md#const-dropoffparameter)
* [dropoffPlaceFields](_karhoo_demand_deeplink.md#const-dropoffplacefields)
* [dropoffPlaceIdParameter](_karhoo_demand_deeplink.md#const-dropoffplaceidparameter)
* [emailParameter](_karhoo_demand_deeplink.md#const-emailparameter)
* [expectedTimeFormatRegexp](_karhoo_demand_deeplink.md#const-expectedtimeformatregexp)
* [firstNameParameter](_karhoo_demand_deeplink.md#const-firstnameparameter)
* [journeyLegDropoffMetaPrefix](_karhoo_demand_deeplink.md#const-journeylegdropoffmetaprefix)
* [journeyLegFieldsRegexp](_karhoo_demand_deeplink.md#const-journeylegfieldsregexp)
* [journeyLegMainFields](_karhoo_demand_deeplink.md#const-journeylegmainfields)
* [journeyLegMetaPrefix](_karhoo_demand_deeplink.md#const-journeylegmetaprefix)
* [journeyLegPickupMetaPrefix](_karhoo_demand_deeplink.md#const-journeylegpickupmetaprefix)
* [journeyLegPrefix](_karhoo_demand_deeplink.md#const-journeylegprefix)
* [lastNameParameter](_karhoo_demand_deeplink.md#const-lastnameparameter)
* [legNameIndex](_karhoo_demand_deeplink.md#const-legnameindex)
* [luggageParameter](_karhoo_demand_deeplink.md#const-luggageparameter)
* [passengerInfoFields](_karhoo_demand_deeplink.md#const-passengerinfofields)
* [passengerParameter](_karhoo_demand_deeplink.md#const-passengerparameter)
* [phoneNumberParameter](_karhoo_demand_deeplink.md#const-phonenumberparameter)
* [pickupKpoiParameter](_karhoo_demand_deeplink.md#const-pickupkpoiparameter)
* [pickupParameter](_karhoo_demand_deeplink.md#const-pickupparameter)
* [pickupPlaceFields](_karhoo_demand_deeplink.md#const-pickupplacefields)
* [pickupPlaceIdParameter](_karhoo_demand_deeplink.md#const-pickupplaceidparameter)
* [pickupTimeParameter](_karhoo_demand_deeplink.md#const-pickuptimeparameter)
* [timezoneRegexp](_karhoo_demand_deeplink.md#const-timezoneregexp)
* [trainTimeParameter](_karhoo_demand_deeplink.md#const-traintimeparameter)
* [travellerLocaleParameter](_karhoo_demand_deeplink.md#const-travellerlocaleparameter)
* [travellerLocaleRegexp](_karhoo_demand_deeplink.md#const-travellerlocaleregexp)

### Functions

* [configurePlaceId](_karhoo_demand_deeplink.md#const-configureplaceid)
* [devIsObjectCheck](_karhoo_demand_deeplink.md#const-devisobjectcheck)
* [excludeUndefined](_karhoo_demand_deeplink.md#const-excludeundefined)
* [generate](_karhoo_demand_deeplink.md#generate)
* [getActivePlace](_karhoo_demand_deeplink.md#getactiveplace)
* [getAvailableParams](_karhoo_demand_deeplink.md#getavailableparams)
* [getError](_karhoo_demand_deeplink.md#geterror)
* [getJorneyLegsParams](_karhoo_demand_deeplink.md#getjorneylegsparams)
* [getJourneyLeg](_karhoo_demand_deeplink.md#getjourneyleg)
* [getJourneyLegs](_karhoo_demand_deeplink.md#getjourneylegs)
* [getJsonBody](_karhoo_demand_deeplink.md#getjsonbody)
* [getPassengerInfo](_karhoo_demand_deeplink.md#getpassengerinfo)
* [getPlaceCacheKey](_karhoo_demand_deeplink.md#getplacecachekey)
* [hasData](_karhoo_demand_deeplink.md#hasdata)
* [isLegCommonQueryParameter](_karhoo_demand_deeplink.md#const-islegcommonqueryparameter)
* [isLegDropoffMeta](_karhoo_demand_deeplink.md#const-islegdropoffmeta)
* [isLegMeta](_karhoo_demand_deeplink.md#const-islegmeta)
* [isLegMetaQueryParameter](_karhoo_demand_deeplink.md#const-islegmetaqueryparameter)
* [isLegPassengerInfoMeta](_karhoo_demand_deeplink.md#const-islegpassengerinfometa)
* [isLegPickupMeta](_karhoo_demand_deeplink.md#const-islegpickupmeta)
* [isLegQueryParameter](_karhoo_demand_deeplink.md#const-islegqueryparameter)
* [isNotEmptyString](_karhoo_demand_deeplink.md#const-isnotemptystring)
* [isObject](_karhoo_demand_deeplink.md#const-isobject)
* [isPickupPlace](_karhoo_demand_deeplink.md#ispickupplace)
* [isPositiveInteger](_karhoo_demand_deeplink.md#const-ispositiveinteger)
* [matchLegQueryParameter](_karhoo_demand_deeplink.md#const-matchlegqueryparameter)
* [parse](_karhoo_demand_deeplink.md#parse)
* [parseSearchString](_karhoo_demand_deeplink.md#parsesearchstring)
* [request](_karhoo_demand_deeplink.md#request)
* [resolvePromise](_karhoo_demand_deeplink.md#resolvepromise)
* [toSnakeCase](_karhoo_demand_deeplink.md#const-tosnakecase)
* [transformMapByKey](_karhoo_demand_deeplink.md#transformmapbykey)
* [validate](_karhoo_demand_deeplink.md#validate)
* [validateLeg](_karhoo_demand_deeplink.md#validateleg)
* [validateMeta](_karhoo_demand_deeplink.md#validatemeta)
* [validatePassengerInfo](_karhoo_demand_deeplink.md#validatepassengerinfo)
* [validateRoute](_karhoo_demand_deeplink.md#validateroute)
* [validateTime](_karhoo_demand_deeplink.md#validatetime)
* [validateTravellerLocale](_karhoo_demand_deeplink.md#validatetravellerlocale)

### Object literals

* [codes](_karhoo_demand_deeplink.md#const-codes)
* [errorMessageByCode](_karhoo_demand_deeplink.md#const-errormessagebycode)
* [journeyLegMetaPrefixes](_karhoo_demand_deeplink.md#const-journeylegmetaprefixes)

## References

###  Deeplink

• **Deeplink**:

___

###  HttpService

• **HttpService**:

___

###  LocationService

• **LocationService**:

___

###  PoiService

• **PoiService**:

___

###  QuotesService

• **QuotesService**:

___

###  errorCodes

• **errorCodes**:

___

###  errorMessageByCode

• **errorMessageByCode**:

___

###  generate

• **generate**:

___

###  parse

• **parse**:

___

###  validate

• **validate**:

## Type aliases

###  ApiError

Ƭ **ApiError**: *object*

*Defined in [demand-deeplink/src/api/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/types.ts#L1)*

#### Type declaration:

* **code**? : *undefined | string*

* **message**: *string*

___

###  AvailabilityPromisesList

Ƭ **AvailabilityPromisesList**: *object[]*

*Defined in [demand-deeplink/src/Deeplink.ts:28](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L28)*

___

###  DeeplinkData

Ƭ **DeeplinkData**: *object*

*Defined in [demand-deeplink/src/types.ts:30](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L30)*

#### Type declaration:

* **customFields**? : *[Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›*

* **legs**: *[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)[]*

* **meta**: *[Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›*

* **passengerInfo**: *[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)*

* **travellerLocale**? : *undefined | string*

___

###  DeeplinkOptions

Ƭ **DeeplinkOptions**: *object*

*Defined in [demand-deeplink/src/types.ts:56](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L56)*

#### Type declaration:

* **getDefaultRequestOptions**(): *function*

  * (): *[DefaultRequestOptions](_karhoo_demand_deeplink.md#defaultrequestoptions)*

* **url**: *string*

___

###  DefaultRequestOptions

Ƭ **DefaultRequestOptions**: *Omit‹[RequestOptions](_karhoo_demand_deeplink.md#requestoptions), "body" | "method" | "signal"›*

*Defined in [demand-deeplink/src/types.ts:54](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L54)*

___

###  Dictionary

Ƭ **Dictionary**: *object*

*Defined in [demand-deeplink/src/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L1)*

#### Type declaration:

* \[ **index**: *string*\]: T

___

###  HttpResponse

Ƭ **HttpResponse**: *[HttpResponseOk](_karhoo_demand_deeplink.md#httpresponseok)‹T› | [HttpResponseError](_karhoo_demand_deeplink.md#httpresponseerror)‹TError›*

*Defined in [demand-deeplink/src/api/types.ts:20](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/types.ts#L20)*

___

###  HttpResponseError

Ƭ **HttpResponseError**: *[HttpResponsePayload](_karhoo_demand_deeplink.md#httpresponsepayload) & object*

*Defined in [demand-deeplink/src/api/types.ts:15](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/types.ts#L15)*

___

###  HttpResponseOk

Ƭ **HttpResponseOk**: *[HttpResponsePayload](_karhoo_demand_deeplink.md#httpresponsepayload) & object*

*Defined in [demand-deeplink/src/api/types.ts:10](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/types.ts#L10)*

___

###  HttpResponsePayload

Ƭ **HttpResponsePayload**: *object*

*Defined in [demand-deeplink/src/api/types.ts:6](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/types.ts#L6)*

#### Type declaration:

* **status**: *number*

___

###  JourneyLeg

Ƭ **JourneyLeg**: *Partial‹object›*

*Defined in [demand-deeplink/src/types.ts:16](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L16)*

___

###  KeyValueList

Ƭ **KeyValueList**: *[string, string][]*

*Defined in [demand-deeplink/src/types.ts:5](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L5)*

___

###  LocationAddressAutocompleteParams

Ƭ **LocationAddressAutocompleteParams**: *object*

*Defined in [demand-deeplink/src/api/types.ts:36](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/types.ts#L36)*

#### Type declaration:

* **position**? : *undefined | object*

* **query**: *string*

* **radius**? : *undefined | number*

* **sessionToken**? : *undefined | string*

___

###  LocationAddressAutocompleteResponse

Ƭ **LocationAddressAutocompleteResponse**: *object*

*Defined in [demand-deeplink/src/types.ts:127](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L127)*

#### Type declaration:

* **locations**: *[LocationAddressAutocompleteResponseItem](_karhoo_demand_deeplink.md#locationaddressautocompleteresponseitem)[]*

___

###  LocationAddressAutocompleteResponseItem

Ƭ **LocationAddressAutocompleteResponseItem**: *object*

*Defined in [demand-deeplink/src/types.ts:121](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L121)*

#### Type declaration:

* **display_address**: *string*

* **place_id**: *string*

* **type**: *string*

___

###  LocationAddressDetailsParameters

Ƭ **LocationAddressDetailsParameters**: *object*

*Defined in [demand-deeplink/src/api/types.ts:31](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/types.ts#L31)*

#### Type declaration:

* **placeId**: *string*

* **sessionToken**? : *undefined | string*

___

###  LocationAddressDetailsResponse

Ƭ **LocationAddressDetailsResponse**: *object*

*Defined in [demand-deeplink/src/types.ts:114](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L114)*

#### Type declaration:

* **address**? : *undefined | object*

* **place_id**: *string*

___

###  PassengerInfo

Ƭ **PassengerInfo**: *Partial‹object›*

*Defined in [demand-deeplink/src/types.ts:7](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L7)*

___

###  PlaceField

Ƭ **PlaceField**: *typeof pickupPlaceFields[0] | typeof dropoffPlaceFields[0]*

*Defined in [demand-deeplink/src/Deeplink.ts:19](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L19)*

___

###  PlacePromisesList

Ƭ **PlacePromisesList**: *object[]*

*Defined in [demand-deeplink/src/Deeplink.ts:22](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L22)*

___

###  PoiResponse

Ƭ **PoiResponse**: *object*

*Defined in [demand-deeplink/src/types.ts:131](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L131)*

#### Type declaration:

* **address**(): *object*

  * **display_address**: *string*

* **id**? : *undefined | string*

___

###  PoiSearchParams

Ƭ **PoiSearchParams**: *object*

*Defined in [demand-deeplink/src/api/types.ts:46](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/types.ts#L46)*

#### Type declaration:

* **paginationOffset**: *number*

* **paginationRowCount**: *number*

* **searchKey**? : *undefined | string*

* **searchTerm**? : *undefined | string*

___

###  PoiSearchResponse

Ƭ **PoiSearchResponse**: *object*

*Defined in [demand-deeplink/src/types.ts:138](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L138)*

#### Type declaration:

* **pois**? : *[PoiResponse](_karhoo_demand_deeplink.md#poiresponse)[]*

___

###  Query

Ƭ **Query**: *Record‹string, string | number›*

*Defined in [demand-deeplink/src/api/types.ts:22](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/types.ts#L22)*

___

###  QuotesAvailabilityParams

Ƭ **QuotesAvailabilityParams**: *object*

*Defined in [demand-deeplink/src/api/types.ts:53](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/types.ts#L53)*

#### Type declaration:

* **dateRequired**? : *undefined | string*

* **destinationPlaceId**? : *undefined | string*

* **originPlaceId**: *string*

___

###  QuotesAvailabilityResponse

Ƭ **QuotesAvailabilityResponse**: *object*

*Defined in [demand-deeplink/src/types.ts:142](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L142)*

#### Type declaration:

* **availabilities**? : *[object]*

* **categories**? : *string[]*

___

###  RequestOptions

Ƭ **RequestOptions**: *Omit‹RequestInit, "window"› & object*

*Defined in [demand-deeplink/src/types.ts:49](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L49)*

___

###  ResolveAvailability

Ƭ **ResolveAvailability**: *object*

*Defined in [demand-deeplink/src/types.ts:89](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L89)*

#### Type declaration:

* **ok**: *true*

* **searchedParams**: *[ResolveAvailabilityParams](_karhoo_demand_deeplink.md#resolveavailabilityparams)*

___

###  ResolveAvailabilityError

Ƭ **ResolveAvailabilityError**: *[ResolveError](_karhoo_demand_deeplink.md#resolveerror) & object*

*Defined in [demand-deeplink/src/types.ts:94](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L94)*

___

###  ResolveAvailabilityParams

Ƭ **ResolveAvailabilityParams**: *object*

*Defined in [demand-deeplink/src/types.ts:83](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L83)*

#### Type declaration:

* **dateRequired**? : *undefined | string*

* **destinationPlaceId**? : *undefined | string*

* **originPlaceId**: *string*

___

###  ResolveAvailabilityResult

Ƭ **ResolveAvailabilityResult**: *[ResolveAvailability](_karhoo_demand_deeplink.md#resolveavailability) | [ResolveAvailabilityError](_karhoo_demand_deeplink.md#resolveavailabilityerror)*

*Defined in [demand-deeplink/src/types.ts:96](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L96)*

___

###  ResolveError

Ƭ **ResolveError**: *object*

*Defined in [demand-deeplink/src/types.ts:61](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L61)*

#### Type declaration:

* **error**(): *object*

  * **code**? : *undefined | string*

  * **message**: *string*

* **ok**: *false*

___

###  ResolvePlace

Ƭ **ResolvePlace**: *object*

*Defined in [demand-deeplink/src/types.ts:69](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L69)*

#### Type declaration:

* **data**(): *object*

  * **displayAddress**: *string*

  * **placeId**: *string*

  * **placeInfo**? : *[LocationAddressDetailsResponse](_karhoo_demand_deeplink.md#locationaddressdetailsresponse)*

  * **poiInfo**? : *[PoiResponse](_karhoo_demand_deeplink.md#poiresponse)*

* **ok**: *true*

___

###  ResolvePlaceResult

Ƭ **ResolvePlaceResult**: *[ResolvePlace](_karhoo_demand_deeplink.md#resolveplace) | [ResolveError](_karhoo_demand_deeplink.md#resolveerror)*

*Defined in [demand-deeplink/src/types.ts:79](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L79)*

___

###  ResolvePlaceValue

Ƭ **ResolvePlaceValue**: *[ResolvePlaceResult](_karhoo_demand_deeplink.md#resolveplaceresult) & object*

*Defined in [demand-deeplink/src/types.ts:81](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L81)*

___

###  ResolveResponse

Ƭ **ResolveResponse**: *object | object*

*Defined in [demand-deeplink/src/types.ts:98](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L98)*

___

###  SearchPlaceData

Ƭ **SearchPlaceData**: *object*

*Defined in [demand-deeplink/src/Deeplink.ts:20](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L20)*

#### Type declaration:

* **key**: *[PlaceField](_karhoo_demand_deeplink.md#placefield)*

* **value**: *string*

___

###  ValidationError

Ƭ **ValidationError**: *object*

*Defined in [demand-deeplink/src/types.ts:38](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L38)*

#### Type declaration:

* **code**: *string*

* **error**: *string*

* **path**: *string*

___

###  ValidationResponse

Ƭ **ValidationResponse**: *object*

*Defined in [demand-deeplink/src/types.ts:44](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/types.ts#L44)*

#### Type declaration:

* **errors**? : *[ValidationError](_karhoo_demand_deeplink.md#validationerror)[]*

* **ok**: *boolean*

## Variables

### `Const` deepLinkMetaPrefix

• **deepLinkMetaPrefix**: *"meta."* = "meta."

*Defined in [demand-deeplink/src/constants.ts:41](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L41)*

___

### `Const` dropoffKpoiParameter

• **dropoffKpoiParameter**: *"dropoff-kpoi"* = "dropoff-kpoi"

*Defined in [demand-deeplink/src/constants.ts:18](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L18)*

___

### `Const` dropoffParameter

• **dropoffParameter**: *"dropoff"* = "dropoff"

*Defined in [demand-deeplink/src/constants.ts:17](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L17)*

___

### `Const` dropoffPlaceFields

• **dropoffPlaceFields**: *"dropoff" | "dropoffKpoi" | "dropoffPlaceId"[]* = ['dropoff' as const, 'dropoffKpoi' as const, 'dropoffPlaceId' as const]

*Defined in [demand-deeplink/src/Deeplink.ts:17](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L17)*

___

### `Const` dropoffPlaceIdParameter

• **dropoffPlaceIdParameter**: *"dropoff-place_id"* = "dropoff-place_id"

*Defined in [demand-deeplink/src/constants.ts:19](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L19)*

___

### `Const` emailParameter

• **emailParameter**: *"email"* = "email"

*Defined in [demand-deeplink/src/constants.ts:10](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L10)*

___

### `Const` expectedTimeFormatRegexp

• **expectedTimeFormatRegexp**: *RegExp‹›* = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/

*Defined in [demand-deeplink/src/constants.ts:2](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L2)*

___

### `Const` firstNameParameter

• **firstNameParameter**: *"first-name"* = "first-name"

*Defined in [demand-deeplink/src/constants.ts:8](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L8)*

___

### `Const` journeyLegDropoffMetaPrefix

• **journeyLegDropoffMetaPrefix**: *"m-dropoff-"* = "m-dropoff-"

*Defined in [demand-deeplink/src/constants.ts:47](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L47)*

___

### `Const` journeyLegFieldsRegexp

• **journeyLegFieldsRegexp**: *RegExp‹›* = /^leg-(\d+)-(.+)/i

*Defined in [demand-deeplink/src/constants.ts:1](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L1)*

___

### `Const` journeyLegMainFields

• **journeyLegMainFields**: *string[]* = [
  pickupParameter,
  pickupKpoiParameter,
  pickupPlaceIdParameter,
  pickupTimeParameter,
  dropoffParameter,
  dropoffKpoiParameter,
  dropoffPlaceIdParameter,
]

*Defined in [demand-deeplink/src/constants.ts:31](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L31)*

___

### `Const` journeyLegMetaPrefix

• **journeyLegMetaPrefix**: *"m-"* = "m-"

*Defined in [demand-deeplink/src/constants.ts:45](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L45)*

___

### `Const` journeyLegPickupMetaPrefix

• **journeyLegPickupMetaPrefix**: *"m-pickup-"* = "m-pickup-"

*Defined in [demand-deeplink/src/constants.ts:46](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L46)*

___

### `Const` journeyLegPrefix

• **journeyLegPrefix**: *"leg-"* = "leg-"

*Defined in [demand-deeplink/src/constants.ts:43](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L43)*

___

### `Const` lastNameParameter

• **lastNameParameter**: *"last-name"* = "last-name"

*Defined in [demand-deeplink/src/constants.ts:9](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L9)*

___

### `Const` legNameIndex

• **legNameIndex**: *2* = 2

*Defined in [demand-deeplink/src/parse.ts:30](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L30)*

___

### `Const` luggageParameter

• **luggageParameter**: *"luggage"* = "luggage"

*Defined in [demand-deeplink/src/constants.ts:12](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L12)*

___

### `Const` passengerInfoFields

• **passengerInfoFields**: *string[]* = [
  passengerParameter,
  firstNameParameter,
  lastNameParameter,
  emailParameter,
  phoneNumberParameter,
  luggageParameter,
]

*Defined in [demand-deeplink/src/constants.ts:22](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L22)*

___

### `Const` passengerParameter

• **passengerParameter**: *"passengers"* = "passengers"

*Defined in [demand-deeplink/src/constants.ts:7](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L7)*

___

### `Const` phoneNumberParameter

• **phoneNumberParameter**: *"phone-number"* = "phone-number"

*Defined in [demand-deeplink/src/constants.ts:11](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L11)*

___

### `Const` pickupKpoiParameter

• **pickupKpoiParameter**: *"pickup-kpoi"* = "pickup-kpoi"

*Defined in [demand-deeplink/src/constants.ts:14](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L14)*

___

### `Const` pickupParameter

• **pickupParameter**: *"pickup"* = "pickup"

*Defined in [demand-deeplink/src/constants.ts:13](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L13)*

___

### `Const` pickupPlaceFields

• **pickupPlaceFields**: *"pickup" | "pickupKpoi" | "pickupPlaceId"[]* = ['pickup' as const, 'pickupKpoi' as const, 'pickupPlaceId' as const]

*Defined in [demand-deeplink/src/Deeplink.ts:16](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L16)*

___

### `Const` pickupPlaceIdParameter

• **pickupPlaceIdParameter**: *"pickup-place_id"* = "pickup-place_id"

*Defined in [demand-deeplink/src/constants.ts:15](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L15)*

___

### `Const` pickupTimeParameter

• **pickupTimeParameter**: *"pickup-time"* = "pickup-time"

*Defined in [demand-deeplink/src/constants.ts:16](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L16)*

___

### `Const` timezoneRegexp

• **timezoneRegexp**: *RegExp‹›* = /([+-][0-2]\d:[0-5]\d|Z)$/

*Defined in [demand-deeplink/src/constants.ts:3](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L3)*

___

### `Const` trainTimeParameter

• **trainTimeParameter**: *"train-time"* = "train-time"

*Defined in [demand-deeplink/src/constants.ts:20](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L20)*

___

### `Const` travellerLocaleParameter

• **travellerLocaleParameter**: *"traveller-locale"* = "traveller-locale"

*Defined in [demand-deeplink/src/constants.ts:6](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L6)*

___

### `Const` travellerLocaleRegexp

• **travellerLocaleRegexp**: *RegExp‹›* = /^[a-z]{2}-[a-z]{2}$/i

*Defined in [demand-deeplink/src/constants.ts:4](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L4)*

## Functions

### `Const` configurePlaceId

▸ **configurePlaceId**(`id`: string): *string*

*Defined in [demand-deeplink/src/Deeplink.ts:35](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *string*

___

### `Const` devIsObjectCheck

▸ **devIsObjectCheck**(`data`: object, `fieldName`: string): *void*

*Defined in [demand-deeplink/src/validate.ts:21](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/validate.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | object |
`fieldName` | string |

**Returns:** *void*

___

### `Const` excludeUndefined

▸ **excludeUndefined**<**T**>(`arr`: Array‹T | undefined›): *T[]*

*Defined in [demand-deeplink/src/utils.ts:13](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/utils.ts#L13)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`arr` | Array‹T &#124; undefined› |

**Returns:** *T[]*

___

###  generate

▸ **generate**(`deeplink`: [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)): *string*

*Defined in [demand-deeplink/src/generate.ts:63](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/generate.ts#L63)*

Generates a query string from a Deeplink data

**Parameters:**

Name | Type |
------ | ------ |
`deeplink` | [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata) |

**Returns:** *string*

___

###  getActivePlace

▸ **getActivePlace**(`leg`: [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg), `keys`: [PlaceField](_karhoo_demand_deeplink.md#placefield)[]): *undefined | object*

*Defined in [demand-deeplink/src/Deeplink.ts:41](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`leg` | [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg) |
`keys` | [PlaceField](_karhoo_demand_deeplink.md#placefield)[] |

**Returns:** *undefined | object*

___

###  getAvailableParams

▸ **getAvailableParams**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› | [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo), `prefix`: string, `transform`: (Anonymous function)): *[KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)*

*Defined in [demand-deeplink/src/generate.ts:13](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/generate.ts#L13)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› &#124; [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo) | - |
`prefix` | string | "" |
`transform` | (Anonymous function) | (a: string) => a |

**Returns:** *[KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)*

___

###  getError

▸ **getError**(`code`: string, `path`: string): *object*

*Defined in [demand-deeplink/src/errors.ts:25](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |
`path` | string |

**Returns:** *object*

* **code**: *string*

* **error**: *string* = errorMessageByCode[code] || ''

* **path**: *string*

___

###  getJorneyLegsParams

▸ **getJorneyLegsParams**(`data`: Array‹[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)›): *[string, string][]*

*Defined in [demand-deeplink/src/generate.ts:27](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/generate.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Array‹[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)› |

**Returns:** *[string, string][]*

___

###  getJourneyLeg

▸ **getJourneyLeg**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): *[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)*

*Defined in [demand-deeplink/src/parse.ts:86](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** *[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)*

___

###  getJourneyLegs

▸ **getJourneyLegs**(`legsInfo`: [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)): *object[]*

*Defined in [demand-deeplink/src/parse.ts:112](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`legsInfo` | [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist) |

**Returns:** *object[]*

___

###  getJsonBody

▸ **getJsonBody**(`body`: object, `headers`: Record‹string, string›): *object*

*Defined in [demand-deeplink/src/api/HttpService.ts:24](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/HttpService.ts#L24)*

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

###  getPassengerInfo

▸ **getPassengerInfo**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): *[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)*

*Defined in [demand-deeplink/src/parse.ts:75](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** *[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)*

___

###  getPlaceCacheKey

▸ **getPlaceCacheKey**(`key`: [PlaceField](_karhoo_demand_deeplink.md#placefield)): *string*

*Defined in [demand-deeplink/src/Deeplink.ts:47](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L47)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | [PlaceField](_karhoo_demand_deeplink.md#placefield) |

**Returns:** *string*

___

###  hasData

▸ **hasData**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): *boolean*

*Defined in [demand-deeplink/src/parse.ts:49](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** *boolean*

___

### `Const` isLegCommonQueryParameter

▸ **isLegCommonQueryParameter**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:55](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegDropoffMeta

▸ **isLegDropoffMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:68](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegMeta

▸ **isLegMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:64](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegMetaQueryParameter

▸ **isLegMetaQueryParameter**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:61](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegPassengerInfoMeta

▸ **isLegPassengerInfoMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:70](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegPickupMeta

▸ **isLegPickupMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:66](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegQueryParameter

▸ **isLegQueryParameter**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:73](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isNotEmptyString

▸ **isNotEmptyString**(`value`: any): *boolean*

*Defined in [demand-deeplink/src/utils.ts:6](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/utils.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

### `Const` isObject

▸ **isObject**(`value`: any): *boolean*

*Defined in [demand-deeplink/src/utils.ts:11](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/utils.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

###  isPickupPlace

▸ **isPickupPlace**(`key`: [PlaceField](_karhoo_demand_deeplink.md#placefield)): *boolean*

*Defined in [demand-deeplink/src/Deeplink.ts:51](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | [PlaceField](_karhoo_demand_deeplink.md#placefield) |

**Returns:** *boolean*

___

### `Const` isPositiveInteger

▸ **isPositiveInteger**(`value`: any): *boolean*

*Defined in [demand-deeplink/src/utils.ts:8](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/utils.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

### `Const` matchLegQueryParameter

▸ **matchLegQueryParameter**(`key`: string): *null | RegExpMatchArray‹›*

*Defined in [demand-deeplink/src/parse.ts:53](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *null | RegExpMatchArray‹›*

___

###  parse

▸ **parse**(`query`: string): *[DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)*

*Defined in [demand-deeplink/src/parse.ts:150](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *[DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)*

___

###  parseSearchString

▸ **parseSearchString**(`query`: string): *[string, string][]*

*Defined in [demand-deeplink/src/parse.ts:136](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *[string, string][]*

___

###  request

▸ **request**<**T**>(`url`: string, `options`: RequestInit): *Promise‹[HttpResponse](_karhoo_demand_deeplink.md#httpresponse)‹T››*

*Defined in [demand-deeplink/src/api/HttpService.ts:4](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/HttpService.ts#L4)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`options` | RequestInit |

**Returns:** *Promise‹[HttpResponse](_karhoo_demand_deeplink.md#httpresponse)‹T››*

___

###  resolvePromise

▸ **resolvePromise**<**T**, **Y**, **K**>(`cacheParams`: T, `promises`: K, `getNewPromise`: function): *Promise‹Y›*

*Defined in [demand-deeplink/src/Deeplink.ts:55](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/Deeplink.ts#L55)*

**Type parameters:**

▪ **T**: *object*

▪ **Y**

▪ **K**: *Array‹T & object›*

**Parameters:**

▪ **cacheParams**: *T*

▪ **promises**: *K*

▪ **getNewPromise**: *function*

▸ (): *Promise‹Y›*

**Returns:** *Promise‹Y›*

___

### `Const` toSnakeCase

▸ **toSnakeCase**<**T**, **Y**>(`data`: T): *Y*

*Defined in [demand-deeplink/src/utils.ts:15](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/utils.ts#L15)*

**Type parameters:**

▪ **T**: *object*

▪ **Y**: *object*

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |

**Returns:** *Y*

___

###  transformMapByKey

▸ **transformMapByKey**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›, `keyPrefix`: string, `filter`: function): *object*

*Defined in [demand-deeplink/src/parse.ts:32](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/parse.ts#L32)*

**Parameters:**

▪ **data**: *[Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›*

▪ **keyPrefix**: *string*

▪`Default value`  **filter**: *function*= () => true

▸ (`key`: string): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *object*

* \[ **index**: *string*\]: T

___

###  validate

▸ **validate**(`deeplinkData`: [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)): *[ValidationResponse](_karhoo_demand_deeplink.md#validationresponse)*

*Defined in [demand-deeplink/src/validate.ts:132](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/validate.ts#L132)*

**Parameters:**

Name | Type |
------ | ------ |
`deeplinkData` | [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata) |

**Returns:** *[ValidationResponse](_karhoo_demand_deeplink.md#validationresponse)*

___

###  validateLeg

▸ **validateLeg**(`leg`: [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg), `path`: string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:88](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/validate.ts#L88)*

**Parameters:**

Name | Type |
------ | ------ |
`leg` | [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg) |
`path` | string |

**Returns:** *object[]*

___

###  validateMeta

▸ **validateMeta**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›, `fieldName`: string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:27](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/validate.ts#L27)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› | - |
`fieldName` | string | "meta" |

**Returns:** *object[]*

___

###  validatePassengerInfo

▸ **validatePassengerInfo**(`data`: [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)): *object[]*

*Defined in [demand-deeplink/src/validate.ts:39](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/validate.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo) |

**Returns:** *object[]*

___

###  validateRoute

▸ **validateRoute**(`fields`: string[], `fieldName`: string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:64](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/validate.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | string[] |
`fieldName` | string |

**Returns:** *object[]*

___

###  validateTime

▸ **validateTime**(`time`: string, `fieldName`: string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:78](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/validate.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`time` | string |
`fieldName` | string |

**Returns:** *object[]*

___

###  validateTravellerLocale

▸ **validateTravellerLocale**(`locale?`: undefined | string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:58](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/validate.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`locale?` | undefined &#124; string |

**Returns:** *object[]*

## Object literals

### `Const` codes

### ▪ **codes**: *object*

*Defined in [demand-deeplink/src/errors.ts:1](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L1)*

###  DP001

• **DP001**: *string* = "DP001"

*Defined in [demand-deeplink/src/errors.ts:2](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L2)*

###  DP002

• **DP002**: *string* = "DP002"

*Defined in [demand-deeplink/src/errors.ts:3](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L3)*

###  DP003

• **DP003**: *string* = "DP003"

*Defined in [demand-deeplink/src/errors.ts:4](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L4)*

###  DP004

• **DP004**: *string* = "DP004"

*Defined in [demand-deeplink/src/errors.ts:5](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L5)*

###  DP005

• **DP005**: *string* = "DP005"

*Defined in [demand-deeplink/src/errors.ts:6](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L6)*

###  DP006

• **DP006**: *string* = "DP006"

*Defined in [demand-deeplink/src/errors.ts:7](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L7)*

###  DP007

• **DP007**: *string* = "DP007"

*Defined in [demand-deeplink/src/errors.ts:8](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L8)*

###  DP008

• **DP008**: *string* = "DP008"

*Defined in [demand-deeplink/src/errors.ts:9](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L9)*

###  DP009

• **DP009**: *string* = "DP009"

*Defined in [demand-deeplink/src/errors.ts:10](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L10)*

___

### `Const` errorMessageByCode

### ▪ **errorMessageByCode**: *object*

*Defined in [demand-deeplink/src/errors.ts:13](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L13)*

###  __computed

• **__computed**: *string* = "Pickup time is specified without pickup place"

*Defined in [demand-deeplink/src/errors.ts:14](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L14)*

*Defined in [demand-deeplink/src/errors.ts:15](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L15)*

*Defined in [demand-deeplink/src/errors.ts:16](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L16)*

*Defined in [demand-deeplink/src/errors.ts:17](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L17)*

*Defined in [demand-deeplink/src/errors.ts:18](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L18)*

*Defined in [demand-deeplink/src/errors.ts:19](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L19)*

*Defined in [demand-deeplink/src/errors.ts:20](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L20)*

*Defined in [demand-deeplink/src/errors.ts:21](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L21)*

*Defined in [demand-deeplink/src/errors.ts:22](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/errors.ts#L22)*

___

### `Const` journeyLegMetaPrefixes

### ▪ **journeyLegMetaPrefixes**: *object*

*Defined in [demand-deeplink/src/constants.ts:49](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L49)*

###  dropoffMeta

• **dropoffMeta**: *string* = journeyLegDropoffMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:51](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L51)*

###  meta

• **meta**: *string* = journeyLegMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:52](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L52)*

###  passengerInfo

• **passengerInfo**: *string* = journeyLegMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:53](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L53)*

###  pickupMeta

• **pickupMeta**: *string* = journeyLegPickupMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:50](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/constants.ts#L50)*
