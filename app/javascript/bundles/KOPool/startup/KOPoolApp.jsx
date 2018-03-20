import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-client-preset'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AUTH_TOKEN } from "../constants/koPoolConstants";
import { authService } from '../components/AuthService'

import KOPool from '../components/KOPool'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : '';
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation)
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(new HttpLink())

const client = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache()
});

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    authService.isAuthenticated() === true ?
      <Component {...props} />
    :
      <Redirect to='/login' />
  )} />
);

const UnauthenticatedRoute = ({ component: Component, ...rest}) => (
  // Only allow users to go to this route if they aren't authenticated
  <Route {...rest} render={(props) => (
    authService.isAuthenticated() === true ?
      <Redirect to='/' />
      :
      <Component {...props} />
  )} />
);

const KOPoolApp = (props) => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <UnauthenticatedRoute path="/login" exact component={LoginForm} />
        <UnauthenticatedRoute path="/register" exact component={RegisterForm} />
        <PrivateRoute path="/" component={KOPool} />
      </Switch>
    </Router>
  </ApolloProvider>
);

export default KOPoolApp;