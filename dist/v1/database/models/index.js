"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _path = require("path");

var _sequelize = _interopRequireDefault(require("sequelize"));

var _pg = _interopRequireDefault(require("pg"));

var _config = _interopRequireDefault(require("../../config/config"));

_pg.default.defaults.ssl = true;
var basename = (0, _path.basename)(__filename);
var env = process.env.NODE_ENV || 'production';
var config = _config.default[env];
var db = {};
var sequelize;
console.log(env);

if (env === 'production') {
  sequelize = new _sequelize.default('postgres://zdycbqstcpqddg:cbeeca55ddc249db336ebc9870b8260fb0c55a22fd366315fe406d01dfe0a54d@ec2-174-129-236-21.compute-1.amazonaws.com:5432/d7cdlo945mtmn3?ssl=true', {
    dialect: 'postgres',
    ssl: true,
    port: 5432,
    environment: 'production',
    operatorsAliases: false,
    dialectOption: {
      ssl: true
    },
    define: {
      timestamps: false
    }
  });
} else {// sequelize = new Sequelize(
  //   'postgres://zdycbqstcpqddg:cbeeca55ddc249db336ebc9870b8260fb0c55a22fd366315fe406d01dfe0a54d@ec2-174-129-236-21.compute-1.amazonaws.com:5432/d7cdlo945mtmn3?ssl=true',
  //   {
  //     dialect: 'postgres',
  //     ssl: true,
  //     port: 5432,
  //     operatorsAliases: false,
  //     dialectOption: {
  //       ssl: true,
  //     },
  //     define: {
  //       timestamps: false,
  //     },
  //   },
  // );
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