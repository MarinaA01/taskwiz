const express = require("express");
const router = express.Router();

// import route handlers for different routes
const home = require("./home");
const users = require("./UserRouter");
const tasks = require("./taskRouter");
const auth = require("./authRouter");
const { authenticator } = require("../middleware/auth");

// define route handling for different paths using middleware
router.use("/tasks", authenticator, tasks); // route for tasks with authentication
router.use("/users", users); // route for users
router.use("/auth", auth); // route for authentication
router.use("/", authenticator, home); // default route with authentication

module.exports = router;