import React from 'react'
import { Link } from 'react-router-dom';

import mainLogo from '../../img/dev_connector_main_logo.png';

const Navbar = () => (
  <nav className="navbar bg-dark">
    <h1>
      <Link to="/">
        {/* <i className="fas fa-code"></i> DevConnector */}
        <img className="main-logo" src={mainLogo} alt="dev connector main logo" />
      </Link>
    </h1>
    <ul>
      <li>
        <Link to="!#">Developers</Link>
      </li>
      <li>
        <Link to="/register">Sign Up</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
