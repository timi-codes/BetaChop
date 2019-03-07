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
    const user = req.body;

    if (!req.body.email) {
      response.setError(400, 'Email Address is required');
      return response.send(res);
    }
    if (!req.body.password) {
      response.setError(400, 'Password is required');
      return response.send(res);
    }
    if (!req.body.roleId) {
      user.roleId = 1;
    }

    try {
      const createdUser = await UserService.createUser(user);
      if (createdUser) {
        response.setSuccess(201, 'Account was successfully created!', createdUser);
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error.message);
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
    const login = req.body;

    if (!login.email) {
      response.setError(400, 'Email Address is required');
      return response.send(res);
    }
    if (!login.password) {
      response.setError(400, 'Password is required');
      return response.send(res);
    }

    try {
      const token = await UserService.loginUser(login);
      if (token == null) {
        response.setError(404, 'User profile cannot be found!');
      } else if (token === 'string') {
        const invalidCredentials = token;
        response.setError(400, invalidCredentials);
      } else {
        const tokenResponse = {
          token,
        };
        response.setSuccess(200, 'Successfully log in user', tokenResponse);
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error.message);
      return response.send(res);
    }
  }
}

export default UserController;
