module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define(
    'Meal',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: DataTypes.STRING,
      price: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {},
  );

  Meal.associate = (models) => {
    // TO DO : associate methods
  };

  return Meal;
};
