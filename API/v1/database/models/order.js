module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    type: DataTypes.STRING,
  });
  Order.associate = (models) => {
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      as: 'meal',
    });
  };
  return Order;
};
