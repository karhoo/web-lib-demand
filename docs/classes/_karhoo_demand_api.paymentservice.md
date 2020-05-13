[web-lib-demand](../README.md) › [Globals](../globals.md) › [@karhoo/demand-api](../modules/_karhoo_demand_api.md) › [PaymentService](_karhoo_demand_api.paymentservice.md)

# Class: PaymentService

## Hierarchy

* **PaymentService**

## Index

### Constructors

* [constructor](_karhoo_demand_api.paymentservice.md#constructor)

### Methods

* [addPaymentCard](_karhoo_demand_api.paymentservice.md#addpaymentcard)
* [createClientToken](_karhoo_demand_api.paymentservice.md#createclienttoken)
* [getClientNonce](_karhoo_demand_api.paymentservice.md#getclientnonce)

## Constructors

###  constructor

\+ **new PaymentService**(`http`: [Http](../interfaces/_karhoo_demand_api.http.md)): *[PaymentService](_karhoo_demand_api.paymentservice.md)*

*Defined in [demand-api/src/payment/PaymentService.ts:13](https://github.com/karhoo/web-lib-demand/blob/a5799e7/packages/demand-api/src/payment/PaymentService.ts#L13)*

**Parameters:**

Name | Type |
------ | ------ |
`http` | [Http](../interfaces/_karhoo_demand_api.http.md) |

**Returns:** *[PaymentService](_karhoo_demand_api.paymentservice.md)*

## Methods

###  addPaymentCard

▸ **addPaymentCard**(`params`: [AddPaymentCardParams](../interfaces/_karhoo_demand_api.addpaymentcardparams.md)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/payment/PaymentService.ts:32](https://github.com/karhoo/web-lib-demand/blob/a5799e7/packages/demand-api/src/payment/PaymentService.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [AddPaymentCardParams](../interfaces/_karhoo_demand_api.addpaymentcardparams.md) |

**Returns:** *Promise‹object & object | object & object›*

___

###  createClientToken

▸ **createClientToken**(`params`: [CreateTokenParams](../modules/_karhoo_demand_api.md#createtokenparams)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/payment/PaymentService.ts:19](https://github.com/karhoo/web-lib-demand/blob/a5799e7/packages/demand-api/src/payment/PaymentService.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [CreateTokenParams](../modules/_karhoo_demand_api.md#createtokenparams) |

**Returns:** *Promise‹object & object | object & object›*

___

###  getClientNonce

▸ **getClientNonce**(`params`: [ClientNonceParams](../modules/_karhoo_demand_api.md#clientnonceparams)): *Promise‹object & object | object & object›*

*Defined in [demand-api/src/payment/PaymentService.ts:28](https://github.com/karhoo/web-lib-demand/blob/a5799e7/packages/demand-api/src/payment/PaymentService.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`params` | [ClientNonceParams](../modules/_karhoo_demand_api.md#clientnonceparams) |

**Returns:** *Promise‹object & object | object & object›*
