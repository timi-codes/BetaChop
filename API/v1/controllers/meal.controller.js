import MealService from '../services/meal.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

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
    response.setSuccess(200, '', allMeals);
    return response.send(res);
  },

  /**
   * @description create a meal record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  addAMeal(req, res) {
    if (!req.body.name || !req.body.price || !req.body.size) {
      response.setError(400, 'All parameters are required');
      return response.send(res);
    }

    const newMeal = req.body;
    const createdMeal = MealService.addAMeal(newMeal);
    response.setSuccess(201, 'Meal successfully added!', createdMeal);
    return response.send(res);
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
      response.setSuccess(400, 'Invalid ID. ID must be a number', null);
      return response.send(res);
    }

    const updateMeal = MealService.updateAMeal(id, newMeal);

    if (updateMeal == null) {
      response.setError(400, `Meal with id ${id} cannot be found`);
      return response.send(res);
    }

    response.setSuccess(200, 'Meal was successfully updated', updateMeal);
    return response.send(res);
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
      response.setError(400, 'Invalid ID. ID must be a number');
      return response.send(res);
    }

    const foundMeal = MealService.getAMeal(id);
    const foundMealKeys = Object.keys(foundMeal);

    if (foundMealKeys.length === 0) {
      response.setError(404, 'Meal cannot be found');
      return response.send(res);
    }

    response.setSuccess(200, null, foundMeal);
    return response.send(res);
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

    if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
    } else if (deletedMeal == null) {
      response.setError(404, `Meal with id ${id} cannot be found`);
    } else {
      response.setSuccess(200, 'Meal was successfully deleted', null);
    }
    return response.send(res);
  },
};

export default MealController;
