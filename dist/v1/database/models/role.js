"use strict";

module.exports = function (sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'Users'
    });
  };

  return Role;
};