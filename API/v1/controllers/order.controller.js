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

  /**
   * @description update a order record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  updateAnOrder(req, res) {
    const { mealId, type } = req.body;
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid ID. ID must be a number',
      });
    }

    const updateOrder = OrderService.updateAnOrder(id, mealId, type);

    if (updateOrder == null) {
      return res.status(400).json({
        status: 'error',
        message: `Order with id ${id} or Meal with id ${mealId} cannot be found`,
      });
    }
    return res
      .json({
        status: 'success',
        message: 'Order was successfully updated',
        data: updateOrder,
      })
      .status(201);
  },
};

export default OrderController;
