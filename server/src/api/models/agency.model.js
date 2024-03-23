const mongoose = require("mongoose");
const User = require("./user.model");

var agency = new mongoose.Schema({
  agencyName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  Location: {
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
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // portfolio: {
  //   type: mongoose.Schema.Types.objectId,
  //   ref: "Portfolio",
  //   required: true,
  // },
},
  {
    timestamp: true,
  });

  // const Agency = mongoose.model("Agency", agency);
  // module.exports = Agency;

const Agency = mongoose.model("Agency", agency);
module.exports = Agency;

