# `Demand Deeplink`

The **Demand Deeplink** is intended to be the standard way of working with deeplink ([https://developer.karhoo.com/docs/deeplink-integration](https://developer.karhoo.com/docs/deeplink-integration))

## Warnings

This library uses `URLSearchParams`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use either `js-core@3` or [`url-search-params-polyfill`](https://www.npmjs.com/package/url-search-params-polyfill)

This library uses `Promise` and `fetch`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise` and [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) to polyfill `fetch`

## Installation

### NPM

```sh
npm install --save @karhoo/demand-deeplink
```

## Usage

```
import { parse, validate, generate, Deeplink } from 'demand-deeplink';
```

Parse deeplink:

```
const deeplinkData = parse(window.location.search)
```

Validate deeplink:

```
const { ok, errors } = validate(deeplinkData)
```

Generate deeplink:

```
const queryString = generate(deeplinkData)
```

Deeplink usage:

```
const deeplink = new Deeplink(window.location.search, options)

deeplink.resolve(subscriber)
```