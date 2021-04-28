<div align="center">
<a href="https://karhoo.com">
  <img
    alt="Karhoo logo"
    width="250px"
    src="https://cdn.karhoo.com/s/images/logos/karhoo_logo.png"
  />
</a>

<h1>@karhoo/track-trip</h1>

Bussness Logic Component (aka BLoC) for trip tracking functionality via Karhoo API
<br />

<hr />

[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)

</div>

## Installation

```sh
npm i @karhoo/track-trip
```

## Usage

```js
import { getApi } from '@karhoo/api'
import { TripBloc } from '@karhoo/track-trip'

const api = getApi({
  url: 'api',
  defaultRequestOptionsGetter: () => ({
    headers: {
      identifier: 'XXXX',
      referrer: 'https://example-referer.com/',
    },
  }),
})

const tripBloc = new new TripBloc(api.tripService, api.fareService)()

tripBloc.trip.subscribe(data => {
  // get trip info
  console.log('trip', data)
})

tripBloc.error.subscribe(data => {
  // get trip fetching error
  console.log('Error fetch trip', data)
})

tripBloc.finalFare.subscribe(data => {
  // get final fare info
  console.log('Final Fare', data)
})

tripBloc.pickUpTimeUpdates.subscribe(data => {
  // get pickup time updates
  console.log('New PickupTime', data)
})

//track trip updates
tripBloc.track(tripId)

// stop polling track and fare
tripBloc.cancelPolling()

// cancel trip by follow code
tripBloc.cancellByFollowCode(code, cancellationParams)
```
