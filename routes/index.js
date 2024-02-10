const router = require('express').Router();
const taskController = require('../controllers/taskController');

// route for retrieving all tasks
router.get('/tasks', taskController.findAll);

module.exports = router;