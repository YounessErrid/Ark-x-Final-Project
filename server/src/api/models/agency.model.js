const mongoose = require("mongoose");


var agencySchema = new mongoose.Schema({
  userId : {
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
    required: true,
  },
},
  {
    timestamp: true,
  });

const Agency = mongoose.model("Agency", agencySchema);
module.exports = Agency;

