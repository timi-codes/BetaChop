import dummyData from '../utils/dummyData';
// import Order from '../models/order.model';

// /**
//  * order services performs all action related to order-
//  * order a meal, modify an order, get all orders
//  */
// const OrderService = {
//   /**
//    * @description Retrieve and return all orders from our dummyy data
//    * @returns {Array} order object array
//    */
//   fetchAllOrders() {
//     return dummyData.orders.map((order) => {
//       const newOrder = new Order();
//       newOrder.id = order.id;
//       newOrder.type = order.type;
//       newOrder.meal = order.meal;
//       return newOrder;
//     });
//   },

//   /**
//    * @description Order a meal
//    * @returns {Array} order object array
//    */
//   orderAMeal(id, type) {
//     const foundMeal = dummyData.menu.find(meal => meal.id === Number(id));

//     if (foundMeal) {
//       const orderLength = dummyData.orders.length;
//       const lastId = dummyData.orders[orderLength - 1].id;
//       const newId = lastId + 1;

//       const newOrder = new Order();
//       newOrder.id = newId;
//       newOrder.type = type;
//       newOrder.meal = foundMeal;
//       dummyData.orders.push(newOrder);

//       return newOrder;
//     }

//     return foundMeal;
//   },

//   /**
//    * @description Updates an existing order with a new order object
//    * @param { int } id
//    * @param {object} updatedOrder
//    * @returns {object} updated order
//    */
//   updateAnOrder(orderId, mealId, type) {
//     const foundOrder = dummyData.orders.find(order => order.id === Number(orderId));
//     const newMeal = dummyData.menu.find(meal => meal.id === Number(mealId));

//     if (foundOrder && newMeal) {
//       foundOrder.type = type;
//       foundOrder.meal = newMeal;
//       return foundOrder;
//     }
//     return null;
//   },
// };

// export default OrderService;
