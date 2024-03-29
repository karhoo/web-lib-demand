<div align="center">
<a href="https://karhoo.com">
  <img
    alt="Karhoo logo"
    width="250px"
    src="https://cdn.karhoo.com/s/images/logos/karhoo_logo.png"
  />
</a>

<h1>@karhoo/demand-bloc-payment</h1>

BLoC to work with Karhoo Payment API
<br />

<hr />

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

## Installation

```sh
npm i @karhoo/demand-bloc-payment
```

## Warnings

This library uses `Promise`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise`

## Usage

```js
import { getApi } from '@karhoo/demand-api'
import { PaymentBloc, BraintreeProvider } from '@karhoo/demand-bloc-payment'

const organisationId = '1a12345d-e111-1da1-111f-a1111e1e11f1'
const currencyCode = 'GBP'
const amount = 10

const payer = {
  id: 'id',
  email: 'email@of.user',
  first_name: 'firstName',
  last_name: 'lastName',
}

const braintreeOptions = {
  organisationId,
  currencyCode,
}

const providers = {
  Braintree: new BraintreeProvider(paymentService, braintreeOptions),
}

const options = {
  paymentCardsEnabled: true,
}

const block = await PaymentBloc.create({
  providers,
  paymentService,
  options,
  cardsInfo,
})

await bloc.initPayment()

if (bloc.validatePaymentDetails()) {
  const result = await bloc.verifyCardWithThreeDSecure(amount)

  console.log(result)
}

await bloc.dispose()
```

For payment without 3d secure verification:

```js
if (bloc.validatePaymentDetails()) {
  const result = await bloc.getPaymentNonce()

  console.log(result)
}
```

Cards support:

```js
const cardsInfo = {
  cards: [],
  payer: undefined,
  setPaymentCards(cards, payer) {
    this.cards = cards
    this.payer = payer
  },
  getSelectedPaymentCard() {
    return this.cards[0]
  },
  clear() {
    this.cards = []
    this.payer = undefined
  },
}

const bloc = new PaymentBloc(provider, { paymentCardsEnabled: true }, cardsInfo)

await bloc.initPayment()
```

Save card:

```js
const result = await bloc.savePaymentCard(payer)

console.log(result)
```

All bloc methods, except for `dispose`, should be called only after initialization is complete otherwise it may lead to unexpected behavior.
If `dispose` is called before initialization is complete initialization will be cancelled and `errors.operationCancelled` will be thrown.

### Providers

#### Braintree

```js

import { HostedFieldsTokenizePayload, ThreeDSecureVerifyPayload } from 'braintree-web'
import { getApi } from '@karhoo/demand-api'
import { BraintreeProvider, BraintreeProviderOptions, braintreeDefaultValues, braintreeErrors } from '@karhoo/demand-bloc-payment'

const organisationId = '1a12345d-e111-1da1-111f-a1111e1e11f1'
const currencyCode = 'GBP'

const options: BraintreeProviderOptions = {
  organisationId,
  currencyCode
}

const provider = new BraintreeProvider(getApi().paymentService, options)

`options` should have `organisationId` and `currencyCode`. Other fields are not required

```

if `hostedFields` is not provided following defaults will be used:

```js
{
  hostedFieldsConfig: braintreeDefaultValues.defaultHostedFieldsConfig
  hostedFieldsStyles: braintreeDefaultValues.defaultHostedFieldsStyles
}
```

if `invalidFieldClass` is not provided `braintreeDefaultValues.defaultInvalidFieldClass` will be used.
if `withThreeDSecure` is not provided `braintreeDefaultValues.default3DSecureStatus` will be used.

Initialize provider:

```js
await provider.initialize()
```

In case of failure either braintree specific error or `braintreeErrors.authorizationToken` will be thrown

Validate payment form:

```js
const isValid: boolean = provider.validatePaymentForm()
```

Tokenize hosted fields:

```js
const tokenizeResponse: HostedFieldsTokenizePayload = await provider.tokenizeHostedFields()
```

Verify:

```js
const amount = 10

const result: ThreeDSecureVerifyPayload = await provider.verifyCard(amount, tokenizeResponse.nonce)
```

Save card:

```js
await provider.saveCard('nonce')
```

Get saved cards:

```js
const data = await provider.getSavedCards()
```

Dispose:

```js
await provider.dispose()
```

All provider methods, except for `dispose`, should be called only after initialization is complete otherwise it may lead to unexpected behavior.
If `dispose` is called before initialization is complete initialization will be cancelled and `errors.operationCancelled` will be thrown.
