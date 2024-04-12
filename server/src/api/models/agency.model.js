const mongoose = require("mongoose");
const User = require("./user.model");

var agencySchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // portfolioId: {
  //   type: mongoose.Schema.Types.objectId,
  //   ref: "Portfolio",
  //   // required: true,
  // },
},
  {
    timestamp: true,
  });

const Agency = mongoose.model("Agency", agencySchema);
module.exports = Agency;

