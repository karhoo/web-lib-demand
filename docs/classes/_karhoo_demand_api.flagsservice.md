[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [FlagsService](_karhoo_demand_api.flagsservice.md)

# Class: FlagsService

## Hierarchy

* **FlagsService**

## Index

### Constructors

* [constructor](_karhoo_demand_api.flagsservice.md#constructor)

### Methods

* [getByVersion](_karhoo_demand_api.flagsservice.md#getbyversion)
* [getCurrentVersion](_karhoo_demand_api.flagsservice.md#getcurrentversion)
* [getLatestVersion](_karhoo_demand_api.flagsservice.md#getlatestversion)

## Constructors

###  constructor

\+ **new FlagsService**(`http`: [Http](../interfaces/_karhoo_demand_api.http.md)): *[FlagsService](_karhoo_demand_api.flagsservice.md)*

*Defined in [demand-api/src/flags/FlagsService.ts:7](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/flags/FlagsService.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`http` | [Http](../interfaces/_karhoo_demand_api.http.md) |

**Returns:** *[FlagsService](_karhoo_demand_api.flagsservice.md)*

## Methods

###  getByVersion

▸ **getByVersion**(`params`: [FlagsRequestPathParameters](../modules/_karhoo_demand_api.md#flagsrequestpathparameters), `query?`: [FlagsVersionType](../modules/_karhoo_demand_api.md#flagsversiontype)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/flags/FlagsService.ts:13](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/flags/FlagsService.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [FlagsRequestPathParameters](../modules/_karhoo_demand_api.md#flagsrequestpathparameters) |
`query?` | [FlagsVersionType](../modules/_karhoo_demand_api.md#flagsversiontype) |

**Returns:** *Promise‹object & object | object & object›*

___

###  getCurrentVersion

▸ **getCurrentVersion**(`params`: [FlagsRequestPathParameters](../modules/_karhoo_demand_api.md#flagsrequestpathparameters)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/flags/FlagsService.ts:21](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/flags/FlagsService.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [FlagsRequestPathParameters](../modules/_karhoo_demand_api.md#flagsrequestpathparameters) |

**Returns:** *Promise‹object & object | object & object›*

___

###  getLatestVersion

▸ **getLatestVersion**(`params`: [FlagsRequestPathParameters](../modules/_karhoo_demand_api.md#flagsrequestpathparameters)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/flags/FlagsService.ts:17](https://github.com/karhoo/web-lib-demand/blob/e2b078c/packages/demand-api/src/flags/FlagsService.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [FlagsRequestPathParameters](../modules/_karhoo_demand_api.md#flagsrequestpathparameters) |

**Returns:** *Promise‹object & object | object & object›*
