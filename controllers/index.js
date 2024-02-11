// import the router module from the express library
const router = require('express').Router();

// import the apiRoutes module from a different file or directory

const apiRoutes = require('../routes/apiRoutes'); // Updated line


// import the homeRoutes module from a different file or directory
const homeRoutes = require('./routes.js');

// define routes & use the imported modules as middleware
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// export the router module
module.exports = router;