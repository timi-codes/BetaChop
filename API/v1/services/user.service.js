import database from '../database/models';

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
      const createdUser = await database.User.create(user);
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
    } catch (error) {
      throw error;
    }
  }
}
export default UserService;
