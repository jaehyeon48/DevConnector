import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

const App = () => (
  <Router>
    <Navbar />
    <Route path="/" component={Landing} exact />
    <section className="container">
      <Switch>
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
      </Switch>
    </section>
  </Router>
);

export default App;
