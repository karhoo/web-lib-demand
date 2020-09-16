import { TripCreateField, TripCreateFieldTypes } from '@karhoo/demand-bloc-trip-create'
import React from 'react'
import styled from 'styled-components'
import { useApi } from 'react-demand-api-wrapper'

interface Props extends React.HTMLProps<HTMLSelectElement> {
  label?: string
  name: string
  onSelectChange: (name: string, value: string) => void
}

const Container = styled.div`
  select {
    font-weight: 400;
    height: 48px;
    width: 100%;
    padding: 0 12px;
    border: 1px solid #f1f2f6;
    border-radius: 8px;
    font-size: 16px;
    text-align: left;
    letter-spacing: 0.3px;
    appearance: none;
    background-color: #f1f2f6;
    box-shadow: none;
    caret-color: #a1a9c3;
    color: #132968;
    transition: border 0.15s;
    cursor: pointer;
  }

  select:hover,
  select:focus {
    border: 1px solid #a1a9c3;
    outline: 0;
  }
`

export const Select = ({ label, onSelectChange, ...props }: Props) => {
  const { api } = useApi()

  const [userInput, setUserInput] = React.useState('')
  const input = api.trip.createStream(props.name, TripCreateFieldTypes.GENERIC) as TripCreateField

  React.useEffect(() => {
    input.query.subscribe(setUserInput)
  }, [input])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    input.onChange(e.target.value)
    onSelectChange(e.target.name, e.target.value)
  }

  return (
    <Container>
      {label && <label htmlFor={props.id}>{label}:</label>}
      <select {...props} value={userInput} onChange={handleChange} />
    </Container>
  )
}
