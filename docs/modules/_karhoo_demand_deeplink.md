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
* [journeyLegMetaPrefixes](_karhoo_demand_deeplink.md#const-journeylegmetaprefixes)

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

*Defined in [demand-deeplink/src/types.ts:30](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/types.ts#L30)*

#### Type declaration:

* **customFields**? : *[Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›*

* **legs**: *[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)[]*

* **meta**: *[Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›*

* **passengerInfo**: *[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)*

* **travellerLocale**? : *undefined | string*

___

###  Dictionary

Ƭ **Dictionary**: *object*

*Defined in [demand-deeplink/src/types.ts:1](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/types.ts#L1)*

#### Type declaration:

* \[ **index**: *string*\]: T

___

###  JourneyLeg

Ƭ **JourneyLeg**: *Partial‹object›*

*Defined in [demand-deeplink/src/types.ts:16](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/types.ts#L16)*

___

###  KeyValueList

Ƭ **KeyValueList**: *[string, string][]*

*Defined in [demand-deeplink/src/types.ts:5](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/types.ts#L5)*

___

###  PassengerInfo

Ƭ **PassengerInfo**: *Partial‹object›*

*Defined in [demand-deeplink/src/types.ts:7](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/types.ts#L7)*

___

###  ValidationError

Ƭ **ValidationError**: *object*

*Defined in [demand-deeplink/src/types.ts:38](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/types.ts#L38)*

#### Type declaration:

* **code**: *string*

* **error**: *string*

* **path**: *string*

___

###  ValidationResponse

Ƭ **ValidationResponse**: *object*

*Defined in [demand-deeplink/src/types.ts:44](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/types.ts#L44)*

#### Type declaration:

* **errors**? : *[ValidationError](_karhoo_demand_deeplink.md#validationerror)[]*

* **ok**: *boolean*

## Variables

### `Const` deepLinkMetaPrefix

• **deepLinkMetaPrefix**: *"meta."* = "meta."

*Defined in [demand-deeplink/src/constants.ts:42](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L42)*

___

### `Const` dropoffKpoiParameter

• **dropoffKpoiParameter**: *"dropoff-kpoi"* = "dropoff-kpoi"

*Defined in [demand-deeplink/src/constants.ts:20](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L20)*

___

### `Const` dropoffParameter

• **dropoffParameter**: *"dropoff"* = "dropoff"

*Defined in [demand-deeplink/src/constants.ts:19](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L19)*

___

### `Const` dropoffPlaceIdParameter

• **dropoffPlaceIdParameter**: *"dropoff-place_id"* = "dropoff-place_id"

*Defined in [demand-deeplink/src/constants.ts:21](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L21)*

___

### `Const` emailParameter

• **emailParameter**: *"email"* = "email"

*Defined in [demand-deeplink/src/constants.ts:12](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L12)*

___

### `Const` expectedTimeFormatRegexp

• **expectedTimeFormatRegexp**: *RegExp‹›* = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))$/

*Defined in [demand-deeplink/src/constants.ts:4](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L4)*

___

### `Const` firstNameParameter

• **firstNameParameter**: *"first-name"* = "first-name"

*Defined in [demand-deeplink/src/constants.ts:10](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L10)*

___

### `Const` journeyLegDropoffMetaPrefix

• **journeyLegDropoffMetaPrefix**: *"m-dropoff-"* = "m-dropoff-"

*Defined in [demand-deeplink/src/constants.ts:48](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L48)*

___

### `Const` journeyLegFieldsRegexp

• **journeyLegFieldsRegexp**: *RegExp‹›* = /^leg-(\d+)-(.+)/i

*Defined in [demand-deeplink/src/constants.ts:3](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L3)*

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

*Defined in [demand-deeplink/src/constants.ts:32](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L32)*

___

### `Const` journeyLegMetaPrefix

• **journeyLegMetaPrefix**: *"m-"* = "m-"

*Defined in [demand-deeplink/src/constants.ts:46](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L46)*

___

### `Const` journeyLegPickupMetaPrefix

• **journeyLegPickupMetaPrefix**: *"m-pickup-"* = "m-pickup-"

*Defined in [demand-deeplink/src/constants.ts:47](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L47)*

___

### `Const` journeyLegPrefix

• **journeyLegPrefix**: *"leg-"* = "leg-"

*Defined in [demand-deeplink/src/constants.ts:44](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L44)*

___

### `Const` lastNameParameter

• **lastNameParameter**: *"last-name"* = "last-name"

*Defined in [demand-deeplink/src/constants.ts:11](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L11)*

___

### `Const` legNameIndex

• **legNameIndex**: *2* = 2

*Defined in [demand-deeplink/src/parse.ts:30](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L30)*

___

### `Const` luggageParameter

• **luggageParameter**: *"luggage"* = "luggage"

*Defined in [demand-deeplink/src/constants.ts:14](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L14)*

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

*Defined in [demand-deeplink/src/constants.ts:23](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L23)*

___

### `Const` passengerParameter

• **passengerParameter**: *"passengers"* = "passengers"

*Defined in [demand-deeplink/src/constants.ts:9](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L9)*

___

### `Const` phoneNumberParameter

• **phoneNumberParameter**: *"phone-number"* = "phone-number"

*Defined in [demand-deeplink/src/constants.ts:13](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L13)*

___

### `Const` pickupKpoiParameter

• **pickupKpoiParameter**: *"pickup-kpoi"* = "pickup-kpoi"

*Defined in [demand-deeplink/src/constants.ts:16](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L16)*

___

### `Const` pickupParameter

• **pickupParameter**: *"pickup"* = "pickup"

*Defined in [demand-deeplink/src/constants.ts:15](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L15)*

___

### `Const` pickupPlaceIdParameter

• **pickupPlaceIdParameter**: *"pickup-place_id"* = "pickup-place_id"

*Defined in [demand-deeplink/src/constants.ts:17](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L17)*

___

### `Const` pickupTimeParameter

• **pickupTimeParameter**: *"pickup-time"* = "pickup-time"

*Defined in [demand-deeplink/src/constants.ts:18](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L18)*

___

### `Const` timezoneRegexp

• **timezoneRegexp**: *RegExp‹›* = /([+-][0-2]\d:[0-5]\d|Z)$/

*Defined in [demand-deeplink/src/constants.ts:5](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L5)*

___

### `Const` travellerLocaleParameter

• **travellerLocaleParameter**: *"traveller-locale"* = "traveller-locale"

*Defined in [demand-deeplink/src/constants.ts:8](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L8)*

___

### `Const` travellerLocaleRegexp

• **travellerLocaleRegexp**: *RegExp‹›* = /^[a-z]{2}-[a-z]{2}$/i

*Defined in [demand-deeplink/src/constants.ts:6](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L6)*

## Functions

### `Const` devIsObjectCheck

▸ **devIsObjectCheck**(`data`: object, `fieldName`: string): *void*

*Defined in [demand-deeplink/src/validate.ts:20](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/validate.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | object |
`fieldName` | string |

**Returns:** *void*

___

### `Const` excludeUndefined

▸ **excludeUndefined**<**T**>(`arr`: Array‹T | undefined›): *T[]*

*Defined in [demand-deeplink/src/utils.ts:12](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/utils.ts#L12)*

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

*Defined in [demand-deeplink/src/generate.ts:63](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/generate.ts#L63)*

Generates a query string from a Deeplink data

**Parameters:**

Name | Type |
------ | ------ |
`deeplink` | [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata) |

**Returns:** *string*

___

###  getAvailableParams

▸ **getAvailableParams**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› | [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo), `prefix`: string, `transform`: (Anonymous function)): *[KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)*

*Defined in [demand-deeplink/src/generate.ts:13](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/generate.ts#L13)*

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

*Defined in [demand-deeplink/src/errors.ts:17](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L17)*

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

*Defined in [demand-deeplink/src/generate.ts:27](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/generate.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | Array‹[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)› |

**Returns:** *[string, string][]*

___

###  getJourneyLeg

▸ **getJourneyLeg**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): *[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)*

*Defined in [demand-deeplink/src/parse.ts:86](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L86)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** *[JourneyLeg](_karhoo_demand_deeplink.md#journeyleg)*

___

###  getJourneyLegs

▸ **getJourneyLegs**(`legsInfo`: [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist)): *object[]*

*Defined in [demand-deeplink/src/parse.ts:112](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L112)*

**Parameters:**

Name | Type |
------ | ------ |
`legsInfo` | [KeyValueList](_karhoo_demand_deeplink.md#keyvaluelist) |

**Returns:** *object[]*

___

###  getPassengerInfo

▸ **getPassengerInfo**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): *[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)*

*Defined in [demand-deeplink/src/parse.ts:75](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L75)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** *[PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)*

___

###  hasData

▸ **hasData**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›): *boolean*

*Defined in [demand-deeplink/src/parse.ts:49](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› |

**Returns:** *boolean*

___

### `Const` isLegCommonQueryParameter

▸ **isLegCommonQueryParameter**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:55](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegDropoffMeta

▸ **isLegDropoffMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:68](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L68)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegMeta

▸ **isLegMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:64](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L64)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegMetaQueryParameter

▸ **isLegMetaQueryParameter**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:61](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L61)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegPassengerInfoMeta

▸ **isLegPassengerInfoMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:70](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegPickupMeta

▸ **isLegPickupMeta**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:66](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isLegQueryParameter

▸ **isLegQueryParameter**(`key`: string): *boolean*

*Defined in [demand-deeplink/src/parse.ts:73](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *boolean*

___

### `Const` isNotEmptyString

▸ **isNotEmptyString**(`value`: any): *boolean*

*Defined in [demand-deeplink/src/utils.ts:5](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/utils.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

### `Const` isObject

▸ **isObject**(`value`: any): *boolean*

*Defined in [demand-deeplink/src/utils.ts:10](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/utils.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

### `Const` isPositiveInteger

▸ **isPositiveInteger**(`value`: any): *boolean*

*Defined in [demand-deeplink/src/utils.ts:7](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/utils.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | any |

**Returns:** *boolean*

___

### `Const` matchLegQueryParameter

▸ **matchLegQueryParameter**(`key`: string): *null | RegExpMatchArray‹›*

*Defined in [demand-deeplink/src/parse.ts:53](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`key` | string |

**Returns:** *null | RegExpMatchArray‹›*

___

###  parse

▸ **parse**(`query`: string): *[DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)*

*Defined in [demand-deeplink/src/parse.ts:150](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L150)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *[DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata)*

___

###  parseSearchString

▸ **parseSearchString**(`query`: string): *[string, string][]*

*Defined in [demand-deeplink/src/parse.ts:136](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L136)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |

**Returns:** *[string, string][]*

___

###  transformMapByKey

▸ **transformMapByKey**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›, `keyPrefix`: string, `filter`: function): *object*

*Defined in [demand-deeplink/src/parse.ts:32](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/parse.ts#L32)*

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

*Defined in [demand-deeplink/src/validate.ts:120](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/validate.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`deeplinkData` | [DeeplinkData](_karhoo_demand_deeplink.md#deeplinkdata) |

**Returns:** *[ValidationResponse](_karhoo_demand_deeplink.md#validationresponse)*

___

###  validateLeg

▸ **validateLeg**(`leg`: [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg), `path`: string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:89](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/validate.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`leg` | [JourneyLeg](_karhoo_demand_deeplink.md#journeyleg) |
`path` | string |

**Returns:** *object[]*

___

###  validateMeta

▸ **validateMeta**(`data`: [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string›, `fieldName`: string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:26](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/validate.ts#L26)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`data` | [Dictionary](_karhoo_demand_deeplink.md#dictionary)‹string› | - |
`fieldName` | string | "meta" |

**Returns:** *object[]*

___

###  validatePassengerInfo

▸ **validatePassengerInfo**(`data`: [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo)): *object[]*

*Defined in [demand-deeplink/src/validate.ts:38](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/validate.ts#L38)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [PassengerInfo](_karhoo_demand_deeplink.md#passengerinfo) |

**Returns:** *object[]*

___

###  validatePickupTime

▸ **validatePickupTime**(`time?`: undefined | string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:77](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/validate.ts#L77)*

**Parameters:**

Name | Type |
------ | ------ |
`time?` | undefined &#124; string |

**Returns:** *object[]*

___

###  validateRoute

▸ **validateRoute**(`fields`: string[], `fieldName`: string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:63](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/validate.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`fields` | string[] |
`fieldName` | string |

**Returns:** *object[]*

___

###  validateTravellerLocale

▸ **validateTravellerLocale**(`locale?`: undefined | string): *object[]*

*Defined in [demand-deeplink/src/validate.ts:57](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/validate.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`locale?` | undefined &#124; string |

**Returns:** *object[]*

## Object literals

### `Const` codes

### ▪ **codes**: *object*

*Defined in [demand-deeplink/src/errors.ts:1](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L1)*

###  DP001

• **DP001**: *string* = "DP001"

*Defined in [demand-deeplink/src/errors.ts:2](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L2)*

###  DP002

• **DP002**: *string* = "DP002"

*Defined in [demand-deeplink/src/errors.ts:3](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L3)*

###  DP003

• **DP003**: *string* = "DP003"

*Defined in [demand-deeplink/src/errors.ts:4](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L4)*

###  DP004

• **DP004**: *string* = "DP004"

*Defined in [demand-deeplink/src/errors.ts:5](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L5)*

###  DP005

• **DP005**: *string* = "DP005"

*Defined in [demand-deeplink/src/errors.ts:6](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L6)*

___

### `Const` errorMessageByCode

### ▪ **errorMessageByCode**: *object*

*Defined in [demand-deeplink/src/errors.ts:9](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L9)*

###  __computed

• **__computed**: *string* = "Incorrect type"

*Defined in [demand-deeplink/src/errors.ts:10](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L10)*

*Defined in [demand-deeplink/src/errors.ts:11](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L11)*

*Defined in [demand-deeplink/src/errors.ts:12](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L12)*

*Defined in [demand-deeplink/src/errors.ts:13](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L13)*

*Defined in [demand-deeplink/src/errors.ts:14](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/errors.ts#L14)*

___

### `Const` journeyLegMetaPrefixes

### ▪ **journeyLegMetaPrefixes**: *object*

*Defined in [demand-deeplink/src/constants.ts:50](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L50)*

###  dropoffMeta

• **dropoffMeta**: *string* = journeyLegDropoffMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:52](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L52)*

###  meta

• **meta**: *string* = journeyLegMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:53](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L53)*

###  passengerInfo

• **passengerInfo**: *string* = journeyLegMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:54](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L54)*

###  pickupMeta

• **pickupMeta**: *string* = journeyLegPickupMetaPrefix

*Defined in [demand-deeplink/src/constants.ts:51](https://github.com/karhoo/web-lib-demand/blob/d9de596/packages/demand-deeplink/src/constants.ts#L51)*
