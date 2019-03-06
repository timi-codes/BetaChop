import database from '../database/models';

/**
 * meal services performs all action related to meal - fetching all meal, adding a new meal,
 *  updating an existing meal and getting a particular meal
 */
class MealService {
  /**
   * @description Retrieve and return all meals
   * @returns {Array} of meal or throw error
   */
  static async fetchAllMeals() {
    try {
      return await database.Meal.findAll();
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
      return await database.Meal.create(newMeal);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Updates a meal
   * @param { int } id
   * @param {object} updatedMeal
   * @returns {object} foundMeal
   */
  static async updateAMeal(id, updatedMeal) {
    try {
      const foundMeal = await database.Meal.findByPk(Number(id));

      if (foundMeal) {
        await database.Meal.update(updatedMeal, { where: { id: Number(id) } });
        return updatedMeal;
      }
      return foundMeal;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Finds a meal record
   * @param { int } id
   * @returns {object} foundMeal
   */
  static async getAMeal(id) {
    try {
      const foundMeal = await database.Meal.findByPk(Number(id));
      return foundMeal;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Delete a meal record
   * @param { int } id
   * @returns {object} meal
   */
  static async deleteAMeal(id) {
    try {
      const foundMeal = await database.Meal.findByPk(Number(id));
      if (foundMeal) {
        const deleteRecord = await database.Meal.destroy({ where: { id: Number(id) } });
        return deleteRecord;
      }
      return 0;
    } catch (error) {
      throw error;
    }
  }
}
export default MealService;
