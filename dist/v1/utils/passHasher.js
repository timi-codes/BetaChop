"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var password = '';

var hashPassword = function hashPassword(pwd) {
  var salt = _bcrypt.default.genSaltSync(15);

  password = _bcrypt.default.hashSync(pwd, salt);
  return password;
};

var _default = hashPassword;
exports.default = _default;