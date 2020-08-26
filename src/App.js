import React, { Component } from 'react';
import './bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/Todo/HeaderComponent.jsx';
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute.jsx';
import LoginComponent from './components/Auth/LoginComponent.jsx';
import LogoutComponent from './components/Auth/LogoutComponent.jsx';
import ListTodosComponent from './components/Todo/ListTodosComponent.jsx';
import FooterComponent from './components/Todo/FooterComponent.jsx';
import WelcomeComponent from './components/Todo/WelcomeComponent.jsx';
import ErrorComponent from './components/Error/ErrorComponent.jsx';
import TodoComponent from './components/Todo/TodoComponent.jsx';

class App extends Component {
  render() {
    return (
      <div className="TodoApp App">
      <Router>
          <HeaderComponent />
          <Switch>
              <Route path="/" exact component={LoginComponent} />
              <Route path="/login" component={LoginComponent} />
              <AuthenticatedRoute path="/logout" component={LogoutComponent} />
              <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
              <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
              <AuthenticatedRoute path="/todos" component={ListTodosComponent} />
              <Route component={ErrorComponent} />
          </Switch>
          <FooterComponent />
      </Router>
  </div>
    );
  }
}

export default App;