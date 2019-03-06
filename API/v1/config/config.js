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
  },
  production: {
    environment: 'production',
  },
};
