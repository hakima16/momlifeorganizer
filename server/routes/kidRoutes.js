const express = require("express");
const router = express.Router();
const Kid = require("../models/Kid");

// GET all kids
router.get("/", async (req, res) => {
  try {
    const kids = await Kid.find();
    res.json(kids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a kid
router.post("/", async (req, res) => {
  try {
    const kid = new Kid(req.body);
    const savedKid = await kid.save();
    res.status(201).json(savedKid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a kid
router.put("/:id", async (req, res) => {
  try {
    const updatedKid = await Kid.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedKid) return res.status(404).json({ message: "Kid not found" });
    res.json(updatedKid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a kid
router.delete("/:id", async (req, res) => {
  try {
    const deletedKid = await Kid.findByIdAndDelete(req.params.id);
    if (!deletedKid) return res.status(404).json({ message: "Kid not found" });
    res.json({ message: "Kid deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

