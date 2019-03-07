"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _menu = _interopRequireDefault(require("../controllers/menu.controller"));

var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware"));

var _permissionMiddleware = _interopRequireDefault(require("../middlewares/permissionMiddleware"));

var router = (0, _express.Router)();
router.get('/', _authMiddleware.default, _menu.default.fetchMenu);
router.post('/', _authMiddleware.default, _permissionMiddleware.default, _menu.default.setUpMenu);
var _default = router;
exports.default = _default;