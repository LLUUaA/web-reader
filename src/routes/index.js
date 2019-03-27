import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomeRoute from '../pages/home';
import LoginRoute from '../pages/login';
import Reader from '../pages/reader';
import Details from '../pages/details';

function NotFound() {
  return (
    <p>Not Found</p>
  )
}

const routes = [
  {
    path: "/",
    exact: true,
    component: HomeRoute
  },
  {
    path: "/reader",
    component: Reader
  },
  {
    path: "/details",
    component: Details
  },
  {
    path: "/login",
    component: LoginRoute,
    routes: [
      {
        path: "/login/child",
        component: NotFound
      }
    ]
  },

  // {
  //   component: NotFound
  // },
];
const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
)

const AppRouetr = () => (
  <Router>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
  </Router>

  // <Router>
  //   <Switch>
  //     <Route path='' exact component={HomeRoute} />
  //     <Route path='/login' component={LoginRoute} />
  //     <Route component={NotFound} />
  //   </Switch>
  // </Router>
)
export default AppRouetr;
