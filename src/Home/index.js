// @flow
import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
  <div>
    <div>Home</div>
    <Link to="/film/fake-id">Link to Detail Page</Link>
  </div>
);


export default Home;
