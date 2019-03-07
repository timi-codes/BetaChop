"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("../database/models"));

/**
 * menu services performs all action related to menu-
 * fetch menu for the day and setup menu for the day
 */
var MenuService =
/*#__PURE__*/
function () {
  function MenuService() {
    (0, _classCallCheck2.default)(this, MenuService);
  }

  (0, _createClass2.default)(MenuService, null, [{
    key: "setUpMenu",

    /**
     * @description Setup the meal for the day
     * @returns {Array} menu object array
     */
    value: function () {
      var _setUpMenu = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(id) {
        var foundMeal;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models.default.Meal.findByPk(Number(id));

              case 3:
                foundMeal = _context.sent;

                if (!foundMeal) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return _models.default.Meal.update({
                  availableToday: true
                }, {
                  where: {
                    id: Number(id)
                  }
                });

              case 7:
                return _context.abrupt("return", foundMeal);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }));

      function setUpMenu(_x) {
        return _setUpMenu.apply(this, arguments);
      }

      return setUpMenu;
    }()
    /**
     * @description Retrieve and return all menu from our dummyy data
     * @returns {Array} menu object array
     */

  }, {
    key: "fetchMenu",
    value: function () {
      var _fetchMenu = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models.default.Meal.findAll({
                  where: {
                    availableToday: true
                  }
                });

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      function fetchMenu() {
        return _fetchMenu.apply(this, arguments);
      }

      return fetchMenu;
    }()
  }]);
  return MenuService;
}();

var _default = MenuService;
exports.default = _default;