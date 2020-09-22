import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from '../Auth/AuthenticationService.js'
import moment from 'moment'
import { Container, Col, Row, Table, Button } from 'react-bootstrap'

class ListTodosComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      message: null,
    }

    this.deleteTodoHandler = this.deleteTodoHandler.bind(this)
    this.updateTodoHandler = this.updateTodoHandler.bind(this)
    this.refreshTodos = this.refreshTodos.bind(this)
    this.addTodoHandler = this.addTodoHandler.bind(this)
  }

  componentDidMount() {
    this.refreshTodos()
  }

  refreshTodos() {
    let username = AuthenticationService.getLoggedInUserName()
    TodoDataService.retrieveAllTodos(username).then((response) => {
      this.setState({
        todos: response.data,
      })
    })
  }

  deleteTodoHandler(id) {
    let username = AuthenticationService.getLoggedInUserName()
    TodoDataService.deleteTodo(username, id).then((response) => {
      this.setState({
        message: `Delete of todo ${id} successful`,
      })
      this.refreshTodos()
    })
  }

  updateTodoHandler(id) {
    this.props.history.push(`/todos/${id}`)
  }

  addTodoHandler() {
    this.props.history.push(`/todos/-1`)
  }

  render() {
    return (
      <Container className='p-5'>
        <Row className='justify-content-center mb-2'>
          <Col className='justify-content-center mb-2'>
            <h1>Todos</h1>
          </Col>
        </Row>
        <Row>
          <Col className='justify-content-center mb-2'>
            {this.state.message && (
              <h3 className='alert alert-success justify-content-center mb-4'>
                {this.state.message}
              </h3>
            )}
          </Col>
        </Row>

        <Table striped responsive>
          <thead>
            <tr>
              <th>Description</th>
              <th>Target Date</th>
              <th>Is Completed?</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                <td>{todo.done.toString()}</td>
                <td>
                  <button
                    onClick={() => this.updateTodoHandler(todo.id)}
                    className='btn btn-success'
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => this.deleteTodoHandler(todo.id)}
                    className='btn btn-warning'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='block d-flex align-items-end'>
          <Button
            onClick={this.addTodoHandler}
            className='btn btn-success d-flex align-items-end'
          >
            Add
          </Button>
        </div>
      </Container>
    )
  }
}

export default ListTodosComponent
