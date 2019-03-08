"use strict";

var bcrypt = require('bcrypt');

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'Timi David',
      email: 'timitejumola@gmail.com',
      roleId: 1,
      password: bcrypt.hashSync('password', 15)
    }, {
      username: 'White House',
      email: 'whitehouse@gmail.com',
      roleId: 2,
      password: bcrypt.hashSync('password', 15)
    }], {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};