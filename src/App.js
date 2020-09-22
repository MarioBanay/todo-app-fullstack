import React, { Component } from 'react'
import './bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HeaderComponent from './components/Todo/HeaderComponent.jsx'
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute.jsx'
import LoginComponent from './components/Auth/LoginComponent.jsx'
import LogoutComponent from './components/Auth/LogoutComponent.jsx'
import ListTodosComponent from './components/Todo/ListTodosComponent.jsx'
import FooterComponent from './components/Todo/FooterComponent.jsx'
import WelcomeComponent from './components/Todo/WelcomeComponent.jsx'
import ErrorComponent from './components/Error/ErrorComponent.jsx'
import TodoComponent from './components/Todo/TodoComponent.jsx'
import { createBrowserHistory } from 'history'
import { Container } from 'react-bootstrap'

class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Container fluid>
          <HeaderComponent />
            <Switch>
              <Route path='/login' component={LoginComponent} />
              <Route path='/' exact component={LoginComponent} />
              <AuthenticatedRoute path='/logout' component={LogoutComponent} />
              <AuthenticatedRoute
                path='/welcome/:name'
                component={WelcomeComponent}
              />
              <AuthenticatedRoute path='/todos/:id' component={TodoComponent} />
              <AuthenticatedRoute
                path='/todos'
                component={ListTodosComponent}
              />
              <Route component={ErrorComponent} />
            </Switch>
          <FooterComponent />
        </Container>
      </BrowserRouter>
    )
  }
}
export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
})

export default App
