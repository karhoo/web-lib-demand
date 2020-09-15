import React from 'react'
import styled from 'styled-components'
import { useApi } from 'react-demand-api-wrapper'
import { TripCreateField, TripCreateFieldTypes } from '@karhoo/demand-bloc-trip-create'

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string
  name: string
  onInputChange: (name: string, value: string) => void
}

const Container = styled.div`
  input {
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
  }

  input:hover,
  input:focus {
    border: 1px solid #a1a9c3;
    outline: 0;
  }
`

export const Input = ({ label, onInputChange, ...props }: Props) => {
  const { state } = useApi()

  const [userInput, setUserInput] = React.useState('')
  const input = state.trip.createStream(props.name, TripCreateFieldTypes.GENERIC) as TripCreateField
  
  React.useEffect(() => {
    input.query.subscribe(setUserInput)
  }, [input])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    input.onChange(e.target.value)
    onInputChange(e.target.name, e.target.value)
  }
  
  return (
    <Container>
      {label && <label htmlFor={props.id}>{label}:</label>}
      <input type="text" {...props} value={userInput} onChange={handleChange} />
    </Container>
  )
}
