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

[**Read The Docs**](https://developer.karhoo.com/docs/using-web-demand-api-package)

<hr />

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

## Installation

```sh
npm i @karhoo/demand-api
```

## Usage

You can use each service separately, or you can use `getApi` method which returns all available services

```js
import {
  getApi,
  HttpService,
  LocationService,
  PoiService,
  QuotesService,
  errorCodes,
} from '@karhoo/demand-api'

const url = 'https://public-api.karhoo.com' // please note that there should not be a slash at the end of the url

const correlationIdPrefix = 'prefix'

const requestOptionsGetter = () => ({
  headers: {
    'custom-header': 'Custom header',
  },
})

const middleware = <T>(response: HttpResponse<T>): HttpResponse<T> => {
  console.log(response.status)

  return response
}
```

Please note that by default `fetch` will be called with following config

```js
{
  credentials: 'include',
  mode: 'cors',
}
```

You can override this default settings using `defaultRequestOptionsGetter`

getApi usage:

All config fields are optional, default value for `url` - `https://public-api.karhoo.com` in case if `NODE_ENV === 'production'`, otherwise `https://public-api.sandbox.karhoo.com`.

Default value for `correlationIdPrefix` - `''`.

```js
const options = {
  url,
  defaultRequestOptionsGetter: requestOptionsGetter,
  responseMiddleware: middleware,
  correlationIdPrefix,
}

const api = getApi(options)
```

Http service usage:

```js
const apiV1 = 'https://public-api.karhoo.com/v1' // please note that version should be specified

const httpService = new HttpService(url)
  .setCorrelationIdPrefix(correlationIdPrefix)
  .setDefaultRequestOptionsGetter(requestOptionsGetter)
  .setResponseMiddleware(middleware)

const response = await httpService.post('locations/address-autocomplete', { query: 'lond' })
```

# Location service usage:

```js
const locationService = new LocationService(httpService)
```

# Poi service:

```js
const poiService = new PoiService(httpService)
```

# Quotes service:

```js
const quotesService = new QuotesService(httpService)
```

# Trip service:

```js
const tripService = new TripService(httpService)
```

# Fare service:

```js
const fareService = new FareService(httpService)
```

# Payment service:

```js
const paymentService = new PaymentService(httpService)
```

# Flags service:

```js
const flagsService = new FlagsService(httpService)
```

### Example

Let's see how to use one of the services, listed above.

For example, you need to get a list of quotes for trip from one location to another. For this purpose you have to use Quotes service and call quotesSearch method:

```js
const quotesSearchParams = {
  origin_place_id: '123456778qwertyu',
  destination_place_id: '0988765poiuyt',
  local_time_of_pickup: '2020-05-12T10:00',
}

const quotesResponse = quotesService
  .quotesSearch(quotesSearchParams)
  .then(result => {
    //handleResult
  })
  .catch(error => {
    //handle error
  })
```

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

[BSD-2-Clause](../LICENSE)
