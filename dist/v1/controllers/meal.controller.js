"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _meal = _interopRequireDefault(require("../services/meal.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var response = new _ResponseGenerator.default();
/**
 * caterer meal controller performs controls  request and response -
 * fetching all meal,
 * adding a new meal,
 * updating an existing meal and
 * getting a particular meal
 */

var MealController =
/*#__PURE__*/
function () {
  function MealController() {
    (0, _classCallCheck2.default)(this, MealController);
  }

  (0, _createClass2.default)(MealController, null, [{
    key: "fetchAllMeals",

    /**
     * @description retrieve and return all meals that
     * belongs to the currently logged in user
     * @param {object} req
     * @param {object} res
     * @returns {Array} meal object
     */
    value: function () {
      var _fetchAllMeals = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(req, res) {
        var userId, allMeals;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                userId = req.token.userId;
                _context.next = 4;
                return _meal.default.fetchAllMeals(userId);

              case 4:
                allMeals = _context.sent;

                if (allMeals.length === 0) {
                  response.setSuccess(200, 'No meal found!');
                } else {
                  response.setSuccess(200, 'Meals was successfully fetched!', allMeals);
                }

                return _context.abrupt("return", response.send(res));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                response.setError(400, _context.t0);
                return _context.abrupt("return", response.send(res));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      function fetchAllMeals(_x, _x2) {
        return _fetchAllMeals.apply(this, arguments);
      }

      return fetchAllMeals;
    }()
    /**
     * @description create a meal record with the id of the curently logged in user
     * @param {object} req
     * @param {object} res
     * @returns {object} apiResponse
     */

  }, {
    key: "addAMeal",
    value: function () {
      var _addAMeal = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(req, res) {
        var newMeal, userId, createdMeal;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!req.body.name || !req.body.price || !req.body.size || !req.body.imageUrl)) {
                  _context2.next = 3;
                  break;
                }

                response.setError(400, 'All parameters are required');
                return _context2.abrupt("return", response.send(res));

              case 3:
                newMeal = req.body;
                userId = req.token.userId;
                newMeal.catererId = userId;
                _context2.prev = 6;
                _context2.next = 9;
                return _meal.default.addAMeal(newMeal);

              case 9:
                createdMeal = _context2.sent;
                response.setSuccess(201, 'Meal successfully added!', createdMeal);
                return _context2.abrupt("return", response.send(res));

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](6);
                response.setError(400, _context2.t0.message);
                return _context2.abrupt("return", response.send(res));

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[6, 14]]);
      }));

      function addAMeal(_x3, _x4) {
        return _addAMeal.apply(this, arguments);
      }

      return addAMeal;
    }()
    /**
     * @description update a meal record belong to the currently logged in user
     * @param {object} req
     * @param {object} res
     * @returns {object} apiResponse
     */

  }, {
    key: "updateAMeal",
    value: function () {
      var _updateAMeal = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(req, res) {
        var newMeal, id, userId, updateMeal;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                newMeal = req.body;
                id = req.params.id;
                userId = req.token.userId;

                if (!Number.isNaN(Number(id))) {
                  _context3.next = 6;
                  break;
                }

                response.setSuccess(400, 'Invalid ID. ID must be a number');
                return _context3.abrupt("return", response.send(res));

              case 6:
                _context3.prev = 6;
                _context3.next = 9;
                return _meal.default.updateAMeal(id, newMeal, userId);

              case 9:
                updateMeal = _context3.sent;

                if (updateMeal === null) {
                  response.setError(400, "Meal with id ".concat(id, " cannot be found"));
                } else {
                  response.setSuccess(200, 'Meal was successfully updated', updateMeal);
                }

                return _context3.abrupt("return", response.send(res));

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](6);
                response.setError(400, _context3.t0);
                return _context3.abrupt("return", response.send(res));

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[6, 14]]);
      }));

      function updateAMeal(_x5, _x6) {
        return _updateAMeal.apply(this, arguments);
      }

      return updateAMeal;
    }()
    /**
     * @description get a specific meal belonging to the currently logged in user
     * @param {object} req
     * @param {object} res
     * @returns {object} found meal
     */

  }, {
    key: "getAMeal",
    value: function () {
      var _getAMeal = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(req, res) {
        var id, userId, foundMeal;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = req.params.id;
                userId = req.token.userId;

                if (!Number.isNaN(Number(id))) {
                  _context4.next = 5;
                  break;
                }

                response.setError(400, 'Invalid ID. ID must be a number');
                return _context4.abrupt("return", response.send(res));

              case 5:
                _context4.prev = 5;
                _context4.next = 8;
                return _meal.default.getAMeal(id, userId);

              case 8:
                foundMeal = _context4.sent;

                if (foundMeal === null) {
                  response.setError(404, 'Meal cannot be found');
                } else {
                  response.setSuccess(200, null, foundMeal);
                }

                return _context4.abrupt("return", response.send(res));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](5);
                response.setError(400, _context4.t0);
                return _context4.abrupt("return", response.send(res));

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 13]]);
      }));

      function getAMeal(_x7, _x8) {
        return _getAMeal.apply(this, arguments);
      }

      return getAMeal;
    }()
    /**
     * @description delete a specific meal belonging to the currently logged in user
     * @param {object} req
     * @param {object} res
     * @returns {object} response
     */

  }, {
    key: "deleteAMeal",
    value: function () {
      var _deleteAMeal = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(req, res) {
        var id, userId, deletedRecord;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;
                userId = req.token.userId;

                if (!Number.isNaN(Number(id))) {
                  _context5.next = 5;
                  break;
                }

                response.setError(400, 'Invalid ID. ID must be a number');
                return _context5.abrupt("return", response.send(res));

              case 5:
                _context5.prev = 5;
                _context5.next = 8;
                return _meal.default.deleteAMeal(id, userId);

              case 8:
                deletedRecord = _context5.sent;

                if (deletedRecord === 1) {
                  response.setSuccess(200, 'Meal was successfully deleted');
                } else {
                  response.setError(404, "Meal with id ".concat(id, " cannot be found"));
                }

                return _context5.abrupt("return", response.send(res));

              case 13:
                _context5.prev = 13;
                _context5.t0 = _context5["catch"](5);
                response.setError(400, _context5.t0);
                return _context5.abrupt("return", response.send(res));

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[5, 13]]);
      }));

      function deleteAMeal(_x9, _x10) {
        return _deleteAMeal.apply(this, arguments);
      }

      return deleteAMeal;
    }()
  }]);
  return MealController;
}();

var _default = MealController;
exports.default = _default;