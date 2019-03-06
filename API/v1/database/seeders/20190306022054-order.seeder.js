module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Orders',
    [
      {
        mealId: 3,
        type: 'breakfast',
      },
      {
        mealId: 1,
        type: 'dinner',
      },
      {
        mealId: 2,
        type: 'lunch',
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Orders', null, {}),
};
