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

## Usage

```js

import { getApi } from '@karhoo/demand-api'
import { PaymentBloc, BraintreeProvider } from '@karhoo/demand-bloc-payment'

const organisationId = '1a12345d-e111-1da1-111f-a1111e1e11f1'
const currencyCode = 'GBP'

const provider = new BraintreeProvider(getApi().paymentService, {
  organisationId,
  currencyCode
})

const bloc = new PaymentBloc(provider)

await bloc.initPayment()

if (bloc.validatePaymentDetails()) {
  const result = await bloc.verifyCardWithThreeDSecure()

  console.log(result)
}

await bloc.dispose()

```