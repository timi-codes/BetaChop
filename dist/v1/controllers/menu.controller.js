"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _menu = _interopRequireDefault(require("../services/menu.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

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
    (0, _classCallCheck2.default)(this, MenuController);
  }

  (0, _createClass2.default)(MenuController, null, [{
    key: "fetchMenu",

    /**
     * @description retrieve and return menu for the day
     * @param {object} req
     * @param {object} res
     * @returns {Array} menu object array
     */
    value: function () {
      var _fetchMenu = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(req, res) {
        var allMenu;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _menu.default.fetchMenu();

              case 3:
                allMenu = _context.sent;

                if (allMenu.length === 0) {
                  response.setSuccess(200, 'Menu list for today is empty');
                } else {
                  response.setSuccess(200, null, allMenu);
                }

                return _context.abrupt("return", response.send(res));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                response.setError(400, _context.t0.message);
                return _context.abrupt("return", response.send(res));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function fetchMenu(_x, _x2) {
        return _fetchMenu.apply(this, arguments);
      }

      return fetchMenu;
    }()
    /**
     * @description add a meal to today menu
     * @param {object} req
     * @param {object} res
     * @returns {object} apiResponse
     */

  }, {
    key: "setUpMenu",
    value: function () {
      var _setUpMenu = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(req, res) {
        var id, userId, addedMeal, _addedMeal, rowsUpdate, _addedMeal$, updatedMeal;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.body.id;
                userId = req.token.userId;

                if (id) {
                  _context2.next = 5;
                  break;
                }

                response.setError(400, 'meal id is required');
                return _context2.abrupt("return", response.send(res));

              case 5:
                if (!Number.isNaN(Number(id))) {
                  _context2.next = 8;
                  break;
                }

                response.setError(400, 'Invalid ID. ID must be a number');
                return _context2.abrupt("return", response.send(res));

              case 8:
                _context2.prev = 8;
                _context2.next = 11;
                return _menu.default.setUpMenu(id, userId);

              case 11:
                addedMeal = _context2.sent;
                _addedMeal = (0, _slicedToArray2.default)(addedMeal, 2), rowsUpdate = _addedMeal[0], _addedMeal$ = (0, _slicedToArray2.default)(_addedMeal[1], 1), updatedMeal = _addedMeal$[0];

                if (rowsUpdate > 0) {
                  response.setSuccess(201, 'Meal successfully added to Menu List', updatedMeal);
                }

                return _context2.abrupt("return", response.send(res));

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](8);
                response.setError(400, _context2.t0.message);
                return _context2.abrupt("return", response.send(res));

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[8, 17]]);
      }));

      function setUpMenu(_x3, _x4) {
        return _setUpMenu.apply(this, arguments);
      }

      return setUpMenu;
    }()
  }]);
  return MenuController;
}();

var _default = MenuController;
exports.default = _default;