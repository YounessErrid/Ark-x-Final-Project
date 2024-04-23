const mongoose = require("mongoose");


var agencySchema = new mongoose.Schema({
  agencyName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  userId :{
    type : mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  addresse: {
    type: String,
    required: true,
    trim: true,
  },
  portfolioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Portfolio",
   
  },
},
  {
    timestamp: true,
  });

const Agency = mongoose.model("Agency", agencySchema);
module.exports = Agency;