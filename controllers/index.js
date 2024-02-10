 // import the router module from the express library
const router = require('express').Router();

// import the apiRoutes module from the './api' file
const apiRoutes = require('./api');

// import the homeRoutes module from the './homeRoutes' file
const homeRoutes = require('./homeRoutes');

// define a route for the root path ('/')
// use the homeRoutes middleware to handle the request
router.use('/', homeRoutes);

// define a route for the '/api' path
// use the apiRoutes middleware to handle the request
router.use('/api', apiRoutes);

// export the router module
module.exports = router;