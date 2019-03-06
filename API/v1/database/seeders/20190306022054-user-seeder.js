module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstname: 'David',
        lastname: 'Tejumola',
        email: 'timitejumola@gmail.com',
        roleId: 1,
        password: '$2y$15$tyI.j/uh0oLqaCuGryIMm.5vZr.9bHmlo039.cnQ8Yx9l7bO7lfKC',
      },
      {
        firstname: 'Solomon',
        lastname: 'Oga',
        email: 'whitehouse@gmail.com',
        roleId: 2,
        password: '$2y$15$tyI.j/uh0oLqaCuGryIMm.5vZr.9bHmlo039.cnQ8Yx9l7bO7lfKC',
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
