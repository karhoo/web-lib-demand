[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-deeplink](../modules/_karhoo_demand_deeplink.md) › [LocationService](_karhoo_demand_deeplink.locationservice.md)

# Class: LocationService

## Hierarchy

* **LocationService**

## Index

### Constructors

* [constructor](_karhoo_demand_deeplink.locationservice.md#constructor)

### Methods

* [getAddressDetails](_karhoo_demand_deeplink.locationservice.md#getaddressdetails)

## Constructors

###  constructor

\+ **new LocationService**(`http`: [Http](../interfaces/_karhoo_demand_deeplink.http.md)): *[LocationService](_karhoo_demand_deeplink.locationservice.md)*

*Defined in [demand-deeplink/src/api/LocationService.ts:8](https://github.com/karhoo/web-lib-demand/blob/41d4063/packages/demand-deeplink/src/api/LocationService.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`http` | [Http](../interfaces/_karhoo_demand_deeplink.http.md) |

**Returns:** *[LocationService](_karhoo_demand_deeplink.locationservice.md)*

## Methods

###  getAddressDetails

▸ **getAddressDetails**(`__namedParameters`: object): *Promise‹object & object | object & object›*

*Defined in [demand-deeplink/src/api/LocationService.ts:14](https://github.com/karhoo/web-lib-demand/blob/41d4063/packages/demand-deeplink/src/api/LocationService.ts#L14)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`placeId` | string |
`sessionToken` | undefined &#124; string |

**Returns:** *Promise‹object & object | object & object›*
