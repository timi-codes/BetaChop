"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Orders', [{
      mealId: 3,
      type: 'breakfast',
      userId: 1,
      catererId: 2
    }, {
      mealId: 1,
      type: 'dinner',
      userId: 1,
      catererId: 2
    }, {
      mealId: 2,
      type: 'lunch',
      userId: 1,
      catererId: 2
    }], {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Orders', null, {});
  }
};