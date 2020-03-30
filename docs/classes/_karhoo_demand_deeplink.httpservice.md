[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-deeplink](../modules/_karhoo_demand_deeplink.md) › [HttpService](_karhoo_demand_deeplink.httpservice.md)

# Class: HttpService

## Hierarchy

* **HttpService**

## Implements

* [Http](../interfaces/_karhoo_demand_deeplink.http.md)

## Index

### Constructors

* [constructor](_karhoo_demand_deeplink.httpservice.md#constructor)

### Methods

* [get](_karhoo_demand_deeplink.httpservice.md#get)
* [post](_karhoo_demand_deeplink.httpservice.md#post)
* [put](_karhoo_demand_deeplink.httpservice.md#put)
* [remove](_karhoo_demand_deeplink.httpservice.md#remove)

## Constructors

###  constructor

\+ **new HttpService**(`url`: string, `getDefaultRequestOptions?`: undefined | function): *[HttpService](_karhoo_demand_deeplink.httpservice.md)*

*Defined in [demand-deeplink/src/api/HttpService.ts:35](https://github.com/karhoo/web-lib-demand/blob/fbcb272/packages/demand-deeplink/src/api/HttpService.ts#L35)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |
`getDefaultRequestOptions?` | undefined &#124; function |

**Returns:** *[HttpService](_karhoo_demand_deeplink.httpservice.md)*

## Methods

###  get

▸ **get**<**T**>(`url`: string, `query?`: [Query](../modules/_karhoo_demand_deeplink.md#query)): *Promise‹[HttpResponse](../modules/_karhoo_demand_deeplink.md#httpresponse)‹T››*

*Implementation of [Http](../interfaces/_karhoo_demand_deeplink.http.md)*

*Defined in [demand-deeplink/src/api/HttpService.ts:45](https://github.com/karhoo/web-lib-demand/blob/fbcb272/packages/demand-deeplink/src/api/HttpService.ts#L45)*

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

*Implementation of [Http](../interfaces/_karhoo_demand_deeplink.http.md)*

*Defined in [demand-deeplink/src/api/HttpService.ts:49](https://github.com/karhoo/web-lib-demand/blob/fbcb272/packages/demand-deeplink/src/api/HttpService.ts#L49)*

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

*Implementation of [Http](../interfaces/_karhoo_demand_deeplink.http.md)*

*Defined in [demand-deeplink/src/api/HttpService.ts:53](https://github.com/karhoo/web-lib-demand/blob/fbcb272/packages/demand-deeplink/src/api/HttpService.ts#L53)*

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

*Implementation of [Http](../interfaces/_karhoo_demand_deeplink.http.md)*

*Defined in [demand-deeplink/src/api/HttpService.ts:57](https://github.com/karhoo/web-lib-demand/blob/fbcb272/packages/demand-deeplink/src/api/HttpService.ts#L57)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_deeplink.md#httpresponse)‹T››*
