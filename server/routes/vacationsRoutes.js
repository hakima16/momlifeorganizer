const express = require("express");
const router = express.Router();
const Vacation = require("../models/Vacation");

// GET all vacations
router.get("/", async (req, res) => {
  try {
    const vacations = await Vacation.find();
    res.json(vacations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE vacation
router.post("/", async (req, res) => {
  try {
    const vacation = new Vacation(req.body);
    const saved = await vacation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE vacation
router.put("/:id", async (req, res) => {
  try {
    const updated = await Vacation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Vacation not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE vacation
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Vacation.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Vacation not found" });
    res.json({ message: "Vacation deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
