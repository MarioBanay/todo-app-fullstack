import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter.css';

export class Counter extends Component {

    // Define iniCounterButtontial state in constructor => set counter to 0
    constructor() {
        // in constructor first you have to call super
        super();

        this.state = {
            counter: 0
        }

        // you have to bind this in order to use it in function (you dont have to for arrow functions)
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    // update the state
    increment(by) {
        //console.log(`increment from parent = - ${by}`);
        // set state is a MERGE!
        this.setState(
            (prevState) => {
                return { counter: prevState.counter + by }
            }
        );
        // console.log(this.state.counter);
    }

    decrement(by) {
        //console.log(`increment from parent = - ${by}`);
        // set state is a MERGE!
        this.setState(
            (prevState) => {
                return { counter: prevState.counter - by }
            }
        );
        // console.log(this.state.counter);
    }

    reset() {
        this.setState(
            { counter: 0 }
        );
    }

    render() {
        return (
            <div className="Counter">

                <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement} />
                <span className="count" >{this.state.counter}</span>
                <div><button className="reset" onClick={this.reset}>Reset</button></div>

            </div>
        );
    }
}

class CounterButton extends Component {

    // Define iniCounterButtontial state in constructor => set counter to 0
    constructor() {
        // in constructor first you have to call super
        super();
    }

    render() {
        //const style = {fontSize: "50px"};
        return (
            <div className="counter" >
                {/* you need arrow functon if you want to add parametar to event listener! */}
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            </div>
        );
    }
}

// default values for props
CounterButton.defaultProps = {
    by: 1
}

CounterButton.propTypes = {
    by: PropTypes.number
}

export default Counter;