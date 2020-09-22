import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.js'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button'
import { Row, Col, Container } from 'react-bootstrap'
class LoginComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'mario',
      password: 'password',
      hasLoginFailed: false,
      showSuccessMessage: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.loginHandler = this.loginHandler.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  loginHandler() {
    AuthenticationService.executeJwtAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then((response) => {
        AuthenticationService.registerSuccessfulJwtLogin(
          this.state.username,
          response.data.token
        )
        //this.props.history.push(`/welcome/${this.state.username}`);
        this.props.history.push('/todos')
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false })
        this.setState({ hasLoginFailed: true })
      })
  }

  render() {
    return (
      <Container className="p-5">
        <Row>
          <Col className='d-flex justify-content-center mb-4'>
            <h1>Login</h1>
          </Col>
        </Row>
        <Row>
          <Col
            className='d-flex justify-content-center'
            xs='auto'
            sm={6}
            md={5}
            lg={4}
            xl={3}
          >
            {this.state.hasLoginFailed && (
              <div className='alert alert-warning mb-3'>
                Invalid Credentials
              </div>
            )}
            {this.state.showSuccessMessage && (
              <div className='alert alert-success mb-3'>Login Sucessful</div>
            )}
          </Col>
        </Row>
        <Row className='justify-content-center mb-3'>
          <Col
            className='d-flex justify-content-center'
            xs='auto'
            sm={6}
            md={5}
            lg={4}
            xl={3}
          >
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label='Default'
                aria-describedby='inputGroup-sizing-default'
                value={this.state.username}
                onChange={this.handleChange}
                type='text'
                name='username'
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className='justify-content-center mb-3'>
          <Col
            className='d-flex justify-content-center'
            xs='auto'
            sm={6}
            md={5}
            lg={4}
            xl={3}
          >
            <InputGroup className=''>
              <InputGroup.Prepend>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  <FontAwesomeIcon icon={faKey} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label='Default'
                aria-describedby='inputGroup-sizing-default'
                value={this.state.password}
                type='password'
                name='password'
                onChange={this.handleChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col
            className='d-flex justify-content-center'
            xs='auto'
            sm={6}
            md={5}
            lg={4}
            xl={3}
            className='justify-content-center'
          >
            <Button
              block
              variant='outline-secondary'
              onClick={this.loginHandler}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LoginComponent
