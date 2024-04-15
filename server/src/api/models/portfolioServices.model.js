const mongoose = require("mongoose");
const portfolioserviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    unique: true,
    trim: true,
  },
  // list of images
  images: [{
    type: String,
    unique: true,
    trim: true,
  }],
  // serviceId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Service",
  //   required: true,
  // },
});
const portfolioservice = mongoose.model(
  "portfolioservice",
  portfolioserviceSchema
);
module.exports = portfolioservice;