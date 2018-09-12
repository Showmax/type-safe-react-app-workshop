// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('#root element is missing');
}

ReactDOM.render(<App />, rootElement);
