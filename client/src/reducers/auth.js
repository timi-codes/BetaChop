import isEmpty from 'lodash/isEmpty';
import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoginPending: true,
    isAuthenticated:false,
    user:{}
  }

const { SET_CURRENT_USER, UPDATE_PROFILE } = actionType;
export const