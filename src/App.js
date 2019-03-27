import React, { Component } from 'react';
import './App.css';
import AppBar from './component/AppBar';
import AppRouetr from './routes';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
});

class App extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <AppBar />
          </header>
          <AppRouetr></AppRouetr>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
