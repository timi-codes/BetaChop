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
    username: 'zdycbqstcpqddg',
    password: 'cbeeca55ddc249db336ebc9870b8260fb0c55a22fd366315fe406d01dfe0a54d',
    database: 'd7cdlo945mtmn3',
    host: 'ec2-174-129-236-21.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    operatorsAliases: false,
    define: {
      timestamps: false,
    },
  },
};
