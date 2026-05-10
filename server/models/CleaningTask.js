const mongoose = require("mongoose");

const cleaningSchema = new mongoose.Schema({
  task: { type: String, required: true },
  frequency: { type: String }, // daily, weekly, monthly
  notes: { type: String }
});

module.exports = mongoose.model("CleaningTask", cleaningSchema);
