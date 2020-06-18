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

import { QuotesBloc } from '@karhoo/demand-bloc-payment'

const provider = {} //TBD

const bloc = new QuotesBloc(provider)

await bloc.initPayment()

if (bloc.validatePaymentDetails()) {
  const result = await bloc.verifyCardWithThreeDSecure()

  console.log(result)
}

await bloc.dispose()

```