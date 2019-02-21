import MenuService from '../services/menu.service';
import ResponseGenerator from '../utils/ResponseGenerator';

const response = new ResponseGenerator();

/**
 * menu controller performs controls  request and response -
 * fetching today's menu,
 * setup menu for today,
 */
const MenuController = {
  /**
   * @description retrieve and return menu for the day
   * @param {object} req
   * @param {object} res
   * @returns {Array} menu object array
   */
  fetchMenu(req, res) {
    const allMenu = MenuService.fetchMenu();
    const menuKeys = Object.keys(allMenu);

    if (menuKeys.length === 0) {
      response.setSuccess(200, 'Menu list for today is empty', null);
      return response.send(res);
    }
    response.setSuccess(200, null, allMenu);
    return response.send(res);
  },

  /**
   * @description add a meal to today menu
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  setUpMenu(req, res) {
    const { id } = req.body;
    const addMeal = Number.isNaN(Number(id)) ? null : MenuService.setUpMenu(id);

    if (!id) {
      response.setError(400, 'meal id is required');
    }

    if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
    }
    if (addMeal == null) {
      response.setError(404, `Meal with id ${id} cannot be found`);
    }

    if (typeof addMeal === 'string') {
      const msg = addMeal;
      response.setSuccess(200, msg, null);
    } else {
      response.setSuccess(201, 'Meal successfully added to Menu List', addMeal);
    }
    return response.send(res);
  },
};

export default MenuController;
