[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [QuotesService](_karhoo_demand_api.quotesservice.md)

# Class: QuotesService

## Hierarchy

* **QuotesService**

## Index

### Constructors

* [constructor](_karhoo_demand_api.quotesservice.md#constructor)

### Methods

* [checkAvailability](_karhoo_demand_api.quotesservice.md#checkavailability)
* [quotesSearch](_karhoo_demand_api.quotesservice.md#quotessearch)
* [quotesSearchById](_karhoo_demand_api.quotesservice.md#quotessearchbyid)

## Constructors

###  constructor

\+ **new QuotesService**(`http`: [Http](../interfaces/_karhoo_demand_api.http.md)): *[QuotesService](_karhoo_demand_api.quotesservice.md)*

*Defined in [demand-api/src/quotes/QuotesService.ts:15](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/quotes/QuotesService.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`http` | [Http](../interfaces/_karhoo_demand_api.http.md) |

**Returns:** *[QuotesService](_karhoo_demand_api.quotesservice.md)*

## Methods

###  checkAvailability

▸ **checkAvailability**(`params`: [QuotesAvailabilityParams](../modules/_karhoo_demand_api.md#quotesavailabilityparams)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/quotes/QuotesService.ts:21](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/quotes/QuotesService.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [QuotesAvailabilityParams](../modules/_karhoo_demand_api.md#quotesavailabilityparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  quotesSearch

▸ **quotesSearch**(`params`: [QutesSearchParams](../modules/_karhoo_demand_api.md#qutessearchparams)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/quotes/QuotesService.ts:32](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/quotes/QuotesService.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [QutesSearchParams](../modules/_karhoo_demand_api.md#qutessearchparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  quotesSearchById

▸ **quotesSearchById**(`id`: string): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/quotes/QuotesService.ts:46](https://github.com/karhoo/web-lib-demand/blob/f775a07/packages/demand-api/src/quotes/QuotesService.ts#L46)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹object & object | object & object›*
