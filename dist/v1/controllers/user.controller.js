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

var _user = _interopRequireDefault(require("../services/user.service"));

var _ResponseGenerator = _interopRequireDefault(require("../utils/ResponseGenerator"));

var response = new _ResponseGenerator.default();
/**
 * meal controller performs controls  request and response -
 * create a new user,
 * sign in user,
 */

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    (0, _classCallCheck2.default)(this, UserController);
  }

  (0, _createClass2.default)(UserController, null, [{
    key: "createUser",

    /**
     * @description create a new user from a user object
     * @param {object} req
     * @param {object} res
     * @returns {object} created user
     */
    value: function () {
      var _createUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(req, res) {
        var user, createdUser;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = req.body;

                if (req.body.email) {
                  _context.next = 4;
                  break;
                }

                response.setError(400, 'Email Address is required');
                return _context.abrupt("return", response.send(res));

              case 4:
                if (req.body.password) {
                  _context.next = 7;
                  break;
                }

                response.setError(400, 'Password is required');
                return _context.abrupt("return", response.send(res));

              case 7:
                if (!req.body.roleId) {
                  user.roleId = 1;
                }

                _context.prev = 8;
                _context.next = 11;
                return _user.default.createUser(user);

              case 11:
                createdUser = _context.sent;

                if (createdUser) {
                  response.setSuccess(201, 'Account was successfully created!', createdUser);
                }

                return _context.abrupt("return", response.send(res));

              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](8);
                response.setError(400, _context.t0.message);
                return _context.abrupt("return", response.send(res));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[8, 16]]);
      }));

      function createUser(_x, _x2) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
    /**
     * @description login user
     * @param {object} req
     * @param {object} res
     * @returns {object} created user
     */

  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(req, res) {
        var login, token, invalidCredentials, tokenResponse;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                login = req.body;

                if (login.email) {
                  _context2.next = 4;
                  break;
                }

                response.setError(400, 'Email Address is required');
                return _context2.abrupt("return", response.send(res));

              case 4:
                if (login.password) {
                  _context2.next = 7;
                  break;
                }

                response.setError(400, 'Password is required');
                return _context2.abrupt("return", response.send(res));

              case 7:
                _context2.prev = 7;
                _context2.next = 10;
                return _user.default.loginUser(login);

              case 10:
                token = _context2.sent;

                if (token == null) {
                  response.setError(404, 'User profile cannot be found!');
                } else if (token === 'string') {
                  invalidCredentials = token;
                  response.setError(400, invalidCredentials);
                } else {
                  tokenResponse = {
                    token: token
                  };
                  response.setSuccess(200, 'Successfully log in user', tokenResponse);
                }

                return _context2.abrupt("return", response.send(res));

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](7);
                response.setError(400, _context2.t0.message);
                return _context2.abrupt("return", response.send(res));

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[7, 15]]);
      }));

      function loginUser(_x3, _x4) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }()
  }]);
  return UserController;
}();

var _default = UserController;
exports.default = _default;