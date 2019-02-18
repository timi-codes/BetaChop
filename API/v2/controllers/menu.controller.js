import MenuService from '../services/menu.service';

/**
 * meal controller performs controls  request and response -
 * fetching all meal,
 * adding a new meal,
 * updating an existing meal and
 * getting a particular meal
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

    if (allMenu == null) {
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
   * @description setup a menu record
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  setUpMenu(req, res) {
    const { id } = req.body;

    if (Number.isNaN(Number(id))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid ID. ID must be a number',
      });
    }

    const addMeal = MenuService.setUpMenu(id);

    if (addMeal == null) {
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
        message: 'Meal successfully added to Menu List',
        data: addMeal,
      })
      .status(201);
  },
};

export default MenuController;
