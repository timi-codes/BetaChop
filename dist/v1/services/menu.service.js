"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("../database/models");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * menu services performs all action related to menu-
 * fetch menu for the day and setup menu for the day
 */
var MenuService =
/*#__PURE__*/
function () {
  function MenuService() {
    _classCallCheck(this, MenuService);
  }

  _createClass(MenuService, null, [{
    key: "setUpMenu",

    /**
     * @description Setup the meal for the day
     * @returns {Array} menu object array
     */
    value: function () {
      var _setUpMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(id) {
        var foundMeal;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models.Meal.findByPk(Number(id));

              case 3:
                foundMeal = _context.sent;

                if (!foundMeal) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return _models.Meal.update({
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
      var _fetchMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models.Meal.findAll({
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