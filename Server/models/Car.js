const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type : String,
    required: true,
  },
  modelYear : {
    type : Number,
    required : true,
  },
  rentPrice : {
    type: Number,
    required : true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
