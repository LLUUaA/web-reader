import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeRoute from '../pages/home';
import LoginRoute from '../pages/login';

function NotFound() {
  return (
    <p>Not Found</p>
  )
}

const routes = [
  {
    path: "",
    component: HomeRoute
  },
  {
    path: "/login",
    component: LoginRoute,
    routes: [
      {
        path: "/login/child",
        component: LoginRoute
      }
    ]
  },
  {
    path: "other",
    component: HomeRoute
  },

  {
    path: '*',
    component: NotFound
  },
];
const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path ? route.path : ''}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
)

const AppRouetr = () => (
  // <Router>
  //   {routes.map((route, i) => (
  //     <RouteWithSubRoutes key={i} {...route} />
  //   ))}
  // </Router>

  <Router>
    <Switch>
      <Route path='' exact component={HomeRoute} />
      <Route path='/login' component={LoginRoute} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)
export default AppRouetr;
