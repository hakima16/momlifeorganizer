const express = require("express");
const router = express.Router();
const ShoppingItem = require("../models/ShoppingItem");

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await ShoppingItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE item
router.post("/", async (req, res) => {
  try {
    const item = new ShoppingItem(req.body);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE item
router.put("/:id", async (req, res) => {
  try {
    const updated = await ShoppingItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Item not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ShoppingItem.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

