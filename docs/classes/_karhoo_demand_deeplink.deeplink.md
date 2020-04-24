[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-deeplink](../modules/_karhoo_demand_deeplink.md) › [Deeplink](_karhoo_demand_deeplink.deeplink.md)

# Class: Deeplink

## Hierarchy

* **Deeplink**

## Index

### Constructors

* [constructor](_karhoo_demand_deeplink.deeplink.md#constructor)

### Accessors

* [deeplinkData](_karhoo_demand_deeplink.deeplink.md#deeplinkdata)

### Methods

* [isValid](_karhoo_demand_deeplink.deeplink.md#isvalid)
* [resolve](_karhoo_demand_deeplink.deeplink.md#resolve)

## Constructors

###  constructor

\+ **new Deeplink**(`query`: string, `api`: [Api](../modules/_karhoo_demand_deeplink.md#api)): *[Deeplink](_karhoo_demand_deeplink.deeplink.md)*

*Defined in [demand-deeplink/src/Deeplink.ts:79](https://github.com/karhoo/web-lib-demand/blob/2aabb00/packages/demand-deeplink/src/Deeplink.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`query` | string |
`api` | [Api](../modules/_karhoo_demand_deeplink.md#api) |

**Returns:** *[Deeplink](_karhoo_demand_deeplink.deeplink.md)*

## Accessors

###  deeplinkData

• **get deeplinkData**(): *object*

*Defined in [demand-deeplink/src/Deeplink.ts:87](https://github.com/karhoo/web-lib-demand/blob/2aabb00/packages/demand-deeplink/src/Deeplink.ts#L87)*

**Returns:** *object*

* **customFields**? : *[Dictionary](../modules/_karhoo_demand_deeplink.md#dictionary)‹string›*

* **legs**: *[JourneyLeg](../modules/_karhoo_demand_deeplink.md#journeyleg)[]*

* **meta**: *[Dictionary](../modules/_karhoo_demand_deeplink.md#dictionary)‹string›*

* **passengerInfo**: *[PassengerInfo](../modules/_karhoo_demand_deeplink.md#passengerinfo)*

* **travellerLocale**? : *undefined | string*

## Methods

###  isValid

▸ **isValid**(): *object*

*Defined in [demand-deeplink/src/Deeplink.ts:91](https://github.com/karhoo/web-lib-demand/blob/2aabb00/packages/demand-deeplink/src/Deeplink.ts#L91)*

**Returns:** *object*

* **errors**? : *[ValidationError](../modules/_karhoo_demand_deeplink.md#validationerror)[]*

* **ok**: *boolean*

___

###  resolve

▸ **resolve**(`subscriber`: function): *object*

*Defined in [demand-deeplink/src/Deeplink.ts:95](https://github.com/karhoo/web-lib-demand/blob/2aabb00/packages/demand-deeplink/src/Deeplink.ts#L95)*

**Parameters:**

▪ **subscriber**: *function*

▸ (`data`: [ResolveResponse](../modules/_karhoo_demand_deeplink.md#resolveresponse)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`data` | [ResolveResponse](../modules/_karhoo_demand_deeplink.md#resolveresponse) |

**Returns:** *object*

* **unsubscribe**: *unsubscribe*
