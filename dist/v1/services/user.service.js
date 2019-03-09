"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _passHasher = _interopRequireDefault(require("../utils/passHasher"));

var _validatePassword = _interopRequireDefault(require("../utils/validatePassword"));

var _models = _interopRequireDefault(require("../database/models"));

var _jwtSigner = _interopRequireDefault(require("../utils/jwtSigner"));

/**
 * This is allows user to create an account and login
 */
var UserService =
/*#__PURE__*/
function () {
  function UserService() {
    (0, _classCallCheck2.default)(this, UserService);
  }

  (0, _createClass2.default)(UserService, null, [{
    key: "createUser",

    /**
     * @description Create a new user
     * @returns {object} the registered user details
     */
    value: function () {
      var _createUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(user) {
        var password, roleId, isUser, createdUser, username, email, userId, payload, token, userProfile;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                password = user.password, roleId = user.roleId;
                _context.next = 4;
                return _models.default.User.findOne({
                  where: {
                    email: user.email
                  }
                });

              case 4:
                isUser = _context.sent;

                if (!isUser) {
                  _context.next = 7;
                  break;
                }

                throw new Error('User with this email address already exist!');

              case 7:
                // Create user
                user.password = (0, _passHasher.default)(password);
                _context.next = 10;
                return _models.default.User.create(user);

              case 10:
                createdUser = _context.sent;
                username = createdUser.username, email = createdUser.email, userId = createdUser.id;
                payload = {
                  userId: userId,
                  username: username,
                  roleId: roleId
                };
                token = (0, _jwtSigner.default)(payload);
                userProfile = {
                  username: username,
                  email: email,
                  token: token
                };
                return _context.abrupt("return", userProfile);

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 18]]);
      }));

      function createUser(_x) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
    /**
     * @description Takes a new meal object
     * @param {object} meal
     * @returns {object} created meal
     */

  }, {
    key: "loginUser",
    value: function () {
      var _loginUser = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(login) {
        var user, bcryptResponse, _user$get, userId, userPassword, data, userProfile, token;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models.default.User.findOne({
                  where: {
                    email: login.email
                  }
                });

              case 3:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 7;
                return (0, _validatePassword.default)(login.password, user.password);

              case 7:
                bcryptResponse = _context2.sent;

                if (!bcryptResponse) {
                  _context2.next = 14;
                  break;
                }

                _user$get = user.get(), userId = _user$get.id, userPassword = _user$get.password, data = (0, _objectWithoutProperties2.default)(_user$get, ["id", "password"]);
                userProfile = (0, _objectSpread2.default)({
                  userId: userId
                }, data);
                token = (0, _jwtSigner.default)(userProfile);
                console.log(token);
                return _context2.abrupt("return", token);

              case 14:
                throw new Error('Invalid user credentials');

              case 15:
                return _context2.abrupt("return", null);

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 18]]);
      }));

      function loginUser(_x2) {
        return _loginUser.apply(this, arguments);
      }

      return loginUser;
    }()
  }]);
  return UserService;
}();

var _default = UserService;
exports.default = _default;