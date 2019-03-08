"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _order = _interopRequireDefault(require("../services/order.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var response = new _ResponseGenerator.default();
/**
 * order controller performs controls  request and response -
 * order a meal,
 * modify a meal,
 * get all orders,
 */

var OrderController =
/*#__PURE__*/
function () {
  function OrderController() {
    (0, _classCallCheck2.default)(this, OrderController);
  }

  (0, _createClass2.default)(OrderController, null, [{
    key: "fetchAllOrders",

    /**
     * @description retrieve and return all orders from our data
     * @param {object} req
     * @param {object} res
     * @returns {Array} order object array
     */
    value: function fetchAllOrders(req, res) {
      var allOrders = _order.default.fetchAllOrders();

      return allOrders.then(function (meals) {
        if (meals.length === 0) {
          response.setSuccess(200, 'No order found!');
        } else {
          response.setSuccess(200, 'Order was successfully fetched!', meals);
        }

        response.send(res);
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }
    /**
     * @description order a meal
     * @param {object} req
     * @param {object} res
     * @returns {object} apiResponse
     */

  }, {
    key: "orderAMeal",
    value: function orderAMeal(req, res) {
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

      return orderedMeal.then(function (order) {
        if (order == null) {
          response.setError(404, 'This meal cannot be found');
        } else {
          response.setSuccess(200, 'Your order has been placed', order);
        }

        response.send(res);
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }
    /**
     * @description update an order record
     * @param {object} req
     * @param {object} res
     * @returns {object} apiResponse
     */

  }, {
    key: "updateAnOrder",
    value: function updateAnOrder(req, res) {
      var _req$body2 = req.body,
          mealId = _req$body2.mealId,
          type = _req$body2.type;
      var id = req.params.id;

      if (Number.isNaN(Number(id)) || Number.isNaN(Number(mealId))) {
        response.setError(400, "Invalid ID. ID's must be a number");
        return response.send(res);
      }

      var updateOrder = _order.default.updateAnOrder(id, mealId, type);

      return updateOrder.then(function (order) {
        if (order === 'string') {
          var orderMessage = order;
          response.setSuccess(200, orderMessage);
        } else if (order === null || order === 0) {
          response.setError(400, "Order with id ".concat(id, " or Meal with id ").concat(mealId, " cannot be found"));
        } else {
          response.setSuccess(201, 'Order was successfully updated');
        }

        response.send(res);
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }
  }]);
  return OrderController;
}();

var _default = OrderController;
exports.default = _default;