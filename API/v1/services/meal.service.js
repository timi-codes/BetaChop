import dummyData from '../utils/dummyData';
import { Meal } from '../models';

/**
 * meal services performs all action related to meal - fetching all meal, adding a new meal,
 *  updating an existing meal and getting a particular meal
 */
const MealService = {
  /**
   * @description Retrieve and return all meals
   * @returns {Array} of meal
   */
  fetchAllMeals() {
    return Meal.findAll();
  },

  /**
   * @description Takes a new meal object
   * @param {object} meal
   * @returns {object} created meal
   */
  addAMeal(newMeal) {
    return Meal.create(newMeal);
  },

  /**
   * @description Updates an existing meal with a new meal object
   * @param { int } id
   * @param {object} updatedMeal
   * @returns {object} updated meal
   */
  updateAMeal(id, updatedMeal) {
    const foundMeal = dummyData.meals.find(meal => meal.id === Number(id));

    if (foundMeal) {
      foundMeal.name = updatedMeal.name;
      foundMeal.price = updatedMeal.price;
      foundMeal.size = updatedMeal.size;
    }
    return foundMeal;
  },

  /**
   * @description Finds a meal record from meal Dummy Data
   * @param { int } id
   * @returns {object} meal
   */
  getAMeal(id) {
    const foundMeal = dummyData.meals.find(meal => meal.id === Number(id));
    return foundMeal || {};
  },

  /**
   * @description Delete a meal record from meal Dummy Data
   * @param { int } id
   * @returns {object} meal
   */
  deleteAMeal(id) {
    const foundMeal = dummyData.meals.find(meal => meal.id === Number(id));
    if (foundMeal) {
      const index = dummyData.meals.indexOf(foundMeal);
      if (index > -1) {
        dummyData.meals.splice(index, 1);
      }
    }
    return foundMeal;
  },
};
export default MealService;
