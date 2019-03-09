"use strict";

module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    type: DataTypes.STRING
  });

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'User'
    });
    Order.belongsTo(models.User, {
      foreignKey: 'catererId',
      as: 'Caterer'
    });
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      as: 'Meal'
    });
  };

  return Order;
};