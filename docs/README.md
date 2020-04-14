[web-lib-demand](README.md) › [Globals](globals.md)

# web-lib-demand

# `Demand API`

The **Demand API** provides the ability to contact Karhoo's public API and allows you to send and receive network calls and responses. ([https://developer.karhoo.com/reference#karhoo-api-explorer](https://developer.karhoo.com/reference#karhoo-api-explorer)).

The **Demand API** is designed to enable it's consumers to integrate faster because they do not need to create their own complete network stack.

## Warnings

This library uses `Promise` and `fetch`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise` and [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) to polyfill `fetch`

## Installation

### NPM

```sh
npm install --save @karhoo/demand-api
```

## Usage

```
import { HttpService, LocationService, PoiService, QuotesService, errorCodes } from 'demand-api';
```

Http service usage:

```
const url = 'https://public-api.karhoo.com/api/v1' // please note that there should not be a slash at the end of the url

const correlationIdPrefix = 'prefix'

const requestOptionsGetter = () => ({
  headers: {
    'custom-header': 'Custom header'
  }
})

const middleware = <T>(response: HttpResponse<T>) => {
  console.log(response.status)

  return response
}

const httpService = new HttpService(url)
  .setCorrelationIdPrefix('prefix')
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
