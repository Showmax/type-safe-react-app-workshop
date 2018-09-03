// @flow
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'

import { ApolloProvider } from 'react-apollo';

import Home from './Home';
import Detail from './Detail';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:8080/' }),
  cache: new InMemoryCache(),
});

class App extends Component<{}> {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <Route exact path="/" component={Home} />
            <Route path="/film/:id" component={Detail} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
