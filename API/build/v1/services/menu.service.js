"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyData = _interopRequireDefault(require("../utils/dummyData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * menu services performs all action related to menu-
 * fetch menu for the day and setup menu for the day
 */
var MenuService = {
  /**
   * @description Setup the meal for the day
   * @returns {Array} menu object array
   */
  setUpMenu: function setUpMenu(id) {
    var foundMeal = _dummyData.default.meals.find(function (meal) {
      return meal.id === Number(id);
    });

    if (foundMeal) {
      foundMeal.available = true; // checks if meal has already been added to menulist

      var isAdded = _dummyData.default.menu.find(function (meal) {
        return meal.id === Number(id);
      });

      if (isAdded) {
        return 'Meal has already been added to menu list';
      }

      _dummyData.default.menu.push(foundMeal);
    }

    return foundMeal;
  },

  /**
   * @description Retrieve and return all menu from our dummyy data
   * @returns {Array} menu object array
   */
  fetchMenu: function fetchMenu() {
    return _dummyData.default.menu.filter(function (meal) {
      return meal.available === true;
    });
  }
};
var _default = MenuService;
exports.default = _default;