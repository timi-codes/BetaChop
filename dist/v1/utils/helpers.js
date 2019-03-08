"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var Utility = {
  stripNull: function stripNull(obj) {
    var cleanObj = {};
    Object.keys(obj).forEach(function (val) {
      var newVal = obj[val];
      cleanObj = newVal ? (0, _objectSpread3.default)({}, cleanObj, (0, _defineProperty2.default)({}, val, newVal)) : cleanObj;
    });
    return cleanObj;
  }
};
var _default = Utility;
exports.default = _default;