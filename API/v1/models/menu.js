"use strict";

module.exports = function (sequelize, DataTypes) {
  var Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.DATE,
      default: Date()
    }
  });

  Menu.associate = function (models) {
    Menu.hasMany(models.Meal, {
      foreignKey: 'mealId',
      as: 'todayMeal'
    });
  };

  return Menu;
};