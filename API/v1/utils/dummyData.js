export default {
  meals: [
    {
      id: 1,
      name: 'Jollof Rice',
      size: 'Medium',
      price: '500',
      available: true,
    },
    {
      id: 2,
      name: 'Fried Rice',
      size: 'Medium',
      price: '200',
      available: false,
    },
    {
      id: 3,
      name: 'Chicken & Chips',
      size: 'Large',
      price: '1500',
      available: false,
    },
    {
      id: 4,
      name: 'Eba',
      size: 'Medium',
      price: '300',
      available: false,
    },
    {
      id: 5,
      name: 'Semo',
      size: 'Small',
      price: '300',
      available: true,
    },
  ],

  orders: [
    {
      id: 1,
      type: 'lunch',
      meal: {
        id: 5,
        name: 'Semo',
        size: 'Small',
        price: '300',
      },
    },
    {
      id: 2,
      type: 'dinner',
      meal: {
        id: 2,
        name: 'Semo',
        size: 'Small',
        price: '300',
      },
    },
  ],

  menu: [],
};
