import MenuService from '../services/menu.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * menu controller performs controls  request and response -
 * fetching today's menu,
 * setup menu for today,
 */
class MenuController {
  /**
   * @description retrieve and return menu for the day
   * @param {object} req
   * @param {object} res
   * @returns {Array} menu object array
   */
  static async fetchMenu(req, res) {
    try {
      const allMenu = await MenuService.fetchMenu();

      if (allMenu.length === 0) {
        response.setSuccess(200, 'Menu list for today is empty');
      } else {
        response.setSuccess(200, null, allMenu);
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error.message);
      return response.send(res);
    }
  }

  /**
   * @description add a meal to today menu
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  static async setUpMenu(req, res) {
    const { id } = req.body;
    const { userId } = req.token;

    if (!id) {
      response.setError(400, 'meal id is required');
      return response.send(res);
    }
    if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
      return response.send(res);
    }

    try {
      const addedMeal = await MenuService.setUpMenu(id, userId);
      const [rowsUpdate, [updatedMeal]] = addedMeal;

      if (rowsUpdate > 0) {
        response.setSuccess(201, 'Meal successfully added to Menu List', updatedMeal);
      }
      return response.send(res);
    } catch (error) {
      response.setError(400, error.message);
      return response.send(res);
    }
  }
}

export default MenuController;
