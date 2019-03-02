module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: DataTypes.STRING,
    price: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  });

  Meal.associate = (models) => {
    Meal.belongsTo(models.Menu, {
      onDelete: 'CASCADE',
      foreignKey: 'availableDate',
      targetKey: 'date',
    });
  };

  Meal.removeAttribute('id');
  return Meal;
};
