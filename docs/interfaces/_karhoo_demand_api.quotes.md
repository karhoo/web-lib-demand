[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [Quotes](_karhoo_demand_api.quotes.md)

# Interface: Quotes

## Hierarchy

* **Quotes**

## Implemented by

* [QuotesService](../classes/_karhoo_demand_api.quotesservice.md)

## Index

### Methods

* [checkAvailability](_karhoo_demand_api.quotes.md#checkavailability)
* [quotesSearch](_karhoo_demand_api.quotes.md#quotessearch)
* [quotesSearchById](_karhoo_demand_api.quotes.md#quotessearchbyid)

## Methods

###  checkAvailability

▸ **checkAvailability**(`params`: [QuotesAvailabilityParams](../modules/_karhoo_demand_api.md#quotesavailabilityparams)): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](../modules/_karhoo_demand_api.md#quotesavailabilityresponse)››*

*Defined in [demand-api/src/quotes/types.ts:87](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/quotes/types.ts#L87)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [QuotesAvailabilityParams](../modules/_karhoo_demand_api.md#quotesavailabilityparams) |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹[QuotesAvailabilityResponse](../modules/_karhoo_demand_api.md#quotesavailabilityresponse)››*

___

###  quotesSearch

▸ **quotesSearch**(`params`: [QuotesSearchParams](../modules/_karhoo_demand_api.md#quotessearchparams)): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹[QuotesResponse](../modules/_karhoo_demand_api.md#quotesresponse)››*

*Defined in [demand-api/src/quotes/types.ts:89](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/quotes/types.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [QuotesSearchParams](../modules/_karhoo_demand_api.md#quotessearchparams) |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹[QuotesResponse](../modules/_karhoo_demand_api.md#quotesresponse)››*

___

###  quotesSearchById

▸ **quotesSearchById**(`id`: string): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹[QuotesByIdResponse](_karhoo_demand_api.quotesbyidresponse.md)››*

*Defined in [demand-api/src/quotes/types.ts:90](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/quotes/types.ts#L90)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹[QuotesByIdResponse](_karhoo_demand_api.quotesbyidresponse.md)››*
