const router = require('express').Router();
const userRoutes = require('../user-routes');
const homeRoutes = require('./taskRoutes');
const taskController = require('../taskController');

router.use('/', homeRoutes);
router.use('/users', userRoutes);


module.exports = router;
