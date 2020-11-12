import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';

import SignIn from '../pages/SignIn/index.js';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import ListCustomers from '../pages/Customers/ListCustomers';


const RouteWrapper = ({
  component: Component,
  isPrivate,
  ...rest
}) => {
  const signed = true;

  if (isPrivate && !signed) {
    return <Redirect to="/" />;
  }

  if (!isPrivate && signed) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout ;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
};

const Routes = () => (
  <Switch>
    <RouteWrapper path="/" exact component={SignIn} />
    <RouteWrapper path="/forgot-password" component={ForgotPassword} />
    <RouteWrapper path="/reset-password" component={ResetPassword} />

    <RouteWrapper path="/dashboard" component={Dashboard} isPrivate />
    <RouteWrapper path="/clientes" component={ListCustomers} isPrivate />

  </Switch>
);

export default Routes;
