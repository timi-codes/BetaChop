import hashPassword from '../utils/passHasher';
import validPassword from '../utils/validatePassword';
import database from '../database/models';
import jwtSigner from '../utils/jwtSigner';

/**
 * This is allows user to create an account and login
 */
class UserService {
  /**
   * @description Create a new user
   * @returns {object} the registered user details
   */
  static async createUser(user) {
    try {
      user.password = hashPassword(user.password);

      const isUser = await database.User.findOne({ where: { email: user.email } });

      if (isUser) {
        throw new Error('User with this email address already exist!');
      }

      const createdUser = await database.User.create(user);

      const {
        firstname, lastname, email, id: userId,
      } = createdUser;

      const payload = {
        userId,
        firstname,
        lastname,
      };

      const token = jwtSigner(payload);
      const userProfile = {
        firstname,
        lastname,
        email,
        token,
      };

      return userProfile;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Takes a new meal object
   * @param {object} meal
   * @returns {object} created meal
   */
  static async loginUser(login) {
    try {
      const user = await database.User.findOne({ where: { email: login.email } });
      if (user) {
        const bcryptResponse = await validPassword(login.password, user.password);
        if (bcryptResponse) {
          const { id: userId, password: userPassword, ...data } = user.get();
          const userProfile = { userId, ...data };
          const token = jwtSigner(userProfile);
          return token;
        }
        // return 'Invalid user credentials';
        throw new Error('Invalid user credentials');
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
