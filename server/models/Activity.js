const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model("Activity", activitySchema);
