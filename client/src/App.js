import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './components/UI/Header/Header'
import Landing from './components/UI/Landing/Landing'
import Login from './components/Pages/Auth/Login'
import Register from './components/Pages/Auth/Register'
import Category from './components/Pages/Category/Category';
import Footer from './components/UI/Footer/Footer';

import useAuth from './hooks/useAuth'
import CreateThread from './components/Pages/CreateThread/CreateThread';
import Thread from './components/Pages/Thread/Thread';
import NotFound from './components/Pages/NotFound/NotFound';

function App() {
  const { loading } = useAuth()
  return (
    <>
      <Header loading={loading} />
      <div className="content">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* 
          // @todo change this route 
        */}
          <Route exact path="/category/:id" component={Category} />
          <Route path="/category/:id/create" component={CreateThread} />
          <Route path="/thread/:id" component={Thread} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
