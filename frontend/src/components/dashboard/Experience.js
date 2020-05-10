import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import { deleteExperience } from '../../actions/profile';

const Experience = props => {
  const experiences = props.experience.map(experience => (
    <tr key={experience._id}>
      <td>{experience.company}</td>
      <td className="hide-sm">{experience.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{experience.from}</Moment> -
        {experience.to === null ? (' Now') : (
          <Moment format="YYYY/MM/DD">{experience.to}</Moment>
        )}
      </td>
      <td>
        <Link to={`/edit-experience/${experience._id}`} className="btn btn-warning">Edit</Link>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => props.deleteExperience(experience._id)}>Delete</button>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </React.Fragment>
  )
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience);
