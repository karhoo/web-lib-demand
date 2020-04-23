[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-deeplink](_karhoo_demand_deeplink.md)

# Module: @karhoo/demand-deeplink

<div align="center">
<a href="https://karhoo.com">
  <img
    alt="Karhoo logo"
    width="250px"
    src="https://cdn.karhoo.com/s/images/logos/karhoo_logo.png"
  />
</a>

<h1>Karhoo Demand Deeplink</h1>

Karhoo Deeplink is a method of passing the user’s required information from the Demand Partner’s side to a Karhoo web booking application.

This library is intended to be the standard way of working with a deeplink.

[**Read The Docs**](https://developer.karhoo.com/docs/deeplink-integration)

<hr />

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

## Installation

```
npm i @karhoo/demand-deeplink
```

## Warnings

This library uses `URLSearchParams`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use either `js-core@3` or [`url-search-params-polyfill`](https://www.npmjs.com/package/url-search-params-polyfill)

This library uses `Promise`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise`

## Usage

```
import { parse, validate, generate, Deeplink } from '@karhoo/demand-deeplink';
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

Resolve deeplink:

To use `Deeplink` class `api` parameter (see `Api` type [here](https://github.com/karhoo/web-lib-demand/blob/master/packages/demand-deeplink/src/types.ts)) should be passed as a second argument of `Deeplink` constructor. For this purposes `@karhoo/demand-api` can be used.

```
import { getApi } from '@karhoo/demand-api';

const api = getApi()

const subscriber = (data) => console.log(data)

const deeplink = new Deeplink(window.location.search, api)

deeplink.resolve(subscriber)
```

### Example

A lot of deeplink examples can be found [here](https://developer.karhoo.com/docs/deeplink-integration#section-examples)

Let's imagine, you want to deeplink from a hotel booking website to a Karhoo cab booking website.

Your customer booked a hotel room and reached a booking confirmation page. From here you can offer a complementary service to book a cab to a hotel's location.

At this stage, you know:

1. Hotel address
2. Time when a cab is required (based on hotel check-in hours)
3. Number of passengers
4. Passenger first and last name (if you're willing to pass it)

All these parameters can be embedded to a Deeplink and passed to a Karhoo booking app.

_Step 1. Compose deeplink data_

```
const deeplinkData = {
  legs: [
    {
      dropoff: "Hotel Ermitage, London, UK",
      pickupTime: "2020-03-12T12:00:00+01:00"
    }
  ],
  passengerInfo: {
    passengers: 3,
    firstName: 'Jon'
  },
  meta: {},
}
```

_Step 2. Validate deeplink data_

```
import { validate } from '@karhoo/demand-deeplink'

const { ok, errors } = validate(deeplinkData)

if (!ok) {
  console.log("Deeplink data is invalid", errors)
}

```

_Step 3. Generate a deeplink_

```
import { validate, generate } from '@karhoo/demand-deeplink'

const { ok, errors } = validate(deeplinkData)

if (!ok) {
  console.log("Deeplink data is invalid", errors)
  return
}

const deeplink = generate(deeplinkData)
```

```
console.log(deeplink) // ?leg-1-dropoff=Hotel+Ermitage%2C+London%2C+UK&leg-1-pickup-time=2020-03-12T12%3A00%3A00%2B01%3A00&passengers=3&first-name=Jon
```

When you get a deeplink you can navigate your user from your website by adding the link to `href` attribute.

For example, `<a target="_blank" href="https://your-branded-app.kathoo.com/landing/?leg-1-dropoff=Hotel+Ermitage%2C+London%2C+UK&leg-1-pickup-time=2020-03-12T12%3A00%3A00%2B01%3A00&passengers=3&first-name=Jon"> Book a cab to a hotel </a>`

## Issues

_Looking to contribute?_

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior with a label `DEEPLINK`

### 💡 Feature Requests

Please file an issue to suggest new features with a label `DEEPLINK`. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

### ❓ Questions

For questions related to using the library, please re-visit a documentation first. If there are no answer, please create an issue with a label `help needed` and `DEEPLINK`.

## Contributing

### License

[BSD-2-Clause](../LICENSE)

## Index

### References

- [Api](_karhoo_demand_deeplink.md#api)
- [Deeplink](_karhoo_demand_deeplink.md#deeplink)
- [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)
- [Dictionary](_karhoo_demand_deeplink.md#dictionary)
- [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)
- [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)
- [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)
- [ResolveAvailabilityParams](_karhoo_demand_deeplink.md#resolveavailabilityparams)
- [ResolveAvailabilityResult](_karhoo_demand_deeplink.md#resolveavailabilityresult)
- [ResolvePlaceResult](_karhoo_demand_deeplink.md#resolveplaceresult)
- [ResolveResponse](_karhoo_demand_deeplink.md#resolveresponse)
- [ValidationError](_karhoo_demand_deeplink.md#validationerror)
- [ValidationResponse](_karhoo_demand_deeplink.md#validationresponse)
- [errorCodes](_karhoo_demand_deeplink.md#errorcodes)
- [errorMessageByCode](_karhoo_demand_deeplink.md#errormessagebycode)
- [generate](_karhoo_demand_deeplink.md#generate)
- [parse](_karhoo_demand_deeplink.md#parse)
- [validate](_karhoo_demand_deeplink.md#validate)

### Classes

- [Deeplink](../classes/_karhoo_demand_deeplink.deeplink.md)

### Type aliases

- [Api](_karhoo_demand_deeplink.md#api)
- [AvailabilityPromisesList](_karhoo_demand_deeplink.md#availabilitypromiseslist)
- [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)
- [Dictionary](_karhoo_demand_deeplink.md#dictionary)
- [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)
- [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)
- [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)
- [PlaceField](_karhoo_demand_deeplink.md#placefield)
- [PlacePromisesList](_karhoo_demand_deeplink.md#placepromiseslist)
- [ResolveAvailability](_karhoo_demand_deeplink.md#resolveavailability)
- [ResolveAvailabilityError](_karhoo_demand_deeplink.md#resolveavailabilityerror)
- [ResolveAvailabilityParams](_karhoo_demand_deeplink.md#resolveavailabilityparams)
- [ResolveAvailabilityResult](_karhoo_demand_deeplink.md#resolveavailabilityresult)
- [ResolveError](_karhoo_demand_deeplink.md#resolveerror)
- [ResolvePlace](_karhoo_demand_deeplink.md#resolveplace)
- [ResolvePlaceResult](_karhoo_demand_deeplink.md#resolveplaceresult)
- [ResolvePlaceValue](_karhoo_demand_deeplink.md#resolveplacevalue)
- [ResolveResponse](_karhoo_demand_deeplink.md#resolveresponse)
- [SearchPlaceData](_karhoo_demand_deeplink.md#searchplacedata)
- [ValidationError](_karhoo_demand_deeplink.md#validationerror)
- [ValidationResponse](_karhoo_demand_deeplink.md#validationresponse)

### Variables

- [deepLinkMetaPrefix](_karhoo_demand_deeplink.md#const-deeplinkmetaprefix)
- [dropoffKpoiParameter](_karhoo_demand_deeplink.md#const-dropoffkpoiparameter)
- [dropoffParameter](_karhoo_demand_deeplink.md#const-dropoffparameter)
- [dropoffPlaceFields](_karhoo_demand_deeplink.md#const-dropoffplacefields)
- [dropoffPlaceIdParameter](_karhoo_demand_deeplink.md#const-dropoffplaceidparameter)
- [emailParameter](_karhoo_demand_deeplink.md#const-emailparameter)
- [expectedTimeFormatRegexp](_karhoo_demand_deeplink.md#const-expectedtimeformatregexp)
- [firstNameParameter](_karhoo_demand_deeplink.md#const-firstnameparameter)
- [journeyLegDropoffMetaPrefix](_karhoo_demand_deeplink.md#const-journeylegdropoffmetaprefix)
- [journeyLegFieldsRegexp](_karhoo_demand_deeplink.md#const-journeylegfieldsregexp)
- [journeyLegMainFields](_karhoo_demand_deeplink.md#const-journeylegmainfields)
- [journeyLegMetaPrefix](_karhoo_demand_deeplink.md#const-journeylegmetaprefix)
- [journeyLegPickupMetaPrefix](_karhoo_demand_deeplink.md#const-journeylegpickupmetaprefix)
- [journeyLegPrefix](_karhoo_demand_deeplink.md#const-journeylegprefix)
- [lastNameParameter](_karhoo_demand_deeplink.md#const-lastnameparameter)
- [legNameIndex](_karhoo_demand_deeplink.md#const-legnameindex)
- [luggageParameter](_karhoo_demand_deeplink.md#const-luggageparameter)
- [passengerInfoFields](_karhoo_demand_deeplink.md#const-passengerinfofields)
- [passengerParameter](_karhoo_demand_deeplink.md#const-passengerparameter)
- [phoneNumberParameter](_karhoo_demand_deeplink.md#const-phonenumberparameter)
- [pickupKpoiParameter](_karhoo_demand_deeplink.md#const-pickupkpoiparameter)
- [pickupParameter](_karhoo_demand_deeplink.md#const-pickupparameter)
- [pickupPlaceFields](_karhoo_demand_deeplink.md#const-pickupplacefields)
- [pickupPlaceIdParameter](_karhoo_demand_deeplink.md#const-pickupplaceidparameter)
- [pickupTimeParameter](_karhoo_demand_deeplink.md#const-pickuptimeparameter)
- [timezoneRegexp](_karhoo_demand_deeplink.md#const-timezoneregexp)
- [trainTimeParameter](_karhoo_demand_deeplink.md#const-traintimeparameter)
- [travellerLocaleParameter](_karhoo_demand_deeplink.md#const-travellerlocaleparameter)
- [travellerLocaleRegexp](_karhoo_demand_deeplink.md#const-travellerlocaleregexp)

### Functions

- [configurePlaceId](_karhoo_demand_deeplink.md#const-configureplaceid)
- [devIsObjectCheck](_karhoo_demand_deeplink.md#const-devisobjectcheck)
- [excludeUndefined](_karhoo_demand_deeplink.md#const-excludeundefined)
- [generate](_karhoo_demand_deeplink.md#generate)
- [getActivePlace](_karhoo_demand_deeplink.md#getactiveplace)
- [getAvailableParams](_karhoo_demand_deeplink.md#getavailableparams)
- [getError](_karhoo_demand_deeplink.md#geterror)
- [getJorneyLegsParams](_karhoo_demand_deeplink.md#getjorneylegsparams)
- [getJourneyLeg](_karhoo_demand_deeplink.md#getjourneyleg)
- [getJourneyLegs](_karhoo_demand_deeplink.md#getjourneylegs)
- [getPassengerInfo](_karhoo_demand_deeplink.md#getpassengerinfo)
- [getPlaceCacheKey](_karhoo_demand_deeplink.md#getplacecachekey)
- [hasData](_karhoo_demand_deeplink.md#hasdata)
- [isLegCommonQueryParameter](_karhoo_demand_deeplink.md#const-islegcommonqueryparameter)
- [isLegDropoffMeta](_karhoo_demand_deeplink.md#const-islegdropoffmeta)
- [isLegMeta](_karhoo_demand_deeplink.md#const-islegmeta)
- [isLegMetaQueryParameter](_karhoo_demand_deeplink.md#const-islegmetaqueryparameter)
- [isLegPassengerInfoMeta](_karhoo_demand_deeplink.md#const-islegpassengerinfometa)
- [isLegPickupMeta](_karhoo_demand_deeplink.md#const-islegpickupmeta)
- [isLegQueryParameter](_karhoo_demand_deeplink.md#const-islegqueryparameter)
- [isNotEmptyString](_karhoo_demand_deeplink.md#const-isnotemptystring)
- [isObject](_karhoo_demand_deeplink.md#const-isobject)
- [isPickupPlace](_karhoo_demand_deeplink.md#ispickupplace)
- [isPositiveInteger](_karhoo_demand_deeplink.md#const-ispositiveinteger)
- [matchLegQueryParameter](_karhoo_demand_deeplink.md#const-matchlegqueryparameter)
- [parse](_karhoo_demand_deeplink.md#parse)
- [parseSearchString](_karhoo_demand_deeplink.md#parsesearchstring)
- [resolvePromise](_karhoo_demand_deeplink.md#resolvepromise)
- [transformMapByKey](_karhoo_demand_deeplink.md#transformmapbykey)
- [validate](_karhoo_demand_deeplink.md#validate)
- [validateLeg](_karhoo_demand_deeplink.md#validateleg)
- [validateMeta](_karhoo_demand_deeplink.md#validatemeta)
- [validatePassengerInfo](_karhoo_demand_deeplink.md#validatepassengerinfo)
- [validateRoute](_karhoo_demand_deeplink.md#validateroute)
- [validateTime](_karhoo_demand_deeplink.md#validatetime)
- [validateTravellerLocale](_karhoo_demand_deeplink.md#validatetravellerlocale)

### Object literals

- [codes](_karhoo_demand_deeplink.md#const-codes)
- [errorMessageByCode](_karhoo_demand_deeplink.md#const-errormessagebycode)
- [journeyLegMetaPrefixes](_karhoo_demand_deeplink.md#const-journeylegmetaprefixes)

## References

### Api

• **Api**:

---

### Deeplink

• **Deeplink**:

---

### DeeplinkData

• **DeeplinkData**:

---

### Dictionary

• **Dictionary**:

---

### JourneyLeg

• **JourneyLeg**:

---

### KeyValueList

• **KeyValueList**:

---

### PassengerInfo

• **PassengerInfo**:

---

### ResolveAvailabilityParams

• **ResolveAvailabilityParams**:

---

### ResolveAvailabilityResult

• **ResolveAvailabilityResult**:

---

### ResolvePlaceResult

• **ResolvePlaceResult**:

---

### ResolveResponse

• **ResolveResponse**:

---

### ValidationError

• **ValidationError**:

---

### ValidationResponse

• **ValidationResponse**:

---

### errorCodes

• **errorCodes**:

---

### errorMessageByCode

• **errorMessageByCode**:

---

### generate

• **generate**:

---

### parse

• **parse**:

---

### validate

• **validate**:

## Type aliases

### Api

Ƭ **Api**: _object_

_Defined in [demand-deeplink/src/types.ts:14](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L14)_

#### Type declaration:

- **locationService**(): _object_

  - **getAddressAutocompleteData**(): _function_

    - (`params`: [LocationAddressAutocompleteParams](_karhoo_demand_api.md#locationaddressautocompleteparams)): _Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressAutocompleteResponse](_karhoo_demand_api.md#locationaddressautocompleteresponse)››_

  - **getAddressDetails**(): _function_

    - (`params`: [LocationAddressDetailsParameters](_karhoo_demand_api.md#locationaddressdetailsparameters)): _Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)››_

- **poiService**(): _object_

  - **search**(): _function_

    - (`params`: [PoiSearchParams](_karhoo_demand_api.md#poisearchparams)): _Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[PoiSearchResponse](_karhoo_demand_api.md#poisearchresponse)››_

- **quotesService**(): _object_

  - **checkAvailability**(): _function_

    - (`params`: [QuotesAvailabilityParams](_karhoo_demand_api.md#quotesavailabilityparams)): _Promise‹[HttpResponse](_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](_karhoo_demand_api.md#quotesavailabilityresponse)››_

---

### AvailabilityPromisesList

Ƭ **AvailabilityPromisesList**: _object[]_

_Defined in [demand-deeplink/src/Deeplink.ts:27](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L27)_

---

### DeeplinkData

Ƭ **DeeplinkData**: _object_

_Defined in [demand-deeplink/src/types.ts:60](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L60)_

#### Type declaration:

- **customFields**? : _[Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›_

- **legs**: _[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)[]_

- **meta**: _[Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›_

- **passengerInfo**: _[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)_

- **travellerLocale**? : _undefined | string_

---

### Dictionary

Ƭ **Dictionary**: _object_

_Defined in [demand-deeplink/src/types.ts:31](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L31)_

#### Type declaration:

- \[ **index**: _string_\]: T

---

### JourneyLeg

Ƭ **JourneyLeg**: _Partial‹object›_

_Defined in [demand-deeplink/src/types.ts:46](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L46)_

---

### KeyValueList

Ƭ **KeyValueList**: _[string, string][]_

_Defined in [demand-deeplink/src/types.ts:35](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L35)_

---

### PassengerInfo

Ƭ **PassengerInfo**: _Partial‹object›_

_Defined in [demand-deeplink/src/types.ts:37](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L37)_

---

### PlaceField

Ƭ **PlaceField**: _typeof pickupPlaceFields[0] | typeof dropoffPlaceFields[0]_

_Defined in [demand-deeplink/src/Deeplink.ts:18](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L18)_

---

### PlacePromisesList

Ƭ **PlacePromisesList**: _object[]_

_Defined in [demand-deeplink/src/Deeplink.ts:21](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L21)_

---

### ResolveAvailability

Ƭ **ResolveAvailability**: _object_

_Defined in [demand-deeplink/src/types.ts:107](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L107)_

#### Type declaration:

- **ok**: _true_

- **searchedParams**: _[ResolveAvailabilityParams](_karhoo_demand_deeplink.md#resolveavailabilityparams)_

---

### ResolveAvailabilityError

Ƭ **ResolveAvailabilityError**: _[ResolveError](_karhoo_demand_deeplink.md#resolveerror) & object_

_Defined in [demand-deeplink/src/types.ts:112](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L112)_

---

### ResolveAvailabilityParams

Ƭ **ResolveAvailabilityParams**: _object_

_Defined in [demand-deeplink/src/types.ts:101](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L101)_

#### Type declaration:

- **dateRequired**? : _undefined | string_

- **destinationPlaceId**? : _undefined | string_

- **originPlaceId**: _string_

---

### ResolveAvailabilityResult

Ƭ **ResolveAvailabilityResult**: _[ResolveAvailability](_karhoo_demand_deeplink.md#resolveavailability) | [ResolveAvailabilityError](_karhoo_demand_deeplink.md#resolveavailabilityerror)_

_Defined in [demand-deeplink/src/types.ts:114](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L114)_

---

### ResolveError

Ƭ **ResolveError**: _object_

_Defined in [demand-deeplink/src/types.ts:79](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L79)_

#### Type declaration:

- **error**(): _object_

  - **code**? : _undefined | string_

  - **message**: _string_

- **ok**: _false_

---

### ResolvePlace

Ƭ **ResolvePlace**: _object_

_Defined in [demand-deeplink/src/types.ts:87](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L87)_

#### Type declaration:

- **data**(): _object_

  - **displayAddress**: _string_

  - **placeId**: _string_

  - **placeInfo**? : _[LocationAddressDetailsResponse](_karhoo_demand_api.md#locationaddressdetailsresponse)_

  - **poiInfo**? : _[PoiResponse](_karhoo_demand_api.md#poiresponse)_

- **ok**: _true_

---

### ResolvePlaceResult

Ƭ **ResolvePlaceResult**: _[ResolvePlace](_karhoo_demand_deeplink.md#resolveplace) | [ResolveError](_karhoo_demand_deeplink.md#resolveerror)_

_Defined in [demand-deeplink/src/types.ts:97](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L97)_

---

### ResolvePlaceValue

Ƭ **ResolvePlaceValue**: _[ResolvePlaceResult](_karhoo_demand_deeplink.md#resolveplaceresult) & object_

_Defined in [demand-deeplink/src/types.ts:99](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L99)_

---

### ResolveResponse

Ƭ **ResolveResponse**: _object | object_

_Defined in [demand-deeplink/src/types.ts:116](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L116)_

---

### SearchPlaceData

Ƭ **SearchPlaceData**: _object_

_Defined in [demand-deeplink/src/Deeplink.ts:19](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L19)_

#### Type declaration:

- **key**: _[PlaceField](_karhoo_demand_deeplink.md#placefield)_

- **value**: _string_

---

### ValidationError

Ƭ **ValidationError**: _object_

_Defined in [demand-deeplink/src/types.ts:68](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L68)_

#### Type declaration:

- **code**: _string_

- **error**: _string_

- **path**: _string_

---

### ValidationResponse

Ƭ **ValidationResponse**: _object_

_Defined in [demand-deeplink/src/types.ts:74](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/types.ts#L74)_

#### Type declaration:

- **errors**? : _[ValidationError](_karhoo_demand_deeplink.md#validationerror)[]_

- **ok**: _boolean_

## Variables

### `Const` deepLinkMetaPrefix

• **deepLinkMetaPrefix**: _"meta."_ = "meta."

_Defined in [demand-deeplink/src/constants.ts:41](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L41)_

---

### `Const` dropoffKpoiParameter

• **dropoffKpoiParameter**: _"dropoff-kpoi"_ = "dropoff-kpoi"

_Defined in [demand-deeplink/src/constants.ts:18](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L18)_

---

### `Const` dropoffParameter

• **dropoffParameter**: _"dropoff"_ = "dropoff"

_Defined in [demand-deeplink/src/constants.ts:17](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L17)_

---

### `Const` dropoffPlaceFields

• **dropoffPlaceFields**: _"dropoff" | "dropoffKpoi" | "dropoffPlaceId"[]_ = ['dropoff' as const, 'dropoffKpoi' as const, 'dropoffPlaceId' as const]

_Defined in [demand-deeplink/src/Deeplink.ts:16](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L16)_

---

### `Const` dropoffPlaceIdParameter

• **dropoffPlaceIdParameter**: _"dropoff-place_id"_ = "dropoff-place_id"

_Defined in [demand-deeplink/src/constants.ts:19](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L19)_

---

### `Const` emailParameter

• **emailParameter**: _"email"_ = "email"

_Defined in [demand-deeplink/src/constants.ts:10](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L10)_

---

### `Const` expectedTimeFormatRegexp

• **expectedTimeFormatRegexp**: _RegExp‹›_ = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))\$/

_Defined in [demand-deeplink/src/constants.ts:2](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L2)_

---

### `Const` firstNameParameter

• **firstNameParameter**: _"first-name"_ = "first-name"

_Defined in [demand-deeplink/src/constants.ts:8](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L8)_

---

### `Const` journeyLegDropoffMetaPrefix

• **journeyLegDropoffMetaPrefix**: _"m-dropoff-"_ = "m-dropoff-"

_Defined in [demand-deeplink/src/constants.ts:47](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L47)_

---

### `Const` journeyLegFieldsRegexp

• **journeyLegFieldsRegexp**: _RegExp‹›_ = /^leg-(\d+)-(.+)/i

_Defined in [demand-deeplink/src/constants.ts:1](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L1)_

---

### `Const` journeyLegMainFields

• **journeyLegMainFields**: _string[]_ = [
pickupParameter,
pickupKpoiParameter,
pickupPlaceIdParameter,
pickupTimeParameter,
dropoffParameter,
dropoffKpoiParameter,
dropoffPlaceIdParameter,
]

_Defined in [demand-deeplink/src/constants.ts:31](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L31)_

---

### `Const` journeyLegMetaPrefix

• **journeyLegMetaPrefix**: _"m-"_ = "m-"

_Defined in [demand-deeplink/src/constants.ts:45](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L45)_

---

### `Const` journeyLegPickupMetaPrefix

• **journeyLegPickupMetaPrefix**: _"m-pickup-"_ = "m-pickup-"

_Defined in [demand-deeplink/src/constants.ts:46](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L46)_

---

### `Const` journeyLegPrefix

• **journeyLegPrefix**: _"leg-"_ = "leg-"

_Defined in [demand-deeplink/src/constants.ts:43](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L43)_

---

### `Const` lastNameParameter

• **lastNameParameter**: _"last-name"_ = "last-name"

_Defined in [demand-deeplink/src/constants.ts:9](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L9)_

---

### `Const` legNameIndex

• **legNameIndex**: _2_ = 2

_Defined in [demand-deeplink/src/parse.ts:30](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L30)_

---

### `Const` luggageParameter

• **luggageParameter**: _"luggage"_ = "luggage"

_Defined in [demand-deeplink/src/constants.ts:12](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L12)_

---

### `Const` passengerInfoFields

• **passengerInfoFields**: _string[]_ = [
passengerParameter,
firstNameParameter,
lastNameParameter,
emailParameter,
phoneNumberParameter,
luggageParameter,
]

_Defined in [demand-deeplink/src/constants.ts:22](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L22)_

---

### `Const` passengerParameter

• **passengerParameter**: _"passengers"_ = "passengers"

_Defined in [demand-deeplink/src/constants.ts:7](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L7)_

---

### `Const` phoneNumberParameter

• **phoneNumberParameter**: _"phone-number"_ = "phone-number"

_Defined in [demand-deeplink/src/constants.ts:11](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L11)_

---

### `Const` pickupKpoiParameter

• **pickupKpoiParameter**: _"pickup-kpoi"_ = "pickup-kpoi"

_Defined in [demand-deeplink/src/constants.ts:14](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L14)_

---

### `Const` pickupParameter

• **pickupParameter**: _"pickup"_ = "pickup"

_Defined in [demand-deeplink/src/constants.ts:13](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L13)_

---

### `Const` pickupPlaceFields

• **pickupPlaceFields**: _"pickup" | "pickupKpoi" | "pickupPlaceId"[]_ = ['pickup' as const, 'pickupKpoi' as const, 'pickupPlaceId' as const]

_Defined in [demand-deeplink/src/Deeplink.ts:15](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L15)_

---

### `Const` pickupPlaceIdParameter

• **pickupPlaceIdParameter**: _"pickup-place_id"_ = "pickup-place_id"

_Defined in [demand-deeplink/src/constants.ts:15](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L15)_

---

### `Const` pickupTimeParameter

• **pickupTimeParameter**: _"pickup-time"_ = "pickup-time"

_Defined in [demand-deeplink/src/constants.ts:16](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L16)_

---

### `Const` timezoneRegexp

• **timezoneRegexp**: _RegExp‹›_ = /([+-][0-2]\d:[0-5]\d|Z)\$/

_Defined in [demand-deeplink/src/constants.ts:3](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L3)_

---

### `Const` trainTimeParameter

• **trainTimeParameter**: _"train-time"_ = "train-time"

_Defined in [demand-deeplink/src/constants.ts:20](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L20)_

---

### `Const` travellerLocaleParameter

• **travellerLocaleParameter**: _"traveller-locale"_ = "traveller-locale"

_Defined in [demand-deeplink/src/constants.ts:6](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L6)_

---

### `Const` travellerLocaleRegexp

• **travellerLocaleRegexp**: _RegExp‹›_ = /^[a-z]{2}-[a-z]{2}\$/i

_Defined in [demand-deeplink/src/constants.ts:4](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L4)_

## Functions

### `Const` configurePlaceId

▸ **configurePlaceId**(`id`: string): _string_

_Defined in [demand-deeplink/src/Deeplink.ts:34](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L34)_

**Parameters:**

| Name | Type   |
| ---- | ------ |
| `id` | string |

**Returns:** _string_

---

### `Const` devIsObjectCheck

▸ **devIsObjectCheck**(`data`: object, `fieldName`: string): _void_

_Defined in [demand-deeplink/src/validate.ts:21](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/validate.ts#L21)_

**Parameters:**

| Name        | Type   |
| ----------- | ------ |
| `data`      | object |
| `fieldName` | string |

**Returns:** _void_

---

### `Const` excludeUndefined

▸ **excludeUndefined**<**T**>(`arr`: Array‹T | undefined›): _T[]_

_Defined in [demand-deeplink/src/utils.ts:12](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/utils.ts#L12)_

**Type parameters:**

▪ **T**

**Parameters:**

| Name  | Type                      |
| ----- | ------------------------- |
| `arr` | Array‹T &#124; undefined› |

**Returns:** _T[]_

---

### generate

▸ **generate**(`deeplink`: [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)): _string_

_Defined in [demand-deeplink/src/generate.ts:63](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/generate.ts#L63)_

Generates a query string from a Deeplink data

**Parameters:**

| Name       | Type                                                    |
| ---------- | ------------------------------------------------------- |
| `deeplink` | [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata) |

**Returns:** _string_

---

### getActivePlace

▸ **getActivePlace**(`leg`: [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg), `keys`: [PlaceField](_karhoo_demand_deeplink.md#placefield)[]): _undefined | object_

_Defined in [demand-deeplink/src/Deeplink.ts:40](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L40)_

**Parameters:**

| Name   | Type                                                  |
| ------ | ----------------------------------------------------- |
| `leg`  | [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)   |
| `keys` | [PlaceField](_karhoo_demand_deeplink.md#placefield)[] |

**Returns:** _undefined | object_

---

### getAvailableParams

▸ **getAvailableParams**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› | [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo), `prefix`: string, `transform`: (Anonymous function)): _[KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)_

_Defined in [demand-deeplink/src/generate.ts:13](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/generate.ts#L13)_

**Parameters:**

| Name        | Type                                                                                                                         | Default          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `data`      | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› &#124; [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo) | -                |
| `prefix`    | string                                                                                                                       | ""               |
| `transform` | (Anonymous function)                                                                                                         | (a: string) => a |

**Returns:** _[KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)_

---

### getError

▸ **getError**(`code`: string, `path`: string): _object_

_Defined in [demand-deeplink/src/errors.ts:25](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L25)_

**Parameters:**

| Name   | Type   |
| ------ | ------ |
| `code` | string |
| `path` | string |

**Returns:** _object_

- **code**: _string_

- **error**: _string_ = errorMessageByCode[code] || ''

- **path**: _string_

---

### getJorneyLegsParams

▸ **getJorneyLegsParams**(`data`: Array‹[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)›): _[string, string][]_

_Defined in [demand-deeplink/src/generate.ts:27](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/generate.ts#L27)_

**Parameters:**

| Name   | Type                                                       |
| ------ | ---------------------------------------------------------- |
| `data` | Array‹[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)› |

**Returns:** _[string, string][]_

---

### getJourneyLeg

▸ **getJourneyLeg**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): _[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)_

_Defined in [demand-deeplink/src/parse.ts:86](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L86)_

**Parameters:**

| Name   | Type                                                        |
| ------ | ----------------------------------------------------------- |
| `data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** _[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)_

---

### getJourneyLegs

▸ **getJourneyLegs**(`legsInfo`: [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)): _object[]_

_Defined in [demand-deeplink/src/parse.ts:112](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L112)_

**Parameters:**

| Name       | Type                                                    |
| ---------- | ------------------------------------------------------- |
| `legsInfo` | [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist) |

**Returns:** _object[]_

---

### getPassengerInfo

▸ **getPassengerInfo**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): _[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)_

_Defined in [demand-deeplink/src/parse.ts:75](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L75)_

**Parameters:**

| Name   | Type                                                        |
| ------ | ----------------------------------------------------------- |
| `data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** _[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)_

---

### getPlaceCacheKey

▸ **getPlaceCacheKey**(`key`: [PlaceField](_karhoo_demand_deeplink.md#placefield)): _string_

_Defined in [demand-deeplink/src/Deeplink.ts:46](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L46)_

**Parameters:**

| Name  | Type                                                |
| ----- | --------------------------------------------------- |
| `key` | [PlaceField](_karhoo_demand_deeplink.md#placefield) |

**Returns:** _string_

---

### hasData

▸ **hasData**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): _boolean_

_Defined in [demand-deeplink/src/parse.ts:49](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L49)_

**Parameters:**

| Name   | Type                                                        |
| ------ | ----------------------------------------------------------- |
| `data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** _boolean_

---

### `Const` isLegCommonQueryParameter

▸ **isLegCommonQueryParameter**(`key`: string): _boolean_

_Defined in [demand-deeplink/src/parse.ts:55](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L55)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _boolean_

---

### `Const` isLegDropoffMeta

▸ **isLegDropoffMeta**(`key`: string): _boolean_

_Defined in [demand-deeplink/src/parse.ts:68](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L68)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _boolean_

---

### `Const` isLegMeta

▸ **isLegMeta**(`key`: string): _boolean_

_Defined in [demand-deeplink/src/parse.ts:64](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L64)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _boolean_

---

### `Const` isLegMetaQueryParameter

▸ **isLegMetaQueryParameter**(`key`: string): _boolean_

_Defined in [demand-deeplink/src/parse.ts:61](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L61)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _boolean_

---

### `Const` isLegPassengerInfoMeta

▸ **isLegPassengerInfoMeta**(`key`: string): _boolean_

_Defined in [demand-deeplink/src/parse.ts:70](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L70)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _boolean_

---

### `Const` isLegPickupMeta

▸ **isLegPickupMeta**(`key`: string): _boolean_

_Defined in [demand-deeplink/src/parse.ts:66](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L66)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _boolean_

---

### `Const` isLegQueryParameter

▸ **isLegQueryParameter**(`key`: string): _boolean_

_Defined in [demand-deeplink/src/parse.ts:73](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L73)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _boolean_

---

### `Const` isNotEmptyString

▸ **isNotEmptyString**(`value`: any): _boolean_

_Defined in [demand-deeplink/src/utils.ts:5](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/utils.ts#L5)_

**Parameters:**

| Name    | Type |
| ------- | ---- |
| `value` | any  |

**Returns:** _boolean_

---

### `Const` isObject

▸ **isObject**(`value`: any): _boolean_

_Defined in [demand-deeplink/src/utils.ts:10](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/utils.ts#L10)_

**Parameters:**

| Name    | Type |
| ------- | ---- |
| `value` | any  |

**Returns:** _boolean_

---

### isPickupPlace

▸ **isPickupPlace**(`key`: [PlaceField](_karhoo_demand_deeplink.md#placefield)): _boolean_

_Defined in [demand-deeplink/src/Deeplink.ts:50](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L50)_

**Parameters:**

| Name  | Type                                                |
| ----- | --------------------------------------------------- |
| `key` | [PlaceField](_karhoo_demand_deeplink.md#placefield) |

**Returns:** _boolean_

---

### `Const` isPositiveInteger

▸ **isPositiveInteger**(`value`: any): _boolean_

_Defined in [demand-deeplink/src/utils.ts:7](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/utils.ts#L7)_

**Parameters:**

| Name    | Type |
| ------- | ---- |
| `value` | any  |

**Returns:** _boolean_

---

### `Const` matchLegQueryParameter

▸ **matchLegQueryParameter**(`key`: string): _null | RegExpMatchArray‹›_

_Defined in [demand-deeplink/src/parse.ts:53](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L53)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _null | RegExpMatchArray‹›_

---

### parse

▸ **parse**(`query`: string): _[DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)_

_Defined in [demand-deeplink/src/parse.ts:150](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L150)_

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `query` | string |

**Returns:** _[DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)_

---

### parseSearchString

▸ **parseSearchString**(`query`: string): _[string, string][]_

_Defined in [demand-deeplink/src/parse.ts:136](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L136)_

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `query` | string |

**Returns:** _[string, string][]_

---

### resolvePromise

▸ **resolvePromise**<**T**, **Y**, **K**>(`cacheParams`: T, `promises`: K, `getNewPromise`: function): _Promise‹Y›_

_Defined in [demand-deeplink/src/Deeplink.ts:54](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L54)_

**Type parameters:**

▪ **T**: _object_

▪ **Y**

▪ **K**: _Array‹T & object›_

**Parameters:**

▪ **cacheParams**: _T_

▪ **promises**: _K_

▪ **getNewPromise**: _function_

▸ (): _Promise‹Y›_

**Returns:** _Promise‹Y›_

---

### transformMapByKey

▸ **transformMapByKey**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›, `keyPrefix`: string, `filter`: function): _object_

_Defined in [demand-deeplink/src/parse.ts:32](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/parse.ts#L32)_

**Parameters:**

▪ **data**: _[Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›_

▪ **keyPrefix**: _string_

▪`Default value` **filter**: _function_= () => true

▸ (`key`: string): _boolean_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `key` | string |

**Returns:** _object_

- \[ **index**: _string_\]: T

---

### validate

▸ **validate**(`deeplinkData`: [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)): _[ValidationResponse](_karhoo_demand_deeplink.md#validationresponse)_

_Defined in [demand-deeplink/src/validate.ts:132](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/validate.ts#L132)_

**Parameters:**

| Name           | Type                                                    |
| -------------- | ------------------------------------------------------- |
| `deeplinkData` | [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata) |

**Returns:** _[ValidationResponse](_karhoo_demand_deeplink.md#validationresponse)_

---

### validateLeg

▸ **validateLeg**(`leg`: [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg), `path`: string): _object[]_

_Defined in [demand-deeplink/src/validate.ts:88](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/validate.ts#L88)_

**Parameters:**

| Name   | Type                                                |
| ------ | --------------------------------------------------- |
| `leg`  | [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg) |
| `path` | string                                              |

**Returns:** _object[]_

---

### validateMeta

▸ **validateMeta**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›, `fieldName`: string): _object[]_

_Defined in [demand-deeplink/src/validate.ts:27](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/validate.ts#L27)_

**Parameters:**

| Name        | Type                                                        | Default |
| ----------- | ----------------------------------------------------------- | ------- |
| `data`      | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› | -       |
| `fieldName` | string                                                      | "meta"  |

**Returns:** _object[]_

---

### validatePassengerInfo

▸ **validatePassengerInfo**(`data`: [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)): _object[]_

_Defined in [demand-deeplink/src/validate.ts:39](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/validate.ts#L39)_

**Parameters:**

| Name   | Type                                                      |
| ------ | --------------------------------------------------------- |
| `data` | [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo) |

**Returns:** _object[]_

---

### validateRoute

▸ **validateRoute**(`fields`: string[], `fieldName`: string): _object[]_

_Defined in [demand-deeplink/src/validate.ts:64](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/validate.ts#L64)_

**Parameters:**

| Name        | Type     |
| ----------- | -------- |
| `fields`    | string[] |
| `fieldName` | string   |

**Returns:** _object[]_

---

### validateTime

▸ **validateTime**(`time`: string, `fieldName`: string): _object[]_

_Defined in [demand-deeplink/src/validate.ts:78](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/validate.ts#L78)_

**Parameters:**

| Name        | Type   |
| ----------- | ------ |
| `time`      | string |
| `fieldName` | string |

**Returns:** _object[]_

---

### validateTravellerLocale

▸ **validateTravellerLocale**(`locale?`: undefined | string): _object[]_

_Defined in [demand-deeplink/src/validate.ts:58](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/validate.ts#L58)_

**Parameters:**

| Name      | Type                    |
| --------- | ----------------------- |
| `locale?` | undefined &#124; string |

**Returns:** _object[]_

## Object literals

### `Const` codes

### ▪ **codes**: _object_

_Defined in [demand-deeplink/src/errors.ts:1](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L1)_

### DP001

• **DP001**: _string_ = "DP001"

_Defined in [demand-deeplink/src/errors.ts:2](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L2)_

### DP002

• **DP002**: _string_ = "DP002"

_Defined in [demand-deeplink/src/errors.ts:3](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L3)_

### DP003

• **DP003**: _string_ = "DP003"

_Defined in [demand-deeplink/src/errors.ts:4](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L4)_

### DP004

• **DP004**: _string_ = "DP004"

_Defined in [demand-deeplink/src/errors.ts:5](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L5)_

### DP005

• **DP005**: _string_ = "DP005"

_Defined in [demand-deeplink/src/errors.ts:6](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L6)_

### DP006

• **DP006**: _string_ = "DP006"

_Defined in [demand-deeplink/src/errors.ts:7](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L7)_

### DP007

• **DP007**: _string_ = "DP007"

_Defined in [demand-deeplink/src/errors.ts:8](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L8)_

### DP008

• **DP008**: _string_ = "DP008"

_Defined in [demand-deeplink/src/errors.ts:9](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L9)_

### DP009

• **DP009**: _string_ = "DP009"

_Defined in [demand-deeplink/src/errors.ts:10](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L10)_

---

### `Const` errorMessageByCode

### ▪ **errorMessageByCode**: _object_

_Defined in [demand-deeplink/src/errors.ts:13](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L13)_

### \_\_computed

• **\_\_computed**: _string_ = "Pickup time is specified without pickup place"

_Defined in [demand-deeplink/src/errors.ts:14](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L14)_

_Defined in [demand-deeplink/src/errors.ts:15](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L15)_

_Defined in [demand-deeplink/src/errors.ts:16](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L16)_

_Defined in [demand-deeplink/src/errors.ts:17](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L17)_

_Defined in [demand-deeplink/src/errors.ts:18](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L18)_

_Defined in [demand-deeplink/src/errors.ts:19](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L19)_

_Defined in [demand-deeplink/src/errors.ts:20](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L20)_

_Defined in [demand-deeplink/src/errors.ts:21](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L21)_

_Defined in [demand-deeplink/src/errors.ts:22](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/errors.ts#L22)_

---

### `Const` journeyLegMetaPrefixes

### ▪ **journeyLegMetaPrefixes**: _object_

_Defined in [demand-deeplink/src/constants.ts:49](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L49)_

### dropoffMeta

• **dropoffMeta**: _string_ = journeyLegDropoffMetaPrefix

_Defined in [demand-deeplink/src/constants.ts:51](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L51)_

### meta

• **meta**: _string_ = journeyLegMetaPrefix

_Defined in [demand-deeplink/src/constants.ts:52](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L52)_

### passengerInfo

• **passengerInfo**: _string_ = journeyLegMetaPrefix

_Defined in [demand-deeplink/src/constants.ts:53](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L53)_

### pickupMeta

• **pickupMeta**: _string_ = journeyLegPickupMetaPrefix

_Defined in [demand-deeplink/src/constants.ts:50](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/constants.ts#L50)_
