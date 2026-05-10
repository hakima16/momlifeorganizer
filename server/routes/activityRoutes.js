const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// GET all activities
router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE an activity
router.post("/", async (req, res) => {
  try {
    const activity = new Activity(req.body);
    const savedActivity = await activity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE an activity
router.put("/:id", async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedActivity)
      return res.status(404).json({ message: "Activity not found" });
    res.json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an activity
router.delete("/:id", async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity)
      return res.status(404).json({ message: "Activity not found" });
    res.json({ message: "Activity deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


