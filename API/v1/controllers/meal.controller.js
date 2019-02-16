import MealService from '../services/meal.service';

/**
 * meal controller performs controls  request and response -
 * fetching all meal,
 * adding a new meal,
 * updating an existing meal and
 * getting a particular meal
 */
const MealController = {
  /**
   * @description retrieve and return all meals from our data
   * @param {object} req
   * @param {object} res
   * @returns {Array} meal object array
   */
  fetchAllMeals(req, res) {
    const allMeals = MealService.fetchAllMeals();
    return res
      .json({
        status: 'success',
        data: allMeals,
      })
      .status(200);
  },

  /**
   * @description create a meal record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  addAMeal(req, res) {
    if (!req.body.name || !req.body.price || !req.body.size) {
      return res.status(400).send({
        status: 'error',
        message: 'Meal parameters can not be empty',
      });
    }

    const newMeal = req.body;
    const createdMeal = MealService.addAMeal(newMeal);
    return res
      .json({
        status: 'success',
        data: createdMeal,
      })
      .status(201);
  },

  /**
   * @description update a meal record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  updateAMeal(req, res) {
    const newMeal = req.body;
    const { id } = req.params;
    const updateMeal = MealService.updateAMeal(id, newMeal);

    if (updateMeal == null) {
      return res
        .json({
          message: `Meal not found with id ${id}`,
        })
        .status(404);
    }
    return res
      .json({
        data: updateMeal,
      })
      .status(201);
  },

  /**
   * @description get a specific meal
   * @param {object} req
   * @param {object} res
   * @returns {object} found meal
   */
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

  /**
   * @description get a specific meal
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  deleteAMeal(req, res) {
    const { id } = req.params;
    const deletedMeal = MealService.deleteAMeal(id);

    if (deletedMeal == null) {
      return res
        .json({
          message: `Meal not found with id ${id}`,
        })
        .status(404);
    }

    return res
      .json({
        status: 'success',
        message: 'meal was successfully deleted',
      })
      .status(200);
  },
};

export default MealController;
