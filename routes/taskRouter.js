const express = require("express");
const router = express.Router();
const db = require("../models");
const Task = db.Task;

// Create
router.get("/new", (req, res) => {
  res.render("create");
});

router.post("/", (req, res) => {
  const { name, description } = req.body;
  const userId = req.user.id;
  console.log("userId", userId);
  return Task.create({
    name,
    description,
    user_id: userId,
    date_created: new Date(), // Make sure 'date_created' is correctly defined in your model
  })
    .then(() => res.redirect("/"))
    .catch((error) => {
      console.log("Error creating task:", error);
      res.status(500).send("Internal Server Error");
    });
});

// Read
router.get("/:id", (req, res) => {
  const user_id = req.user.id;
  const id = req.params.id;
  return Task.findOne({ where: { user_id, id } })
    .then((task) => res.render("taskDetails", { task: task.toJSON() }))
    .catch((error) => console.log(error));
});

// Update
router.get("/:id/edit", (req, res) => {
  const UserId = req.user.id;
  const id = req.params.id;
  return Task.findOne({ where: { UserId, id } })
    .then((task) => res.render("editTask", { task: task.toJSON() }))
    .catch((error) => console.log(error));
});

router.put("/:id", (req, res) => {
  const user_id = req.user.id;
  const id = req.params.id;
  const { name, isDone } = req.body;
  return Task.update(
    {
      name,
      isDone: isDone === "on",
    },
    {
      where: {
        user_id,
        id,
      },
    }
  )
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error));
});

// Delete
router.delete("/:id", (req, res) => {
  const user_id = req.user.id;
  const id = req.params.id;
  return Task.destroy({
    where: {
      user_id,
      id,
    },
  })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
