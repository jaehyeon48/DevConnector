import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profileForms/CreateProfile';
import EditProfile from './components/profileForms/EditProfile';
import PrivateRoute from './components/routing/PrivateRoute';
import AddExperience from './components/profileForms/AddExperience';
import EditExperience from './components/profileForms/EditExperience';
import AddEducation from './components/profileForms/AddEducation';
import EditEducation from './components/profileForms/EditEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import './App.css';
import { loadUser } from './actions/auth';


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route path="/" component={Landing} exact />
        <section className="container">
          <Alert />
          <Switch>
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/profiles" component={Profiles} exact />
            <Route path="/profile/:profileId" component={Profile} exact />
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
            <PrivateRoute path="/create-profile" component={CreateProfile} exact />
            <PrivateRoute path="/edit-profile" component={EditProfile} exact />
            <PrivateRoute path="/add-experience" component={AddExperience} exact />
            <PrivateRoute path="/edit-experience/:expId" component={EditExperience} exact />
            <PrivateRoute path="/add-education" component={AddEducation} exact />
            <PrivateRoute path="/edit-education/:eduId" component={EditEducation} exact />
            <Route path="/login" component={Login} exact />

          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
