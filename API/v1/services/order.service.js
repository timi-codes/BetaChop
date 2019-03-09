import database from '../database/models';

/**
 * order services performs all action related to order-
 * order a meal, modify an order, get all orders
 */
class OrderService {
  /**
   * @description Retrieve and return all orders from our dummyy data
   * @returns {Array} order object array
   */
  static async fetchAllOrders(catererId) {
    try {
      return await database.Order.findAll({
        where: { catererId },
        include: [
          {
            model: database.Meal,
            as: 'meal',
            where: { availableToday: true },
          },
          {
            model: database.User,
            as: 'user',
            attributes: { exclude: ['catererId', 'password', 'roleId'] },
          },
        ],
        attributes: { exclude: ['mealId', 'catererId', 'userId'] },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Order a meal
   * @returns {Array} order object array
   */
  static async orderAMeal(id, type, userId, catererId) {
    try {
      const foundMeal = await database.Meal.findByPk(Number(id));

      if (foundMeal) {
        return await database.Order.create({
          type,
          mealId: foundMeal.id,
          userId,
          catererId,
        });
      }
      return foundMeal;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Updates an existing order with a new order object
   * @param { int } id
   * @param {object} updatedOrder
   * @returns {object} updated order
   */
  static async updateAnOrder(orderId, mealId, type) {
    try {
      const foundOrder = await database.Order.findByPk(Number(orderId));
      const newMeal = await database.Meal.findByPk(Number(mealId));

      if (foundOrder && newMeal && newMeal.availableToday) {
        return await database.Order.update(
          { mealId: newMeal.id, type },
          { where: { id: Number(orderId) } },
        );
      }
      if (!newMeal.availableToday && newMeal == null) {
        return "Meal is not available in today's menu";
      }
      return null;
    } catch (e) {
      throw e;
    }
  }
}

export default OrderService;
