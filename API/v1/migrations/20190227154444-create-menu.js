module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Menus', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    mealId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Meals',
        key: 'id',
        as: 'mealId',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('Menus'),
};
