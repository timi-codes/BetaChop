"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Meals', [{
      name: 'Amala & Okro',
      size: 'medium',
      price: '300',
      imageUrl: 'amalaokro.png',
      availableToday: false,
      userId: 2
    }, {
      name: 'Jollof Rice',
      size: 'medium',
      price: '400',
      imageUrl: 'jollofrice.png',
      availableToday: false,
      userId: 2
    }, {
      name: 'Sea Food Okro',
      size: 'medium',
      price: '2000',
      imageUrl: 'seafoodokro.png',
      availableToday: true,
      userId: 2
    }, {
      name: 'Amala & Okro',
      size: 'medium',
      price: '300',
      imageUrl: 'amalaokro.png',
      availableToday: false,
      userId: 1
    }], {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Meals', null, {});
  }
};