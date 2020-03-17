[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-deeplink](_karhoo_demand_deeplink.md)

# Module: @karhoo/demand-deeplink

# `Demand Deeplink`

The **Demand Deeplink** is intended to be the standard way of working with deeplink ([https://developer.karhoo.com/docs/deeplink-integration](https://developer.karhoo.com/docs/deeplink-integration))

## Warnings

This library use `URLSearchParams`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use either `js-core@3` or [`url-search-params-polyfill`](https://www.npmjs.com/package/url-search-params-polyfill)

## Installation

### NPM

Add the following to .npmrc:

```
//npm.pkg.github.com/:_authToken=${GITHUB_ACCESS_TOKEN}
@karhoo:registry=https://npm.pkg.github.com/
``` 

`GITHUB_ACCESS_TOKEN` - your [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

```sh
npm install --save @karhoo/demand-deeplink
```

## Usage

```
import { parse, validate, generate } from 'demand-deeplink';
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

## Index

### References

* [generate](_karhoo_demand_deeplink.md#generate)
* [parse](_karhoo_demand_deeplink.md#parse)
* [validate](_karhoo_demand_deeplink.md#validate)

### Type aliases

* [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)
* [Dictionary](_karhoo_demand_deeplink.md#dictionary)
* [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)
* [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)
* [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)
* [ValidationError](_karhoo_demand_deeplink.md#validationerror)
* [ValidationResponse](_karhoo_demand_deeplink.md#validationresponse)

### Variables

* [deepLinkMetaPrefix](_karhoo_demand_deeplink.md#const-deeplinkmetaprefix)
* [dropoffKpoiParameter](_karhoo_demand_deeplink.md#const-dropoffkpoiparameter)
* [dropoffParameter](_karhoo_demand_deeplink.md#const-dropoffparameter)
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
* [pickupPlaceIdParameter](_karhoo_demand_deeplink.md#const-pickupplaceidparameter)
* [pickupTimeParameter](_karhoo_demand_deeplink.md#const-pickuptimeparameter)
* [timezoneRegexp](_karhoo_demand_deeplink.md#const-timezoneregexp)
* [travellerLocale](_karhoo_demand_deeplink.md#const-travellerlocale)
* [travellerLocaleParameter](_karhoo_demand_deeplink.md#const-travellerlocaleparameter)
* [travellerLocaleRegexp](_karhoo_demand_deeplink.md#const-travellerlocaleregexp)

### Functions

* [devIsObjectCheck](_karhoo_demand_deeplink.md#const-devisobjectcheck)
* [excludeUndefined](_karhoo_demand_deeplink.md#const-excludeundefined)
* [generate](_karhoo_demand_deeplink.md#generate)
* [getAvailableParams](_karhoo_demand_deeplink.md#getavailableparams)
* [getError](_karhoo_demand_deeplink.md#geterror)
* [getJorneyLegsParams](_karhoo_demand_deeplink.md#getjorneylegsparams)
* [getJourneyLeg](_karhoo_demand_deeplink.md#getjourneyleg)
* [getJourneyLegs](_karhoo_demand_deeplink.md#getjourneylegs)
* [getPassengerInfo](_karhoo_demand_deeplink.md#getpassengerinfo)
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
* [isPositiveInteger](_karhoo_demand_deeplink.md#const-ispositiveinteger)
* [matchLegQueryParameter](_karhoo_demand_deeplink.md#const-matchlegqueryparameter)
* [parse](_karhoo_demand_deeplink.md#parse)
* [parseSearchString](_karhoo_demand_deeplink.md#parsesearchstring)
* [transformMapByKey](_karhoo_demand_deeplink.md#transformmapbykey)
* [validate](_karhoo_demand_deeplink.md#validate)
* [validateLeg](_karhoo_demand_deeplink.md#validateleg)
* [validateMeta](_karhoo_demand_deeplink.md#validatemeta)
* [validatePassengerInfo](_karhoo_demand_deeplink.md#validatepassengerinfo)
* [validatePickupTime](_karhoo_demand_deeplink.md#validatepickuptime)
* [validateRoute](_karhoo_demand_deeplink.md#validateroute)
* [validateTravellerLocale](_karhoo_demand_deeplink.md#validatetravellerlocale)

### Object literals

* [codes](_karhoo_demand_deeplink.md#const-codes)
* [errorMessageByCode](_karhoo_demand_deeplink.md#const-errormessagebycode)
* [expectedCustomFields](_karhoo_demand_deeplink.md#const-expectedcustomfields)
* [expectedFirstJourneyLeg](_karhoo_demand_deeplink.md#const-expectedfirstjourneyleg)
* [expectedFirstJourneyLegDropoffMeta](_karhoo_demand_deeplink.md#const-expectedfirstjourneylegdropoffmeta)
* [expectedFirstJourneyLegMeta](_karhoo_demand_deeplink.md#const-expectedfirstjourneylegmeta)
* [expectedFirstJourneyLegPickupMeta](_karhoo_demand_deeplink.md#const-expectedfirstjourneylegpickupmeta)
* [expectedFirstJourneyLegWithMeta](_karhoo_demand_deeplink.md#const-expectedfirstjourneylegwithmeta)
* [expectedMeta](_karhoo_demand_deeplink.md#const-expectedmeta)
* [expectedPassengerInfo](_karhoo_demand_deeplink.md#const-expectedpassengerinfo)
* [expectedSecondJourneyLeg](_karhoo_demand_deeplink.md#const-expectedsecondjourneyleg)
* [firstJourneyLeg](_karhoo_demand_deeplink.md#const-firstjourneyleg)
* [firstJourneyLegDropoffMeta](_karhoo_demand_deeplink.md#const-firstjourneylegdropoffmeta)
* [firstJourneyLegMeta](_karhoo_demand_deeplink.md#const-firstjourneylegmeta)
* [firstJourneyLegPickupMeta](_karhoo_demand_deeplink.md#const-firstjourneylegpickupmeta)
* [journeyLegMetaPrefixes](_karhoo_demand_deeplink.md#const-journeylegmetaprefixes)
* [meta](_karhoo_demand_deeplink.md#const-meta)
* [passengerInfo](_karhoo_demand_deeplink.md#const-passengerinfo)
* [secondJourneyLeg](_karhoo_demand_deeplink.md#const-secondjourneyleg)

## References

###  generate

• **generate**:

___

###  parse

• **parse**:

___

###  validate

• **validate**:

## Type aliases

###  DeeplinkData

Ƭ **DeeplinkData**: *object*

*Defined in [demand-deeplink/src/types.ts:30](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/types.ts#L30)*

#### Type declaration:

* **customFields**? : *[Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›*

* **legs**: *[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)[]*

* **meta**: *[Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›*

* **passengerInfo**: *[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)*

* **travellerLocale**? : *undefined | string*

___

###  Dictionary

Ƭ **Dictionary**: *object*

*Defined in [demand-deeplink/src/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/types.ts#L1)*

#### Type declaration:

* \[ **index**: *string*\]: T

___

###  JourneyLeg

Ƭ **JourneyLeg**: *Partial‹object›*

*Defined in [demand-deeplink/src/types.ts:16](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/types.ts#L16)*

___

###  KeyValueList

Ƭ **KeyValueList**: *[string, string][]*

*Defined in [demand-deeplink/src/types.ts:5](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/types.ts#L5)*

___

###  PassengerInfo

Ƭ **PassengerInfo**: *Partial‹object›*

*Defined in [demand-deeplink/src/types.ts:7](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/types.ts#L7)*

___

###  ValidationError

Ƭ **ValidationError**: *object*

*Defined in [demand-deeplink/src/types.ts:38](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/types.ts#L38)*

#### Type declaration:

* **code**: *string*

* **error**: *string*

* **path**: *string*

___

###  ValidationResponse

Ƭ **ValidationResponse**: *object*

*Defined in [demand-deeplink/src/types.ts:44](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/types.ts#L44)*

#### Type declaration:

* **errors**? : *[ValidationError](_karhoo_demand_deeplink.md#validationerror)[]*

* **ok**: *boolean*

## Variables

### `Const` deepLinkMetaPrefix

• **deepLinkMetaPrefix**: *"meta."* = "meta."

*Defined in [demand-deeplink/src/constants.ts:42](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L42)*

___

### `Const` dropoffKpoiParameter

• **dropoffKpoiParameter**: *"dropoff-kpoi"* = "dropoff-kpoi"

*Defined in [demand-deeplink/src/constants.ts:20](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L20)*

___

### `Const` dropoffParameter

• **dropoffParameter**: *"dropoff"* = "dropoff"

*Defined in [demand-deeplink/src/constants.ts:19](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L19)*

___

### `Const` dropoffPlaceIdParameter

• **dropoffPlaceIdParameter**: *"dropoff-place_id"* = "dropoff-place_id"

*Defined in [demand-deeplink/src/constants.ts:21](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L21)*

___

### `Const` emailParameter

• **emailParameter**: *"email"* = "email"

*Defined in [demand-deeplink/src/constants.ts:12](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L12)*

___

### `Const` expectedTimeFormatRegexp

• **expectedTimeFormatRegexp**: *RegExp‹›* = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/

*Defined in [demand-deeplink/src/constants.ts:4](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L4)*

___

### `Const` firstNameParameter

• **firstNameParameter**: *"first-name"* = "first-name"

*Defined in [demand-deeplink/src/constants.ts:10](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L10)*

___

### `Const` journeyLegDropoffMetaPrefix

• **journeyLegDropoffMetaPrefix**: *"m-dropoff-"* = "m-dropoff-"

*Defined in [demand-deeplink/src/constants.ts:48](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L48)*

___

### `Const` journeyLegFieldsRegexp

• **journeyLegFieldsRegexp**: *RegExp‹›* = /^leg-(\d+)-(.+)/i

*Defined in [demand-deeplink/src/constants.ts:3](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L3)*

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

*Defined in [demand-deeplink/src/constants.ts:32](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L32)*

___

### `Const` journeyLegMetaPrefix

• **journeyLegMetaPrefix**: *"m-"* = "m-"

*Defined in [demand-deeplink/src/constants.ts:46](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L46)*

___

### `Const` journeyLegPickupMetaPrefix

• **journeyLegPickupMetaPrefix**: *"m-pickup-"* = "m-pickup-"

*Defined in [demand-deeplink/src/constants.ts:47](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L47)*

___

### `Const` journeyLegPrefix

• **journeyLegPrefix**: *"leg-"* = "leg-"

*Defined in [demand-deeplink/src/constants.ts:44](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L44)*

___

### `Const` lastNameParameter

• **lastNameParameter**: *"last-name"* = "last-name"

*Defined in [demand-deeplink/src/constants.ts:11](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L11)*

___

### `Const` legNameIndex

• **legNameIndex**: *2* = 2

*Defined in [demand-deeplink/src/parse.ts:30](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L30)*

___

### `Const` luggageParameter

• **luggageParameter**: *"luggage"* = "luggage"

*Defined in [demand-deeplink/src/constants.ts:14](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L14)*

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

*Defined in [demand-deeplink/src/constants.ts:23](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L23)*

___

### `Const` passengerParameter

• **passengerParameter**: *"passengers"* = "passengers"

*Defined in [demand-deeplink/src/constants.ts:9](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L9)*

___

### `Const` phoneNumberParameter

• **phoneNumberParameter**: *"phone-number"* = "phone-number"

*Defined in [demand-deeplink/src/constants.ts:13](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L13)*

___

### `Const` pickupKpoiParameter

• **pickupKpoiParameter**: *"pickup-kpoi"* = "pickup-kpoi"

*Defined in [demand-deeplink/src/constants.ts:16](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L16)*

___

### `Const` pickupParameter

• **pickupParameter**: *"pickup"* = "pickup"

*Defined in [demand-deeplink/src/constants.ts:15](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L15)*

___

### `Const` pickupPlaceIdParameter

• **pickupPlaceIdParameter**: *"pickup-place_id"* = "pickup-place_id"

*Defined in [demand-deeplink/src/constants.ts:17](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L17)*

___

### `Const` pickupTimeParameter

• **pickupTimeParameter**: *"pickup-time"* = "pickup-time"

*Defined in [demand-deeplink/src/constants.ts:18](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L18)*

___

### `Const` timezoneRegexp

• **timezoneRegexp**: *RegExp‹›* = /([+-][0-2]\d:[0-5]\d|Z)$/

*Defined in [demand-deeplink/src/constants.ts:5](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L5)*

___

### `Const` travellerLocale

• **travellerLocale**: *"en-GB"* = "en-GB"

*Defined in [demand-deeplink/src/testData.ts:5](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L5)*

___

### `Const` travellerLocaleParameter

• **travellerLocaleParameter**: *"traveller-locale"* = "traveller-locale"

*Defined in [demand-deeplink/src/constants.ts:8](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L8)*

___

### `Const` travellerLocaleRegexp

• **travellerLocaleRegexp**: *RegExp‹›* = /^[a-z]{2}-[a-z]{2}$/i

*Defined in [demand-deeplink/src/constants.ts:6](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L6)*

## Functions

### `Const` devIsObjectCheck

▸ **devIsObjectCheck**(`data`: object, `fieldName`: string): *void*

*Defined in [demand-deeplink/src/validate.ts:20](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/validate.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | object |
`fieldName` | string |

**Returns:** *void*

___

### `Const` excludeUndefined

▸ **excludeUndefined**<**T**>(`arr`: Array‹T | undefined›): *T[]*

*Defined in [demand-deeplink/src/utils.ts:12](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/utils.ts#L12)*

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

*Defined in [demand-deeplink/src/generate.ts:71](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/generate.ts#L71)*

Code blocks are great for examples

```
<my-custom-element>Highlight JS will auto detect the language</my-custom-element>
```

```typescript
// Or you can specify the language explicitly
const instance = new MyClass();
```

**Parameters:**

Name | Type |
------ | ------ |
`deeplink` | [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata) |

**Returns:** *string*

___

###  getAvailableParams

▸ **getAvailableParams**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› | [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo), `prefix`: string, `transform`: (Anonymous function)): *[KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)*

*Defined in [demand-deeplink/src/generate.ts:13](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/generate.ts#L13)*

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

*Defined in [demand-deeplink/src/errors.ts:17](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L17)*

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

*Defined in [demand-deeplink/src/generate.ts:27](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/generate.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Array‹[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)› |

**Returns:** *[string, string][]*

___

###  getJourneyLeg

▸ **getJourneyLeg**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): *[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)*

*Defined in [demand-deeplink/src/parse.ts:86](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** *[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)*

___

###  getJourneyLegs

▸ **getJourneyLegs**(`legsInfo`: [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)): *object[]*

*Defined in [demand-deeplink/src/parse.ts:112](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`legsInfo` | [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist) |

**Returns:** *object[]*

___

###  getPassengerInfo

▸ **getPassengerInfo**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): *[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)*

*Defined in [demand-deeplink/src/parse.ts:75](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** *[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)*

___

###  hasData

▸ **hasData**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): *boolean*

*Defined in [demand-deeplink/src/parse.ts:49](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** *boolean*

___

### `Const` isLegCommonQueryParameter

▸ **isLegCommonQueryParameter**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:55](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegDropoffMeta

▸ **isLegDropoffMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:68](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegMeta

▸ **isLegMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:64](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegMetaQueryParameter

▸ **isLegMetaQueryParameter**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:61](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegPassengerInfoMeta

▸ **isLegPassengerInfoMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:70](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegPickupMeta

▸ **isLegPickupMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:66](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegQueryParameter

▸ **isLegQueryParameter**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:73](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isNotEmptyString

▸ **isNotEmptyString**(`value`: any): *boolean*

*Defined in [demand-deeplink/src/utils.ts:5](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/utils.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

### `Const` isObject

▸ **isObject**(`value`: any): *boolean*

*Defined in [demand-deeplink/src/utils.ts:10](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/utils.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

### `Const` isPositiveInteger

▸ **isPositiveInteger**(`value`: any): *boolean*

*Defined in [demand-deeplink/src/utils.ts:7](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/utils.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

### `Const` matchLegQueryParameter

▸ **matchLegQueryParameter**(`key`: string): *null | RegExpMatchArray‹›*

*Defined in [demand-deeplink/src/parse.ts:53](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *null | RegExpMatchArray‹›*

___

###  parse

▸ **parse**(`query`: string): *[DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)*

*Defined in [demand-deeplink/src/parse.ts:150](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *[DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)*

___

###  parseSearchString

▸ **parseSearchString**(`query`: string): *[string, string][]*

*Defined in [demand-deeplink/src/parse.ts:136](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *[string, string][]*

___

###  transformMapByKey

▸ **transformMapByKey**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›, `keyPrefix`: string, `filter`: function): *object*

*Defined in [demand-deeplink/src/parse.ts:32](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/parse.ts#L32)*

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

*Defined in [demand-deeplink/src/validate.ts:120](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/validate.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`deeplinkData` | [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata) |

**Returns:** *[ValidationResponse](_karhoo_demand_deeplink.md#validationresponse)*

___

###  validateLeg

▸ **validateLeg**(`leg`: [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg), `path`: string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:89](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/validate.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`leg` | [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg) |
`path` | string |

**Returns:** *object[]*

___

###  validateMeta

▸ **validateMeta**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›, `fieldName`: string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:26](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/validate.ts#L26)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› | - |
`fieldName` | string | "meta" |

**Returns:** *object[]*

___

###  validatePassengerInfo

▸ **validatePassengerInfo**(`data`: [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)): *object[]*

*Defined in [demand-deeplink/src/validate.ts:38](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/validate.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo) |

**Returns:** *object[]*

___

###  validatePickupTime

▸ **validatePickupTime**(`time?`: undefined | string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:77](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/validate.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`time?` | undefined &#124; string |

**Returns:** *object[]*

___

###  validateRoute

▸ **validateRoute**(`fields`: string[], `fieldName`: string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:63](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/validate.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | string[] |
`fieldName` | string |

**Returns:** *object[]*

___

###  validateTravellerLocale

▸ **validateTravellerLocale**(`locale?`: undefined | string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:57](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/validate.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`locale?` | undefined &#124; string |

**Returns:** *object[]*

## Object literals

### `Const` codes

### ▪ **codes**: *object*

*Defined in [demand-deeplink/src/errors.ts:1](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L1)*

###  DP001

• **DP001**: *string* = "DP001"

*Defined in [demand-deeplink/src/errors.ts:2](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L2)*

###  DP002

• **DP002**: *string* = "DP002"

*Defined in [demand-deeplink/src/errors.ts:3](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L3)*

###  DP003

• **DP003**: *string* = "DP003"

*Defined in [demand-deeplink/src/errors.ts:4](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L4)*

###  DP004

• **DP004**: *string* = "DP004"

*Defined in [demand-deeplink/src/errors.ts:5](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L5)*

###  DP005

• **DP005**: *string* = "DP005"

*Defined in [demand-deeplink/src/errors.ts:6](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L6)*

___

### `Const` errorMessageByCode

### ▪ **errorMessageByCode**: *object*

*Defined in [demand-deeplink/src/errors.ts:9](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L9)*

###  __computed

• **__computed**: *string* = "Incorrect type"

*Defined in [demand-deeplink/src/errors.ts:10](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L10)*

*Defined in [demand-deeplink/src/errors.ts:11](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L11)*

*Defined in [demand-deeplink/src/errors.ts:12](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L12)*

*Defined in [demand-deeplink/src/errors.ts:13](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L13)*

*Defined in [demand-deeplink/src/errors.ts:14](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/errors.ts#L14)*

___

### `Const` expectedCustomFields

### ▪ **expectedCustomFields**: *object*

*Defined in [demand-deeplink/src/testData.ts:109](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L109)*

###  custom-field-test

• **custom-field-test**: *string* = "Test test"

*Defined in [demand-deeplink/src/testData.ts:111](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L111)*

###  customFieldTest

• **customFieldTest**: *string* = "test 123"

*Defined in [demand-deeplink/src/testData.ts:110](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L110)*

___

### `Const` expectedFirstJourneyLeg

### ▪ **expectedFirstJourneyLeg**: *object*

*Defined in [demand-deeplink/src/testData.ts:67](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L67)*

###  dropoff

• **dropoff**: *string* = firstJourneyLeg['leg-1-dropoff']

*Defined in [demand-deeplink/src/testData.ts:72](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L72)*

###  dropoffKpoi

• **dropoffKpoi**: *string* = firstJourneyLeg['leg-1-dropoff-kpoi']

*Defined in [demand-deeplink/src/testData.ts:73](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L73)*

###  dropoffPlaceId

• **dropoffPlaceId**: *string* = firstJourneyLeg['leg-1-dropoff-place_id']

*Defined in [demand-deeplink/src/testData.ts:74](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L74)*

###  pickup

• **pickup**: *string* = firstJourneyLeg['leg-1-pickup']

*Defined in [demand-deeplink/src/testData.ts:68](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L68)*

###  pickupKpoi

• **pickupKpoi**: *string* = firstJourneyLeg['leg-1-pickup-kpoi']

*Defined in [demand-deeplink/src/testData.ts:69](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L69)*

###  pickupPlaceId

• **pickupPlaceId**: *string* = firstJourneyLeg['leg-1-pickup-place_id']

*Defined in [demand-deeplink/src/testData.ts:70](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L70)*

###  pickupTime

• **pickupTime**: *string* = firstJourneyLeg['leg-1-pickup-time']

*Defined in [demand-deeplink/src/testData.ts:71](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L71)*

___

### `Const` expectedFirstJourneyLegDropoffMeta

### ▪ **expectedFirstJourneyLegDropoffMeta**: *object*

*Defined in [demand-deeplink/src/testData.ts:87](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L87)*

###  second-test

• **second-test**: *string* = firstJourneyLegDropoffMeta['leg-1-m-dropoff-second-test']

*Defined in [demand-deeplink/src/testData.ts:89](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L89)*

###  test

• **test**: *string* = firstJourneyLegDropoffMeta['leg-1-m-dropoff-test']

*Defined in [demand-deeplink/src/testData.ts:88](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L88)*

___

### `Const` expectedFirstJourneyLegMeta

### ▪ **expectedFirstJourneyLegMeta**: *object*

*Defined in [demand-deeplink/src/testData.ts:77](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L77)*

###  second-test

• **second-test**: *string* = firstJourneyLegMeta['leg-1-m-second-test']

*Defined in [demand-deeplink/src/testData.ts:79](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L79)*

###  test

• **test**: *string* = firstJourneyLegMeta['leg-1-m-test']

*Defined in [demand-deeplink/src/testData.ts:78](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L78)*

___

### `Const` expectedFirstJourneyLegPickupMeta

### ▪ **expectedFirstJourneyLegPickupMeta**: *object*

*Defined in [demand-deeplink/src/testData.ts:82](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L82)*

###  second-test

• **second-test**: *string* = firstJourneyLegPickupMeta['leg-1-m-pickup-second-test']

*Defined in [demand-deeplink/src/testData.ts:84](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L84)*

###  test

• **test**: *string* = firstJourneyLegPickupMeta['leg-1-m-pickup-test']

*Defined in [demand-deeplink/src/testData.ts:83](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L83)*

___

### `Const` expectedFirstJourneyLegWithMeta

### ▪ **expectedFirstJourneyLegWithMeta**: *object*

*Defined in [demand-deeplink/src/testData.ts:92](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L92)*

###  dropoffMeta

• **dropoffMeta**: *object* = expectedFirstJourneyLegDropoffMeta

*Defined in [demand-deeplink/src/testData.ts:95](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L95)*

#### Type declaration:

* **second-test**: *string* = firstJourneyLegDropoffMeta['leg-1-m-dropoff-second-test']

* **test**: *string* = firstJourneyLegDropoffMeta['leg-1-m-dropoff-test']

###  meta

• **meta**: *object* = expectedFirstJourneyLegMeta

*Defined in [demand-deeplink/src/testData.ts:96](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L96)*

#### Type declaration:

* **second-test**: *string* = firstJourneyLegMeta['leg-1-m-second-test']

* **test**: *string* = firstJourneyLegMeta['leg-1-m-test']

###  pickupMeta

• **pickupMeta**: *object* = expectedFirstJourneyLegPickupMeta

*Defined in [demand-deeplink/src/testData.ts:94](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L94)*

#### Type declaration:

* **second-test**: *string* = firstJourneyLegPickupMeta['leg-1-m-pickup-second-test']

* **test**: *string* = firstJourneyLegPickupMeta['leg-1-m-pickup-test']

___

### `Const` expectedMeta

### ▪ **expectedMeta**: *object*

*Defined in [demand-deeplink/src/testData.ts:62](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L62)*

###  first

• **first**: *string* = meta['meta.first']

*Defined in [demand-deeplink/src/testData.ts:63](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L63)*

###  second

• **second**: *string* = meta['meta.second']

*Defined in [demand-deeplink/src/testData.ts:64](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L64)*

___

### `Const` expectedPassengerInfo

### ▪ **expectedPassengerInfo**: *object*

*Defined in [demand-deeplink/src/testData.ts:56](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L56)*

###  luggage

• **luggage**: *number* = parseInt(passengerInfo.luggage, 10)

*Defined in [demand-deeplink/src/testData.ts:58](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L58)*

###  passengers

• **passengers**: *number* = parseInt(passengerInfo.passengers, 10)

*Defined in [demand-deeplink/src/testData.ts:59](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L59)*

___

### `Const` expectedSecondJourneyLeg

### ▪ **expectedSecondJourneyLeg**: *object*

*Defined in [demand-deeplink/src/testData.ts:99](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L99)*

###  dropoff

• **dropoff**: *string* = secondJourneyLeg['leg-2-dropoff']

*Defined in [demand-deeplink/src/testData.ts:104](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L104)*

###  dropoffKpoi

• **dropoffKpoi**: *string* = secondJourneyLeg['leg-2-dropoff-kpoi']

*Defined in [demand-deeplink/src/testData.ts:105](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L105)*

###  dropoffPlaceId

• **dropoffPlaceId**: *string* = secondJourneyLeg['leg-2-dropoff-place_id']

*Defined in [demand-deeplink/src/testData.ts:106](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L106)*

###  pickup

• **pickup**: *string* = secondJourneyLeg['leg-2-pickup']

*Defined in [demand-deeplink/src/testData.ts:100](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L100)*

###  pickupKpoi

• **pickupKpoi**: *string* = secondJourneyLeg['leg-2-pickup-kpoi']

*Defined in [demand-deeplink/src/testData.ts:101](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L101)*

###  pickupPlaceId

• **pickupPlaceId**: *string* = secondJourneyLeg['leg-2-pickup-place_id']

*Defined in [demand-deeplink/src/testData.ts:102](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L102)*

###  pickupTime

• **pickupTime**: *string* = secondJourneyLeg['leg-2-pickup-time']

*Defined in [demand-deeplink/src/testData.ts:103](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L103)*

___

### `Const` firstJourneyLeg

### ▪ **firstJourneyLeg**: *object*

*Defined in [demand-deeplink/src/testData.ts:21](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L21)*

###  leg-1-dropoff

• **leg-1-dropoff**: *string* = "Mercure, Paris, Hotel"

*Defined in [demand-deeplink/src/testData.ts:25](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L25)*

###  leg-1-dropoff-kpoi

• **leg-1-dropoff-kpoi**: *string* = "MPH007"

*Defined in [demand-deeplink/src/testData.ts:26](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L26)*

###  leg-1-dropoff-place_id

• **leg-1-dropoff-place_id**: *string* = "dropoff-place_id"

*Defined in [demand-deeplink/src/testData.ts:27](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L27)*

###  leg-1-pickup

• **leg-1-pickup**: *string* = "20 Rue Jean Rey, 75015 Paris, France"

*Defined in [demand-deeplink/src/testData.ts:22](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L22)*

###  leg-1-pickup-kpoi

• **leg-1-pickup-kpoi**: *string* = "MPH"

*Defined in [demand-deeplink/src/testData.ts:23](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L23)*

###  leg-1-pickup-place_id

• **leg-1-pickup-place_id**: *string* = "pickup-place_id"

*Defined in [demand-deeplink/src/testData.ts:24](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L24)*

###  leg-1-pickup-time

• **leg-1-pickup-time**: *string* = "2020-08-09T18:31:42-03:30"

*Defined in [demand-deeplink/src/testData.ts:28](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L28)*

___

### `Const` firstJourneyLegDropoffMeta

### ▪ **firstJourneyLegDropoffMeta**: *object*

*Defined in [demand-deeplink/src/testData.ts:41](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L41)*

###  leg-1-m-dropoff-second-test

• **leg-1-m-dropoff-second-test**: *string* = "dropoff second test"

*Defined in [demand-deeplink/src/testData.ts:43](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L43)*

###  leg-1-m-dropoff-test

• **leg-1-m-dropoff-test**: *string* = "dropoff test"

*Defined in [demand-deeplink/src/testData.ts:42](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L42)*

___

### `Const` firstJourneyLegMeta

### ▪ **firstJourneyLegMeta**: *object*

*Defined in [demand-deeplink/src/testData.ts:31](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L31)*

###  leg-1-m-second-test

• **leg-1-m-second-test**: *string* = "second test"

*Defined in [demand-deeplink/src/testData.ts:33](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L33)*

###  leg-1-m-test

• **leg-1-m-test**: *string* = "test"

*Defined in [demand-deeplink/src/testData.ts:32](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L32)*

___

### `Const` firstJourneyLegPickupMeta

### ▪ **firstJourneyLegPickupMeta**: *object*

*Defined in [demand-deeplink/src/testData.ts:36](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L36)*

###  leg-1-m-pickup-second-test

• **leg-1-m-pickup-second-test**: *string* = "pickup second test"

*Defined in [demand-deeplink/src/testData.ts:38](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L38)*

###  leg-1-m-pickup-test

• **leg-1-m-pickup-test**: *string* = "pickup test"

*Defined in [demand-deeplink/src/testData.ts:37](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L37)*

___

### `Const` journeyLegMetaPrefixes

### ▪ **journeyLegMetaPrefixes**: *object*

*Defined in [demand-deeplink/src/constants.ts:50](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L50)*

###  dropoffMeta

• **dropoffMeta**: *string* = journeyLegDropoffMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:52](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L52)*

###  meta

• **meta**: *string* = journeyLegMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:53](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L53)*

###  passengerInfo

• **passengerInfo**: *string* = journeyLegMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:54](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L54)*

###  pickupMeta

• **pickupMeta**: *string* = journeyLegPickupMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:51](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/constants.ts#L51)*

___

### `Const` meta

### ▪ **meta**: *object*

*Defined in [demand-deeplink/src/testData.ts:16](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L16)*

###  meta.first

• **meta.first**: *string* = "first meta"

*Defined in [demand-deeplink/src/testData.ts:17](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L17)*

###  meta.second

• **meta.second**: *string* = "second-meta"

*Defined in [demand-deeplink/src/testData.ts:18](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L18)*

___

### `Const` passengerInfo

### ▪ **passengerInfo**: *object*

*Defined in [demand-deeplink/src/testData.ts:7](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L7)*

###  email

• **email**: *string* = "email@of.user"

*Defined in [demand-deeplink/src/testData.ts:8](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L8)*

###  first-name

• **first-name**: *string* = "first name"

*Defined in [demand-deeplink/src/testData.ts:11](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L11)*

###  last-name

• **last-name**: *string* = "last name"

*Defined in [demand-deeplink/src/testData.ts:12](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L12)*

###  luggage

• **luggage**: *string* = "2"

*Defined in [demand-deeplink/src/testData.ts:9](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L9)*

###  passengers

• **passengers**: *string* = "3"

*Defined in [demand-deeplink/src/testData.ts:10](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L10)*

###  phone-number

• **phone-number**: *string* = "+441234567890"

*Defined in [demand-deeplink/src/testData.ts:13](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L13)*

___

### `Const` secondJourneyLeg

### ▪ **secondJourneyLeg**: *object*

*Defined in [demand-deeplink/src/testData.ts:46](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L46)*

###  leg-2-dropoff

• **leg-2-dropoff**: *string* = "45 Rue du Dr Babinski, 75018 Paris"

*Defined in [demand-deeplink/src/testData.ts:50](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L50)*

###  leg-2-dropoff-kpoi

• **leg-2-dropoff-kpoi**: *string* = "234"

*Defined in [demand-deeplink/src/testData.ts:51](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L51)*

###  leg-2-dropoff-place_id

• **leg-2-dropoff-place_id**: *string* = "dropoff-place_id2"

*Defined in [demand-deeplink/src/testData.ts:52](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L52)*

###  leg-2-pickup

• **leg-2-pickup**: *string* = "Mercure, Paris, Hotel"

*Defined in [demand-deeplink/src/testData.ts:47](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L47)*

###  leg-2-pickup-kpoi

• **leg-2-pickup-kpoi**: *string* = "MPH2"

*Defined in [demand-deeplink/src/testData.ts:48](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L48)*

###  leg-2-pickup-place_id

• **leg-2-pickup-place_id**: *string* = "pickup-place_id2"

*Defined in [demand-deeplink/src/testData.ts:49](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L49)*

###  leg-2-pickup-time

• **leg-2-pickup-time**: *string* = "2020-08-10T18:31:42-03:30"

*Defined in [demand-deeplink/src/testData.ts:53](https://github.com/karhoo/web-lib-demand/blob/121b084/packages/demand-deeplink/src/testData.ts#L53)*
