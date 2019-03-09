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
      const { password, roleId } = user;

      const isUser = await database.User.findOne({ where: { email: user.email } });

      if (isUser) {
        throw new Error('User with this email address already exist!');
      }

      // Create user
      user.password = hashPassword(password);

      const createdUser = await database.User.create(user);

      const { username, email, id: userId } = createdUser;

      const payload = {
        userId,
        username,
        roleId,
      };

      const token = jwtSigner(payload);
      const userProfile = {
        username,
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
