const express = require("express");
const router = express.Router();
const db = require("../models");
const Task = db.Task;

// handle GET request to retrieve tasks for the current user
router.get("/", (req, res) => {
  // get the UserId from the authenticated user
  const UserId = req.user.id;

  // find all tasks associated with the UserId
  return Task.findAll({
    raw: true,
    nest: true,
    where: { User_id: UserId },
  })
    .then((tasks) => {
      // render the 'index' view with the retrieved tasks
      return res.render("index", { tasks: tasks });
    })
    .catch((error) => {
      // handle any errors & return a status code
      return res.status(422).json(error);
    });
});

module.exports = router;