"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _order = _interopRequireDefault(require("../controllers/order.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get('/', _order.default.fetchAllOrders);
router.post('/', _order.default.orderAMeal);
router.put('/:id', _order.default.updateAnOrder);
var _default = router;
exports.default = _default;