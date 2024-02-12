const sequelize = require("../config/connection");

const Sequelize = require("sequelize");
const User = require("../models/userSchema")(sequelize, Sequelize.DataTypes);
const Task = require("../models/taskSchema")(sequelize, Sequelize.DataTypes);
// const { User, Task } = require("../models")(sequelize, Sequelize.DataTypes);
const userData = require("./userData.json");
const taskData = require("./taskData.json");

const seedDatabase = async () => {
  console.log("Seeding database...");

  await sequelize.sync({ force: true }); // sync the database & drop existing tables

  console.log("user schema", User);
  console.log("user schema data", userData);
  const users = await User.bulkCreate(userData, {
    // create users using the data from userData.json
    individualHooks: true, // apply hooks defined in the user model
    returning: true, // return the created users
  });

  console.log("created Users!", users);

  for (const task of taskData) {
    // iterate through each task in taskData.json
    await Task.create({
      // create a task using the data from taskData.json
      ...task, // spread the properties of the task object
      user_id: users[Math.floor(Math.random() * users.length)].id, // assign a random user_id to the task
    });
  }

  console.log('Seeding tasks done !"');

  process.exit(0); // exit the process
};

seedDatabase(); // call the seedDatabase function to start seeding the database
