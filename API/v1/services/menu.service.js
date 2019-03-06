import database from '../database/models';

/**
 * menu services performs all action related to menu-
 * fetch menu for the day and setup menu for the day
 */
class MenuService {
  /**
   * @description Setup the meal for the day
   * @returns {Array} menu object array
   */
  static async setUpMenu(id) {
    try {
      const foundMeal = await database.Meal.findByPk(Number(id));

      if (foundMeal) {
        await database.Meal.update({ availableToday: true }, { where: { id: Number(id) } });
      }

      return foundMeal;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Retrieve and return all menu from our dummyy data
   * @returns {Array} menu object array
   */
  static async fetchMenu() {
    try {
      return await database.Meal.findAll({ where: { availableToday: true } });
    } catch (error) {
      throw error;
    }
  }
}

export default MenuService;
