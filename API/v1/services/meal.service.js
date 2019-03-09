import database from '../database/models';

/**
 * meal services performs all action related to meal - fetching all meal, adding a new meal,
 *  updating an existing meal and getting a particular meal
 */
class MealService {
  /**
   * @description Retrieve and return all meals belong to the authenticated   c aterer
   * @returns {Array} of meal or throw error
   */
  static async fetchAllMeals(catererId) {
    try {
      return await database.Meal.findAll({ where: { catererId } });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Takes a new meal object
   * @param {object} meal
   * @returns {object} created meal
   */
  static async addAMeal(newMeal) {
    try {
      // meal.setDataValue('caterer', await meal.getCaterer());
      return await database.Meal.create(newMeal);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Updates a meal belonging to the currently logged in caterer
   * @param { int } id
   * @param {object} updatedMeal
   * @returns {object} foundMeal
   */
  static async updateAMeal(id, updatedMeal, catererId) {
    try {
      const foundMeal = await database.Meal.findOne({
        where: { id: Number(id), catererId },
      });

      if (foundMeal) {
        await database.Meal.update(updatedMeal, { where: { id: Number(id) } });
        return updatedMeal;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Finds a meal record belonging to the currently logged in caterer
   * @param { int } id
   * @returns {object} foundMeal
   */
  static async getAMeal(id, catererId) {
    try {
      const foundMeal = await database.Meal.findOne({
        where: { id: Number(id), catererId },
      });
      return foundMeal;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Delete a meal record belonging to the currently logged in caterer
   * @param { int } id
   * @returns {object} meal
   */
  static async deleteAMeal(id, catererId) {
    try {
      const foundMeal = await database.Meal.findOne({ where: { id: Number(id), catererId } });
      if (foundMeal) {
        const deleteRecord = await database.Meal.destroy({
          where: { id: Number(id), catererId },
        });
        return deleteRecord;
      }
      return 0;
    } catch (error) {
      throw error;
    }
  }
}
export default MealService;
