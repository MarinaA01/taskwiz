// import the task model
const Task = require('../models/task');

// function to sort tasks based on task name
const sortTasks = (a, b) => {
  const taskA = a.task.toLowerCase();
  const taskB = b.task.toLowerCase();
  return taskA.localeCompare(taskB);
};

// exported module
module.exports = {
  // find all tasks
  findAll: function (req, res) {
    Task.find({})
      .sort({ task: 1 }) // sort tasks by task name in ascending order
      .then((result) => {
        res.render('index', { tasks: result }); // render index view with tasks data
      })
      .catch((err) => res.json(err)); // handle errors
  },

  // create a new task
  create: function (req, res) {
    Task.create(req.body)
      .then((result) => {
        res.json(result); // return the created task as JSON
      })
      .catch((err) => res.json(err)); // handle errors
  },

  // find a specific task by ID & render the edit view
  findOne: function (req, res) {
    Task.findOne({ _id: req.params.id })
      .then((result) => res.render('edit', result)) // render edit view with the task data
      .catch((err) => res.json(err)); // handle errors
  },

  // mark a task as completed
  complete: function (req, res) {
    Task.findOneAndUpdate({ _id: req.params.id }, { completed: true })
      .then((result) => res.json(result)) // return the updated task as JSON
      .catch((err) => res.json(err)); // handle errors
  },

  // delete a task
  deleteOne: function (req, res) {
    Task.deleteOne({ _id: req.params.id })
      .then((result) => res.json(result)) // return the result of the delete operation as JSON
      .catch((err) => res.json(err)); // handle errors
  },

  // update the name of a task
  updateName: function (req, res) {
    Task.findOneAndUpdate({ _id: req.body._id }, { task: req.body.task })
      .then((result) => res.json(result)) // return the updated task as JSON
      .catch((err) => res.json(err)); // handle errors
  },
};
