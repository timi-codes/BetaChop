const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'David',
        lastname: 'Tejumola',
        email: 'timitejumola@gmail.com',
        roleId: 1,
        password: bcrypt.hashSync('password', 15),
      },
      {
        firstname: 'Solomon',
        lastname: 'Oga',
        email: 'whitehouse@gmail.com',
        roleId: 2,
        password: bcrypt.hashSync('password', 15),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
