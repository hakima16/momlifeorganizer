const mongoose = require("mongoose");

const kidSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  notes: { type: String }
});

module.exports = mongoose.model("Kid", kidSchema);
