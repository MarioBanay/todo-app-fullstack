import React, { Component } from 'react';
import './App.css';
import FirstComponent from './components/learning-examples/FirstComponent.jsx';
import { SecondComponent } from './components/learning-examples/SecondComponent.jsx';
import ThirdComponent from './components/learning-examples/ThirdComponent.jsx';
import Counter from './components/counter/Counter.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter />
      </div>
    );
  }
}

class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        My Hello World
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
      </div>
    );
  }
}

export default App;