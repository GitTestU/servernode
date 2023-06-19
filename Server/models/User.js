const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  modelYear: {
    type: Number,
    required: true,
  },
  rentPrice:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("userSchema", userSchema );

module.exports = User;
