import OrderService from '../services/order.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();
/**
 * order controller performs controls  request and response -
 * order a meal,
 * modify a meal,
 * get all orders,
 */
const OrderController = {
  /**
   * @description retrieve and return all orders from our data
   * @param {object} req
   * @param {object} res
   * @returns {Array} order object array
   */
  fetchAllOrders(req, res) {
    const allOrders = OrderService.fetchAllOrders();
    response.setSuccess(200, null, allOrders);
    return response.send(res);
  },

  /**
   * @description order a meal
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  orderAMeal(req, res) {
    if (!req.body.mealId || !req.body.type) {
      response.setSuccess(400, 'All parameters are required', null);
      return response.send(res);
    }

    const { mealId, type } = req.body;

    if (Number.isNaN(Number(mealId))) {
      response.setError(400, 'Invalid mealId. mealId must be a number');
      return response.send(res);
    }

    const orderedMeal = OrderService.orderAMeal(mealId, type);

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
  updateAnOrder(req, res) {
    const { mealId, type } = req.body;
    const { id } = req.params;

    if (Number.isNaN(Number(id)) || Number.isNaN(Number(mealId))) {
      response.setError(400, "Invalid ID. ID's must be a number");
      return response.send(res);
    }

    const updateOrder = OrderService.updateAnOrder(id, mealId, type);

    if (updateOrder == null) {
      response.setError(400, `Order with id ${id} or Meal with id ${mealId} cannot be found`);
      return response.send(res);
    }
    response.setSuccess(201, 'Order was successfully updated', updateOrder);
    return response.send(res);
  },
};

export default OrderController;
