[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [Http](_karhoo_demand_api.http.md)

# Interface: Http

## Hierarchy

- **Http**

## Implemented by

- [HttpService](../classes/_karhoo_demand_api.httpservice.md)

## Index

### Methods

- [get](_karhoo_demand_api.http.md#get)
- [post](_karhoo_demand_api.http.md#post)
- [put](_karhoo_demand_api.http.md#put)
- [remove](_karhoo_demand_api.http.md#remove)

## Methods

### get

▸ **get**<**T**>(`url`: string, `query?`: [Query](../modules/_karhoo_demand_api.md#query), `options?`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

_Defined in [demand-api/src/http/types.ts:40](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L40)_

**Type parameters:**

▪ **T**

**Parameters:**

| Name       | Type                                                                          |
| ---------- | ----------------------------------------------------------------------------- |
| `url`      | string                                                                        |
| `query?`   | [Query](../modules/_karhoo_demand_api.md#query)                               |
| `options?` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) |

**Returns:** _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

---

### post

▸ **post**<**T**>(`url`: string, `body`: object, `options?`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

_Defined in [demand-api/src/http/types.ts:41](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L41)_

**Type parameters:**

▪ **T**

**Parameters:**

| Name       | Type                                                                          |
| ---------- | ----------------------------------------------------------------------------- |
| `url`      | string                                                                        |
| `body`     | object                                                                        |
| `options?` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) |

**Returns:** _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

---

### put

▸ **put**<**T**>(`url`: string, `body`: object, `options?`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

_Defined in [demand-api/src/http/types.ts:42](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L42)_

**Type parameters:**

▪ **T**

**Parameters:**

| Name       | Type                                                                          |
| ---------- | ----------------------------------------------------------------------------- |
| `url`      | string                                                                        |
| `body`     | object                                                                        |
| `options?` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) |

**Returns:** _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

---

### remove

▸ **remove**<**T**>(`url`: string, `options?`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

_Defined in [demand-api/src/http/types.ts:43](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/types.ts#L43)_

**Type parameters:**

▪ **T**

**Parameters:**

| Name       | Type                                                                          |
| ---------- | ----------------------------------------------------------------------------- |
| `url`      | string                                                                        |
| `options?` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) |

**Returns:** _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_
