"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menu = _interopRequireDefault(require("../services/menu.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var response = new _ResponseGenerator.default();
/**
 * menu controller performs controls  request and response -
 * fetching today's menu,
 * setup menu for today,
 */

var MenuController =
/*#__PURE__*/
function () {
  function MenuController() {
    _classCallCheck(this, MenuController);
  }

  _createClass(MenuController, null, [{
    key: "fetchMenu",

    /**
     * @description retrieve and return menu for the day
     * @param {object} req
     * @param {object} res
     * @returns {Array} menu object array
     */
    value: function fetchMenu(req, res) {
      var allMenu = _menu.default.fetchMenu();

      allMenu.then(function (menus) {
        if (menus.length === 0) {
          response.setSuccess(200, 'Menu list for today is empty');
        } else {
          response.setSuccess(200, null, menus);
        }

        response.send(res);
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }
    /**
     * @description add a meal to today menu
     * @param {object} req
     * @param {object} res
     * @returns {object} apiResponse
     */

  }, {
    key: "setUpMenu",
    value: function setUpMenu(req, res) {
      var id = req.body.id;

      if (!id) {
        response.setError(400, 'meal id is required');
        response.send(res);
      } else if (Number.isNaN(Number(id))) {
        response.setError(400, 'Invalid ID. ID must be a number');
        response.send(res);
      }

      var addedMeal = _menu.default.setUpMenu(id);

      addedMeal.then(function (meal) {
        if (meal == null) {
          response.setError(404, "Meal with id ".concat(id, " cannot be found"));
        } else if (meal.availableToday) {
          response.setSuccess(200, 'Meal has already been added to menu list');
        } else {
          response.setSuccess(201, 'Meal successfully added to Menu List', meal);
        }

        response.send(res);
      }).catch(function (error) {
        return res.status(500).send(error);
      });
    }
  }]);

  return MenuController;
}();

var _default = MenuController;
exports.default = _default;