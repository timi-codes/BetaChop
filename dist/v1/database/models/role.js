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
    displayName: DataTypes.STRING,
    description: DataTypes.STRING,
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    }
  }, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    timestamps: true,
    paranoid: true,
    underscored: true
  });

  Role.associate = function (models) {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'Users'
    });
  };

  return Role;
};