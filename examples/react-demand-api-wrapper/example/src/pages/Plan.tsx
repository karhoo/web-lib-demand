import React from 'react'
import { useApi } from 'web-omio'
import { Form } from '../components/Form'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Button } from '../components/Button'
import {
  TripCreateAutocompleteField,
  TripCreateFieldTypes,
  TripCreateField
} from '@karhoo/demand-bloc-trip-create'

interface FormData {
  [key: string]: TripCreateAutocompleteField | TripCreateField
}

export const Plan = () => {
  const { state } = useApi()
  const [form, setForm] = React.useState<FormData>({})

  React.useEffect(() => {
    if (state.api?.locationService) {
      console.log(state.api)
      setForm((form) => {
        const pickup = state.trip.createStream(
          'pickup',
          TripCreateFieldTypes.AUTOCOMPLETE
        ) as TripCreateAutocompleteField
        pickup.query.subscribe((e: any) => console.log('query', e))
        pickup.results.subscribe((e: any) => console.log('results', e))
        pickup.selectedAddress.subscribe((e: any) =>
          console.log('selected', e)
        )
        form = {
          ...form,
          pickup
        }
        // if (Object.entries(form).length === 0) {
        // }
        return form
      })
    }
  }, [state.api, state.trip, setForm])

  // React.useEffect(() => {
  //   if (pickupInput) {
  //     console.log({ pickupInput })
  //     pickupInput.query.subscribe((e: any) => console.log(e))
  //   }
  // }, [pickupInput])

  const handleChange = (e: any) => {
    console.log(e.target.name, e.target.value)
    form[e.target.name].onChange(e.target.value)
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label='From'
        type='text'
        name='pickup'
        id='pickup'
        onChange={handleChange}
      />
      <Input
        label='To'
        type='text'
        name='dropoff'
        id='dropoff'
        onChange={handleChange}
      />
      <Input
        label='Date'
        type='date'
        name='date'
        id='date'
        min={new Date().toISOString().split('T')[0]}
        onChange={handleChange}
      />
      <Input
        label='Time'
        type='time'
        name='time'
        id='time'
        onChange={handleChange}
      />
      <Select
        label='Passengers'
        name='passengers'
        id='passengers'
        onChange={handleChange}
      >
        {Array.from({ length: 6 }, (_, i) => i + 1).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </Select>
      <Select
        label='Luggage'
        name='luggage'
        id='luggage'
        onChange={handleChange}
      >
        {Array.from(Array(7).keys()).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </Select>
      <Button>Get Quotes</Button>
    </Form>
  )
}
