const express = require("express");
const router = express.Router();
const db = require("../models");
const Task = db.Task;

router.get("/", (req, res) => {
  const UserId = req.user.id;
  return Task.findAll({
    raw: true,
    nest: true,
    where: { user_id: UserId },
  })
    .then((tasks) => {
      return res.render("index", { tasks: tasks });
    })
    .catch((error) => {
      return res.status(422).json(error);
    });
});

module.exports = router;
