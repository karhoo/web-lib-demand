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

> ⚠️ This package is work in progress and can not be used as an independent package.

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

const provider = new BraintreeProvider(getApi().paymentService, {
  organisationId,
  currencyCode
})

const bloc = new PaymentBloc(provider)

await bloc.initPayment()

if (bloc.validatePaymentDetails()) {
  const result = await bloc.verifyCardWithThreeDSecure(amount)

  console.log(result)
}

await bloc.dispose()

```

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
if `threeDSecureFields` is not provided `braintreeDefaultValues.defaultThreeDSecureFields` will be used.

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

const result: ThreeDSecureVerifyPayload = await provider.verifyWithThreeDSecure(amount, tokenizeResponse.nonce)
```

Save card:

```js
const payer = {
  id: 'id',
  email: 'email@of.user',
  first_name: 'firstName',
  last_name: 'lastName',
}

await provider.saveCard('nonce', payer)
```

Get saved cards:

```js
const data = await provider.getSavedCards(payer)
```

Dispose:

```js
await provider.dispose()
```

