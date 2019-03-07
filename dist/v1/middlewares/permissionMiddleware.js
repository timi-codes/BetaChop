"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var response = new _ResponseGenerator.default();
/**
 * @description - User's Authentication Middleware
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */

var PermissionMiddleWare = function PermissionMiddleWare(req, res, next) {
  if (!req.token) {
    response.setError(400, 'How the hell did you get pass the authentication middleware');
    return response.send(res);
  }

  var roleId = req.token.roleId;

  if (roleId && roleId === 1) {
    response.setError(403, 'You do not have the permission to perform this operation');
    return response.send(res);
  }

  next();
};

var _default = PermissionMiddleWare;
exports.default = _default;