const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  modelYear: { type: Number, required: true },
  rentPrice: { type: Number, required: true },

});
module.exports = mongoose.model("Car", CarSchema);
