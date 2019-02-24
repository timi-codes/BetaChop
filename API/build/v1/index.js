"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _meal = _interopRequireDefault(require("./routes/meal.route"));

var _order = _interopRequireDefault(require("./routes/order.route"));

var _menu = _interopRequireDefault(require("./routes/menu.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT || 7778;
var API_VERSION = '/api/v1';
app.use(_bodyParser.default.json());
app.use("".concat(API_VERSION, "/meals"), _meal.default);
app.use("".concat(API_VERSION, "/orders"), _order.default);
app.use("".concat(API_VERSION, "/menu"), _menu.default);
app.get('/', function (req, res) {
  res.send('My server is runninnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng😀😎😏');
});

if (!module.parent) {
  app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
  });
}

module.exports = app;