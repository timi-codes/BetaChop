import ResponseGenerator from '../utils/ResponseGenerator';

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
  const now = new Date();
  const currentTime = now.getHours();
  const openTime = 9; // We open for order by 9:00am
  const closeTime = 18; // We close for the day by 6:00pm

  if (!(currentTime >= openTime && closeTime <= 18)) {
    response.setError(
      403,
      `Sorry, Order can't be placed now because we've closed for the day. (if you are testing you can change the time in orderTimermiddleware)${currentTime}`,
    );
    return response.send(res);
  }

  return next();
};

export default OrderTimerMiddleWare;
