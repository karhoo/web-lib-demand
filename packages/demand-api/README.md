<div align="center">
<a href="https://karhoo.com">
  <img
    alt="Karhoo logo"
    width="250px"
    src="https://cdn.karhoo.com/s/images/logos/karhoo_logo.png"
  />
</a>

<h1>Karhoo Demand API</h1>

This library provides the ability to contact Karhoo's public API and allows you to send and receive network calls and responses. The **Demand API** is designed to enable it's consumers to integrate faster because they do not need to create their own complete network stack.
<br />

[**Read The Docs**](https://developer.karhoo.com/reference#karhoo-api-explorer)

<hr />

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

> ⚠️ This package is work in progress and can not be used as an independent package.

## Installation

```sh
npm i @karhoo/demand-api
```

## Warnings

This library uses `Promise` and `fetch`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise` and [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) to polyfill `fetch`

## Usage

You can use each service separately, or you can use `getApi` method which returns all available services

```
import { getApi, HttpService, LocationService, PoiService, QuotesService, errorCodes } from '@karhoo/demand-api'

const url = 'https://public-api.karhoo.com' // please note that there should not be a slash at the end of the url

const correlationIdPrefix = 'prefix'

const requestOptionsGetter = () => ({
  headers: {
    'custom-header': 'Custom header'
  }
})

const middleware = <T>(response: HttpResponse<T>): HttpResponse<T> => {
  console.log(response.status)

  return response
}

```

Please note that by default `fetch` will be called with following config

```
{
  credentials: 'include',
  mode: 'cors',
}
```

You can override this default settings using `defaultRequestOptionsGetter`

getApi usage:

All config fields are optional, default value for `url` - `https://public-api.karhoo.com`, default value for `correlationIdPrefix` - `''`

```
const options = {
  url,
  defaultRequestOptionsGetter: requestOptionsGetter,
  responseMiddleware: middleware,
  correlationIdPrefix,
}

const api = getApi(options)

```

Http service usage:

```
const apiV1 = 'https://public-api.karhoo.com/api/v1' // please note that version should be specified

const httpService = new HttpService(url)
  .setCorrelationIdPrefix(correlationIdPrefix)
  .setDefaultRequestOptionsGetter(requestOptionsGetter)
  .setResponseMiddleware(middleware)

const response = await httpService.get('location/address-autocomplete')
```

Location service usage:

```
const locationService = new LocationService(httpService)
```

Poi service:

```
const poiService = new PoiService(httpService)
```

Quotes service:

```
const quotesService = new QuotesService(httpService)
```

Trip service:

```
const tripService = new TripService(httpService)
```

Fare service:

```
const fareService = new FareService(httpService)

Payment service:

```

const paymentService = new PaymentService(httpService)

test lerna changelog package 3457652857

````

## Issues

_Looking to contribute?_

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior with a label `API`

### 💡 Feature Requests

Please file an issue to suggest new features with a label `API`. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

### ❓ Questions

For questions related to using the library, please re-visit a documentation first. If there are no answer, please create an issue with a label `help needed` and `API`.

## Contributing

### License

[BSD-2-Clause](../LICENSE)```
````
