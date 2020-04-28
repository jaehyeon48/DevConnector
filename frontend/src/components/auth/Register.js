import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'


import { setAlert } from '../../actions/alert';

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPwd: ''
  });

  const { name, email, password, confirmPwd } = formData;

  const handleChange = event => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPwd) {
      props.setAlert('Passwords do not match!', 'danger');
    } else {
      // const newUser = {
      //   name,
      //   email,
      //   password
      // };

      // try {
      //   const config = {
      //     headers: { 'Content-Type': 'application/json' }
      //   };

      //   const body = JSON.stringify(newUser);

      //   const response = await axios.post('/api/users', body, config);

      //   console.log(response.data);
      // } catch (err) {
      //   console.log(err.response.data.errorMsg);
      // }
      console.log('SUCCESS!');
    }
  };

  return (
    <React.Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => handleChange(e)}
            required
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
            minLength="6"
            value={password}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPwd"
            minLength="6"
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
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(Register);
