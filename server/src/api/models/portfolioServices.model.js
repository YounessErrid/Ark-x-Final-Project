const mongoose = require("mongoose");
const portfolioserviceSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  // list of images
  images: [{
    type: String,
    trim: true,
  }],
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
});
const portfolioservice = mongoose.model(
  "portfolioservice",
  portfolioserviceSchema
);
module.exports = portfolioservice;