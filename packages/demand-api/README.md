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

> <img src="https://d3qhp42p4neron.cloudfront.net/5.5/png/unicode/512/26a0.png?Expires=1586881180&Signature=UfYXLEl9gffLbFSMDpBcfwrMZev7EexJ3Szsw461t7uBvn0D3M5DUZnbI36uVUDaoCnYo6y6NK-N8j7rWSfUPDwI0g-vsvaERzl3naB5a5G3OZRPI5854zGl66ezLjVWwhBX08d6m-MQAjrDd0AImTJsaGlxRH4vByD9-XnNbnLF28Ve41SnTQuaIKN2uscMLvXzP1LAu62GML5PLVOoBs5JeGMhPJnd0Ag2qjGXgppMq~jGqPHC~Fn7GKfeacP-PySJ2h7kNMXU1RK0VydODmHvLTguFilk3OkQcx31kNGxz6dYhfDRcKNbsQzMkEGw6LVoshhXeFu5X373WYjWDA__&Key-Pair-Id=APKAIRGCVGOY7DOKYTJA" width="15px" /> This package is work in progress and can not be used as an independent package.

## Installation

### NPM

```sh
npm install --save @karhoo/demand-api
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
