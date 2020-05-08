import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addEducation } from '../../actions/profile';

const AddEducation = props => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const [toDateDisabled, toggleToDate] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const handleChange = event => setFormData(
    {
      ...formData,
      [event.target.name]: event.target.value
    });

  return (
    <React.Fragment>
      <h1 className="large text-primary">
        Add An Education
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any school or boot camp that you have attended
      </p>
      <small>* required field</small>
      <form className="form" onSubmit={e => {
        e.preventDefault()
        props.addEducation(formData, props.history);
      }}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Boot camp"
            name="school"
            required
            value={school}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
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
            onChange={e => {
              setFormData({ ...formData, current: !current });
              toggleToDate(!toDateDisabled);
            }}
          /> {' '}Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={e => handleChange(e)}
            disabled={toDateDisabled ? 'disabled' : ''}
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
