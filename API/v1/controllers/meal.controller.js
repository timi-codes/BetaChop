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
        message: 'All parameters are required',
      });
    }

    const newMeal = req.body;
    const createdMeal = MealService.addAMeal(newMeal);
    return res
      .json({
        status: 'success',
        message: 'Meal successfully added!',
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

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid ID. ID must be a number',
      });
    }

    const updateMeal = MealService.updateAMeal(id, newMeal);

    if (updateMeal == null) {
      return res.status(400).json({
        status: 'error',
        message: `Meal with id ${id} cannot be found`,
      });
    }
    return res
      .json({
        status: 'success',
        message: 'Meal was successfully updated',
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

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid ID. ID must be a number',
      });
    }

    const foundMeal = MealService.getAMeal(id);
    const foundMealKeys = Object.keys(foundMeal);

    if (foundMealKeys.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Meal cannot be found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: foundMeal,
    });
  },

  /**
   * @description get a specific meal
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  deleteAMeal(req, res) {
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid ID. ID must be a number',
      });
    }

    const deletedMeal = MealService.deleteAMeal(id);

    if (deletedMeal == null) {
      return res
        .json({
          status: 'error',
          message: `Meal with id ${id} cannot be found`,
        })
        .status(404);
    }

    return res
      .json({
        status: 'success',
        message: 'Meal was successfully deleted',
      })
      .status(200);
  },
};

export default MealController;
