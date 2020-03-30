[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-deeplink](../modules/_karhoo_demand_deeplink.md) › [Http](_karhoo_demand_deeplink.http.md)

# Interface: Http

## Hierarchy

* **Http**

## Implemented by

* [HttpService](../classes/_karhoo_demand_deeplink.httpservice.md)

## Index

### Methods

* [get](_karhoo_demand_deeplink.http.md#get)
* [post](_karhoo_demand_deeplink.http.md#post)
* [put](_karhoo_demand_deeplink.http.md#put)
* [remove](_karhoo_demand_deeplink.http.md#remove)

## Methods

###  get

▸ **get**<**T**>(`url`: string, `query?`: [Query](../modules/_karhoo_demand_deeplink.md#query)): *Promise‹[HttpResponse](../modules/_karhoo_demand_deeplink.md#httpresponse)‹T››*

*Defined in [demand-deeplink/src/api/types.ts:25](https://github.com/karhoo/web-lib-demand/blob/fbcb272/packages/demand-deeplink/src/api/types.ts#L25)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`query?` | [Query](../modules/_karhoo_demand_deeplink.md#query) |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_deeplink.md#httpresponse)‹T››*

___

###  post

▸ **post**<**T**>(`url`: string, `body`: object): *Promise‹[HttpResponse](../modules/_karhoo_demand_deeplink.md#httpresponse)‹T››*

*Defined in [demand-deeplink/src/api/types.ts:26](https://github.com/karhoo/web-lib-demand/blob/fbcb272/packages/demand-deeplink/src/api/types.ts#L26)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`body` | object |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_deeplink.md#httpresponse)‹T››*

___

###  put

▸ **put**<**T**>(`url`: string, `body`: object): *Promise‹[HttpResponse](../modules/_karhoo_demand_deeplink.md#httpresponse)‹T››*

*Defined in [demand-deeplink/src/api/types.ts:27](https://github.com/karhoo/web-lib-demand/blob/fbcb272/packages/demand-deeplink/src/api/types.ts#L27)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`body` | object |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_deeplink.md#httpresponse)‹T››*

___

###  remove

▸ **remove**<**T**>(`url`: string): *Promise‹[HttpResponse](../modules/_karhoo_demand_deeplink.md#httpresponse)‹T››*

*Defined in [demand-deeplink/src/api/types.ts:28](https://github.com/karhoo/web-lib-demand/blob/fbcb272/packages/demand-deeplink/src/api/types.ts#L28)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_deeplink.md#httpresponse)‹T››*
