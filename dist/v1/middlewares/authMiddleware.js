"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var response = new _ResponseGenerator.default();
/**
 * @description - use for decoding token
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 * @param {String} token
 *
 * @returns {Object} Object
 */

var decodeToken = function decodeToken(req, res, next, token) {
  _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, function (error, decode) {
    if (!error) {
      req.token = decode;
      return next();
    }

    response.setError(400, 'Token Not Valid');
    return response.send(res);
  });
};
/**
 * @description - User's Authentication Middleware
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */


var AuthMiddleware = function AuthMiddleware(req, res, next) {
  var token = req.headers['x-access-token'] || req.headers.token || req.body.token || req.params.token;

  if (process.env.NODE_ENV === 'test') {
    if (!token) {
      token = 1;
    }

    if (typeof token === 'number') {
      req.token = {
        userId: token
      };
      return next();
    }

    if (typeof token === 'string') {
      return decodeToken(req, res, next, token);
    }
  }

  if (token) {
    return decodeToken(req, res, next, token);
  }

  response.setError(400, 'Please assign a access token as header!');
  return response.send(res);
};

var _default = AuthMiddleware;
exports.default = _default;