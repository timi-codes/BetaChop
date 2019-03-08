import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize from 'sequelize';
import configJson from '../../config/config';

// pg.defaults.ssl = true;
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
const db = {};
let sequelize;
console.log(env);
if (env === 'production') {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    dialectOptions: {
      ssl: true,
      native: true,
    },
  });
}
// else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

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
