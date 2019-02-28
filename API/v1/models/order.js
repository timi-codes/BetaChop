module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    type: {
      type: DataTypes.ENUM,
      values: ['breakfast', 'lunch', 'dinner'],
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.hasMany(models.Meal, {
      foreignKey: 'mealId',
    });
  };

  return Order;
};
