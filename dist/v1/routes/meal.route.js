"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _meal = _interopRequireDefault(require("../controllers/meal.controller"));

var _authMiddleware = _interopRequireDefault(require("../middlewares/authMiddleware"));

var _permissionMiddleware = _interopRequireDefault(require("../middlewares/permissionMiddleware"));

var router = (0, _express.Router)();
router.get('/', _authMiddleware.default, _permissionMiddleware.default, _meal.default.fetchAllMeals);
router.post('/', _authMiddleware.default, _permissionMiddleware.default, _meal.default.addAMeal);
router.get('/:id', _authMiddleware.default, _permissionMiddleware.default, _meal.default.getAMeal);
router.put('/:id', _authMiddleware.default, _permissionMiddleware.default, _meal.default.updateAMeal);
router.delete('/:id', _authMiddleware.default, _permissionMiddleware.default, _meal.default.deleteAMeal);
var _default = router;
exports.default = _default;