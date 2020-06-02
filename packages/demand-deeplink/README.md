<div align="center">
<a href="https://karhoo.com">
  <img
    alt="Karhoo logo"
    width="250px"
    src="https://cdn.karhoo.com/s/images/logos/karhoo_logo.png"
  />
</a>

<h1>Karhoo Demand Deeplink</h1>

Karhoo Deeplink is a method of passing the user’s required information from the Demand Partner’s side to a Karhoo web booking application.

This library is intended to be the standard way of working with a deeplink.

[**Read The Docs**](https://developer.karhoo.com/docs/deeplink-integration)

<hr />

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

## Installation

```
npm i @karhoo/demand-deeplink
```

## Warnings

This library uses `URLSearchParams`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use either `js-core@3` or [`url-search-params-polyfill`](https://www.npmjs.com/package/url-search-params-polyfill)(version 8 and above)

This library uses `Promise`. For old browsers, e.g. IE11 you must bring your own polyfill. You can use `js-core@3` to polyfill `Promise`

## Usage

```js
import { parse, validate, generate, Deeplink } from '@karhoo/demand-deeplink'
```

Parse deeplink:

```js
const deeplinkData = parse(window.location.search)
```

Validate deeplink:

```js
const { ok, errors } = validate(deeplinkData)
```

Generate deeplink:

```js
const queryString = generate(deeplinkData)
```

Resolve deeplink:

To use `Deeplink` class `api` parameter (see `Api` type [here](https://github.com/karhoo/web-lib-demand/blob/master/packages/demand-deeplink/src/types.ts)) should be passed as a second argument of `Deeplink` constructor. For this purposes `@karhoo/demand-api` can be used.

```js
import { getApi } from '@karhoo/demand-api'

const api = getApi()

const subscriber = data => console.log(data)

const deeplink = new Deeplink(window.location.search, api)

deeplink.resolve(subscriber)
```

### Example

A lot of deeplink examples can be find [here](https://developer.karhoo.com/docs/deeplink-integration#section-examples)

Let's imagine, you want to deeplink from a hotel booking website to a Karhoo cab booking website.

Your customer booked a hotel room and reached their booking confirmation page. From here you can offer a complementary service to book a cab to a hotel's location.

At this stage, you know:

1. Hotel address
2. Time when a cab required _(based on hotel check-in hours)_
3. Number of passengers
4. Passenger first and last name _(if you're willing to pass it)_

All these parameters can be embedded to a Deeplink and passed to a Karhoo booking app.

_Step 1. Compose deeplink data_

```js
const deeplinkData = {
  legs: [
    {
      dropoff: 'Hotel Ermitage, London, UK',
      pickupTime: '2020-03-12T12:00:00+01:00',
    },
  ],
  passengerInfo: {
    passengers: 3,
    firstName: 'Jon',
  },
  bookingType: 'PRE-BOOK',
  meta: {},
}
```

_Step 2. Validate deeplink data_

```js
import { validate } from '@karhoo/demand-deeplink'

const { ok, errors } = validate(deeplinkData)

if (!ok) {
  console.log('Deeplink data is invalid', errors)
}
```

_Step 3. Generate a deeplink_

```js
import { validate, generate } from '@karhoo/demand-deeplink'

const { ok, errors } = validate(deeplinkData)

if (!ok) {
  console.log('Deeplink data is invalid', errors)
  return
}

const deeplink = generate(deeplinkData)
```

```js
console.log(deeplink) // ?leg-1-dropoff=Hotel+Ermitage%2C+London%2C+UK&leg-1-pickup-time=2020-03-12T12%3A00%3A00%2B01%3A00&passengers=3&first-name=Jon&booking-type=PRE-BOOK
```

When you get a deeplink you can navigate your user from your website by adding the link to `href` attribute.

For example, `<a target="_blank" href="https://your-branded-app.kathoo.com/landing/?leg-1-dropoff=Hotel+Ermitage%2C+London%2C+UK&leg-1-pickup-time=2020-03-12T12%3A00%3A00%2B01%3A00&passengers=3&first-name=Jon&booking-type=PRE-BOOK"> Book a cab to a hotel </a>`

## Issues

_Looking to contribute?_

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior with a label `DEEPLINK`

### 💡 Feature Requests

Please file an issue to suggest new features with a label `DEEPLINK`. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

### ❓ Questions

For questions related to using the library, please re-visit a documentation first. If there are no answer, please create an issue with a label `help needed` and `DEEPLINK`.

## Contributing

### License

[BSD-2-Clause](../LICENSE)
