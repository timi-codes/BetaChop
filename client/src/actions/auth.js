import jwt from 'jsonwebtoken';
import actionType from './actionTypes';

const {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT,
} = actionType;

export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  email,
  password,
});

export const loginUser = (data) => {
  const decoded = jwt.decode(data.token);
  return {
    type: LOGIN_SUCCESS,
    user: {
      email: decoded.email,
      username: decoded.username,
    },
  };
};

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error: error.response.message,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
    user: {},
  };
}
