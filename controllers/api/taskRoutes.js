const router = require('express').Router();
const { Task, User } = require('../../models');
const withAuth = require('../../utils/userAuth');

// route to get all tasks
router.get('/', async (req, res) => {
  try {
    // render the homepage view
    res.render('homepage', {});
  } catch (err) {
    // handle server error
    res.status(500).json(err, "error");
  }
});

// route to create a new task
router.post('/', async (req, res) => {
  try {
    // create a new task with the request body and user ID
    const newTask = await Task.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // return the newly created task
    res.status(200).json(newTask);
  } catch (err) {
    // handle client error
    res.status(400).json(err);
  }
});

// route to delete a task by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // delete the task with the specified ID & user ID
    const taskData = await Task.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!taskData) {
      // if no task is found with the specified ID, return an error message
      res.status(404).json({ message: 'no task found with this id' });
      return;
    }

    // return the deleted task
    res.status(200).json(taskData);
  } catch (err) {
    // handle server error
    res.status(500).json(err);
  }
});

module.exports = router;