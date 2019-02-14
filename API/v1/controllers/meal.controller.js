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

  addAMeal(res, req) {
    /*
      Expect json of this format
      {
        name: 'food',
        size: 'Large',
        price: '900'
      }
      */
    const newMeal = req.body;
    const createdMeal = MealService.getAMeal(newMeal);
    return res
      .json({
        status: 'success',
        data: createdMeal,
      })
      .status(201);
  },

  getAMeal(req, res) {
    const id = req.params.id;
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
