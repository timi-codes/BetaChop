"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyData = _interopRequireDefault(require("../utils/dummyData"));

var _order = _interopRequireDefault(require("../models/order.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * order services performs all action related to order-
 * order a meal, modify an order, get all orders
 */
var OrderService = {
  /**
   * @description Retrieve and return all orders from our dummyy data
   * @returns {Array} order object array
   */
  fetchAllOrders: function fetchAllOrders() {
    return _dummyData.default.orders.map(function (order) {
      var newOrder = new _order.default();
      newOrder.id = order.id;
      newOrder.type = order.type;
      newOrder.meal = order.meal;
      return newOrder;
    });
  },

  /**
   * @description Order a meal
   * @returns {Array} order object array
   */
  orderAMeal: function orderAMeal(id, type) {
    var foundMeal = _dummyData.default.menu.find(function (meal) {
      return meal.id === Number(id);
    });

    if (foundMeal) {
      var orderLength = _dummyData.default.orders.length;
      var lastId = _dummyData.default.orders[orderLength - 1].id;
      var newId = lastId + 1;
      var newOrder = new _order.default();
      newOrder.id = newId;
      newOrder.type = type;
      newOrder.meal = foundMeal;

      _dummyData.default.orders.push(newOrder);

      return newOrder;
    }

    return foundMeal;
  },

  /**
   * @description Updates an existing order with a new order object
   * @param { int } id
   * @param {object} updatedOrder
   * @returns {object} updated order
   */
  updateAnOrder: function updateAnOrder(orderId, mealId, type) {
    var foundOrder = _dummyData.default.orders.find(function (order) {
      return order.id === Number(orderId);
    });

    var newMeal = _dummyData.default.menu.find(function (meal) {
      return meal.id === Number(mealId);
    });

    if (foundOrder && newMeal) {
      foundOrder.type = type;
      foundOrder.meal = newMeal;
      return foundOrder;
    }

    return null;
  }
};
var _default = OrderService;
exports.default = _default;