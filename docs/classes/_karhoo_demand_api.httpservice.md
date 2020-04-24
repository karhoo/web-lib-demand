[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [HttpService](_karhoo_demand_api.httpservice.md)

# Class: HttpService

## Hierarchy

* **HttpService**

## Implements

* [Http](../interfaces/_karhoo_demand_api.http.md)

## Index

### Constructors

* [constructor](_karhoo_demand_api.httpservice.md#constructor)

### Methods

* [get](_karhoo_demand_api.httpservice.md#get)
* [post](_karhoo_demand_api.httpservice.md#post)
* [put](_karhoo_demand_api.httpservice.md#put)
* [remove](_karhoo_demand_api.httpservice.md#remove)
* [setCorrelationIdPrefix](_karhoo_demand_api.httpservice.md#setcorrelationidprefix)
* [setDefaultRequestOptionsGetter](_karhoo_demand_api.httpservice.md#setdefaultrequestoptionsgetter)
* [setResponseMiddleware](_karhoo_demand_api.httpservice.md#setresponsemiddleware)

## Constructors

###  constructor

\+ **new HttpService**(`url`: string): *[HttpService](_karhoo_demand_api.httpservice.md)*

*Defined in [demand-api/src/http/HttpService.ts:54](https://github.com/karhoo/web-lib-demand/blob/14a45c9/packages/demand-api/src/http/HttpService.ts#L54)*

**Parameters:**

Name | Type |
------ | ------ |
`url` | string |

**Returns:** *[HttpService](_karhoo_demand_api.httpservice.md)*

## Methods

###  get

▸ **get**<**T**>(`url`: string, `query?`: [Query](../modules/_karhoo_demand_api.md#query), `options`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

*Implementation of [Http](../interfaces/_karhoo_demand_api.http.md)*

*Defined in [demand-api/src/http/HttpService.ts:78](https://github.com/karhoo/web-lib-demand/blob/14a45c9/packages/demand-api/src/http/HttpService.ts#L78)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`url` | string | - |
`query?` | [Query](../modules/_karhoo_demand_api.md#query) | - |
`options` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) | {} |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

___

###  post

▸ **post**<**T**>(`url`: string, `body`: object, `options`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions), `query?`: [Query](../modules/_karhoo_demand_api.md#query)): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

*Implementation of [Http](../interfaces/_karhoo_demand_api.http.md)*

*Defined in [demand-api/src/http/HttpService.ts:82](https://github.com/karhoo/web-lib-demand/blob/14a45c9/packages/demand-api/src/http/HttpService.ts#L82)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`url` | string | - |
`body` | object | - |
`options` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) | {} |
`query?` | [Query](../modules/_karhoo_demand_api.md#query) | - |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

___

###  put

▸ **put**<**T**>(`url`: string, `body`: object, `options`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

*Implementation of [Http](../interfaces/_karhoo_demand_api.http.md)*

*Defined in [demand-api/src/http/HttpService.ts:93](https://github.com/karhoo/web-lib-demand/blob/14a45c9/packages/demand-api/src/http/HttpService.ts#L93)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`url` | string | - |
`body` | object | - |
`options` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) | {} |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

___

###  remove

▸ **remove**<**T**>(`url`: string, `options`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

*Implementation of [Http](../interfaces/_karhoo_demand_api.http.md)*

*Defined in [demand-api/src/http/HttpService.ts:97](https://github.com/karhoo/web-lib-demand/blob/14a45c9/packages/demand-api/src/http/HttpService.ts#L97)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`url` | string | - |
`options` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) | {} |

**Returns:** *Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››*

___

###  setCorrelationIdPrefix

▸ **setCorrelationIdPrefix**(`prefix`: string): *this*

*Defined in [demand-api/src/http/HttpService.ts:66](https://github.com/karhoo/web-lib-demand/blob/14a45c9/packages/demand-api/src/http/HttpService.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`prefix` | string |

**Returns:** *this*

___

###  setDefaultRequestOptionsGetter

▸ **setDefaultRequestOptionsGetter**(`getter`: [DefaultRequestOptionsGetter](../modules/_karhoo_demand_api.md#defaultrequestoptionsgetter)): *this*

*Defined in [demand-api/src/http/HttpService.ts:60](https://github.com/karhoo/web-lib-demand/blob/14a45c9/packages/demand-api/src/http/HttpService.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`getter` | [DefaultRequestOptionsGetter](../modules/_karhoo_demand_api.md#defaultrequestoptionsgetter) |

**Returns:** *this*

___

###  setResponseMiddleware

▸ **setResponseMiddleware**(`middleware`: [HttpResponseMiddleware](../modules/_karhoo_demand_api.md#httpresponsemiddleware)): *this*

*Defined in [demand-api/src/http/HttpService.ts:72](https://github.com/karhoo/web-lib-demand/blob/14a45c9/packages/demand-api/src/http/HttpService.ts#L72)*

**Parameters:**

Name | Type |
------ | ------ |
`middleware` | [HttpResponseMiddleware](../modules/_karhoo_demand_api.md#httpresponsemiddleware) |

**Returns:** *this*
