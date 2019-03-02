module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
        unique: true,
      },
    });
  },
  down: function down(queryInterface) {
    return queryInterface.dropTable('Menus');
  },
};
