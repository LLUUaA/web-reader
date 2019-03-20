import React, { Component } from 'react';
import './App.css';

import AppRouetr from './routes';

class App extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppRouetr></AppRouetr>
        </header>
      </div>
    );
  }

  testFo() {
    console.log('test', this)
  }
}

export default App;
