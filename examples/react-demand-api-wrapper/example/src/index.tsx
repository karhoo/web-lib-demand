import './wdyr'
import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import App from './App'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: 'Montserrat', sans-serif;
    overflow: hidden;
    color: #425486;
  }

  * {
    box-sizing: border-box;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App
      authorization={process.env.REACT_APP_AUTHORIZATION as string}
      referer={process.env.REACT_APP_REFERER as string}
      endpoint={process.env.REACT_APP_API_ENDPOINT as string}
    />
  </React.StrictMode>,
  document.getElementById('root')
)
