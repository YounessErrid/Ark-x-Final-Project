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

portfolioservice.schema.index({ name: 'text', description: 'text' });  // Text index for searching

module.exports = portfolioservice;
/*const mongoose = require("mongoose");
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
 
});
const portfolioservice = mongoose.model(
  "portfolioservice",
  portfolioserviceSchema
);
module.exports = portfolioservice;*/