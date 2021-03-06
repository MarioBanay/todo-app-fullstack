import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from '../Auth/AuthenticationService.js'
import { Row, Container, Col, Button } from 'react-bootstrap'

class TodoComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.id,
      description: '',
      targetDate: moment(new Date()).format('YYYY-MM-DD'),
    }

    this.onSubmitHandler = this.onSubmitHandler.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentDidMount() {
    if (this.state.id === '-1') {
      return
    } else {
      let username = AuthenticationService.getLoggedInUserName()
      TodoDataService.retrieveTodo(username, this.state.id).then((response) =>
        this.setState({
          description: response.data.description,
          targetDate: moment(response.data.targetDate).format('YYYY-MM-DD'),
        })
      )
    }
  }

  validate(values) {
    let errors = {}
    if (!values.description) {
      errors.description = 'Enter a Description'
    } else if (values.description.length < 5) {
      errors.description = 'Enter more than 5 characters in description'
    }

    if (!moment(values.targetDate).isValid()) {
      errors.targetDate = 'Enter a valid date'
    }

    return errors
  }

  onSubmitHandler(values) {
    let username = AuthenticationService.getLoggedInUserName()

    let todo = {
      id: this.state.id,
      description: values.description,
      targetDate: values.targetDate,
    }

    if (this.state.id === -1) {
      TodoDataService.createTodo(username, todo).then(() => {
        this.props.history.push('/todos')
      })
    } else {
      TodoDataService.updateTodo(username, this.state.id, todo).then(() => {
        this.props.history.push('/todos')
      })
    }
  }

  render() {
    let description = this.state.description
    let targetDate = this.state.targetDate

    return (
      <Container className='p-5'>
        <Row>
          <Col className='d-flex justify-content-center mb-4'>
            {' '}
            <h1>Todo</h1>
          </Col>
        </Row>

        <Row
          className='d-flex justify-content-center mb-3'
          sm={6}
          md={5}
          lg={4}
          xl={3}
        >
          <Col
            className='d-flex justify-content-center'
            xs='auto'
            sm={6}
            md={5}
            lg={4}
            xl={3}
          >
            <Formik
              initialValues={{
                description: description,
                targetDate: targetDate,
              }}
              onSubmit={this.onSubmitHandler}
              validateOnChange={false}
              validateOnBlur={false}
              validate={this.validate}
              enableReinitialize={true}
            >
              {(props) => (
                <Form>
                  <ErrorMessage
                    name='description'
                    component='div'
                    className='alert alert-warning'
                  />
                  <ErrorMessage
                    name='targetDate'
                    component='div'
                    className='alert alert-warning'
                  />
                  <fieldset className='form-group'>
                    <label>Description</label>
                    <Field
                      className='form-control'
                      type='text'
                      name='description'
                    />
                  </fieldset>
                  <fieldset className='form-group'>
                    <label>Target Date</label>
                    <Field
                      className='form-control'
                      type='date'
                      name='targetDate'
                    />
                  </fieldset>
                  <Button block type='submit' variant='outline-secondary'>
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default TodoComponent
