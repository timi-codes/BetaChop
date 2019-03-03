import { Meal } from '../models';

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
      return await Meal.findAll();
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Takes a new meal object
   * @param {object} meal
   * @returns {object} created meal
   */
  static async addAMeal(newMeal) {
    try {
      return await Meal.create(newMeal);
    } catch (e) {
      throw e;
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
      const foundMeal = await Meal.findByPk(Number(id));

      if (foundMeal) {
        await Meal.update(updatedMeal, { where: { id: Number(id) } });
        return updatedMeal;
      }
      return foundMeal;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Finds a meal record
   * @param { int } id
   * @returns {object} foundMeal
   */
  static async getAMeal(id) {
    try {
      const foundMeal = await Meal.findByPk(Number(id));
      return foundMeal;
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Delete a meal record
   * @param { int } id
   * @returns {object} meal
   */
  static async deleteAMeal(id) {
    try {
      const foundMeal = await Meal.findByPk(Number(id));
      if (foundMeal) {
        const deleteRecord = await Meal.destroy({ where: { id: Number(id) } });
        return deleteRecord;
      }
      return 0;
    } catch (e) {
      throw e;
    }
  }
}
export default MealService;
