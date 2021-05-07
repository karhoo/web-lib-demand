<div align="center">
<a href="https://karhoo.com">
  <img
    alt="Karhoo logo"
    width="250px"
    src="https://cdn.karhoo.com/s/images/logos/karhoo_logo.png"
  />
</a>

<h1>@karhoo/quotes</h1>

Bussness component to work with Karhoo Quotes API
<br />

<hr />

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

## Installation

```sh
npm i @karhoo/quotes
```

## Usage

```js

import { getApi } from '@karhoo/api'
import { QuotesBloc } from '@karhoo/quotes'

const api = getApi({
  url: 'api',
  defaultRequestOptionsGetter: () => ({
    headers: {
      identifier: 'XXXX',
      referrer: 'https://example-referer.com/'
    }
  })
})

/*
* The latitude in degrees. It must be in the range [-90.0, +90.0], with at least 4  decimal digits of precision.
* The longitude in degrees. It must be in the range [-180.0, +180.0], with at least 4  decimal digits of precision.
*/
const quotesSearchParams = {
  origin: {
    latitude: '51.501364',
    longitude: '-0.14189',
    displayAddress: 'Buckingham Palace, London SW1A 1AA',
  },
  destination: {
    latitude: '41.78650',
    longitude: '1.78954',
    displayAddress: 'Big Ben, Westminster, London SW1A 0AA, UK',
  },
  localTimeOfPickup: "2020-05-20T12:00"
}

/*
* quotesService use quotes V1 API which is depricated. Use quotesV2Service instead
*/
const quotesBloc = new QuotesBloc(api.quotesV2Service)

quotesBloc.filters = {
  numOfLuggage: 2,
  numOfPassengers: 2,
}

quotesBloc.matchingQuotes.subscribe((data) => {
  // quotes that accepts 2 passengers and 2 bags
  console.log('Matching quotes', data)
})

quotesBloc.otherAvailibleQuotes.subscribe((data) => {
  // all other quotes that did not match filters
  console.log('Other quotes', data)
})

quotesBloc.loading.subscribe(isLoading => {
  console.log('isLoading', isLoading)
})

quotesBloc.quotesExpired.subscribe(() => {
  console.log('Quotes Expired')

  quotesBloc.refreshQuotes() // requests quotes with same search params
})

quotesBloc.requestQuotes(quotesSearchParams)

```
