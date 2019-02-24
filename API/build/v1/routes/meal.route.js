"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _meal = _interopRequireDefault(require("../controllers/meal.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get('/', _meal.default.fetchAllMeals);
router.post('/', _meal.default.addAMeal);
router.get('/:id', _meal.default.getAMeal);
router.put('/:id', _meal.default.updateAMeal);
router.delete('/:id', _meal.default.deleteAMeal);
var _default = router;
exports.default = _default;