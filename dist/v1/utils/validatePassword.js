"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var validPassword = function validPassword(password, userPassword) {
  var isValid = _bcrypt.default.compareSync(password, userPassword);

  return isValid;
};

var _default = validPassword;
exports.default = _default;