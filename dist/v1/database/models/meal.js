"use strict";

module.exports = function (sequelize, DataTypes) {
  var Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: DataTypes.STRING,
    price: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    availableToday: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Meal.associate = function (models) {
    Meal.hasMany(models.Order, {
      foreignKey: 'mealId',
      as: 'Orders'
    });
  };

  return Meal;
};