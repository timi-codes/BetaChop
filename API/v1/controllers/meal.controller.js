import MealService from '../services/meal.service';

const MealController = {
  fetchAllMeals(req, res) {
    const allMeals = MealService.fetchAllMeals();
    return res
      .json({
        status: 'success',
        data: allMeals,
      })
      .status(200);
  },

  addAMeal(req, res) {
    /*
      Expect json of this format
      {
        name: 'food',
        size: 'Large',
        price: '900'
      }
      */
    const newMeal = req.body;
    const createdMeal = MealService.addAMeal(newMeal);
    return res
      .json({
        status: 'success',
        data: createdMeal,
      })
      .status(201);
  },

  getAMeal(req, res) {
    const { id } = req.params;
    const foundMeal = MealService.getAMeal(id);
    return res
      .json({
        status: 'success',
        data: foundMeal,
      })
      .status(200);
  },
};

export default MealController;
