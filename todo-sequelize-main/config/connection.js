const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// check if JAWSDB_URL is available for production environment
if (process.env.JAWSDB_URL) {
  // create a Sequelize instance for JawsDB
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // create a Sequelize instance for local development
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;