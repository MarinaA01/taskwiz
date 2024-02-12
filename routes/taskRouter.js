const express = require("express");
const router = express.Router();
const db = require("../models");
const Task = db.Task;

// create a new task form route
router.get("/new", (req, res) => {
  res.render("create");
});

// read all tasks route
router.get("/", (req, res) => {
  const UserId = req.user.id;
  console.log(UserId);
  return Task.findAll({
    raw: true,
    nest: true,
    where: { user_id: UserId },
  })
    .then((tasks) => {
      console.log(tasks);
      return res.render("index", { tasks: tasks });
    })
    .catch((error) => {
      return res.status(422).json(error);
    });
});

// create a new task route
router.post("/", (req, res) => {
  const { name, description } = req.body;
  const user_id = req.user.id;
  console.log("name:", name);
  console.log("description:", description);
  console.log("user_id:", user_id);
  
  return Task.create({
    name,
    description,
    user_id,
    date_created: new Date(),
  })
    .then(() => res.redirect("/"))
    .catch((error) => {
      console.log("Error creating task:", error);
      res.status(500).send("Internal Server Error");
    });
});

// read a specific task route
router.get("/:id", (req, res) => {
  const user_id = req.user.id;
  const id = req.params.id;
  
  return Task.findOne({ where: { user_id, id } })
    .then((task) => res.render("taskDetails", { task: task.toJSON() }))
    .catch((error) => console.log(error));
});

// update a task route
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
    .then(() => res.redirect(`/tasks/${id}`))
    .catch((error) => console.log(error));
});

// delete a task route
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