// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import injectSheet from 'react-jss';

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'

import { ApolloProvider } from 'react-apollo';

import Home from '../Home';
import Detail from '../Detail';

import logo from './logo.svg';
import styles from './styles';


const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8080/' }),
  cache: new InMemoryCache(),
});

const App = ({ classes }) => (
  <ApolloProvider client={client}>
    <Router>
      <div className={classes.container}>
        <div className={classes.gradient} />
        <div className={classes.content}>
          <Link to="/" className={classes.logoLink}>
            <img src={logo} className={classes.logo} />
          </Link>

          <Route exact path="/" component={Home} />
          <Route path="/film/:id" component={Detail} />
        </div>
      </div>
    </Router>
  </ApolloProvider>
);

export default injectSheet(styles)(App);
