"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _helpers = _interopRequireDefault(require("./helpers"));

/**
 * a class for api response
 */
var ResponseGenerator =
/*#__PURE__*/
function () {
  function ResponseGenerator() {
    (0, _classCallCheck2.default)(this, ResponseGenerator);
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }
  /**
   * @description set Api response for 200 & 201
   *  @param{int} statusCode
   * @param {object} data
   */


  (0, _createClass2.default)(ResponseGenerator, [{
    key: "setSuccess",
    value: function setSuccess(statusCode, message, data) {
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
      this.type = 'success';
    }
    /**
     * @description set Api response for 400, 401, 403, 404, 503
     *  @param{int} statusCode
     * @param {object} data
     */

  }, {
    key: "setError",
    value: function setError(statusCode, message) {
      this.statusCode = statusCode;
      this.message = message;
      this.type = 'error';
    }
    /**
     * Sends response
     * @param {object} res
     * @returns {object} responseObject
     */

  }, {
    key: "send",
    value: function send(res) {
      var filteredResponse = _helpers.default.stripNull({
        status: this.type,
        message: this.message,
        data: this.data
      });

      if (this.type === 'success') {
        return res.status(this.statusCode).json(filteredResponse);
      } // Here this.type === 'error'


      return res.status(this.statusCode).json({
        status: this.type,
        message: this.message
      });
    }
  }]);
  return ResponseGenerator;
}();

var _default = ResponseGenerator;
exports.default = _default;