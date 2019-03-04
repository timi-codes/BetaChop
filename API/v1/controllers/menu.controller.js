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
  static fetchMenu(req, res) {
    const allMenu = MenuService.fetchMenu();

    allMenu
      .then((menus) => {
        if (menus.length === 0) {
          response.setSuccess(200, 'Menu list for today is empty');
        } else {
          response.setSuccess(200, null, menus);
        }
        response.send(res);
      })
      .catch(error => res.status(500).send(error));
  }

  /**
   * @description add a meal to today menu
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  static setUpMenu(req, res) {
    const { id } = req.body;

    if (!id) {
      response.setError(400, 'meal id is required');
      response.send(res);
    } else if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
      response.send(res);
    }

    const addedMeal = MenuService.setUpMenu(id);

    addedMeal
      .then((meal) => {
        if (meal == null) {
          response.setError(404, `Meal with id ${id} cannot be found`);
        } else if (meal.availableToday) {
          response.setSuccess(200, 'Meal has already been added to menu list');
        } else {
          response.setSuccess(201, 'Meal successfully added to Menu List', meal);
        }
        response.send(res);
      })
      .catch(error => res.status(500).send(error));
  }
}

export default MenuController;
