module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: DataTypes.STRING,
    price: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    availableToday: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  return Meal;
};
