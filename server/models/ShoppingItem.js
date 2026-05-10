const mongoose = require("mongoose");

const ShoppingItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  purchased: { type: Boolean, default: false }
});

// ⭐ IMPORTANT: Model name MUST be "ShoppingItem", NOT "Appointment"
module.exports = mongoose.model("ShoppingItem", ShoppingItemSchema);


