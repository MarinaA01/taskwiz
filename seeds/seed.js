const sequelize = require("../config/connection");
const Sequelize = require("sequelize");
const User = require("../models/userSchema")(sequelize, Sequelize.DataTypes);
const Task = require("../models/taskSchema")(sequelize, Sequelize.DataTypes);
const userData = require("./userData.json");
const taskData = require("./taskData.json");

const seedDatabase = async () => {
  console.log("Seeding database...");
  
  await sequelize.sync({ force: true }); // sync the database & drop existing tables
  
  console.log("user schema", User);
  console.log("user schema data", userData);

  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true, // Apply hooks defined in the user model
  //   returning: true, // Return the created users
  // });

  // console.log("created Users!", users);

  // for (const task of taskData) {
  //   await Task.create({
  //     ...task, // Spread the properties of the task object
  //     user_id: users[Math.floor(Math.random() * users.length)].id, // Assign a random user_id to the task
  //   });
  // }

  console.log('Seeding tasks done !"');
  process.exit(0); // exit the process
};

seedDatabase(); //call the seedDatabase function to start seeding the database

