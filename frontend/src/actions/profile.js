import axios from 'axios';

import { setAlert } from './alert';
import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from './types';

export const getCurrentProfile = () => async dispatch => {
  try {
    const response = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getAllProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const response = await axios.get('/api/profile');

    dispatch({
      type: GET_ALL_PROFILES,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getProfileById = userId => async dispatch => {
  try {
    const response = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getGithubRepos = username => async dispatch => {
  try {
    const response = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createProfile = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });

    dispatch(setAlert('Profile Created', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const editProfile = (formData, history, profileId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.patch(`/api/profile/${profileId}`, formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });

    dispatch(setAlert('Profile Updated', 'success'));
    history.goBack();
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const editExperience = (formData, history, experienceId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.patch(`/api/profile/experience/${experienceId}`, formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });

    dispatch(setAlert('Experience Updated', 'success'));
    history.goBack();
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, 'danger')));
    }
  }
};

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.put('/api/profile/education', formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const editEducation = (formData, history, educationId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.patch(`/api/profile/education/${educationId}`, formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });

    dispatch(setAlert('Education Updated', 'success'));
    history.goBack();
  } catch (err) {
    const errors = err.response.data;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error, 'danger')));
    }
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const response = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    })

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    const response = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    })

    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAccountAndProfile = () => async dispatch => {
  if (window.confirm('Are you sure you want to delete your account? THIS CANNOT BE UNDONE!')) {
    try {
      await axios.delete(`/api/profile`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};