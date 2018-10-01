import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../Home';
import Detail from '../Detail';
import AppLayout from './AppLayout';


const App = () => (
  <Router>
    <AppLayout>
      <Route exact path="/" component={Home} />
      <Route path="/film/:id" component={Detail} />
    </AppLayout>
  </Router>
);

export default App;
