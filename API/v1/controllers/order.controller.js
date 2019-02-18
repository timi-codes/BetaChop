import OrderService from '../services/order.service';

/**
 * order controller performs controls  request and response -
 * order a meal,
 * modify a meal,
 * get all orders,
 */
const OrderController = {
  /**
   * @description order a meal
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  orderAMeal(req, res) {
    if (!req.body.mealId || !req.body.type) {
      return res.status(400).send({
        status: 'error',
        message: 'All parameters are required',
      });
    }

    const { mealId, type } = req.body;

    const orderedMeal = OrderService.orderAMeal(mealId, type);

    if (orderedMeal == null) {
      return res.status(200).json({
        status: 'error',
        message: 'This meal cannot be found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Your order has been placed',
      order: orderedMeal,
    });
  },
};

export default OrderController;
