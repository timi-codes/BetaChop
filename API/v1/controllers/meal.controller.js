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
class MealController {
  /**
   * @description retrieve and return all meals from our data
   * @param {object} req
   * @param {object} res
   * @returns {Array} meal object array
   */
  static fetchAllMeals(req, res) {
    const allMeals = MealService.fetchAllMeals();
    return allMeals
      .then((meals) => {
        if (meals.length === 0) {
          response.setSuccess(200, 'No meal found!');
        } else {
          response.setSuccess(200, 'Meals was successfully fetched!', meals);
        }
        response.send(res);
      })
      .catch(error => res.status(500).send(error));
  }

  /**
   * @description create a meal record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  static addAMeal(req, res) {
    if (!req.body.name || !req.body.price || !req.body.size || !req.body.imageUrl) {
      response.setError(400, 'All parameters are required');
      response.send(res);
    }

    const newMeal = req.body;
    const createdMeal = MealService.addAMeal(newMeal);

    return createdMeal
      .then((meal) => {
        response.setSuccess(201, 'Meal successfully added!', meal);
        response.send(res);
      })
      .catch(error => res.status(500).send(error));
  }

  /**
   * @description update a meal record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  static updateAMeal(req, res) {
    const newMeal = req.body;
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
      response.setSuccess(400, 'Invalid ID. ID must be a number');
      response.send(res);
    }

    const updateMeal = MealService.updateAMeal(id, newMeal);

    return updateMeal
      .then((meal) => {
        if (meal === null) {
          response.setError(400, `Meal with id ${id} cannot be found`);
          response.send(res);
        }
        response.setSuccess(200, 'Meal was successfully updated', meal);
        response.send(res);
      })
      .catch(error => res.status(500).send(error));
  }

  /**
   * @description get a specific meal
   * @param {object} req
   * @param {object} res
   * @returns {object} found meal
   */
  static getAMeal(req, res) {
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
      response.send(res);
    }

    const foundMeal = MealService.getAMeal(id);

    foundMeal
      .then((meal) => {
        if (meal === null) {
          response.setError(404, 'Meal cannot be found');
          response.send(res);
        }
        response.setSuccess(200, null, meal);
        response.send(res);
      })
      .catch(error => res.status(500).send(error));
  }

  /**
   * @description get a specific meal
   * @param {object} req
   * @param {object} res
   * @returns {object} response
   */
  static deleteAMeal(req, res) {
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
      response.send(res);
    }
    const deletedMeal = MealService.deleteAMeal(id);

    deletedMeal
      .then((deletedRecord) => {
        if (deletedRecord === 1) {
          response.setSuccess(200, 'Meal was successfully deleted');
        } else {
          response.setError(404, `Meal with id ${id} cannot be found`);
        }
        response.send(res);
      })
      .catch(error => res.status(500).send(error.message));
  }
}

export default MealController;
