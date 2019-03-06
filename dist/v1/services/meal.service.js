"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../database/models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * meal services performs all action related to meal - fetching all meal, adding a new meal,
 *  updating an existing meal and getting a particular meal
 */
var MealService =
/*#__PURE__*/
function () {
  function MealService() {
    _classCallCheck(this, MealService);
  }

  _createClass(MealService, null, [{
    key: "fetchAllMeals",

    /**
     * @description Retrieve and return all meals
     * @returns {Array} of meal or throw error
     */
    value: function () {
      var _fetchAllMeals = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models.Meal.findAll();

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

      function fetchAllMeals() {
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
      var _addAMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(newMeal) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models.Meal.create(newMeal);

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

      function addAMeal(_x) {
        return _addAMeal.apply(this, arguments);
      }

      return addAMeal;
    }()
    /**
     * @description Updates a meal
     * @param { int } id
     * @param {object} updatedMeal
     * @returns {object} foundMeal
     */

  }, {
    key: "updateAMeal",
    value: function () {
      var _updateAMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id, updatedMeal) {
        var foundMeal;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models.Meal.findByPk(Number(id));

              case 3:
                foundMeal = _context3.sent;

                if (!foundMeal) {
                  _context3.next = 8;
                  break;
                }

                _context3.next = 7;
                return _models.Meal.update(updatedMeal, {
                  where: {
                    id: Number(id)
                  }
                });

              case 7:
                return _context3.abrupt("return", updatedMeal);

              case 8:
                return _context3.abrupt("return", foundMeal);

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

      function updateAMeal(_x2, _x3) {
        return _updateAMeal.apply(this, arguments);
      }

      return updateAMeal;
    }()
    /**
     * @description Finds a meal record
     * @param { int } id
     * @returns {object} foundMeal
     */

  }, {
    key: "getAMeal",
    value: function () {
      var _getAMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(id) {
        var foundMeal;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _models.Meal.findByPk(Number(id));

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

      function getAMeal(_x4) {
        return _getAMeal.apply(this, arguments);
      }

      return getAMeal;
    }()
    /**
     * @description Delete a meal record
     * @param { int } id
     * @returns {object} meal
     */

  }, {
    key: "deleteAMeal",
    value: function () {
      var _deleteAMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id) {
        var foundMeal, deleteRecord;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _models.Meal.findByPk(Number(id));

              case 3:
                foundMeal = _context5.sent;

                if (!foundMeal) {
                  _context5.next = 9;
                  break;
                }

                _context5.next = 7;
                return _models.Meal.destroy({
                  where: {
                    id: Number(id)
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

      function deleteAMeal(_x5) {
        return _deleteAMeal.apply(this, arguments);
      }

      return deleteAMeal;
    }()
  }]);

  return MealService;
}();

var _default = MealService;
exports.default = _default;