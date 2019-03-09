import bcrypt from 'bcrypt';

let password = '';

/**
 * @description - Password Hasher
 *
 * @param {Object} password
 *
 * @returns {Object} token
 */
const hashPassword = (pwd) => {
  const salt = bcrypt.genSaltSync(15);
  password = bcrypt.hashSync(pwd, salt);
  return password;
};

export default hashPassword;
