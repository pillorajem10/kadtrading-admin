import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// redux
import { useSelector } from 'react-redux';
import store from '@redux/store';
import { common } from '@redux/combineActions';

// layout
import BasicLayout from '@layout/BasicLayout';

// page
import Login from '@pages/login';

// utils
import menuConfig from '@utils/menu-config';

const token = localStorage.getItem('token');
const account = JSON.parse(localStorage.getItem('account'));

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(common.user.userLogout());
    window.location.href = '/login';
  } else {
    store.dispatch(common.user.setUserDetails(account));
    common.user.setAuthorizationHeader(token);
  }
} else {
  axios.defaults.headers.common.Authorization = `Bearer`;
}

const App = () => {
  const {
    user: { authenticated },
  } = useSelector((state) => state.common);

  const getSubRoutes = (route) => {
    return route.map((subRoute) => {
      const parentRoute = (
        <Route path={subRoute.key} component={subRoute.component} key={subRoute.key} exact />
      );
      if (subRoute.subRoute) {
        return [parentRoute, ...getSubRoutes(subRoute.subRoute)];
      }
      return parentRoute;
    });
  };

  const routes = menuConfig.map((route) => {
    if (route.subRoute.length === 0) {
      return <Route path={route.key} component={route.component} key={route.key} exact />;
    }
    return getSubRoutes(route.subRoute).flat();
  });
  
  return (
    <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_ROUTER_BASE || ''}>
      {authenticated ? (
        <BasicLayout>
          <Switch>
            {routes}
            <Redirect from="/" to="/hapichair/orders" />
          </Switch>
        </BasicLayout>
      ) : (
        <Switch>
          <Route path="/login" component={Login} exact />
          <Redirect from="/" to="/login" />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default App;
