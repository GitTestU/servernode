const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique : true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetToken : {
    type: String,
  },
  resetTokenExpiration: {
    type : Date,
    default: Date.now(),
  }
});

const auth = mongoose.model("Auth", customerSchema);

module.exports = auth;
