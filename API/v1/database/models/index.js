import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize from 'sequelize';
import pg from 'pg';
import configJson from '../../config/config';

pg.defaults.ssl = true;
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
const db = {};
let sequelize;
console.log(env);
if (config.environment === 'production') {
  sequelize = new Sequelize(
    'postgres://zdycbqstcpqddg:cbeeca55ddc249db336ebc9870b8260fb0c55a22fd366315fe406d01dfe0a54d@ec2-174-129-236-21.compute-1.amazonaws.com:5432/d7cdlo945mtmn3?ssl=true',
    {
      dialect: 'postgres',
      ssl: true,
      port: 5432,
      operatorsAliases: false,
      dialectOption: {
        ssl: true,
      },
      define: {
        timestamps: false,
      },
    },
  );
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = sequelize.import(join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
