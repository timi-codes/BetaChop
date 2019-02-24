"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meal = _interopRequireDefault(require("../services/meal.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var response = new _ResponseGenerator.default();
/**
 * meal controller performs controls  request and response -
 * fetching all meal,
 * adding a new meal,
 * updating an existing meal and
 * getting a particular meal
 */

var MealController = {
  /**
   * @description retrieve and return all meals from our data
   * @param {object} req
   * @param {object} res
   * @returns {Array} meal object array
   */
  fetchAllMeals: function fetchAllMeals(req, res) {
    var allMeals = _meal.default.fetchAllMeals();

    response.setSuccess(200, '', allMeals);
    return response.send(res);
  },

  /**
   * @description create a meal record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  addAMeal: function addAMeal(req, res) {
    if (!req.body.name || !req.body.price || !req.body.size) {
      response.setError(400, 'All parameters are required');
      return response.send(res);
    }

    var newMeal = req.body;

    var createdMeal = _meal.default.addAMeal(newMeal);

    response.setSuccess(201, 'Meal successfully added!', createdMeal);
    return response.send(res);
  },

  /**
   * @description update a meal record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  updateAMeal: function updateAMeal(req, res) {
    var newMeal = req.body;
    var id = req.params.id;

    if (Number.isNaN(Number(id))) {
      response.setSuccess(400, 'Invalid ID. ID must be a number', null);
      return response.send(res);
    }

    var updateMeal = _meal.default.updateAMeal(id, newMeal);

    if (updateMeal == null) {
      response.setError(400, "Meal with id ".concat(id, " cannot be found"));
      return response.send(res);
    }

    response.setSuccess(200, 'Meal was successfully updated', updateMeal);
    return response.send(res);
  },

  /**
   * @description get a specific meal
   * @param {object} req
   * @param {object} res
   * @returns {object} found meal
   */
  getAMeal: function getAMeal(req, res) {
    var id = req.params.id;

    if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
      return response.send(res);
    }

    var foundMeal = _meal.default.getAMeal(id);

    var foundMealKeys = Object.keys(foundMeal);

    if (foundMealKeys.length === 0) {
      response.setError(404, 'Meal cannot be found');
      return response.send(res);
    }

    response.setSuccess(200, null, foundMeal);
    return response.send(res);
  },

  /**
   * @description get a specific meal
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  deleteAMeal: function deleteAMeal(req, res) {
    var id = req.params.id;

    var deletedMeal = _meal.default.deleteAMeal(id);

    if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
    } else if (deletedMeal == null) {
      response.setError(404, "Meal with id ".concat(id, " cannot be found"));
    } else {
      response.setSuccess(200, 'Meal was successfully deleted', null);
    }

    return response.send(res);
  }
};
var _default = MealController;
exports.default = _default;