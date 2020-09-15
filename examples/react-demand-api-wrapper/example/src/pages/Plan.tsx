import React from 'react'
import { Form } from '../components/Form'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Button } from '../components/Button'
import { AutocompleteDetails } from '@karhoo/demand-bloc-trip-create'
import { Autocomplete } from '../components/Autocomplete'

interface FormData {
  pickup: AutocompleteDetails
  dropoff: AutocompleteDetails
  date: ''
  time: ''
  passengers: ''
  luggage: ''
}

export const Plan = () => {
  const [form, setForm] = React.useState<FormData>({
    pickup: {} as AutocompleteDetails,
    dropoff: {} as AutocompleteDetails,
    date: '',
    time: '',
    passengers: '',
    luggage: '',
  })

  const handleChange = React.useCallback(
    (name: string, value: string) => {
      setForm((form) => ({
        ...form,
        [name]: value,
      }))
    },
    [setForm]
  )

  const handleAutocompleteChange = React.useCallback(
    (name: string, item: AutocompleteDetails) => {
      setForm((form) => ({
        ...form,
        [name]: item,
      }))
    },
    [setForm]
  )

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ form })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Autocomplete label="From" name="pickup" onAutocompleteChange={handleAutocompleteChange} />
      <Autocomplete label="To" name="dropoff" onAutocompleteChange={handleAutocompleteChange} />
      <Input
        label="Date"
        type="date"
        name="date"
        min={new Date().toISOString().split('T')[0]}
        onInputChange={handleChange}
      />
      <Input label="Time" type="time" name="time" onInputChange={handleChange} />
      <Select label="Passengers" name="passengers" onSelectChange={handleChange}>
        {Array.from({ length: 6 }, (_, i) => i + 1).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </Select>
      <Select label="Luggage" name="luggage" onSelectChange={handleChange}>
        {Array.from({ length: 7 }, (_, i) => i).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </Select>
      <pre>
        <code>{JSON.stringify(form, null, 2)}</code>
      </pre>
      <Button type="submit">Get Quotes</Button>
    </Form>
  )
}
