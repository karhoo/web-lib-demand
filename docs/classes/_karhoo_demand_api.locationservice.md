[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [LocationService](_karhoo_demand_api.locationservice.md)

# Class: LocationService

## Hierarchy

* **LocationService**

## Index

### Constructors

* [constructor](_karhoo_demand_api.locationservice.md#constructor)

### Methods

* [getAddressAutocompleteData](_karhoo_demand_api.locationservice.md#getaddressautocompletedata)
* [getAddressDetails](_karhoo_demand_api.locationservice.md#getaddressdetails)

## Constructors

###  constructor

\+ **new LocationService**(`http`: [Http](../interfaces/_karhoo_demand_api.http.md)): *[LocationService](_karhoo_demand_api.locationservice.md)*

*Defined in [demand-api/src/location/LocationService.ts:14](https://github.com/karhoo/web-lib-demand/blob/09183f8/packages/demand-api/src/location/LocationService.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`http` | [Http](../interfaces/_karhoo_demand_api.http.md) |

**Returns:** *[LocationService](_karhoo_demand_api.locationservice.md)*

## Methods

###  getAddressAutocompleteData

▸ **getAddressAutocompleteData**(`data`: [LocationAddressAutocompleteParams](../modules/_karhoo_demand_api.md#locationaddressautocompleteparams)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/location/LocationService.ts:29](https://github.com/karhoo/web-lib-demand/blob/09183f8/packages/demand-api/src/location/LocationService.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [LocationAddressAutocompleteParams](../modules/_karhoo_demand_api.md#locationaddressautocompleteparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  getAddressDetails

▸ **getAddressDetails**(`__namedParameters`: object): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/location/LocationService.ts:20](https://github.com/karhoo/web-lib-demand/blob/09183f8/packages/demand-api/src/location/LocationService.ts#L20)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`placeId` | string |
`sessionToken` | undefined &#124; string |

**Returns:** *Promise‹object & object | object & object›*
