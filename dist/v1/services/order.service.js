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
 * order services performs all action related to order-
 * order a meal, modify an order, get all orders
 */
var OrderService =
/*#__PURE__*/
function () {
  function OrderService() {
    _classCallCheck(this, OrderService);
  }

  _createClass(OrderService, null, [{
    key: "fetchAllOrders",

    /**
     * @description Retrieve and return all orders from our dummyy data
     * @returns {Array} order object array
     */
    value: function () {
      var _fetchAllOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models.Order.findAll({
                  include: [{
                    model: _models.Meal,
                    as: 'meal',
                    where: {
                      availableToday: true
                    }
                  }],
                  attributes: {
                    exclude: ['mealId']
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

      function fetchAllOrders() {
        return _fetchAllOrders.apply(this, arguments);
      }

      return fetchAllOrders;
    }()
    /**
     * @description Order a meal
     * @returns {Array} order object array
     */

  }, {
    key: "orderAMeal",
    value: function () {
      var _orderAMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id, type) {
        var foundMeal;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models.Meal.findByPk(Number(id));

              case 3:
                foundMeal = _context2.sent;

                if (!foundMeal) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 7;
                return _models.Order.create({
                  type: type,
                  mealId: foundMeal.id
                });

              case 7:
                return _context2.abrupt("return", _context2.sent);

              case 8:
                return _context2.abrupt("return", foundMeal);

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function orderAMeal(_x, _x2) {
        return _orderAMeal.apply(this, arguments);
      }

      return orderAMeal;
    }()
    /**
     * @description Updates an existing order with a new order object
     * @param { int } id
     * @param {object} updatedOrder
     * @returns {object} updated order
     */

  }, {
    key: "updateAnOrder",
    value: function () {
      var _updateAnOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(orderId, mealId, type) {
        var foundOrder, newMeal;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models.Order.findByPk(Number(orderId));

              case 3:
                foundOrder = _context3.sent;
                _context3.next = 6;
                return _models.Meal.findByPk(Number(mealId));

              case 6:
                newMeal = _context3.sent;

                if (!(foundOrder && newMeal)) {
                  _context3.next = 11;
                  break;
                }

                _context3.next = 10;
                return _models.Order.update({
                  mealId: newMeal.id,
                  type: type
                }, {
                  where: {
                    id: Number(orderId)
                  }
                });

              case 10:
                return _context3.abrupt("return", _context3.sent);

              case 11:
                return _context3.abrupt("return", null);

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 14]]);
      }));

      function updateAnOrder(_x3, _x4, _x5) {
        return _updateAnOrder.apply(this, arguments);
      }

      return updateAnOrder;
    }()
  }]);

  return OrderService;
}();

var _default = OrderService;
exports.default = _default;