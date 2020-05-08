import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = (props) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPwd: ''
  });

  const { firstName, lastName, email, password, confirmPwd } = formData;

  const handleChange = event => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPwd) {
      props.setAlert('Passwords do not match!', 'danger');
    } else {
      props.register({ firstName, lastName, email, password });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <React.Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={e => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            // minLength="6"
            value={password}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPwd"
            // minLength="6"
            value={confirmPwd}
            onChange={e => handleChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Sign Up" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </React.Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
