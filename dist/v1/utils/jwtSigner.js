"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

/**
 * @description - Jwt Signer
 *
 * @param {Object} payload
 *
 * @returns {Object} token
 */
var jwtSigner = function jwtSigner(payload) {
  return _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
};

var _default = jwtSigner;
exports.default = _default;