# `Demand Deeplink`

The **Demand Deeplink** is intended to be the standard way of working with deeplink ([https://developer.karhoo.com/docs/deeplink-integration](https://developer.karhoo.com/docs/deeplink-integration))

## Warnings

This library use `URLSearchParams`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use either `js-core@3` or [`url-search-params-polyfill`](https://www.npmjs.com/package/url-search-params-polyfill)

## Installation

### NPM

Add the following to .npmrc:

```
//npm.pkg.github.com/:_authToken=${GITHUB_ACCESS_TOKEN}
@karhoo:registry=https://npm.pkg.github.com/
``` 

`GITHUB_ACCESS_TOKEN` - your [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

```sh
npm install --save @karhoo/demand-deeplink
```

## Usage

```
import { parse, validate, generate } from 'demand-deeplink';
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
