 // export an object with an 'authenticator' method
module.exports = {
    authenticator: (req, res, next) => {
      // check if user is authenticated
      if (req.isAuthenticated()) {
        return next(); // proceed to the next middleware
      }
      // if not authenticated, flash a warning message & redirect to login page
      req.flash('warning_msg', 'Please login first.');
      res.redirect('/users/login');
    }
  }