import dummyData from '../utils/dummyData';
import Meal from '../models/meal.model';

/**
 * meal services performs all action related to meal - fetching all meal, adding a new meal,
 *  updating an existing meal and getting a particular meal
 */
const MealService = {
  /**
   * @description Retrieve and return all meals from our dunny data
   * @returns {Array} meal object array
   */
  fetchAllMeals() {
    return dummyData.meals.map((meal) => {
      const newMeal = new Meal();
      newMeal.id = meal.id;
      newMeal.name = meal.name;
      newMeal.size = meal.size;
      newMeal.price = meal.price;

      return newMeal;
    });
  },

  /**
   * @description Takes a new meal object and adds it our dummy data
   * @param {object} meal
   * @returns {object} meal
   */
  addAMeal(meal) {
    const mealLength = dummyData.meals.length;
    const lastId = dummyData.meals[mealLength - 1].id;
    const newId = lastId + 1;

    const newMeal = meal;
    newMeal.id = newId;

    dummyData.meals.push(newMeal);
    return meal;
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
   * @description Finds a meal record from meal Array
   * @param { int } id
   * @returns {object} meal
   */
  getAMeal(id) {
    const foundMeal = dummyData.meals.find(meal => meal.id === Number(id));
    return foundMeal || {};
  },
};

export default MealService;
