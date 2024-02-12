const express = require("express");
const router = express.Router();
const db = require("../models");
const User = db.User;
const bcrypt = require("bcryptjs");
const passport = require("passport");

// route to render the login form
router.get("/login", (req, res) => {
  res.render("login");
});

// route to handle user login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

// route to render the registration form
router.get("/register", (req, res) => {
  res.render("register");
});

// route to handle user registration
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  
  // validate user input
  if (!name || !email || !password) {
    req.flash("error_msg", "All fields are required.");
  }

  const errorMsg = req.flash("error_msg");
  if (errorMsg.length) {
    return res.render("register", {
      name,
      email,
      password,
      error_msg: errorMsg,
    });
  }

  // check if user already exists
  return User.findOne({ where: { email } }).then((user) => {
    if (user) {
      req.flash("error_msg", "User already exists");
      const errorMsg = req.flash("error_msg");
      return res.render("register", {
        name,
        email,
        password,
        error_msg: errorMsg,
      });
    }

    // hash the password & create a new user
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash,
        })
      )
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err));
  });
});

// route to handle user logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Logout Successfully");
  res.redirect("/users/login");
});

module.exports = router;