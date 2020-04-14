[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [Http](_karhoo_demand_api.http.md)

# Interface: Http

## Hierarchy

* **Http**

## Implemented by

* [HttpService](../classes/_karhoo_demand_api.httpservice.md)

## Index

### Methods

* [get](_karhoo_demand_api.http.md#get)
* [post](_karhoo_demand_api.http.md#post)
* [put](_karhoo_demand_api.http.md#put)
* [remove](_karhoo_demand_api.http.md#remove)

## Methods

###  get

▸ **get**<**T**>(`url`: string, `query?`: [Query](../modules/_karhoo_demand_api.md#query), `options?`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

*Defined in [demand-api/src/http/types.ts:38](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L38)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`query?` | [Query](../modules/_karhoo_demand_api.md#query) |
`options?` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

___

###  post

▸ **post**<**T**>(`url`: string, `body`: object, `options?`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

*Defined in [demand-api/src/http/types.ts:39](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L39)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`body` | object |
`options?` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

___

###  put

▸ **put**<**T**>(`url`: string, `body`: object, `options?`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

*Defined in [demand-api/src/http/types.ts:40](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L40)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`body` | object |
`options?` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

___

###  remove

▸ **remove**<**T**>(`url`: string, `options?`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

*Defined in [demand-api/src/http/types.ts:41](https://github.com/karhoo/web-lib-demand/blob/4e5326f/packages/demand-api/src/http/types.ts#L41)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`options?` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*
