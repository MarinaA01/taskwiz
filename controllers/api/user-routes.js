const router = require('express').Router();
const { User } = require('../../models');

// route to create a new user
router.post('/', async (req, res) => {
  try {
    // create a new user with the request body
    const userData = await User.create(req.body);
    // set the user_id & logged_in properties in the session
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    // save the session and send the user data as response
    req.session.save(() => {
      res.status(200).json(userData);
    });
  } catch (err) {
    // handle any errors & send as response
    res.status(400).json(err);
  }
});

// route to login a user
router.post('/login', async (req, res) => {
  try {
    // find a user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      // if no user is found, send an error message
      res.status(400).json({ message: 'incorrect email or password, please try again' });
      return;
    }
    // check if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      // if password is invalid, send an error message
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // set the user_id & logged_in properties in the session
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    // save the session & send the user data as response
    req.session.save(() => {
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    // handle any errors & send as response
    res.status(400).json(err);
  }
});

// route to logout a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // destroy the session & send a success response
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // if user is not logged in, send a not found response
    res.status(404).end();
  }
});

module.exports = router;