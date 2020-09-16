import React from 'react'
import styled from 'styled-components'
import {
  AutocompleteDetails,
  AutocompleteItem,
  TripCreateAutocompleteField,
  TripCreateFieldTypes,
} from '@karhoo/demand-bloc-trip-create'
import { useApi } from 'react-demand-api-wrapper'

interface Props extends React.HTMLProps<HTMLInputElement> {
  label?: string
  options?: Array<{}>
  selectedOption?: {}
  name: string
  onAutocompleteChange: (name: string, item: AutocompleteDetails) => void
  initialValue?: string
}

const Container = styled.div`
  position: relative;

  input {
    font-weight: 400;
    height: 48px;
    width: 100%;
    padding: 0 12px;
    border: 1px solid #f1f2f6;
    border-radius: 8px;
    font-size: 1rem;
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
const Results = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  background: white;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  li {
    list-style: none;
  }

  button {
    appearance: none;
    outline: none;
    background: transparent;
    border: none;
    font-size: 1rem;
    padding: 0.5rem;
  }
`

export const Autocomplete = ({
  label,
  initialValue = '',
  options,
  selectedOption,
  onAutocompleteChange,
  ...props
}: Props) => {
  const { api } = useApi()

  const [userInput, setUserInput] = React.useState(initialValue)
  const [selected, setSelected] = React.useState<AutocompleteDetails>({} as AutocompleteDetails)
  const [results, setResults] = React.useState<AutocompleteItem[]>([])

  const input = React.useRef(
    api.trip.createStream(props.name, TripCreateFieldTypes.AUTOCOMPLETE) as TripCreateAutocompleteField
  )

  React.useEffect(() => {
    input.current.query.subscribe(setUserInput)
    input.current.results.subscribe((results: AutocompleteItem[]) => setResults(results))
    input.current.selectedAddress.subscribe((selected: AutocompleteDetails) => setSelected(selected))
  }, [input])

  const handleChange = React.useCallback(
    (e: any) => {
      input.current.onChange(e.target.value)
    },
    [input]
  )

  const handleClick = React.useCallback(
    (e: any, item: any) => {
      e.preventDefault()
      input.current.onSelect(item.placeId)
    },
    [input]
  )

  React.useEffect(() => {
    if (selected.address) {
      onAutocompleteChange(props.name, selected)
      setResults([])
      setUserInput(selected.address.displayAddress)
    }
  }, [selected, onAutocompleteChange, props.name])

  return (
    <Container>
      {label && <label htmlFor={props.id}>{label}:</label>}
      <input {...props} type="search" value={userInput} onChange={handleChange} />
      <Results>
        {results.map((result: any) => (
          <li key={result.placeId}>
            <button onClick={(e) => handleClick(e, result)}>{result.displayAddress}</button>
          </li>
        ))}
      </Results>
    </Container>
  )
}
