"use strict";

module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    type: DataTypes.STRING
  });

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Order.belongsTo(models.User, {
      foreignKey: 'catererId',
      as: 'caterer'
    });
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      as: 'meal'
    });
  };

  return Order;
};