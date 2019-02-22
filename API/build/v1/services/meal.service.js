"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyData = _interopRequireDefault(require("../utils/dummyData"));

var _meal = _interopRequireDefault(require("../models/meal.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * meal services performs all action related to meal - fetching all meal, adding a new meal,
 *  updating an existing meal and getting a particular meal
 */
var MealService = {
  /**
   * @description Retrieve and return all meals from our dunny data
   * @returns {Array} meal object array
   */
  fetchAllMeals: function fetchAllMeals() {
    return _dummyData.default.meals.map(function (meal) {
      var newMeal = new _meal.default();
      newMeal.id = meal.id;
      newMeal.name = meal.name;
      newMeal.size = meal.size;
      newMeal.price = meal.price;
      return newMeal;
    });
  },

  /**
   * @description Takes a new meal object and adds it our dummy data
   * @param {object} meal
   * @returns {object} meal
   */
  addAMeal: function addAMeal(meal) {
    var mealLength = _dummyData.default.meals.length;
    var lastId = _dummyData.default.meals[mealLength - 1].id;
    var newId = lastId + 1;
    var newMeal = meal;
    newMeal.id = newId;

    _dummyData.default.meals.push(newMeal);

    return meal;
  },

  /**
   * @description Updates an existing meal with a new meal object
   * @param { int } id
   * @param {object} updatedMeal
   * @returns {object} updated meal
   */
  updateAMeal: function updateAMeal(id, updatedMeal) {
    var foundMeal = _dummyData.default.meals.find(function (meal) {
      return meal.id === Number(id);
    });

    if (foundMeal) {
      foundMeal.name = updatedMeal.name;
      foundMeal.price = updatedMeal.price;
      foundMeal.size = updatedMeal.size;
    }

    return foundMeal;
  },

  /**
   * @description Finds a meal record from meal Dummy Data
   * @param { int } id
   * @returns {object} meal
   */
  getAMeal: function getAMeal(id) {
    var foundMeal = _dummyData.default.meals.find(function (meal) {
      return meal.id === Number(id);
    });

    return foundMeal || {};
  },

  /**
   * @description Delete a meal record from meal Dummy Data
   * @param { int } id
   * @returns {object} meal
   */
  deleteAMeal: function deleteAMeal(id) {
    var foundMeal = _dummyData.default.meals.find(function (meal) {
      return meal.id === Number(id);
    });

    if (foundMeal) {
      var index = _dummyData.default.meals.indexOf(foundMeal);

      if (index > -1) {
        _dummyData.default.meals.splice(index, 1);
      }
    }

    return foundMeal;
  }
};
var _default = MealService;
exports.default = _default;