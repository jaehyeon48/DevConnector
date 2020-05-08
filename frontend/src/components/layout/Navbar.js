import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import mainLogo from '../../img/dev_connector_main_logo.png';

const Navbar = (props) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">My Info</span>
        </Link>
      </li>
      <li>
        <Link onClick={props.logout} to="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>

    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link to="/register">Sign Up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <img className="main-logo" src={mainLogo} alt="dev connector main logo" />
        </Link>
      </h1>
      {!props.auth.loading && (
        <React.Fragment>
          {props.auth.isAuthenticated ? authLinks : guestLinks}
        </React.Fragment>
      )}
    </nav>
  )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
