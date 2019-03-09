"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    }
  });

  User.associate = function (models) {
    User.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'Role'
    });
    User.hasMany(models.Meal, {
      foreignKey: 'catererId',
      as: 'Meals'
    });
  };

  return User;
};