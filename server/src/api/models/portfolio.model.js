const mongoose = require("mongoose");
const portfolioSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  couverture: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
});
const Portfolio = mongoose.model("Portfolio", portfolioSchema);
module.exports = Portfolio;
