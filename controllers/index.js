const router = require('express').Router();
const userRoutes = require('./user-routes');
const projectRoutes = require('./projectRoutes');
const taskController = require('../controllers/taskController');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
