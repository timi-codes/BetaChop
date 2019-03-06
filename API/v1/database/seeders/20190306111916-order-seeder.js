module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Orders',
    [
      {
        mealId: 3,
        type: 'breakfast',
        userId: 1,
        catererId: 2,
      },
      {
        mealId: 1,
        type: 'dinner',
        userId: 1,
        catererId: 2,
      },
      {
        mealId: 2,
        type: 'lunch',
        userId: 1,
        catererId: 2,
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Orders', null, {}),
};
