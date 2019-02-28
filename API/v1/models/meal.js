"use strict";

module.exports = function (sequelize, DataTypes) {
  var Meal = sequelize.define('Meal', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: DataTypes.STRING,
    price: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});

  Meal.associate = function (models) {// TO DO : associate methods
  };

  return Meal;
};