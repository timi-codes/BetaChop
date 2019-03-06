const now = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Roles',
    [
      {
        name: 'caterer',
        description: 'The role for the caterers',
        createdAt: now,
        updatedAt: now,
      },
      {
        name: 'user',
        description: 'The role for the regular users',
        createdAt: now,
        updatedAt: now,
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {}),
};
