const express = require("express");
const router = express.Router();
const CleaningTask = require("../models/CleaningTask");

// GET all cleaning tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await CleaningTask.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE cleaning task
router.post("/", async (req, res) => {
  try {
    const task = new CleaningTask(req.body);
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE cleaning task
router.put("/:id", async (req, res) => {
  try {
    const updated = await CleaningTask.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Task not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE cleaning task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await CleaningTask.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

