module.exports = {
  development: {
    username: 'codepreneur',
    password: null,
    database: 'betachop',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    operatorsAliases: false,
    define: {
      timestamps: false,
    },
    secret_key: process.env.JWT_SECRET,
  },
  test: {
    username: 'codepreneur',
    password: null,
    database: 'betachop',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    operatorsAliases: false,
    define: {
      timestamps: false,
    },
    secret_key: process.env.JWT_SECRET,
  },
  production: {
    dialect: 'postgres',
  },
};
