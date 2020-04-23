[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [LocationService](_karhoo_demand_api.locationservice.md)

# Class: LocationService

## Hierarchy

- **LocationService**

## Index

### Constructors

- [constructor](_karhoo_demand_api.locationservice.md#constructor)

### Methods

- [getAddressAutocompleteData](_karhoo_demand_api.locationservice.md#getaddressautocompletedata)
- [getAddressDetails](_karhoo_demand_api.locationservice.md#getaddressdetails)

## Constructors

### constructor

\+ **new LocationService**(`http`: [Http](../interfaces/_karhoo_demand_api.http.md)): _[LocationService](_karhoo_demand_api.locationservice.md)_

_Defined in [demand-api/src/location/LocationService.ts:14](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/location/LocationService.ts#L14)_

**Parameters:**

| Name   | Type                                             |
| ------ | ------------------------------------------------ |
| `http` | [Http](../interfaces/_karhoo_demand_api.http.md) |

**Returns:** _[LocationService](_karhoo_demand_api.locationservice.md)_

## Methods

### getAddressAutocompleteData

▸ **getAddressAutocompleteData**(`data`: [LocationAddressAutocompleteParams](../modules/_karhoo_demand_api.md#locationaddressautocompleteparams)): _Promise‹object & object | object & object›_

_Defined in [demand-api/src/location/LocationService.ts:29](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/location/LocationService.ts#L29)_

**Parameters:**

| Name   | Type                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------- |
| `data` | [LocationAddressAutocompleteParams](../modules/_karhoo_demand_api.md#locationaddressautocompleteparams) |

**Returns:** _Promise‹object & object | object & object›_

---

### getAddressDetails

▸ **getAddressDetails**(`__namedParameters`: object): _Promise‹object & object | object & object›_

_Defined in [demand-api/src/location/LocationService.ts:20](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-api/src/location/LocationService.ts#L20)_

**Parameters:**

▪ **\_\_namedParameters**: _object_

| Name           | Type                    |
| -------------- | ----------------------- |
| `placeId`      | string                  |
| `sessionToken` | undefined &#124; string |

**Returns:** _Promise‹object & object | object & object›_
