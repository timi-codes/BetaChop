module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    type: DataTypes.STRING,
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Order.belongsTo(models.User, {
      foreignKey: 'catererId',
      as: 'caterer',
    });

    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      as: 'meal',
    });
  };
  return Order;
};
