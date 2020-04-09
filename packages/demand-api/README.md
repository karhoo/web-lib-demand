# `Demand API`

The **Demand API** is intended to be the standard way of working with Karhoo public API ([https://developer.karhoo.com/reference#karhoo-api-explorer](https://developer.karhoo.com/reference#karhoo-api-explorer))

## Warnings

This library uses `Promise` and `fetch`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise` and [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) to polyfill `fetch`

## Installation

### NPM

Add the following to .npmrc:

```
//npm.pkg.github.com/:_authToken=${GITHUB_ACCESS_TOKEN}
@karhoo:registry=https://npm.pkg.github.com/
``` 

`GITHUB_ACCESS_TOKEN` - your [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

```sh
npm install --save @karhoo/demand-api
```

## Usage

```
import { HttpService, LocationService, PoiService, QuotesService, errorCodes } from 'demand-api';
```

Http service usage:

```
const url = 'https://public-api.karhoo.com/api/v1' // please note that there should not be a slash at the end of the line

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