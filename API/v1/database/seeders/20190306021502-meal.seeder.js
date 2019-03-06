module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Meals',
    [
      {
        name: 'Amala & Okro',
        size: 'medium',
        price: '300',
        imageUrl: 'amalaokro.png',
        availableToday: false,
      },
      {
        name: 'Jollof Rice',
        size: 'medium',
        price: '400',
        imageUrl: 'jollofrice.png',
        availableToday: false,
      },
      {
        name: 'Sea Food Okro',
        size: 'medium',
        price: '2000',
        imageUrl: 'seafoodokro.png',
        availableToday: true,
      },
      {
        name: 'Amala & Okro',
        size: 'medium',
        price: '300',
        imageUrl: 'amalaokro.png',
        availableToday: false,
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Meals', null, {}),
};
