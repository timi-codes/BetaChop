import ResponseGenerator from '../utils/ResponseGenerator';
import Utility from '../utils/helpers';

const response = new ResponseGenerator();

/**
 * @description - User's Authentication Middleware
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
const OrderTimerMiddleWare = (req, res, next) => {
  if (!req.token) {
    response.setError(419, 'How the hell did you get pass the authentication middleware');
    return response.send(res);
  }

  if (!Utility.isOrderTime()) {
    response.setError(
      403,
      'Sorry, Order can\'t be placed now because we\'ve closed for the day. (if you are testing you can change the time in orderTimermiddleware)',
    );
    return response.send(res);
  }

  return next();
};

export default OrderTimerMiddleWare;
