import React, { Component } from 'react';
import './App.css';
import AppBar from './component/AppBar';
import AppRouetr from './routes';

class App extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AppBar />
        </header>
        <AppRouetr></AppRouetr>
      </div>
    );
  }

  testFo() {
    console.log('test', this)
  }
}

export default App;
