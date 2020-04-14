[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-deeplink](../modules/_karhoo_demand_deeplink.md) › [LocationService](_karhoo_demand_deeplink.locationservice.md)

# Class: LocationService

## Hierarchy

* **LocationService**

## Index

### Constructors

* [constructor](_karhoo_demand_deeplink.locationservice.md#constructor)

### Methods

* [getAddressAutocompleteData](_karhoo_demand_deeplink.locationservice.md#getaddressautocompletedata)
* [getAddressDetails](_karhoo_demand_deeplink.locationservice.md#getaddressdetails)

## Constructors

###  constructor

\+ **new LocationService**(`http`: [Http](../interfaces/_karhoo_demand_deeplink.http.md)): *[LocationService](_karhoo_demand_deeplink.locationservice.md)*

*Defined in [demand-deeplink/src/api/LocationService.ts:9](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/LocationService.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`http` | [Http](../interfaces/_karhoo_demand_deeplink.http.md) |

**Returns:** *[LocationService](_karhoo_demand_deeplink.locationservice.md)*

## Methods

###  getAddressAutocompleteData

▸ **getAddressAutocompleteData**(`data`: [LocationAddressAutocompleteParams](../modules/_karhoo_demand_deeplink.md#locationaddressautocompleteparams)): *Promise‹object & object | object & object›*

*Defined in [demand-deeplink/src/api/LocationService.ts:24](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/LocationService.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [LocationAddressAutocompleteParams](../modules/_karhoo_demand_deeplink.md#locationaddressautocompleteparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  getAddressDetails

▸ **getAddressDetails**(`__namedParameters`: object): *Promise‹object & object | object & object›*

*Defined in [demand-deeplink/src/api/LocationService.ts:15](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-deeplink/src/api/LocationService.ts#L15)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`placeId` | string |
`sessionToken` | undefined &#124; string |

**Returns:** *Promise‹object & object | object & object›*
