const User = require('./user');
const Task = require('./task');

// user has many tasks
User.hasMany(Task, {
  foreignKey: 'user_id', // foreign key to associate user with the task
  onDelete: 'CASCADE', // if User is deleted, also delete associated tasks
});

// task belongs to user
Task.belongsTo(User, {
  foreignKey: 'user_id', // foreign key to associate the task with user
});

module.exports = { User, Task };