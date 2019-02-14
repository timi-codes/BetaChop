import dummyData from '../utils/dummyData';
import Meal from '../models/meal.model';

const MealService = {
  fetchAllMeals() {
    return dummyData.meals.map((meal) => {
      const newMeal = new Meal();
      newMeal.id = meal.id;
      newMeal.newMeal = meal.name;
      newMeal.size = meal.size;
      newMeal.price = meal.price;

      return newMeal;
    });
  },

  addMeal(meal) {
    const mealLength = dummyData.meals.length;
    const lastId = dummyData.meals[mealLength - 1].id;
    const newId = lastId + 1;
    meal.id = newId;
    dummyData.meals.push(meal);
    return meal;
  },

  getAMeal(id) {
    return dummyData.meals.find(meal => meal.id === id) || {};
  },
};

export default MealService;
