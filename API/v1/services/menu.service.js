import database from '../database/models';

/**
 * menu services performs all action related to menu-
 * fetch menu for the day and setup menu for the day
 */
class MenuService {
  /**
   * @description Updates the availability of a meal for today for logged in caterer
   * @returns {Array} menu object array
   */
  static async setUpMenu(id, catererId) {
    try {
      const foundMeal = await database.Meal.findOne({
        where: { id, catererId },
      });

      if (foundMeal && foundMeal.availableToday) {
        throw new Error('Meal has already been added to menu list');
      }

      if (foundMeal) {
        return await database.Meal.update(
          { availableToday: true },
          {
            returning: true,
            where: { id: Number(id) },
            include: [{ model: database.User, as: 'caterer' }],
          },
        );
      }
      throw new Error(`Meal with id ${id} cannot be found`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Retrieve and return all menu from all caterers
   * @returns {Array} menu object array
   */
  static async fetchMenu() {
    try {
      return await database.Meal.findAll({
        where: { availableToday: true },
        include: [
          {
            model: database.User,
            as: 'caterer',
            attributes: { exclude: ['password'] },
          },
        ],
        attributes: { exclude: ['catererId'] },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default MenuService;
