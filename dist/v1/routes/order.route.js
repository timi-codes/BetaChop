"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _order = _interopRequireDefault(require("../controllers/order.controller"));

var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware"));

var _permissionMiddleware = _interopRequireDefault(require("../middlewares/permissionMiddleware"));

var router = (0, _express.Router)();
router.get('/', _authMiddleware.default, _permissionMiddleware.default, _order.default.fetchAllOrders);
router.post('/', _authMiddleware.default, _order.default.orderAMeal);
router.put('/:id', _authMiddleware.default, _order.default.updateAnOrder);
var _default = router;
exports.default = _default;