import { QuotesV2SearchParams } from '@karhoo/demand-api'
import React from 'react'
import { useApi } from 'react-demand-api-wrapper'
import { useHistory } from 'react-router-dom'
import { useData } from '../state'

export const Quotes = () => {
  const { api } = useApi()
  const { state } = useData()
  const history = useHistory()

  console.log({ state, api })

  React.useEffect(() => {
    if (!state.trip || Object.keys(state.trip).length === 0) {
      history.replace('/')
    }
  }, [state.trip, history])

  if (!state.trip || Object.keys(state.trip).length === 0) {
    return null
  }

  const quotesSearchParams: QuotesV2SearchParams = {
    origin: {
      latitude: state.trip.origin.position ? state.trip.origin.position.latitude.toString() : '0',
      longitude: state.trip.origin.position ? state.trip.origin.position.longitude.toString() : '0',
      displayAddress: state.trip.origin.address?.displayAddress,
    },
    destination: {
      latitude: state.trip.destination.position ? state.trip.destination.position.latitude.toString() : '0',
      longitude: state.trip.destination.position ? state.trip.destination.position.longitude.toString() : '0',
      displayAddress: state.trip.destination.address?.displayAddress,
    },
    localTimeOfPickup: `${state.trip.date}T${state.trip.time}`,
  }
  api.quotes.filters = {
    numOfLuggage: parseInt(state.trip.luggage),
    numOfPassengers: parseInt(state.trip.passengers),
  }
  api.quotes.matchingQuotes.subscribe((data: any) => {
    // quotes that match filters
    console.log('Matching quotes', data)
  })

  api.quotes.otherAvailibleQuotes.subscribe((data: any) => {
    // all other quotes that did not match filters
    console.log('Other quotes', data)
  })

  api.quotes.loading.subscribe((isLoading: any) => {
    console.log('isLoading', isLoading)
  })

  api.quotes.quotesExpired.subscribe(() => {
    console.log('Quotes Expired')

    api.quotes.refreshQuotes() // requests quotes with same search params
  })

  api.quotes.requestQuotes(quotesSearchParams as QuotesV2SearchParams)
  return <div>Quotes</div>
}
