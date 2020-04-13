<div align="center">
<h1>Karhoo Demand Deeplink</h1>

<a href="https://karhoo.com">
  <img
    alt="Karhoo logo"
    width="300px"
    src="https://cdn.karhoo.com/s/images/logos/karhoo_logo.png"
  />
</a>

Karhoo Deeplink is a method of passing the user’s required information from the Demand Partner’s side to a Karhoo web booking application.

This library is intended to be the standard way of working with a deeplink.
<br />
[**Read The Docs**](https://developer.karhoo.com/docs/deeplink-integration)
<hr />

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

## Installation

### NPM

```
npm i @karhoo/demand-deeplink
```

### Github packages

Add the following to .npmrc:

```
//npm.pkg.github.com/:_authToken=${GITHUB_ACCESS_TOKEN}
@karhoo:registry=https://npm.pkg.github.com/
```

`GITHUB_ACCESS_TOKEN` - your [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

```sh
npm install --save @karhoo/demand-deeplink
```

## Warnings

This library uses `URLSearchParams`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use either `js-core@3` or [`url-search-params-polyfill`](https://www.npmjs.com/package/url-search-params-polyfill)

This library uses `Promise` and `fetch`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise` and [`isomorphic-fetch`](https://www.npmjs.com/package/isomorphic-fetch) to polyfill `fetch`


## Usage

```
const deeplinkData = {
  legs: [

  ]
}
```

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

Subscribe to updates usage:

```
const deeplink = new Deeplink(window.location.search, options)

deeplink.resolve(subscriber)
```

### Example

A lot of deeplink examples can be find [here](https://developer.karhoo.com/docs/deeplink-integration#section-examples)

Let's imagine, you want to deeplink from a hotel booking website to a Karhoo cab booking webdite.

Your customer booked a room and reached a room booking confirmation page. From this stage you can offer an complementary service to book a cab to a hotel's location.

At this stage, you know:

1. Hotel adderess
2. Time when a cab is needed (based on hotel check-in hours)
3. Number of passengers
4. Passenger first and last name (if you willing to bypass it)

All these parameters can be embedded to a deeplink and passed to a Karhoo booking app.

_Step 1. Compose deeplink data_

```
const deeplinkData = {
  legs: [
    {
      dropoff: "Hotel Ermitage, London, UK",
      pickupTime: "2020-03-12T12:00:00+01:00"
    }
  ],
  passengerInfo: {
    passengers: 3,
    firstName: 'Jon'
  },
  meta: {},
}
```

_Step 2. Validate deeplink data_

```
import { validate } from '@karhoo/demand-deeplink'

const { ok, errors } = validate(deeplinkData)

if (!ok) {
  console.log("Deeplink data is invalid", errors)
}

```

_Step 3. Generate a deeplink_

```
import { validate, generate } from '@karhoo/demand-deeplink'

const { ok, errors } = validate(deeplinkData)

if (!ok) {
  console.log("Deeplink data is invalid", errors)
  return
}

const deeplink = generate(deeplinkData)
```
```
console.log(deeplink) // ?leg-1-dropoff=Hotel+Ermitage%2C+London%2C+UK&leg-1-pickup-time=2020-03-12T12%3A00%3A00%2B01%3A00&passengers=3&first-name=Jon
```
When you get a deeplink you can navigate your user from you website by adding the link to `href` attribute.

For example, `<a target="_blank" href="https://your-branded-app.kathoo.com/landing/?leg-1-dropoff=Hotel+Ermitage%2C+London%2C+UK&leg-1-pickup-time=2020-03-12T12%3A00%3A00%2B01%3A00&passengers=3&first-name=Jon"> Book a cab to a hotel </a>`
