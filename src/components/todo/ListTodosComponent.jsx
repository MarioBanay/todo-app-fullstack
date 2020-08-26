import React, { Component } from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from '../Auth/AuthenticationService.js';
import moment from 'moment';

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            todos: [],
            message: null
        }

        this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
        this.updateTodoHandler = this.updateTodoHandler.bind(this);
        this.refreshTodos = this.refreshTodos.bind(this);
        this.addTodoHandler = this.addTodoHandler.bind(this);
    }

    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    this.setState({
                        todos: response.data,
                    });
                }
            )
    }

    deleteTodoHandler(id) {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({
                        message: `Delete of todo ${id} successful`
                    });
                    this.refreshTodos();
                }
            );
    }

    updateTodoHandler(id) {
        this.props.history.push(`/todos/${id}`);
    }

    addTodoHandler() {
        this.props.history.push(`/todos/-1`);
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
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
                            {this.state.todos.map(todo =>
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td><button onClick={() => this.updateTodoHandler(todo.id)} className="btn btn-success">Update</button></td>
                                    <td><button onClick={() => this.deleteTodoHandler(todo.id)} className="btn btn-warning">Delete</button></td>
                                </tr>)}
                        </tbody>
                    </table>
                    <div className="row">
                        <button onClick={this.addTodoHandler} className="btn btn-success">Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListTodosComponent;