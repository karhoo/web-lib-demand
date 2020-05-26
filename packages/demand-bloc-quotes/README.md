<div align="center">
<a href="https://karhoo.com">
  <img
    alt="Karhoo logo"
    width="250px"
    src="https://cdn.karhoo.com/s/images/logos/karhoo_logo.png"
  />
</a>

<h1>demand-bloc-quotes</h1>

BLoC to work with Karhoo Quotes API
<br />

<hr />

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

> ⚠️ This package is work in progress and can not be used as an independent package.

## Installation

```sh
npm i @karhoo/demand-bloc-quotes
```

## Usage

```js

import { getApi } from '@karhoo/demand-api'
import { QuotesBloc } from '@karhoo/demand-bloc-quotes'

const api = getApi({
  url: 'api',
  defaultRequestOptionsGetter: () => ({
    headers: {
      identifier: 'XXXX',
      referrer: 'https://example-referer.com/'
    }
  })
})

const quotesSearchParams = {
  originPlaceId: "ChIJpwBVsLIadkgRE767cq0HnXQ",
  destinationPlaceId: "ChIJmdRFlbIadkgRhYudNQm2yOc",
  localTimeOfPickup: "2020-05-20T12:00"
}

const quotesBloc = new QuotesBloc(api.quotesService)

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
