module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      imageUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      availableDate: {
        type: Sequelize.DATE,
        onDelete: 'CASCADE',
        references: {
          model: 'Menus',
          key: 'date',
          as: 'availableDate',
        },
      },
    });
  },
  down: function down(queryInterface /** , Sequelize */) {
    return queryInterface.dropTable('Meals');
  },
};
