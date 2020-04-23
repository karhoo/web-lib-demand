[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [HttpService](_karhoo_demand_api.httpservice.md)

# Class: HttpService

## Hierarchy

- **HttpService**

## Implements

- [Http](../interfaces/_karhoo_demand_api.http.md)

## Index

### Constructors

- [constructor](_karhoo_demand_api.httpservice.md#constructor)

### Methods

- [get](_karhoo_demand_api.httpservice.md#get)
- [post](_karhoo_demand_api.httpservice.md#post)
- [put](_karhoo_demand_api.httpservice.md#put)
- [remove](_karhoo_demand_api.httpservice.md#remove)
- [setCorrelationIdPrefix](_karhoo_demand_api.httpservice.md#setcorrelationidprefix)
- [setDefaultRequestOptionsGetter](_karhoo_demand_api.httpservice.md#setdefaultrequestoptionsgetter)
- [setResponseMiddleware](_karhoo_demand_api.httpservice.md#setresponsemiddleware)

## Constructors

### constructor

\+ **new HttpService**(`url`: string): _[HttpService](_karhoo_demand_api.httpservice.md)_

_Defined in [demand-api/src/http/HttpService.ts:53](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L53)_

**Parameters:**

| Name  | Type   |
| ----- | ------ |
| `url` | string |

**Returns:** _[HttpService](_karhoo_demand_api.httpservice.md)_

## Methods

### get

▸ **get**<**T**>(`url`: string, `query?`: [Query](../modules/_karhoo_demand_api.md#query), `options`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

_Implementation of [Http](../interfaces/_karhoo_demand_api.http.md)_

_Defined in [demand-api/src/http/HttpService.ts:77](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L77)_

**Type parameters:**

▪ **T**

**Parameters:**

| Name      | Type                                                                          | Default |
| --------- | ----------------------------------------------------------------------------- | ------- |
| `url`     | string                                                                        | -       |
| `query?`  | [Query](../modules/_karhoo_demand_api.md#query)                               | -       |
| `options` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) | {}      |

**Returns:** _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

---

### post

▸ **post**<**T**>(`url`: string, `body`: object, `options`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

_Implementation of [Http](../interfaces/_karhoo_demand_api.http.md)_

_Defined in [demand-api/src/http/HttpService.ts:81](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L81)_

**Type parameters:**

▪ **T**

**Parameters:**

| Name      | Type                                                                          | Default |
| --------- | ----------------------------------------------------------------------------- | ------- |
| `url`     | string                                                                        | -       |
| `body`    | object                                                                        | -       |
| `options` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) | {}      |

**Returns:** _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

---

### put

▸ **put**<**T**>(`url`: string, `body`: object, `options`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

_Implementation of [Http](../interfaces/_karhoo_demand_api.http.md)_

_Defined in [demand-api/src/http/HttpService.ts:85](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L85)_

**Type parameters:**

▪ **T**

**Parameters:**

| Name      | Type                                                                          | Default |
| --------- | ----------------------------------------------------------------------------- | ------- |
| `url`     | string                                                                        | -       |
| `body`    | object                                                                        | -       |
| `options` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) | {}      |

**Returns:** _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

---

### remove

▸ **remove**<**T**>(`url`: string, `options`: [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions)): _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

_Implementation of [Http](../interfaces/_karhoo_demand_api.http.md)_

_Defined in [demand-api/src/http/HttpService.ts:89](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L89)_

**Type parameters:**

▪ **T**

**Parameters:**

| Name      | Type                                                                          | Default |
| --------- | ----------------------------------------------------------------------------- | ------- |
| `url`     | string                                                                        | -       |
| `options` | [MethodRequestOptions](../modules/_karhoo_demand_api.md#methodrequestoptions) | {}      |

**Returns:** _Promise‹[HttpResponse](../modules/_karhoo_demand_api.md#httpresponse)‹T››_

---

### setCorrelationIdPrefix

▸ **setCorrelationIdPrefix**(`prefix`: string): _this_

_Defined in [demand-api/src/http/HttpService.ts:65](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L65)_

**Parameters:**

| Name     | Type   |
| -------- | ------ |
| `prefix` | string |

**Returns:** _this_

---

### setDefaultRequestOptionsGetter

▸ **setDefaultRequestOptionsGetter**(`getter`: [DefaultRequestOptionsGetter](../modules/_karhoo_demand_api.md#defaultrequestoptionsgetter)): _this_

_Defined in [demand-api/src/http/HttpService.ts:59](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L59)_

**Parameters:**

| Name     | Type                                                                                        |
| -------- | ------------------------------------------------------------------------------------------- |
| `getter` | [DefaultRequestOptionsGetter](../modules/_karhoo_demand_api.md#defaultrequestoptionsgetter) |

**Returns:** _this_

---

### setResponseMiddleware

▸ **setResponseMiddleware**(`middleware`: [HttpResponseMiddleware](../modules/_karhoo_demand_api.md#httpresponsemiddleware)): _this_

_Defined in [demand-api/src/http/HttpService.ts:71](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/http/HttpService.ts#L71)_

**Parameters:**

| Name         | Type                                                                              |
| ------------ | --------------------------------------------------------------------------------- |
| `middleware` | [HttpResponseMiddleware](../modules/_karhoo_demand_api.md#httpresponsemiddleware) |

**Returns:** _this_
