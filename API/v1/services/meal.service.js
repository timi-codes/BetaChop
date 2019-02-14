import dummyData from '../utils/dummyData';
import Meal from '../models/meal.model';

const MealService = {
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

  addAMeal(meal) {
    const mealLength = dummyData.meals.length;
    const lastId = dummyData.meals[mealLength - 1].id;
    const newId = lastId + 1;

    const newMeal = meal;
    newMeal.id = newId;

    dummyData.meals.push(newMeal);
    return meal;
  },

  getAMeal(id) {
    const foundMeal = dummyData.meals.find(meal => meal.id === Number(id));
    return foundMeal || {};
  },
};

export default MealService;
