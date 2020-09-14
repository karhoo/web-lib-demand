import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import { withApi } from 'react-demand-api-wrapper'
import routes from './routes'
import logo from './logo.svg'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
`

const Header = styled.header`
  height: 70px;
  background: #5272a8;
  display: flex;
  align-items: center;
  padding: 1rem;

  img {
    height: calc(70px - 2rem);
  }
`

const Main = styled.main`
  overflow-y: scroll;
  padding: 1rem;
`

const App = () => {
  return (
    <Router>
      <Container>
        <Header>
          <img src={logo} alt='Omio' />
        </Header>
        <Main>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Switch>
        </Main>
      </Container>
    </Router>
  )
}

App.whyDidYouRender = true

export default withApi(App)
