import dummyData from '../utils/dummyData';
import Menu from '../models/menu.model';
import Meal from '../models/meal.model';

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
