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

var _models = _interopRequireDefault(require("../database/models"));

/**
 * meal services performs all action related to meal - fetching all meal, adding a new meal,
 *  updating an existing meal and getting a particular meal
 */
var MealService =
/*#__PURE__*/
function () {
  function MealService() {
    (0, _classCallCheck2.default)(this, MealService);
  }

  (0, _createClass2.default)(MealService, null, [{
    key: "fetchAllMeals",

    /**
     * @description Retrieve and return all meals belong to the authenticated   c aterer
     * @returns {Array} of meal or throw error
     */
    value: function () {
      var _fetchAllMeals = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(catererId) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models.default.Meal.findAll({
                  where: {
                    catererId: catererId
                  }
                });

              case 3:
                return _context.abrupt("return", _context.sent);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function fetchAllMeals(_x) {
        return _fetchAllMeals.apply(this, arguments);
      }

      return fetchAllMeals;
    }()
    /**
     * @description Takes a new meal object
     * @param {object} meal
     * @returns {object} created meal
     */

  }, {
    key: "addAMeal",
    value: function () {
      var _addAMeal = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(newMeal) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models.default.Meal.create(newMeal);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function addAMeal(_x2) {
        return _addAMeal.apply(this, arguments);
      }

      return addAMeal;
    }()
    /**
     * @description Updates a meal belonging to the currently logged in caterer
     * @param { int } id
     * @param {object} updatedMeal
     * @returns {object} foundMeal
     */

  }, {
    key: "updateAMeal",
    value: function () {
      var _updateAMeal = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee3(id, updatedMeal, catererId) {
        var foundMeal;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models.default.Meal.findOne({
                  where: {
                    id: Number(id),
                    catererId: catererId
                  }
                });

              case 3:
                foundMeal = _context3.sent;

                if (!foundMeal) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 7;
                return _models.default.Meal.update(updatedMeal, {
                  where: {
                    id: Number(id)
                  }
                });

              case 7:
                return _context3.abrupt("return", updatedMeal);

              case 8:
                return _context3.abrupt("return", null);

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));

      function updateAMeal(_x3, _x4, _x5) {
        return _updateAMeal.apply(this, arguments);
      }

      return updateAMeal;
    }()
    /**
     * @description Finds a meal record belonging to the currently logged in caterer
     * @param { int } id
     * @returns {object} foundMeal
     */

  }, {
    key: "getAMeal",
    value: function () {
      var _getAMeal = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4(id, catererId) {
        var foundMeal;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _models.default.Meal.findOne({
                  where: {
                    id: Number(id),
                    catererId: catererId
                  }
                });

              case 3:
                foundMeal = _context4.sent;
                return _context4.abrupt("return", foundMeal);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function getAMeal(_x6, _x7) {
        return _getAMeal.apply(this, arguments);
      }

      return getAMeal;
    }()
    /**
     * @description Delete a meal record belonging to the currently logged in caterer
     * @param { int } id
     * @returns {object} meal
     */

  }, {
    key: "deleteAMeal",
    value: function () {
      var _deleteAMeal = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee5(id, catererId) {
        var foundMeal, deleteRecord;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _models.default.Meal.findOne({
                  where: {
                    id: Number(id),
                    catererId: catererId
                  }
                });

              case 3:
                foundMeal = _context5.sent;

                if (!foundMeal) {
                  _context5.next = 9;
                  break;
                }

                _context5.next = 7;
                return _models.default.Meal.destroy({
                  where: {
                    id: Number(id),
                    catererId: catererId
                  }
                });

              case 7:
                deleteRecord = _context5.sent;
                return _context5.abrupt("return", deleteRecord);

              case 9:
                return _context5.abrupt("return", 0);

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 12]]);
      }));

      function deleteAMeal(_x8, _x9) {
        return _deleteAMeal.apply(this, arguments);
      }

      return deleteAMeal;
    }()
  }]);
  return MealService;
}();

var _default = MealService;
exports.default = _default;