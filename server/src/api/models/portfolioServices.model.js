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
  image: [{
    type: String,
    unique: true,
    trim: true,
  }],
  // portfolioId: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Portfolio'
  // },
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
