import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profile';
import { editExperience } from '../../actions/profile';

const EditExperience = ({
  loading,
  experience,
  editExperience,
  history,
  match
}) => {
  experience = experience.find(exp => exp._id === match.params.expId);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      title: loading || !experience.title ? '' : experience.title,
      company: loading || !experience.company ? '' : experience.company,
      location: loading || !experience.location ? '' : experience.location,
      from: loading || !experience.from ? '' : experience.from.split('T')[0],
      to: loading || !experience.to ? '' : experience.to.split('T')[0],
      current: loading || !experience.current ? false : experience.current,
      description: loading || !experience.description ? '' : experience.description,
    });
  }, [loading, getCurrentProfile]);

  const { title, company, location, from, to, current, description } = formData;

  const handleChange = event => setFormData(
    {
      ...formData,
      [event.target.name]: event.target.value
    });

  const handleSubmit = event => {
    event.preventDefault();

    if (current) {
      formData['to'] = '';
    }
    editExperience(formData, history, match.params.expId);
  }
  return (
    <React.Fragment>
      <h1 className="large text-primary">
        Edit Your Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <p><input
            type="checkbox"
            name="current"
            checked={current}
            value={current}
            onChange={e => setFormData({ ...formData, current: !current })}
          /> {' '}Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => handleChange(e)}
            disabled={current ? 'disabled' : ''}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => handleChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </React.Fragment>
  );
};

EditExperience.propTypes = {
  editExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  experience: state.profile.profile.experience
});

export default connect(mapStateToProps, { editExperience })(withRouter(EditExperience));
