const router = require('express').Router();
const userRoutes = require('./user-routes');
const homeRoutes = require('./home-routes');
const taskController = require('../controllers/taskController');

router.use('/', homeRoutes);
router.use('/users', userRoutes);


module.exports = router;
