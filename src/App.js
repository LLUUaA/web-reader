import React, { Component } from 'react';
import './App.css';
import AppBar from './component/AppBar';
import Drawer from './component/Drawer';
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

  state = {
    openStatus:null
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <AppBar onClick={this.handleDrawer.bind(this)} />
            <Drawer openStatus={this.state.openStatus} onClick={this.handleDrawer.bind(this)}/>
          </header>
          <section className="App-container">
            <AppRouetr></AppRouetr>
          </section>
        </div>
      </MuiThemeProvider>
    );
  }

  handleDrawer(status) {
    this.setState({
      openStatus:status
    })
  }
}

export default App;
