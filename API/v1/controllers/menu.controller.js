import MenuService from '../services/menu.service';

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
      return res.status(200).json({
        status: 'success',
        message: 'Menu list for today is empty',
      });
    }
    return res.status(200).json({
      status: 'success',
      data: allMenu,
    });
  },

  /**
   * @description add a meal to today menu
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  setUpMenu(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.status(400).send({
        status: 'error',
        message: 'meal id is required',
      });
    }

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid ID. ID must be a number',
      });
    }

    const addMeal = MenuService.setUpMenu(id);

    if (addMeal == null) {
      return res.status(404).json({
        status: 'error',
        message: `Meal with id ${id} cannot be found`,
      });
    }

    if (typeof addMeal === 'string') {
      const msg = addMeal;
      return res.status(200).json({
        status: 'status',
        message: msg,
      });
    }

    return res
      .json({
        status: 'success',
        message: 'Meal successfully added to Menu List',
        data: addMeal,
      })
      .status(201);
  },
};

export default MenuController;
