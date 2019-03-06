"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meal = _interopRequireDefault(require("../services/meal.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var response = new _ResponseGenerator.default();
/**
 * meal controller performs controls  request and response -
 * fetching all meal,
 * adding a new meal,
 * updating an existing meal and
 * getting a particular meal
 */

var MealController =
/*#__PURE__*/
function () {
  function MealController() {
    _classCallCheck(this, MealController);
  }

  _createClass(MealController, null, [{
    key: "fetchAllMeals",

    /**
     * @description retrieve and return all meals from our data
     * @param {object} req
     * @param {object} res
     * @returns {Array} meal object array
     */
    value: function fetchAllMeals(req, res) {
      var allMeals = _meal.default.fetchAllMeals();

      return allMeals.then(function (meals) {
        if (meals.length === 0) {
          response.setSuccess(200, 'No meal found!');
        } else {
          response.setSuccess(200, 'Meals was successfully fetched!', meals);
        }

        response.send(res);
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }
    /**
     * @description create a meal record
     * @param {object} req
     * @param {object} res
     * @returns {object} apiResponse
     */

  }, {
    key: "addAMeal",
    value: function addAMeal(req, res) {
      if (!req.body.name || !req.body.price || !req.body.size || !req.body.imageUrl) {
        response.setError(400, 'All parameters are required');
        response.send(res);
      }

      var newMeal = req.body;

      var createdMeal = _meal.default.addAMeal(newMeal);

      return createdMeal.then(function (meal) {
        response.setSuccess(201, 'Meal successfully added!', meal);
        response.send(res);
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }
    /**
     * @description update a meal record
     * @param {object} req
     * @param {object} res
     * @returns {object} apiResponse
     */

  }, {
    key: "updateAMeal",
    value: function updateAMeal(req, res) {
      var newMeal = req.body;
      var id = req.params.id;

      if (Number.isNaN(Number(id))) {
        response.setSuccess(400, 'Invalid ID. ID must be a number');
        response.send(res);
      }

      var updateMeal = _meal.default.updateAMeal(id, newMeal);

      return updateMeal.then(function (meal) {
        if (meal === null) {
          response.setError(400, "Meal with id ".concat(id, " cannot be found"));
          response.send(res);
        }

        response.setSuccess(200, 'Meal was successfully updated', meal);
        response.send(res);
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }
    /**
     * @description get a specific meal
     * @param {object} req
     * @param {object} res
     * @returns {object} found meal
     */

  }, {
    key: "getAMeal",
    value: function getAMeal(req, res) {
      var id = req.params.id;

      if (Number.isNaN(Number(id))) {
        response.setError(400, 'Invalid ID. ID must be a number');
        response.send(res);
      }

      var foundMeal = _meal.default.getAMeal(id);

      foundMeal.then(function (meal) {
        if (meal === null) {
          response.setError(404, 'Meal cannot be found');
          response.send(res);
        }

        response.setSuccess(200, null, meal);
        response.send(res);
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }
    /**
     * @description get a specific meal
     * @param {object} req
     * @param {object} res
     * @returns {object} response
     */

  }, {
    key: "deleteAMeal",
    value: function deleteAMeal(req, res) {
      var id = req.params.id;

      if (Number.isNaN(Number(id))) {
        response.setError(400, 'Invalid ID. ID must be a number');
        response.send(res);
      }

      var deletedMeal = _meal.default.deleteAMeal(id);

      deletedMeal.then(function (deletedRecord) {
        if (deletedRecord === 1) {
          response.setSuccess(200, 'Meal was successfully deleted');
        } else {
          response.setError(404, "Meal with id ".concat(id, " cannot be found"));
        }

        response.send(res);
      }).catch(function (error) {
        return res.status(500).send(error.message);
      });
    }
  }]);

  return MealController;
}();

var _default = MealController;
exports.default = _default;