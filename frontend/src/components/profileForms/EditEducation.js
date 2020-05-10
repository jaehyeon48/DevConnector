import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile } from '../../actions/profile';
import { editEducation } from '../../actions/profile';

const EditEducation = ({
  loading,
  education,
  editEducation,
  history,
  match
}) => {
  education = education.find(exp => exp._id === match.params.eduId);

  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  useEffect(() => {
    getCurrentProfile();
  }, []);

  useEffect(() => {
    setFormData({
      school: loading || !education.school ? '' : education.school,
      degree: loading || !education.degree ? '' : education.degree,
      fieldofstudy: loading || !education.fieldofstudy ? '' : education.fieldofstudy,
      from: loading || !education.from ? '' : education.from.split('T')[0],
      to: loading || !education.to ? '' : education.to.split('T')[0],
      current: loading || !education.current ? false : education.current,
      description: loading || !education.description ? '' : education.description,
    });
  }, [loading, education]);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

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
    editEducation(formData, history, match.params.eduId);
  }
  return (
    <React.Fragment>
      <h1 className="large text-primary">
        Edit Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or boot camp that you have attended
      </p>
      <small>* required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Boot camp"
            name="school"
            value={school}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Field of study"
            name="fieldofstudy"
            value={fieldofstudy}
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
            placeholder="Program Description"
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

EditEducation.propTypes = {
  editEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  education: state.profile.profile.education
});

export default connect(mapStateToProps, { editEducation })(withRouter(EditEducation));
