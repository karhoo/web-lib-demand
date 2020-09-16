import React from 'react'
import { Form } from '../components/Form'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Button } from '../components/Button'
import { AutocompleteDetails } from '@karhoo/demand-bloc-trip-create'
import { Autocomplete } from '../components/Autocomplete'
import { useHistory } from 'react-router-dom'
import { useData } from '../state'
import { State } from '../state/reducers/trip/types'

export interface FormData {
  origin?: AutocompleteDetails
  destination?: AutocompleteDetails
  date?: string
  time?: string
  passengers?: string
  luggage?: string
}

export const Plan = () => {
  const history = useHistory()
  const { actions } = useData()
  
  const initDate = new Date().toISOString().split('T')
  const [form, setForm] = React.useState<FormData>({
    date: initDate[0],
    time: initDate[1].substring(0, 5),
  })

  const handleChange = React.useCallback(
    (name: string, value: AutocompleteDetails | string) =>
      setForm((form) => ({
        ...form,
        [name]: value,
      })),
    [setForm]
  )

  const handleSubmit = React.useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log({ form })

      if (e.target.checkValidity()) {
        actions.trip.setInstance(form as State)
        history.push('/quotes')
      }
    },
    [actions.trip, form, history]
  )

  return (
    <Form onSubmit={handleSubmit}>
      <Autocomplete label="From" name="origin" onAutocompleteChange={handleChange} required />
      <Autocomplete label="To" name="destination" onAutocompleteChange={handleChange} required />
      <Input
        label="Date"
        type="date"
        name="date"
        min={new Date().toISOString().split('T')[0]}
        onInputChange={handleChange}
        initialValue={form.date}
        required
      />
      <Input
        label="Time"
        type="time"
        name="time"
        onInputChange={handleChange}
        initialValue={form.time}
        required
      />
      <Select label="Passengers" name="passengers" onSelectChange={handleChange} required>
        {Array.from({ length: 6 }, (_, i) => i + 1).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </Select>
      <Select label="Luggage" name="luggage" onSelectChange={handleChange} required>
        {Array.from({ length: 7 }, (_, i) => i).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </Select>
      <Button type="submit">Get Quotes</Button>
    </Form>
  )
}
