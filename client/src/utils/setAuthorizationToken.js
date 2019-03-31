import axios from 'axios';

export default (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    Reflect.deleteProperty(axios.defaults.headers.common, 'x-access-token');
  }
};
