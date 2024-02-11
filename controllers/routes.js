const router = require('express').Router();
const { Task, User } = require('../models');
const withAuth = require('../utils/userAuth.js');

// route to get all tasks & render the homepage view
router.get('/', async (req, res) => {
  try {
    // get all tasks and JOIN with user data
    const taskData = await Task.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // serialize data so the template can read it
    const tasks = taskData.map((task) => task.get({ plain: true }));

    // pass serialized data & session flag into template
    res.render('homepage', {
      tasks,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get a specific task by ID & render the task view
router.get('/task/:id', async (req, res) => {
  try {
    const taskData = await Task.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const task = taskData.get({ plain: true });

    res.render('task', {
      ...task,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to get the user's profile & render the profile viewu
// uses withAuth middleware to prevent access to route if user is not logged in
router.get('/profile', withAuth, async (req, res) => {
  try {
    // find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Task }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to render the login view
// if the user is already logged in, redirect the request to the profile route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;