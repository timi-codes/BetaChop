import isEmpty from 'lodash/isEmpty';
import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoginPending: true,
  isAuthenticated: false,
  user: {},
};

const { LOGIN_SUCCESS } = actionTypes;

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginPending: false,
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      });
    default:
      return state;
  }
};
