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


});



const Agency = mongoose.model("Agency",agency );
module.exports = Agency ;

