[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [QuotesService](_karhoo_demand_api.quotesservice.md)

# Class: QuotesService

## Hierarchy

* **QuotesService**

## Implements

* [Quotes](../interfaces/_karhoo_demand_api.quotes.md)

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

*Defined in [demand-api/src/quotes/QuotesService.ts:16](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/quotes/QuotesService.ts#L16)*

**Parameters:**

Name | Type |
------ | ------ |
`http` | [Http](../interfaces/_karhoo_demand_api.http.md) |

**Returns:** *[QuotesService](_karhoo_demand_api.quotesservice.md)*

## Methods

###  checkAvailability

▸ **checkAvailability**(`params`: [QuotesAvailabilityParams](../modules/_karhoo_demand_api.md#quotesavailabilityparams)): *Promise‹object & object | object & object›*

*Implementation of [Quotes](../interfaces/_karhoo_demand_api.quotes.md)*

*Defined in [demand-api/src/quotes/QuotesService.ts:22](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/quotes/QuotesService.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [QuotesAvailabilityParams](../modules/_karhoo_demand_api.md#quotesavailabilityparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  quotesSearch

▸ **quotesSearch**(`params`: [QuotesSearchParams](../modules/_karhoo_demand_api.md#quotessearchparams)): *Promise‹object & object | object & object›*

*Implementation of [Quotes](../interfaces/_karhoo_demand_api.quotes.md)*

*Defined in [demand-api/src/quotes/QuotesService.ts:33](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/quotes/QuotesService.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [QuotesSearchParams](../modules/_karhoo_demand_api.md#quotessearchparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  quotesSearchById

▸ **quotesSearchById**(`id`: string): *Promise‹object & object | object & object›*

*Implementation of [Quotes](../interfaces/_karhoo_demand_api.quotes.md)*

*Defined in [demand-api/src/quotes/QuotesService.ts:56](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/quotes/QuotesService.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹object & object | object & object›*
