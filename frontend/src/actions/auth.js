import axios from 'axios';

import { setAlert } from '../actions/alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from '../actions/types';

export const loadUser = () => async dispatch => {
  try {
    const response = await axios.get('/api/auth');
    if (response.status === 200) {
      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({ firstName, lastName, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ firstName, lastName, email, password });

  try {
    const response = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.get('/api/auth/logout');
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
  } catch (err) {
    console.log(err);
  }
};