module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.DATE,
    },
  });

  Menu.associate = (models) => {
    Menu.hasMany(models.Meal, {
      foreignKey: 'availableDate',
      sourceKey: 'date',
      as: 'todayMeal',
    });
  };

  return Menu;
};
