const router = require('express').Router();
const taskController = require('../controller/taskController');

// route for getting, updating & deleting a specific task by ID
router.route('/task/:id')
  .get(taskController.findOne) // get a specific task by ID
  .put(taskController.complete) // update the completion status of a task
  .delete(taskController.deleteOne); // delete a specific task by ID

// route for creating a new task
router.route('/create')
  .post(taskController.create); // create a new task

// route for updating the name of a task
router.route('/update')
  .post(taskController.updateName); // update the name of a task

module.exports = router;