const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profile_image: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ["admin", "client", "agency"],
    default: "client",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
