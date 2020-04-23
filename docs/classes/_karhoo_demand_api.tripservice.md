[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [TripService](_karhoo_demand_api.tripservice.md)

# Class: TripService

## Hierarchy

* **TripService**

## Index

### Constructors

* [constructor](_karhoo_demand_api.tripservice.md#constructor)

### Methods

* [book](_karhoo_demand_api.tripservice.md#book)
* [cancel](_karhoo_demand_api.tripservice.md#cancel)
* [cancelByFollowCode](_karhoo_demand_api.tripservice.md#cancelbyfollowcode)
* [search](_karhoo_demand_api.tripservice.md#search)
* [trackTrip](_karhoo_demand_api.tripservice.md#tracktrip)

## Constructors

###  constructor

\+ **new TripService**(`http`: [Http](../interfaces/_karhoo_demand_api.http.md)): *[TripService](_karhoo_demand_api.tripservice.md)*

*Defined in [demand-api/src/trip/TripService.ts:14](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/TripService.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`http` | [Http](../interfaces/_karhoo_demand_api.http.md) |

**Returns:** *[TripService](_karhoo_demand_api.tripservice.md)*

## Methods

###  book

▸ **book**(`params`: [BookATripParams](../modules/_karhoo_demand_api.md#bookatripparams)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/trip/TripService.ts:24](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/TripService.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [BookATripParams](../modules/_karhoo_demand_api.md#bookatripparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  cancel

▸ **cancel**(`id`: string, `params`: [CancellationParams](../modules/_karhoo_demand_api.md#cancellationparams)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/trip/TripService.ts:28](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/TripService.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |
`params` | [CancellationParams](../modules/_karhoo_demand_api.md#cancellationparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  cancelByFollowCode

▸ **cancelByFollowCode**(`code`: string, `params`: [CancellationParams](../modules/_karhoo_demand_api.md#cancellationparams)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/trip/TripService.ts:32](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/TripService.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`code` | string |
`params` | [CancellationParams](../modules/_karhoo_demand_api.md#cancellationparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  search

▸ **search**(`params`: [SearchParams](../modules/_karhoo_demand_api.md#searchparams)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/trip/TripService.ts:36](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/TripService.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [SearchParams](../modules/_karhoo_demand_api.md#searchparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  trackTrip

▸ **trackTrip**(`id`: string): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/trip/TripService.ts:20](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/trip/TripService.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹object & object | object & object›*
