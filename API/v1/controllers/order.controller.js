import OrderService from '../services/order.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();
/**
 * order controller performs controls  request and response -
 * order a meal,
 * modify a meal,
 * get all orders,
 */
class OrderController {
  /**
   * @description retrieve and return all orders from our data
   * @param {object} req
   * @param {object} res
   * @returns {Array} order object array
   */
  static fetchAllOrders(req, res) {
    const { userId } = req.token;
    const allOrders = OrderService.fetchAllOrders(userId);
    return allOrders
      .then((meals) => {
        if (meals.length === 0) {
          response.setSuccess(200, 'No order found!');
        } else {
          response.setSuccess(200, 'Order was successfully fetched!', meals);
        }
        response.send(res);
      })
      .catch((error) => {
        response.setError(400, error.message);
        return response.send(res);
      });
  }

  /**
   * @description order a meal
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  static orderAMeal(req, res) {
    const { userId } = req.token;
    const { mealId, type, catererId } = req.body;

    if (!req.body.mealId || !req.body.type || !req.body.catererId) {
      response.setSuccess(400, 'All parameters are required(mealId,type,catererId)', null);
      return response.send(res);
    }

    if (Number.isNaN(Number(mealId))) {
      response.setError(400, 'Invalid mealId. mealId must be a number');
      return response.send(res);
    }

    const orderedMeal = OrderService.orderAMeal(mealId, type, userId, catererId);

    return orderedMeal
      .then((order) => {
        if (order == null) {
          response.setError(404, 'This meal cannot be found');
        } else {
          response.setSuccess(200, 'Your order has been placed', order);
        }
        response.send(res);
      })
      .catch((error) => {
        response.setError(400, error.message);
        return response.send(res);
      });
  }

  /**
   * @description update an order record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  static async updateAnOrder(req, res) {
    const { mealId, type } = req.body;
    const { id } = req.params;

    if (Number.isNaN(Number(id)) || Number.isNaN(Number(mealId))) {
      response.setError(400, "Invalid ID. ID's must be a number");
      return response.send(res);
    }

    try {
      const updateOrder = await OrderService.updateAnOrder(id, mealId, type);

      if (updateOrder === null || updateOrder === 0) {
        response.setError(400, `Order with id ${id} or Meal with id ${mealId} cannot be found`);
      } else {
        response.setSuccess(201, 'Order was successfully updated');
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error.message);
      return response.send(res);
    }
  }
}

export default OrderController;
