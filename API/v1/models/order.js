"use strict";

module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    type: {
      type: DataTypes.ENUM,
      values: ['breakfast', 'lunch', 'dinner'],
      allowNull: false
    }
  });

  Order.associate = function (models) {
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE'
    });
  };

  return Order;
};