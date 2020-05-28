import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import App from './App';
import AuthContext from './contexts/AuthContext'
import './css/main.css'

const cache = new InMemoryCache()

cache.originalReadQuery = cache.readQuery

// @note
// kind of hacky but
// readQuery will throw error if there is not cache
// returning null or undefined seems better.

cache.readQuery = (...args) => {
  try {
    return cache.originalReadQuery(...args);
  } catch (err) {
    return undefined;
  }
};

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? token : ''
      }
    })
  },
  cache
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <AuthContext>
        <App />
      </AuthContext>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);