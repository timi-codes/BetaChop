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
     * @description Updates the availability of a meal for today for logged in caterer
     * @returns {Array} menu object array
     */
    value: function () {
      var _setUpMenu = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(id, catererId) {
        var foundMeal;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models.default.Meal.findOne({
                  where: {
                    id: id,
                    catererId: catererId
                  }
                });

              case 3:
                foundMeal = _context.sent;

                if (!(foundMeal && foundMeal.availableToday)) {
                  _context.next = 6;
                  break;
                }

                throw new Error('Meal has already been added to menu list');

              case 6:
                if (!foundMeal) {
                  _context.next = 10;
                  break;
                }

                _context.next = 9;
                return _models.default.Meal.update({
                  availableToday: true
                }, {
                  returning: true,
                  where: {
                    id: Number(id)
                  },
                  include: [{
                    model: _models.default.User,
                    as: 'caterer'
                  }]
                });

              case 9:
                return _context.abrupt("return", _context.sent);

              case 10:
                throw new Error("Meal with id ".concat(id, " cannot be found"));

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13]]);
      }));

      function setUpMenu(_x, _x2) {
        return _setUpMenu.apply(this, arguments);
      }

      return setUpMenu;
    }()
    /**
     * @description Retrieve and return all menu from all caterers
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
                  },
                  include: [{
                    model: _models.default.User,
                    as: 'caterer'
                  }],
                  attributes: {
                    exclude: ['catererId']
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