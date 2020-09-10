import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import App from './App'

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  @font-face {
    font-family: 'GT Walsheim';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('GT Walsheim Regular'), local('GT-Walsheim-Regular'),
        url('https://www.omio.com/gcs-proxy/static_content_repo/web/content/font/gt-walsheim/GT-Walsheim-Regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('https://www.omio.com/gcs-proxy/static_content_repo/web/content/font/gt-walsheim/GT-Walsheim-Regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }

  @font-face {
    font-family: 'GT Walsheim';
    font-style: normal;
    font-weight: 500;
    font-display: swap;  
    src: local('GT Walsheim Medium'), local('GT-Walsheim-Medium'),
        url('https://www.omio.com/gcs-proxy/static_content_repo/web/content/font/gt-walsheim/GT-Walsheim-Medium.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('https://www.omio.com/gcs-proxy/static_content_repo/web/content/gt-walsheim/GT-Walsheim-Medium.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }

  @font-face {
    font-family: 'GT Walsheim';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('GT Walsheim Bold'), local('GT-Walsheim-Bold'),
        url('https://www.omio.com/gcs-proxy/static_content_repo/web/content/font/gt-walsheim/GT-Walsheim-Bold.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
        url('https://www.omio.com/gcs-proxy/static_content_repo/web/content/font/gt-walsheim/GT-Walsheim-Bold.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
  }


  body {
    font-family: 'GT Walsheim', sans-serif;
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
