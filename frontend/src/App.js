import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Route path="/" component={Landing} exact />
      <section className="container">
        <Alert />
        <Switch>
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
        </Switch>
      </section>
    </Router>
  </Provider>
);

export default App;
