"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

var _meal = _interopRequireDefault(require("./v1/routes/meal.route"));

var _order = _interopRequireDefault(require("./v1/routes/order.route"));

var _menu = _interopRequireDefault(require("./v1/routes/menu.route"));

var _user = _interopRequireDefault(require("./v1/routes/user.route"));

_dotenv.default.config();

var app = (0, _express.default)();
var port = process.env.PORT || 7777;
var API_VERSION = '/api/v1';
app.use(_bodyParser.default.json());
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use("".concat(API_VERSION, "/meals"), _meal.default);
app.use("".concat(API_VERSION, "/orders"), _order.default);
app.use("".concat(API_VERSION, "/menu"), _menu.default);
app.use("".concat(API_VERSION, "/auth"), _user.default);
app.get('/', function (req, res) {
  res.send('This app server is runninoninown 😀😎😋');
});

if (!module.parent) {
  app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
  });
}

module.exports = app;