import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import App from './App';
import AuthContext from './contexts/AuthContext'
import './css/main.css'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
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