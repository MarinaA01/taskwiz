 // import the router module from the express library
const router = require('express').Router();

// import the apiRoutes module from a different file or directory
const apiRoutes = require('../routes/apiRoutes'); // importing the apiRoutes module

// use the apiRoutes module as middleware
router.use('/api', apiRoutes);

// export the router module
module.exports = router;