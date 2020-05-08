import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getAllProfiles } from '../../actions/profile';

const Profiles = ({
  getAllProfiles,
  profile: {
    profiles,
    loading
  }
}) => {
  useEffect(() => { getAllProfiles(); }, [getAllProfiles]);

  return (
    <React.Fragment>
      {loading ? <Spinner /> :
        <React.Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : <h4>No Profiles Found.</h4>}
          </div>
        </React.Fragment>}
    </React.Fragment>
  )
}

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
