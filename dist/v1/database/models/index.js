"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _config = _interopRequireDefault(require("../../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basename = (0, _path.basename)(__filename);
var env = process.env.NODE_ENV || 'development';
var config = _config.default[env];
var db = {};
console.log(env);
var sequelize;

if (config.environment === 'production') {
  sequelize = new _sequelize.default(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOption: {
      ssl: true,
      native: true
    },
    logging: true
  });
} else {
  sequelize = new _sequelize.default(config.database, config.username, config.password, config);
}

(0, _fs.readdirSync)(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize.import((0, _path.join)(__dirname, file));
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize.default;
var _default = db;
exports.default = _default;