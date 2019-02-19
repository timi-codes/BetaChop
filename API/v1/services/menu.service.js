import dummyData from '../utils/dummyData';

/**
 * menu services performs all action related to menu-
 * fetch menu for the day and setup menu for the day
 */
const MenuService = {
  /**
   * @description Setup the meal for the day
   * @returns {Array} menu object array
   */
  setUpMenu(id) {
    const foundMeal = dummyData.meals.find(meal => meal.id === Number(id));

    if (foundMeal) {
      foundMeal.available = true;

      // checks if meal has already been added to menulist
      const isAdded = dummyData.menu.find(meal => meal.id === Number(id));

      if (isAdded) {
        return 'Meal has already been added to menu list';
      }
      dummyData.menu.push(foundMeal);
    }

    return foundMeal;
  },

  /**
   * @description Retrieve and return all menu from our dummyy data
   * @returns {Array} menu object array
   */
  fetchMenu() {
    return dummyData.meals.filter(meal => meal.available === true);
  },
};

export default MenuService;
