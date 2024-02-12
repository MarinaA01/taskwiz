const express = require("express");
const router = express.Router();
const db = require("../models");
const Task = db.Task;

// route to fetch tasks for a specific user
router.get("/", (req, res) => {
  // get the UserId of the authenticated user
  const UserId = req.user.id;

  // find all tasks for the specific user
  return Task.findAll({
    raw: true,
    nest: true,
    where: { User_id: UserId },
  })
    .then((tasks) => {
      // render the 'index' view with the fetched tasks
      return res.render("index", { tasks: tasks });
    })
    .catch((error) => {
      // handle any errors that occur during the process
      return res.status(422).json(error);
    });
});

module.exports = router;