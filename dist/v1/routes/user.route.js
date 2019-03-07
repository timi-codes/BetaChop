"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("../controllers/user.controller"));

var router = (0, _express.Router)();
router.post('/signup', _user.default.createUser);
router.post('/login', _user.default.loginUser);
var _default = router;
exports.default = _default;