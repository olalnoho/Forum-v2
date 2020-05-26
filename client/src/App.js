import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import Header from './components/UI/Header/Header'
import Landing from './components/UI/Landing/Landing'
import Login from './components/Pages/Auth/Login'
import Register from './components/Pages/Auth/Register'
import Category from './components/Pages/Category/Category';
import Footer from './components/UI/Footer/Footer';

// https://www.0to255.com/4b3b43
// https://www.webdesignerforum.co.uk/


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <div className="content">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          {/* 
          // @todo change this route 
        */}
          <Route path="/category" component={Category} />
        </Switch>
      </div>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
