module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    type: {
      type: DataTypes.ENUM,
      values: ['breakfast', 'lunch', 'dinner'],
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE',
    });
  };

  return Order;
};
