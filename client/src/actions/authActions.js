import { 
  AUTH_ERROR, 
  LOADED_USER, 
  LOADING_USER, 
  LOGIN_ERROR, 
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
} from './types';
import axios from 'axios';

export const checkUser = () => dispatch => {
  dispatch({ type: LOADING_USER });

  axios.get('/api/auth/checksession')
  .then(res => dispatch({
    type: LOADED_USER,
    payload: res.data,
  }))
  .catch(err => {
    dispatch({
      type: AUTH_ERROR,
    });
  });
}

export const loginUser = user => dispatch => {
  axios.post('/api/auth/login', user, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => dispatch({
    type: LOGIN_SUCCESS,
    payload: res.data,
  }))
  .catch(err => {
    dispatch({
      type: LOGIN_ERROR,
    });
  });
}

export const logoutUser = () => dispatch => {
  axios.get('/api/auth/logout')
  .then(() => dispatch({
    type: LOGOUT_SUCCESS,
  }))
  .catch(err => {
    dispatch({
      type: LOGOUT_ERROR,
    });
  });
}
