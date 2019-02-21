"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _order = _interopRequireDefault(require("../services/order.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var response = new _ResponseGenerator.default();
/**
 * order controller performs controls  request and response -
 * order a meal,
 * modify a meal,
 * get all orders,
 */

var OrderController = {
  /**
   * @description retrieve and return all orders from our data
   * @param {object} req
   * @param {object} res
   * @returns {Array} order object array
   */
  fetchAllOrders: function fetchAllOrders(req, res) {
    var allOrders = _order.default.fetchAllOrders();

    response.setSuccess(200, null, allOrders);
    return response.send(res);
  },

  /**
   * @description order a meal
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  orderAMeal: function orderAMeal(req, res) {
    if (!req.body.mealId || !req.body.type) {
      response.setSuccess(400, 'All parameters are required', null);
      return response.send(res);
    }

    var _req$body = req.body,
        mealId = _req$body.mealId,
        type = _req$body.type;

    if (Number.isNaN(Number(mealId))) {
      response.setError(400, 'Invalid mealId. mealId must be a number');
      return response.send(res);
    }

    var orderedMeal = _order.default.orderAMeal(mealId, type);

    if (orderedMeal == null) {
      response.setError(404, 'This meal cannot be found');
      return response.send(res);
    }

    response.setSuccess(200, 'Your order has been placed', orderedMeal);
    return response.send(res);
  },

  /**
   * @description update an order record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  updateAnOrder: function updateAnOrder(req, res) {
    var _req$body2 = req.body,
        mealId = _req$body2.mealId,
        type = _req$body2.type;
    var id = req.params.id;

    if (Number.isNaN(Number(id)) || Number.isNaN(Number(mealId))) {
      response.setError(400, "Invalid ID. ID's must be a number");
      return response.send(res);
    }

    var updateOrder = _order.default.updateAnOrder(id, mealId, type);

    if (updateOrder == null) {
      response.setError(400, "Order with id ".concat(id, " or Meal with id ").concat(mealId, " cannot be found"));
      return response.send(res);
    }

    response.setSuccess(201, 'Order was successfully updated', updateOrder);
    return response.send(res);
  }
};
var _default = OrderController;
exports.default = _default;