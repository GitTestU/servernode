const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  myFile: { type: String, required: true },
});

const post = mongoose.model("post", postSchema);

module.exports = post;
