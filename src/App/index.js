// @flow
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo';

import Home from '../Home';
import Detail from '../Detail';
import AppLayout from './AppLayout';


const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8080/' }),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <AppLayout>
        <Route exact path="/" component={Home} />
        <Route path="/film/:id" component={Detail} />
      </AppLayout>
    </Router>
  </ApolloProvider>
);

export default App;
