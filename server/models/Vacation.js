const mongoose = require("mongoose");

const vacationSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  date: { type: String },
  notes: { type: String }
});

module.exports = mongoose.model("Vacation", vacationSchema);
