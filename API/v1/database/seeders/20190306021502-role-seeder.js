const now = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Roles',
    [
      {
        name: 'user',
        description: 'The role for the regular users',
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'caterer',
        description: 'The role for the caterers',
        createdAt: now,
        updatedAt: now,
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {}),
};
