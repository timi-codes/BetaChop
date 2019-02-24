"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menu = _interopRequireDefault(require("../services/menu.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var response = new _ResponseGenerator.default();
/**
 * menu controller performs controls  request and response -
 * fetching today's menu,
 * setup menu for today,
 */

var MenuController = {
  /**
   * @description retrieve and return menu for the day
   * @param {object} req
   * @param {object} res
   * @returns {Array} menu object array
   */
  fetchMenu: function fetchMenu(req, res) {
    var allMenu = _menu.default.fetchMenu();

    var menuKeys = Object.keys(allMenu);

    if (menuKeys.length === 0) {
      response.setSuccess(200, 'Menu list for today is empty', null);
    } else {
      response.setSuccess(200, null, allMenu);
    }

    return response.send(res);
  },

  /**
   * @description add a meal to today menu
   * @param {object} req
   * @param {object} res
   * @returns {object} apiResponse
   */
  setUpMenu: function setUpMenu(req, res) {
    var id = req.body.id;

    var addMeal = _menu.default.setUpMenu(id);

    if (!id) {
      response.setError(400, 'meal id is required');
    } else if (Number.isNaN(Number(id))) {
      response.setError(400, 'Invalid ID. ID must be a number');
    } else if (addMeal == null) {
      response.setError(404, "Meal with id ".concat(id, " cannot be found"));
    } else if (typeof addMeal === 'string') {
      var msg = addMeal;
      response.setSuccess(200, msg, null);
    } else {
      response.setSuccess(201, 'Meal successfully added to Menu List', addMeal);
    }

    return response.send(res);
  }
};
var _default = MenuController;
exports.default = _default;