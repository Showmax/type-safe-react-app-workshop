// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import Home from '../Home';
import Detail from '../Detail';
import AppLayout from './AppLayout';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:8080',
});

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <AppLayout>
        <Route exact path="/" component={Home} />
        <Route path="/film/:id" component={Detail} />
      </AppLayout>
    </Router>
  </ApolloProvider>
);

export default App;
