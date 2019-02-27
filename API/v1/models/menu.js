module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.DATE,
      default: Date(),
    },
  });

  Menu.associate = (models) => {
    Menu.hasMany(models.Meal, {
      foreignKey: 'mealId',
      as: 'todayMeal',
    });
  };

  return Menu;
};
