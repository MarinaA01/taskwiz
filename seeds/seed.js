const sequelize = require('../config/connection');
const { User, Task } = require('../models');
const userData = require('./userData.json');
const taskData = require('./taskData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true }); // sync the database & drop existing tables

  const users = await User.bulkCreate(userData, { // create users using the data from userData.json
    individualHooks: true, // apply hooks defined in the user model
    returning: true, // return the created users
  });

  for (const task of taskData) { // iterate through each task in taskData.json
    await Task.create({ // create a task using the data from taskData.json
      ...task, // spread the properties of the task object
      user_id: users[Math.floor(Math.random() * users.length)].id, // assign a random user_id to the task
    });
  }

  process.exit(0); // exit the process
};

seedDatabase(); // call the seedDatabase function to start seeding the database
