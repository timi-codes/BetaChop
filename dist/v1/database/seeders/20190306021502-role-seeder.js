"use strict";

var now = new Date();
module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      name: 'user',
      description: 'The role for the regular users',
      createdAt: now,
      updatedAt: now
    }, {
      name: 'caterer',
      description: 'The role for the caterers',
      createdAt: now,
      updatedAt: now
    }], {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};