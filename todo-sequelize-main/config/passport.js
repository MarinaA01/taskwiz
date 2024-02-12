const passport = require("passport");
const LocalStrategy = require("passport-local");
const FacebookStrategy = require("passport-facebook");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;

module.exports = (app) => {
  // initialize Passport & set up session management
  app.use(passport.initialize());
  app.use(passport.session());

  // configure local strategy for passport
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      (req, email, password, done) => {
        // find user by email in the database
        User.findOne({ where: { email } })
          .then((user) => {
            if (!user) {
              // return error message if user not found
              return done(
                null,
                false,
                req.flash("error_msg", "That email is not registered!")
              );
            }
            // compare password with hashed password
            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) {
                // return error message if password does not match
                return done(
                  null,
                  false,
                  req.flash("error_msg", "Incorrect Email or Password.")
                );
              }
              // return user if credentials are correct
              return done(null, user);
            });
          })
          .catch((err) => done(err, false));
      }
    )
  );

  // serialize user to store in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize user from session
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => {
        user = user.toJSON();
        done(null, user);
      })
      .catch((err) => done(err, null));
  });
};