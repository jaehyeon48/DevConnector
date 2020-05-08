import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../layout/Spinner';
import { deleteAccountAndProfile } from '../../actions/profile';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccountAndProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    loading && profile === null ?
      <Spinner /> :
      <React.Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i>
          Welcome {user && user.name}!
        </p>
        {profile !== null ?
          <React.Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div className="my-2">
              <button className="btn btn-danger" onClick={() => deleteAccountAndProfile()}>
                <i className="fas fa-user-minus"></i>&nbsp;&nbsp;&nbsp;Delete My Account
              </button>
            </div>
          </React.Fragment> :
          <React.Fragment>
            <p>You have not setup a profile yet, please add some info.</p>
            <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
            <div className="my-2">
              <button className="btn btn-danger" onClick={() => deleteAccountAndProfile()}>
                <i className="fas fa-user-minus"></i>&nbsp;&nbsp;&nbsp;Delete My Account
              </button>
            </div>
          </React.Fragment>
        }
      </React.Fragment>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccountAndProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccountAndProfile
})(Dashboard);
