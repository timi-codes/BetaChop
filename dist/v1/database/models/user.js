"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'roles'
    });
    User.hasMany(models.Meal, {
      foreignKey: 'userId',
      as: 'meals'
    });
  };

  return User;
};