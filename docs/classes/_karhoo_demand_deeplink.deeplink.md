[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-deeplink](../modules/_karhoo_demand_deeplink.md) › [Deeplink](_karhoo_demand_deeplink.deeplink.md)

# Class: Deeplink

## Hierarchy

- **Deeplink**

## Index

### Constructors

- [constructor](_karhoo_demand_deeplink.deeplink.md#constructor)

### Accessors

- [deeplinkData](_karhoo_demand_deeplink.deeplink.md#deeplinkdata)

### Methods

- [isValid](_karhoo_demand_deeplink.deeplink.md#isvalid)
- [resolve](_karhoo_demand_deeplink.deeplink.md#resolve)

## Constructors

### constructor

\+ **new Deeplink**(`query`: string, `api`: [Api](../modules/_karhoo_demand_deeplink.md#api)): _[Deeplink](_karhoo_demand_deeplink.deeplink.md)_

_Defined in [demand-deeplink/src/Deeplink.ts:79](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L79)_

**Parameters:**

| Name    | Type                                             |
| ------- | ------------------------------------------------ |
| `query` | string                                           |
| `api`   | [Api](../modules/_karhoo_demand_deeplink.md#api) |

**Returns:** _[Deeplink](_karhoo_demand_deeplink.deeplink.md)_

## Accessors

### deeplinkData

• **get deeplinkData**(): _object_

_Defined in [demand-deeplink/src/Deeplink.ts:87](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L87)_

**Returns:** _object_

- **customFields**? : _[Dictionary](../modules/_karhoo_demand_deeplink.md#dictionary)‹string›_

- **legs**: _[JourneyLeg](../modules/_karhoo_demand_deeplink.md#journeyleg)[]_

- **meta**: _[Dictionary](../modules/_karhoo_demand_deeplink.md#dictionary)‹string›_

- **passengerInfo**: _[PassengerInfo](../modules/_karhoo_demand_deeplink.md#passengerinfo)_

- **travellerLocale**? : _undefined | string_

## Methods

### isValid

▸ **isValid**(): _object_

_Defined in [demand-deeplink/src/Deeplink.ts:91](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L91)_

**Returns:** _object_

- **errors**? : _[ValidationError](../modules/_karhoo_demand_deeplink.md#validationerror)[]_

- **ok**: _boolean_

---

### resolve

▸ **resolve**(`subscriber`: function): _object_

_Defined in [demand-deeplink/src/Deeplink.ts:95](https://github.com/karhoo/web-lib-demand/blob/ac75fec/packages/demand-deeplink/src/Deeplink.ts#L95)_

**Parameters:**

▪ **subscriber**: _function_

▸ (`data`: [ResolveResponse](../modules/_karhoo_demand_deeplink.md#resolveresponse)): _void_

**Parameters:**

| Name   | Type                                                                     |
| ------ | ------------------------------------------------------------------------ |
| `data` | [ResolveResponse](../modules/_karhoo_demand_deeplink.md#resolveresponse) |

**Returns:** _object_

- **unsubscribe**: _unsubscribe_
