"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  development: {
    username: 'codepreneur',
    password: null,
    database: 'betachop',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    operatorsAliases: false,
    define: {
      timestamps: false
    }
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'betachop',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    operatorsAliases: false,
    define: {
      timestamps: false
    }
  },
  production: {
    environment: 'production',
    dialect: 'postgres'
  }
};
exports.default = _default;