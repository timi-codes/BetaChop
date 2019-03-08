"use strict";

var config = require('dotenv');

config.config();
module.exports = {
  development: {
    username: 'codepreneur',
    password: null,
    database: 'betachop',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    operatorsAliases: false,
    ssl: true,
    define: {
      timestamps: false
    },
    dialectOption: {
      ssl: true,
      native: true
    }
  },
  test: {
    username: 'codepreneur',
    password: null,
    database: 'betachop',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    ssl: true,
    operatorsAliases: false,
    define: {
      timestamps: false
    },
    dialectOption: {
      ssl: true,
      native: true
    }
  },
  production: {
    uri: 'postgres://zdycbqstcpqddg:cbeeca55ddc249db336ebc9870b8260fb0c55a22fd366315fe406d01dfe0a54d@ec2-174-129-236-21.compute-1.amazonaws.com:5432/d7cdlo945mtmn3?ssl=true',
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
  }
};