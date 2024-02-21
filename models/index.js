const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const models = {};

// read all files in the current directory
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js") // Exclude the index.js file
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    models[model.name] = model;
  });

// apply associations if defined
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// export the sequelize instance & models
module.exports = {
  sequelize,
  ...models,
};
