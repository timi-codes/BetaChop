import MealService from '../services/meal.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * caterer meal controller performs controls  request and response -
 * fetching all meal,
 * adding a new meal,
 * updating an existing meal and
 * getting a particular meal
 */
class MealController {
  /**
   * @description retrieve and return all meals that
   * belongs to the currently logged in user
   * @param {object} req
   * @param {object} res
   * @returns {Array} meal object
   */
  static async fetchAllMeals(req, res) {
    try {
      const { userId } = req.token;
      const allMeals = await MealService.fetchAllMeals(userId);
      if (allMeals.length === 0) {
        response.setSuccess(200, 'No meal found!');
      } else {
        response.setSuccess(200, 'Meals was successfully fetched!', allMeals);
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error);
      return response.send(res);
    }
  }

  /**
   * @description create a meal record with the id of the curently logged in user
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  static async addAMeal(req, res) {
    if (!req.body.name || !req.body.price || !req.body.size || !req.body.imageUrl) {
      response.setError(400, 'All parameters are required');
      return response.send(res);
    }
    const newMeal = req.body;
    const { userId } = req.token;
    newMeal.catererId = userId;

    try {
      const createdMeal = await MealService.addAMeal(newMeal);
      response.setSuccess(201, 'Meal successfully added!', createdMeal);
      return response.send(res);
    } catch (error) {
      response.setError(400, error.message);
      return response.send(res);
    }
  }

  /**
   * @description update a meal record belong to the currently logged in user
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  static async updateAMeal(req, res) {
    const newMeal = req.body;
    const { id } = req.params;
    const { userId } = req.token;

    if (Number.isNaN(Number(id))) {
      response.setSuccess(400, 'Invalid ID. ID must be a number');
      return response.send(res);
    }

    try {
      const updateMeal = await MealService.updateAMeal(id, newMeal, userId);

      if (updateMeal === null) {
        response.setError(400, `Meal with id ${id} cannot be found`);
      } else {
        response.setSuccess(200, 'Meal was successfully updated', updateMeal);
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error);
      return response.send(res);
    }
  }

  /**
   * @description get a specific meal belonging to the currently logged in user
   * @param {object} req
   * @param {object} res
   * @returns {object} found meal
   */
  static async getAMeal(req, res) {
    const { id } = req.params;
    const { userId } = req.token;

    if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
      return response.send(res);
    }

    try {
      const foundMeal = await MealService.getAMeal(id, userId);

      if (foundMeal === null) {
        response.setError(404, 'Meal cannot be found');
      } else {
        response.setSuccess(200, null, foundMeal);
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error);
      return response.send(res);
    }
  }

  /**
   * @description delete a specific meal belonging to the currently logged in user
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static async deleteAMeal(req, res) {
    const { id } = req.params;
    const { userId } = req.token;

    if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
      return response.send(res);
    }

    try {
      const deletedRecord = await MealService.deleteAMeal(id, userId);

      if (deletedRecord === 1) {
        response.setSuccess(200, 'Meal was successfully deleted');
      } else {
        response.setError(404, `Meal with id ${id} cannot be found`);
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error);
      return response.send(res);
    }
  }
}

export default MealController;
