const router = require("express").Router();
const Task = require("../models/Task");

// CREATE
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// READ
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
