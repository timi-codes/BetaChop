import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export const login = data => axios
  .post('/api/v1/auth/login', data)
  .then(response => response)
  .catch(error => error);

export const storeItem = (token) => {
  localStorage.setItem('token', token);
  setAuthorizationToken(token);
};

export const clearitem = () => {
  localStorage.removeItem('token');
  setAuthorizationToken(false);
};
