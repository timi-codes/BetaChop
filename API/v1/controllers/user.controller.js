import UserService from '../services/user.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * meal controller performs controls  request and response -
 * create a new user,
 * sign in user,
 */
class UserController {
  /**
   * @description create a new user from a user object
   * @param {object} req
   * @param {object} res
   * @returns {object} created user
   */
  static async createUser(req, res) {
    const { user } = req.body;

    try {
      const createdUser = await UserService.createUser(user);
      if (createdUser) {
        response.setSuccess(200, 'Account was successfully created!', createdUser);
      } else {
        response.setError(400, 'There was an error creating account');
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error);
      return response.send(res);
    }
  }

  /**
   * @description login user
   * @param {object} req
   * @param {object} res
   * @returns {object} created user
   */
  static async loginUser(req, res) {
    if (!req.body.name || !req.body.price || !req.body.size || !req.body.imageUrl) {
      response.setError(400, 'All parameters are required');
      return response.send(res);
    }

    try {
      const loginUser = await UserService.loginUser(req.body.login);
      response.setSuccess(200, loginUser);
      return response.send(res);
    } catch (error) {
      response.setError(400, error);
      return response.send(res);
    }
  }
}

export default UserController;
