import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <p>login page</p>
        {this.props.routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            render={props => (
              <route.component {...props} routes={route.routes} />
            )}
          />
        ))}
      </div>
    )
  }
}

export default Login