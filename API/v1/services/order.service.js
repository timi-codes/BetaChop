import dummyData from '../utils/dummyData';
import Meal from '../models/meal.model';
import Order from '../models/order.model';

/**
 * order services performs all action related to order-
 * order a meal, modify an order, get all orders
 */
const OrderService = {
  /**
   * @description Order a meal
   * @returns {Array} order object array
   */
  orderAMeal(id, type) {
    const foundMeal = dummyData.meals.find(meal => meal.id === Number(id));

    if (foundMeal) {
      const orderLength = dummyData.orders.length;
      const lastId = dummyData.orders[orderLength - 1].id;
      const newId = lastId + 1;

      const newOrder = new Order();
      newOrder.id = newId;
      newOrder.type = type;
      newOrder.meal = foundMeal;
      dummyData.orders.push(newOrder);

      return newOrder;
    }

    return foundMeal;
  },
};

export default OrderService;
