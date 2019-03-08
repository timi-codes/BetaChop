const config = require('dotenv');

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
      timestamps: false,
    },
    dialectOption: {
      ssl: true,
      native: true,
    },
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
      timestamps: false,
    },
    dialectOption: {
      ssl: true,
      native: true,
    },
  },
  production: {
    environment: 'production',
    host: 'ec2-174-129-236-21.compute-1.amazonaws.com',
    uri: process.env.DATABASE_URL,
    dialect: 'postgres',
    port: 5432,
    ssl: true,
    operatorsAliases: false,
    dialectOption: {
      ssl: true,
      native: true,
    },
  },
};
