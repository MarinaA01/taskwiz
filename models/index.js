// exporting a function that takes in the sequelize & DataTypes parameters
module.exports = (sequelize, DataTypes) => {
  // importing the user & task models, passing sequelize & DataTypes as arguments
  const User = require('./user')(sequelize, DataTypes);
  const {Task} = require('./task');

  // defining the association: user has many tasks
  User.hasMany(Task, {
    foreignKey: 'user_id', // foreign key to associate user with the task
    onDelete: 'CASCADE', // if User is deleted, also delete associated tasks
  });

  // defining the association: task belongs to user
  Task.belongsTo(User, {
    foreignKey: 'user_id', // foreign key to associate the task with user
  });

  // returning an object that contains the user & task models
  return { User, Task };
};